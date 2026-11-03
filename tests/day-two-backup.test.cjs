const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.join(__dirname, '..');
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const timing = fs.readFileSync(path.join(root, 'timing-drafts.js'), 'utf8');
const section = (a, b) => app.slice(app.indexOf(a), app.indexOf(b));
const plain = value => JSON.parse(JSON.stringify(value));

function setup() {
  const state = { selectedDay: 2, alternativePreview: 'B', syncCode: 'test' };
  const storage = new Map(), messages = [];
  let apply;
  const panel = { hidden: false, innerHTML: '', querySelectorAll: () => [],
    querySelector: () => ({ addEventListener: (event, callback) => { apply = callback; } }) };
  const r = vm.runInNewContext(timing + '\n' + app.slice(0, app.indexOf('const state ='))
    + section('function spotById(', 'function getSpotLogistics(')
    + section('function getDailyTimingDraft(', 'function getTimingDraftForStop(')
    + section('function dayTwoOriginalKey(', 'const dayOptionalSpots =')
    + '\n({buildPlan,dayTwoBackup,dayTwoBackupTimingDraft,getDailyTimingDraft,isDailyTimingDraftApplicable,renderDayAlternative})',
    { state, window: { localStorage: { getItem: key => storage.get(key) ?? null, setItem: (key, value) => storage.set(key, value) } },
      document: { getElementById: id => id === 'day-alternative' ? panel : {} },
      escapeHtml: value => String(value), setUiMessage: message => messages.push(message),
      markDirty() {}, render() {}, recordChange() {} });
  state.plan = r.buildPlan();
  return { r, state, panel, messages, apply: () => apply() };
}

test('applying and restoring D2 Plan B preserves the D5 park and the original custom itinerary', () => {
  const { r, state, panel, messages, apply } = setup();
  state.plan[2].splice(2, 0, 'kamifurano-mansaku');
  const before = plain(state.plan);
  r.renderDayAlternative();
  assert.doesNotMatch(panel.innerHTML, /白色戀人/);
  apply();
  assert.deepEqual(plain(state.plan[2]), plain(r.dayTwoBackup));
  assert.ok(!state.plan[2].includes('shiroi-koibito-park'));
  assert.ok(state.plan[5].includes('shiroi-koibito-park'));
  for (let day = 1; day <= 10; day++) if (day !== 2) assert.deepEqual(plain(state.plan[day]), before[day]);
  assert.deepEqual(messages, []);
  state.alternativePreview = 'A';
  r.renderDayAlternative();
  apply();
  assert.deepEqual(plain(state.plan), before);
});

test('D2 backup timing works without the park and with the church skipped', () => {
  const { r, state } = setup();
  state.plan[2] = Array.from(r.dayTwoBackup);
  assert.equal(r.getDailyTimingDraft(2), r.dayTwoBackupTimingDraft);
  assert.equal(r.isDailyTimingDraftApplicable(2), true);
  assert.doesNotMatch(JSON.stringify(r.dayTwoBackupTimingDraft), /白色戀人|shiroi-koibito-park/);
  state.plan[2] = state.plan[2].filter(id => id !== 'miyanomori-frances-church');
  assert.equal(r.isDailyTimingDraftApplicable(2), true);
});
