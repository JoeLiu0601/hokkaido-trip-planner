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
    + section('function getDailyTimingDraft(', 'function getTimingDraftForStop(')
    + '\n({buildPlan,dayFourDriveLegs,dayFourDriveMinutes,calculateDayFourScenario,buildDayFourTimingDraft,getDailyTimingDraft,isDailyTimingDraftApplicable})',
  { window: {}, state });
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
