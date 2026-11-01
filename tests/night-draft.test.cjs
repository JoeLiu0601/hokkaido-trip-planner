const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.join(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const timing = fs.readFileSync(path.join(root, 'timing-drafts.js'), 'utf8');
const runtime = vm.runInNewContext(timing + '\n' + source.slice(0, source.indexOf('const state =')) + '\n({buildPlan,migrateNightReviewPlan,dayOneTimingDraft,dailyTimingDrafts,dayDepartures,spots,drivingPlaceOverrides,skiRouteDays})', { window: {} });

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
});

test('D3 places Tenguyama after the crossroads and keeps the canal after it', () => {
  const day = runtime.buildPlan()[3];
  assert.equal(day[day.indexOf('otaru-meruhen-crossing') + 1], 'otaru-tenguyama');
  assert.equal(day[day.indexOf('otaru-tenguyama') + 1], 'otaru-canal');
  assert.match(runtime.drivingPlaceOverrides['otaru-tenguyama'], /山麓駅/);
});

test('D4 has the 06:30 departure and the single Moiwa visit; D5 has no meeting route', () => {
  const plan = runtime.buildPlan();
  assert.equal(runtime.dayDepartures[4].time, '06:30');
  assert.equal(plan[4][plan[4].indexOf('happiness-bell') + 1], 'moiwa-yama');
  assert.ok(!plan[5].includes('moiwa-yama'));
  assert.doesNotMatch(runtime.skiRouteDays[5].route, /夜景|會合/);
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
  for (const day of [2, 3, 4, 5]) {
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
