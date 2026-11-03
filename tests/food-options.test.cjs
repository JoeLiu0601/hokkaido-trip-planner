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
  const state = { selectedDay: 2, plan: {}, mealPlan: { 2: { lunch: { note: '保留的餐食資料' } } } };
  let edits = 0;
  const runtime = vm.runInNewContext(timing + '\n' + source.slice(0, source.indexOf('const state ='))
    + section('const dayOptionalSpots =', 'function renderDayTabs()')
    + section('function getDailyTimingDraft(', 'function getTimingDraftForStop(')
    + section('function spotById(', 'function getSpotLogistics(')
    + '\n({ buildPlan, getDayTwoLunchInsertionIndex, getDayTwoDinnerInsertionIndex, bindDayOptionButtons, dayOptionalSpots, isDailyTimingDraftApplicable })',
  { window: {}, state, markDirty() { edits++; }, render() {}, recordChange() {} });
  state.plan = runtime.buildPlan();
  function choose(id) {
    let click;
    const button = { dataset: { dayOption: id }, addEventListener(event, callback) { click = callback; } };
    runtime.bindDayOptionButtons({ querySelectorAll: () => [button] }, 2, runtime.dayOptionalSpots[2]);
    click();
  }
  return { state, runtime, choose, edits: () => edits };
}

test('D2 candidates follow Hinode, fall back before lunch/terrace and stay out of Plan B', () => {
  const c = setup(), f = c.runtime.getDayTwoLunchInsertionIndex;
  assert.equal(f(c.state.plan[2]), c.state.plan[2].indexOf('hinode-park') + 1);
  assert.equal(f(['kamifurano-mansaku', 'ningle-terrace']), 0);
  assert.equal(f(['biei-shrine', 'ningle-terrace']), 1);
  assert.equal(f(['shiroi-koibito-park', 'sapporo-susukino']), -1);
  c.state.selectedDay = 3;
  assert.equal(f(['hinode-park']), -1);
});

test('choosing then changing lunch keeps one restaurant after Hinode and preserves stored meals', () => {
  const c = setup(), meals = JSON.stringify(c.state.mealPlan), d6 = JSON.stringify(c.state.plan[6]);
  c.choose('kamifurano-marumasu');
  assert.equal(c.state.plan[2][c.state.plan[2].indexOf('hinode-park') + 1], 'kamifurano-marumasu');
  c.choose('kamifurano-mansaku');
  assert.ok(!c.state.plan[2].includes('kamifurano-marumasu'));
  assert.equal(c.state.plan[2][c.state.plan[2].indexOf('hinode-park') + 1], 'kamifurano-mansaku');
  assert.equal(c.state.plan[2].filter(id => id === 'kamifurano-mansaku').length, 1);
  c.choose('kamifurano-mansaku');
  assert.equal(c.edits(), 2);
  assert.equal(JSON.stringify(c.state.mealPlan), meals);
  assert.equal(JSON.stringify(c.state.plan[6]), d6);
});

test('D2 choice refuses an unrelated day, unknown ID or stale hidden-day click', () => {
  const c = setup();
  c.state.plan[6].push('kamifurano-mansaku');
  const before = JSON.stringify(c.state.plan);
  c.choose('kamifurano-mansaku');
  c.choose('not-a-restaurant');
  c.state.selectedDay = 3;
  c.choose('kamifurano-marumasu');
  assert.equal(JSON.stringify(c.state.plan), before);
  assert.equal(c.edits(), 0);
});

test('D2 dinner changes independently after the terrace, retaining the chosen lunch', () => {
  const c = setup();
  assert.equal(c.runtime.getDayTwoDinnerInsertionIndex(c.state.plan[2]), c.state.plan[2].indexOf('ningle-terrace') + 1);
  assert.equal(c.runtime.getDayTwoDinnerInsertionIndex(['sunagawa-highway-oasis', 'apa-sapporo-susukino-ekinishi', 'sapporo-susukino']), -1);
  c.choose('kamifurano-mansaku');
  c.choose('furano-kumagera');
  c.choose('furano-yuiga-doxon');
  assert.ok(c.state.plan[2].includes('kamifurano-mansaku'));
  assert.ok(!c.state.plan[2].includes('furano-kumagera'));
  assert.equal(c.state.plan[2][c.state.plan[2].indexOf('ningle-terrace') + 1], 'furano-yuiga-doxon');
  assert.equal(c.runtime.getDayTwoDinnerInsertionIndex(c.state.plan[2]), c.state.plan[2].indexOf('furano-yuiga-doxon'));
});

test('D2 timing accepts one lunch and dinner but rejects two meals in either slot', () => {
  const c = setup();
  c.choose('kamifurano-mansaku');
  c.choose('furano-kumagera');
  assert.equal(c.runtime.isDailyTimingDraftApplicable(2), true);
  c.state.plan[2].splice(c.state.plan[2].indexOf('kamifurano-mansaku'), 0, 'kamifurano-marumasu');
  assert.equal(c.runtime.isDailyTimingDraftApplicable(2), false);
  c.choose('kamifurano-mansaku');
  assert.equal(c.runtime.isDailyTimingDraftApplicable(2), true);
  c.state.plan[2].splice(c.state.plan[2].indexOf('furano-kumagera'), 0, 'furano-yuiga-doxon');
  assert.equal(c.runtime.isDailyTimingDraftApplicable(2), false);
  c.choose('furano-kumagera');
  assert.equal(c.runtime.isDailyTimingDraftApplicable(2), true);
});
