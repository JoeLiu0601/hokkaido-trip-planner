const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.join(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const timing = fs.readFileSync(path.join(root, 'timing-drafts.js'), 'utf8');
const runtime = vm.runInNewContext(timing + '\n' + source.slice(0, source.indexOf('const state =')) + '\n({buildPlan,migrateNightReviewPlan,migrateGoryokakuPriorityPlan,migrateOnsenLunchPlan,migrateDayFiveParkMeetingPlan,dayOneTimingDraft,dailyTimingDrafts,dayDepartures,spots,drivingPlaceOverrides,skiRouteDays})', { window: {} });

test('D3 keeps LeTAO between the glass shop and the crossing, before the mountain', () => {
  const ids = runtime.buildPlan()[3];
  const index = ids.indexOf('letao-otaru-honten');
  assert.equal(ids[index - 1], 'taisho-glass');
  assert.equal(ids[index + 1], 'otaru-meruhen-crossing');
  assert.ok(index < ids.indexOf('otaru-tenguyama'));
  assert.equal(runtime.dailyTimingDrafts[3].rows.filter(row => row[3]?.includes('letao-otaru-honten')).length, 1);
});

test('D1 blue pond is optional immediately after the hotel and does not promise 17:00', () => {
  const plan = runtime.buildPlan();
  assert.equal(plan[1][plan[1].indexOf('premier-cabin-asahikawa') + 1], 'biei-blue');
  assert.equal(runtime.dayOneTimingDraft['biei-blue'].optional, true);
  assert.match(runtime.dayOneTimingDraft['biei-blue'].note, /16:30–21:00.*17:00/);
  assert.match(runtime.drivingPlaceOverrides['biei-blue'], /駐車場/);
});

test('D2 stays for evening lights then returns directly to the hotel', () => {
  const d = runtime.dailyTimingDrafts[2];
  assert.equal(d.rows.find(row => row[3]?.includes('ningle-terrace'))[0], '15:00–17:15');
  assert.equal(d.rows.find(row => row[3]?.includes('apa-sapporo-susukino-ekinishi'))[0], '22:00–22:40');
  assert.ok(!runtime.buildPlan()[2].includes('sapporo-odori'));
  assert.ok(!runtime.buildPlan()[2].includes('furano-field'));
  assert.equal(runtime.buildPlan()[2][0], 'biei-shrine');
  assert.doesNotMatch(d.notes.join(' '), /富良野雪原/);
});

test('D7 default route follows its timing draft and omits the crater', () => {
  const day = Array.from(runtime.buildPlan()[7]);
  const draft = runtime.dailyTimingDrafts[7];
  assert.deepEqual(day, Array.from(draft.requiredIds));
  assert.deepEqual(day, Array.from(draft.stopGroups, ids => ids[0]));
  assert.equal(runtime.dayDepartures[7].time, '07:30');
});

test('D3 places Tenguyama after the crossroads and keeps the canal after it', () => {
  assert.equal(runtime.dayDepartures[3].time, '07:45');
  assert.equal(runtime.dailyTimingDrafts[3].rows.find(row => row[3]?.includes('hokkaido-shrine'))[0], '08:45–09:35');
  const day = runtime.buildPlan()[3];
  assert.equal(day[day.indexOf('otaru-meruhen-crossing') + 1], 'otaru-tenguyama');
  assert.equal(day[day.indexOf('otaru-tenguyama') + 1], 'otaru-canal');
  assert.match(runtime.drivingPlaceOverrides['otaru-tenguyama'], /山麓駅/);
});

test('D4 retains the night ropeway and D5 reunites at Shiroi Koibito Park', () => {
  const plan = runtime.buildPlan();
  assert.equal(runtime.dayDepartures[4].time, '06:30');
  assert.equal(plan[4][plan[4].indexOf('happiness-bell') + 1], 'moiwa-yama');
  assert.ok(!plan[5].includes('moiwa-yama'));
  assert.deepEqual(Array.from(plan[5]), ['nakajima-park','unagi-nakajima','daimaru-sapporo','pokemon-center-sapporo','shiroi-koibito-park','tanukikoji-shopping-street']);
  assert.match(runtime.skiRouteDays[5].route, /15:00.*16:00.*白色戀人/);
  const row = runtime.dailyTimingDrafts[5].rows.find(row => row[3]?.includes('shiroi-koibito-park'));
  assert.equal(row[0], '16:00–18:00');
  assert.match(runtime.dailyTimingDrafts[5].rows.at(-3)[1], /同伴的車回 APA/);
  assert.equal(runtime.dailyTimingDrafts[5].rows.at(-1)[0], '20:00–21:00');
});

test('D5 meeting migration moves only the requested park and is applied once', () => {
  const p = runtime.buildPlan(), id = 'shiroi-koibito-park';
  p[5] = ['nakajima-park', 'unagi-nakajima', 'sapporo-odori'];
  p[2].push(id);
  const untouched = JSON.stringify(p[6]);
  assert.equal(runtime.migrateDayFiveParkMeetingPlan(p), true);
  assert.deepEqual(Array.from(p[5]), ['nakajima-park', 'unagi-nakajima', id, 'sapporo-odori']);
  assert.ok(!p[2].includes(id));
  assert.equal(JSON.stringify(p[6]), untouched);
  assert.equal(runtime.migrateDayFiveParkMeetingPlan(p), false);
  p[5].reverse(); const reordered = JSON.stringify(p[5]);
  assert.equal(runtime.migrateDayFiveParkMeetingPlan(p), false);
  assert.equal(JSON.stringify(p[5]), reordered);
  p[2].push(id);
  assert.equal(runtime.migrateDayFiveParkMeetingPlan(p), true);
  assert.equal(Object.values(p).flat().filter(stopId => stopId === id).length, 1);
  assert.equal(JSON.stringify(p[5]), reordered);
});

test('requested migration is repeatable without duplicates or changes to other days', () => {
  const p = runtime.buildPlan(); p[1] = p[1].filter(id => id !== 'biei-blue');
  p[3] = p[3].filter(id => id !== 'otaru-tenguyama');
  p[4] = p[4].filter(id => id !== 'moiwa-yama'); p[5].push('moiwa-yama');
  const untouched = JSON.stringify(p[7]);
  assert.equal(runtime.migrateNightReviewPlan(p), true);
  const once = JSON.stringify(p);
  runtime.migrateNightReviewPlan(p);
  assert.equal(JSON.stringify(p), once); assert.equal(JSON.stringify(p[7]), untouched);
  assert.equal(Object.values(p).flat().filter(id => id === 'moiwa-yama').length, 1);
});

test('revised timing rows have no backwards or overlapping fixed intervals', () => {
  const minutes = (h, m) => Number(h) * 60 + Number(m);
  for (const day of [2, 3, 4, 5, 7, 8]) {
    let previous = 0;
    for (const row of runtime.dailyTimingDrafts[day].rows) {
      const m = /^(\d{2}):(\d{2})–(\d{2}):(\d{2})$/.exec(row[0]);
      if (!m) continue;
      const start = minutes(m[1], m[2]), end = minutes(m[3], m[4]);
      assert.ok(start >= previous && end >= start, `D${day}: ${row[0]}`); previous = end;
    }
  }
});

test('recognized former D3 orders follow the draft without replaying on custom extra stops', () => {
  const p = runtime.buildPlan();
  p[3] = ['hokkaido-shrine','teine-shrine','sapporo-fushimi-inari','wakadori-naruto-honten','otaru-inari-shrine','otaru-canal','taisho-glass','otaru-meruhen-crossing'];
  runtime.migrateNightReviewPlan(p);
  assert.ok(p[3].indexOf('sapporo-fushimi-inari') < p[3].indexOf('teine-shrine'));
  assert.ok(p[3].indexOf('otaru-meruhen-crossing') < p[3].indexOf('otaru-tenguyama'));
  assert.ok(p[3].indexOf('otaru-tenguyama') < p[3].indexOf('otaru-canal'));
});

test('D8 prioritizes the tower and remains valid without the optional park', () => {
  const day = runtime.buildPlan()[8], draft = runtime.dailyTimingDrafts[8];
  assert.ok(day.indexOf('lucky-pierrot-goryokaku') < day.indexOf('goryokaku-tower'));
  assert.equal(draft.rows.find(row => row[3]?.includes('goryokaku-tower'))[0], '16:00–17:30');
  assert.equal(draft.timingOverrides['lagent-hakodate-ekimae'].time, '10:45 寄行李／18:30 入住');
  assert.ok(draft.requiredIds.includes('goryokaku-tower'));
  assert.ok(!draft.requiredIds.includes('goryokaku'));
  assert.ok(draft.optionalIds.includes('goryokaku'));
  const withoutPark = day.filter(id => id !== 'goryokaku');
  assert.ok(draft.requiredIds.every(id => withoutPark.includes(id)));
  const ranks = new Map(draft.stopGroups.flatMap((ids, rank) => ids.map(id => [id, rank])));
  assert.ok(withoutPark.every((id, i) => i === 0 || ranks.get(withoutPark[i - 1]) <= ranks.get(id)));
  assert.equal(runtime.buildPlan()[9].includes('goryokaku'), false);
});

test('D8 migration adds the tower once and respects a removed or separately arranged park', () => {
  const p = runtime.buildPlan();
  p[8] = ['goryokaku', 'lucky-pierrot-goryokaku', 'lagent-hakodate-ekimae'];
  const otherDays = JSON.stringify(Object.entries(p).filter(([day]) => day !== '8'));
  assert.equal(runtime.migrateGoryokakuPriorityPlan(p), true);
  assert.ok(p[8].indexOf('lucky-pierrot-goryokaku') < p[8].indexOf('goryokaku-tower'));
  assert.equal(runtime.migrateGoryokakuPriorityPlan(p), false);
  assert.equal(JSON.stringify(Object.entries(p).filter(([day]) => day !== '8')), otherDays);
  p[8] = p[8].filter(id => id !== 'goryokaku'); p[9].unshift('goryokaku');
  runtime.migrateGoryokakuPriorityPlan(p);
  assert.ok(!p[8].includes('goryokaku'));
  const before = JSON.stringify(p); p[8].push('rokkatei-goryokaku');
  assert.equal(runtime.migrateGoryokakuPriorityPlan(p), false);
  p[8].pop(); assert.equal(JSON.stringify(p), before);
});

test('D4 uses one onsen-street lunch area and migrates old Tenkatsu without duplicating it', () => {
  const p = runtime.buildPlan();
  const street = 'noboribetsu-onsen-street', tenkatsu = 'tenkatsu-honten-muroran';
  assert.equal(p[4].includes('noboribetsu-onsen-ichiba'), false);
  assert.equal(p[4].filter(id => id === street).length, 1);
  p[4].splice(p[4].indexOf(street) + 1, 0, tenkatsu);
  const others = JSON.stringify(Object.entries(p).filter(([day]) => day !== '4'));
  assert.equal(runtime.migrateOnsenLunchPlan(p), true);
  assert.equal(p[4].filter(id => id === street).length, 1);
  assert.ok(!p[4].includes(tenkatsu));
  assert.equal(runtime.migrateOnsenLunchPlan(p), false);
  assert.equal(JSON.stringify(Object.entries(p).filter(([day]) => day !== '4')), others);
  p[4] = p[4].map(id => id === street ? tenkatsu : id); p[5].push(street);
  runtime.migrateOnsenLunchPlan(p);
  assert.ok(!p[4].includes(street)); assert.ok(p[5].includes(street));
});
