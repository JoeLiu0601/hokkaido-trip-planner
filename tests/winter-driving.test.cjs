const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.join(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const timing = fs.readFileSync(path.join(root, 'timing-drafts.js'), 'utf8');
const section = (a, b) => source.slice(source.indexOf(a), source.indexOf(b));

function setup() {
  const state = { plan: {} };
  const r = vm.runInNewContext(timing + '\n' + source.slice(0, source.indexOf('const state ='))
    + section('function getDailyTimingDraft(', 'function dayNineTimingDraftHtml(')
    + section('function dayFourDriveReviewHtml(', 'function dailyTimingDraftHtml(')
    + '\n({buildPlan,dayFourDriveLegs,dayFourDriveMinutes,calculateDayFourScenario,buildDayFourTimingDraft,getDailyTimingDraft,isDailyTimingDraftApplicable,getTimingDraftForStop,timingDraftHtml,dayFourDriveReviewHtml,dayFourOptionalStopIds,dayOneTimingDraft})',
  { window: {}, state, escapeHtml: value => String(value) });
  state.plan = r.buildPlan();
  return { r, state };
}

test('D4 rounds scaled driving plus a separate fixed buffer upward to five minutes', () => {
  const { r } = setup();
  assert.equal(r.dayFourDriveMinutes(r.dayFourDriveLegs.outbound, 1.5), 160);
  assert.equal(r.dayFourDriveMinutes(r.dayFourDriveLegs.outbound, 2), 205);
  assert.equal(r.dayFourDriveMinutes(r.dayFourDriveLegs.capeMoiwa, 1.5), 200);
  assert.equal(r.dayFourDriveMinutes(r.dayFourDriveLegs.capeMoiwa, 2), 260);
  assert.equal(r.dayFourDriveMinutes(r.dayFourDriveLegs.directMoiwa, 2), 210);
});

test('D4 displays a single flexible lunch area while preserving its driving buffers', () => {
  const { r, state } = setup();
  const draft = r.getDailyTimingDraft(4);
  const area = draft.rows.filter(row => row[3]?.includes('noboribetsu-onsen-street'));
  assert.equal(area.length, 1);
  assert.match(area[0][1], /午餐自選/);
  assert.equal(draft.rows.some(row => row[3]?.includes('noboribetsu-onsen-ichiba')), false);
  assert.equal(state.plan[4].includes('noboribetsu-onsen-ichiba'), false);
  assert.equal(draft.driveReview.normal.moiwaArrival, r.calculateDayFourScenario(state.plan[4], 1.5).moiwaArrival);
});

test('optional presentation follows each day without deleting shared stops', () => {
  const { r, state } = setup();
  state.selectedDay = 4;
  const journey = fs.readFileSync(path.join(root, 'journey.js'), 'utf8');
  const isOptional = vm.runInNewContext(journey.slice(journey.indexOf('  function isOptional('), journey.indexOf('  function durationText(')) + '\nisOptional',
    { state, travelTools: require('../travel-tools.js'), dailyTimingDrafts: vm.runInNewContext(timing+'\ndailyTimingDrafts'), dayOneTimingDraft: r.dayOneTimingDraft, dayFourOptionalStopIds: r.dayFourOptionalStopIds });
  const before = JSON.stringify(state.plan);
  assert.deepEqual(Array.from(state.plan[4]).filter(id => isOptional(id)), Array.from(r.dayFourOptionalStopIds));
  const main = state.plan[4].filter(id => !isOptional(id));
  assert.ok(main.includes('noboribetsu-valley'));
  assert.ok(main.includes('moiwa-yama'));
  assert.equal(isOptional('noboribetsu-onsen-ichiba', 4), false, 'retain the existing lunch stop when the shared plan still uses the market');
  for (const day of [5, 6, 7, 9, 10]) {
    assert.equal(state.plan[day].some(id => isOptional(id, day)), false);
  }
  assert.equal(isOptional('biei-blue', 1), true);
  assert.equal(isOptional('happiness-bell', 3), false);
  assert.equal(isOptional('hinode-park', 2), false);
  for (const id of ['sapporo-fushimi-inari', 'teine-shrine', 'otaru-inari-shrine']) assert.equal(isOptional(id, 3), false);
  assert.equal(isOptional('goryokaku', 8), true);
  assert.equal(JSON.stringify(state.plan), before);
});

test('D4 edit cards and the full schedule clearly label the optional detours', () => {
  const { r } = setup();
  for (const id of r.dayFourOptionalStopIds) {
    const timing = r.getTimingDraftForStop(4, id);
    assert.equal(timing.optional, true);
    assert.match(r.timingDraftHtml(timing), /有空再去/);
  }
  const moiwa = r.getTimingDraftForStop(4, 'moiwa-yama');
  assert.equal(moiwa.optional, false);
  assert.match(r.getDailyTimingDraft(4).intro, /完整規劃包含.*室蘭備選/);
});

test('D4 twofold scenarios expose the late full route and compare all optional-point choices', () => {
  const { r } = setup();
  const cases = [
    [['muroran-hakucho-bridge-view', 'happiness-bell'], 1205, 1355, 630, true],
    [['muroran-hakucho-bridge-view'], 1120, 1270, 575, false],
    [['happiness-bell'], 1145, 1295, 595, false],
    [[], 970, 1120, 450, false]
  ];
  for (const [stops, arrival, finish, driving, late] of cases) {
    const s = r.calculateDayFourScenario(stops, 2);
    assert.equal(s.moiwaArrival, arrival);
    assert.equal(s.moiwaFinish, finish);
    assert.equal(s.drivingMinutes, driving);
    assert.equal(s.exceedsOperatingWindow, late);
    assert.equal(s.legIds.includes('directMoiwa'), stops.length === 0);
  }
});

test('D4 actual timing stays applicable after removing either optional lookout, but requires Moiwa', () => {
  const { r, state } = setup();
  const all = Array.from(state.plan[4]);
  for (const removed of [[], ['muroran-hakucho-bridge-view'], ['happiness-bell'], ['muroran-hakucho-bridge-view', 'happiness-bell']]) {
    state.plan[4] = all.filter(id => !removed.includes(id));
    assert.equal(r.isDailyTimingDraftApplicable(4), true);
    const draft = r.getDailyTimingDraft(4);
    for (const id of removed) assert.equal(draft.rows.some(row => row[3]?.includes(id)), false);
    assert.ok(draft.requiredIds.includes('moiwa-yama'));
    assert.ok(!draft.requiredIds.includes('happiness-bell'));
    assert.ok(draft.optionalIds.includes('muroran-hakucho-bridge-view'));
  }
  state.plan[4] = all.filter(id => id !== 'moiwa-yama');
  assert.equal(r.isDailyTimingDraftApplicable(4), false);
});

test('D4 derived schedules preserve the plan and distinguish a feasible draft from the stress warning', () => {
  const { r, state } = setup(), before = JSON.stringify(state.plan);
  const draft = r.getDailyTimingDraft(4);
  assert.equal(draft.driveReview.normal.moiwaArrival, 1080);
  assert.equal(draft.driveReview.normal.exceedsOperatingWindow, false);
  assert.equal(draft.driveReview.conservative.exceedsOperatingWindow, true);
  assert.ok(draft.notes.some(note => /22:35.*超過.*21:50/.test(note)));
  assert.equal(JSON.stringify(state.plan), before);
  const slots = draft.rows.map(row => row[0].split('–').map(time => {
    const [h, m] = time.split(':').map(Number); return h * 60 + m;
  }));
  slots.forEach(([start, end], i) => { assert.ok(end >= start); if (i) assert.ok(start >= slots[i - 1][1]); });
});

test('D4 rental route visits the new pickup store before Moiwa and warns when optional detours miss closing', () => {
  const { r, state } = setup();
  const before = JSON.stringify(state.plan);
  const direct = ['noboribetsu-valley', 'noboribetsu-onsen-ichiba', 'sotorent-teine-pickup', 'moiwa-yama'];
  state.plan[4] = direct;
  assert.equal(r.isDailyTimingDraftApplicable(4), true);
  const draft = r.getDailyTimingDraft(4);
  const pickup = draft.rows.findIndex(row => row[3]?.includes('sotorent-teine-pickup'));
  assert.ok(draft.rows.some(row => row[3]?.includes('noboribetsu-onsen-ichiba')), 'a selected market lunch must keep its own timing row');
  const night = draft.rows.findIndex(row => row[3]?.includes('moiwa-yama'));
  assert.ok(pickup >= 0 && pickup < night);
  assert.ok(draft.requiredIds.includes('sotorent-teine-pickup'));
  assert.ok(draft.driveReview.normal.legIds.includes('directRental'));
  assert.ok(draft.driveReview.normal.legIds.includes('rentalMoiwa'));
  assert.ok(!draft.driveReview.normal.legIds.includes('directMoiwa'));
  assert.equal(draft.driveReview.conservative.rentalExceedsWindow, false);
  assert.equal(draft.driveReview.conservative.exceedsOperatingWindow, false);
  const html = r.dayFourDriveReviewHtml(draft);
  assert.match(html, /兩點都略過：約 18:25/);
  assert.match(html, /四種走法皆包含手稻取件/);
  state.plan[4] = [...direct, 'muroran-hakucho-bridge-view', 'happiness-bell'];
  assert.equal(r.getDailyTimingDraft(4).driveReview.normal.moiwaArrival, draft.driveReview.normal.moiwaArrival);
  const full = r.calculateDayFourScenario([...direct, 'muroran-hakucho-bridge-view', 'happiness-bell'], 2);
  assert.equal(full.rentalExceedsWindow, true);
  assert.equal(full.exceedsOperatingWindow, true);
  state.plan[4] = direct.filter(id => id !== 'sotorent-teine-pickup').concat('sotorent-teine-pickup');
  assert.equal(r.isDailyTimingDraftApplicable(4), false, 'pickup after the night view must invalidate the schedule');
  state.plan = JSON.parse(before);
});

test('D8 station lunch and tower-side dinner support the hotel-first luggage stop', () => {
  const { r, state } = setup();
  state.plan[8] = ['lagent-hakodate-ekimae', 'lucky-pierrot-hakodate-station', 'goryokaku', 'goryokaku-tower', 'hakodate-shunka-sushi'];
  const before = JSON.stringify(state.plan);
  assert.equal(r.isDailyTimingDraftApplicable(8), true);
  assert.equal(r.getTimingDraftForStop(8, 'hakodate-shunka-sushi').time, '17:35–19:05');
  state.plan[8] = state.plan[8].filter(id => id !== 'goryokaku');
  assert.equal(r.isDailyTimingDraftApplicable(8), true);
  assert.equal(r.getTimingDraftForStop(8, 'lagent-hakodate-ekimae').time, '10:45 寄行李／20:05 入住');
  state.plan[8] = JSON.parse(before)[8];
  [state.plan[8][3], state.plan[8][4]] = [state.plan[8][4], state.plan[8][3]];
  assert.equal(r.isDailyTimingDraftApplicable(8), false, 'dinner before the tower needs a new estimate');
});
