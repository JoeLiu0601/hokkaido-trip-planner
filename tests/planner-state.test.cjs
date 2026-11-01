const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const unrelatedBook = () => ({ version: 1, members: ['p1', 'p2', 'p3', 'p4'].map(id => ({ id, name: id })), entries: [] });
const source = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
const section = (a, b) => source.slice(source.indexOf(a), source.indexOf(b));
const plain = value => JSON.parse(JSON.stringify(value));

function setup() {
  const values = new Map(), calls = [], messages = [], warnings = [];
  const store = {
    failKey: '',
    getItem: id => values.get(id) ?? null,
    setItem(id, value) { calls.push(id); if (id === this.failKey) throw Error('quota'); values.set(id, value); },
    removeItem: id => values.delete(id)
  };
  const state = { plan: {}, mealPlan: {}, syncCode: 'test', cloudPending: true, dirty: true, lastSavedAt: '', editRevision: 0 };
  let renders = 0;
  const context = {
    window: { localStorage: store }, state, cloud: { baseCode: 'test', activeCode: 'test', basePlan: null, version: 0 },
    console: { warn: (...args) => warnings.push(args) },
    dismissUndo() {}, recordChange() {},
    markDirty() { state.editRevision++; state.dirty = true; },
    render() { renders++; }, updateSaveUi() {}, setUiMessage: message => messages.push(message)
  };
  const runtime = vm.runInNewContext(
    source.slice(0, source.indexOf('const state ='))
    + section('function typeIncludes(', 'function matchesSpotCategory(')
    + section('function spotById(', 'function getSpotLogistics(')
    + section('function normalizeImportedPlan(', 'function exportPlanAsJson(')
    + section('async function importPlanFromFile(', 'function spotById(')
    + section('function cloneJson(', 'function describeConflictValue(')
    + section('function applyRemotePayload(', 'function applyDeferredRemotePayload(')
    + '\n({ buildPlan, buildMealPlan, normalizeMealPlan, loadPlan, loadMealPlan, loadCloudPending, savePlan, normalizePlanBackup, importPlanFromFile, mergeCloudPlans, applyRemotePayload, localSnapshotKey, storageKey, mealPlanKey, planTemplateVersionKey, currentPlanTemplateVersion })', context
  );
  state.plan = runtime.buildPlan(); state.mealPlan = runtime.buildMealPlan();
  return { runtime, state, store, values, calls, messages, warnings, renders: () => renders };
}

test('snapshot quota failure preserves the previous complete plan and dirty status', () => {
  const c = setup(), r = c.runtime;
  assert.equal(r.savePlan('2026-10-30T01:00:00Z'), true);
  const old = c.store.getItem(r.localSnapshotKey);
  c.state.plan[1] = []; c.state.dirty = true;
  c.calls.length = 0; c.store.failKey = r.localSnapshotKey;
  assert.equal(r.savePlan('2026-10-30T02:00:00Z'), false);
  assert.equal(c.state.dirty, true);
  assert.equal(c.state.lastSavedAt, '2026-10-30T01:00:00Z');
  assert.equal(c.store.getItem(r.localSnapshotKey), old);
  assert.deepEqual(c.calls, [r.localSnapshotKey]);
  assert.equal(c.warnings.length, 1);
});

test('a failed legacy-key write does not invalidate the saved complete snapshot', () => {
  const c = setup(), r = c.runtime;
  r.savePlan('2026-10-30T01:00:00Z');
  c.state.plan[1] = []; c.state.dirty = true; c.store.failKey = r.storageKey;
  assert.equal(r.savePlan('2026-10-30T02:00:00Z'), true);
  assert.equal(c.state.dirty, false);
  assert.deepEqual(plain(r.loadPlan()[1]), []);
  assert.equal(r.loadCloudPending(), true);
  assert.notEqual(c.store.getItem(r.storageKey), JSON.stringify(c.state.plan));
});

test('current snapshots retain custom order and deliberately removed hotel or park stops', () => {
  const c = setup(), r = c.runtime;
  c.state.plan[2] = c.state.plan[2].filter(id => id !== 'apa-sapporo-susukino-ekinishi');
  c.state.plan[3].reverse();
  c.state.plan[5] = c.state.plan[5].filter(id => id !== 'nakajima-park');
  r.savePlan();
  assert.deepEqual(plain(r.loadPlan()), plain(c.state.plan));
});

test('invalid snapshot JSON falls back to valid legacy plan and meals without writing', () => {
  const c = setup(), r = c.runtime;
  c.values.set(r.localSnapshotKey, '{broken');
  c.values.set(r.planTemplateVersionKey, r.currentPlanTemplateVersion);
  c.values.set(r.storageKey, JSON.stringify(c.state.plan));
  c.values.set(r.mealPlanKey, JSON.stringify(c.state.mealPlan));
  assert.deepEqual(plain(r.loadPlan()), plain(c.state.plan));
  assert.deepEqual(plain(r.loadMealPlan()), plain(c.state.mealPlan));
  assert.equal(c.calls.length, 0);
});

test('meal normalization rejects invalid times, non-food places and invalid booking states', () => {
  const c = setup();
  const meals = c.runtime.normalizeMealPlan({ 2: { lunch: { primaryId: 'hakodate-mt', backupId: 'unagi-nakajima', time: '25:61', booking: 'bad', priority: 'bad', note: '  午餐備註  ' } } });
  assert.deepEqual(plain(meals[2].lunch), { primaryId: '', backupId: 'unagi-nakajima', time: '12:00', priority: 'flexible', booking: 'check', note: '午餐備註' });
});

test('current and legacy itinerary backups preserve all ten days and meal notes', () => {
  const c = setup(), r = c.runtime;
  c.state.mealPlan[2].lunch.note = '朋友討論後確認';
  const current = r.normalizePlanBackup({ version: 2, plan: c.state.plan, mealPlan: c.state.mealPlan });
  const legacy = r.normalizePlanBackup({ ...c.state.plan, _meals: c.state.mealPlan });
  const legacyWrapped = r.normalizePlanBackup({ plan: c.state.plan, _meals: c.state.mealPlan });
  for (const result of [current, legacy, legacyWrapped]) {
    assert.deepEqual(plain(result.plan), plain(c.state.plan));
    assert.equal(result.mealPlan[2].lunch.note, '朋友討論後確認');
  }
});

test('unrelated JSON, ledger backups and unsupported versions cannot become an empty itinerary', () => {
  const c = setup(), r = c.runtime;
  for (const payload of [null, 1, 'hello', {}, [], unrelatedBook(), { plan: { 1: 'wrong' } }, { plan: { 1: [1] } }, { version: 99, plan: c.state.plan }]) {
    assert.throws(() => r.normalizePlanBackup(payload));
  }
});

test('invalid file content leaves the current plan, meals and revision untouched', async () => {
  const c = setup(), beforePlan = c.state.plan, beforeMeals = c.state.mealPlan;
  for (const content of ['{broken', JSON.stringify(unrelatedBook())]) {
    await c.runtime.importPlanFromFile({ size: 100, text: async () => content });
    assert.equal(c.state.plan, beforePlan); assert.equal(c.state.mealPlan, beforeMeals);
    assert.equal(c.state.editRevision, 0); assert.equal(c.renders(), 0);
  }
  assert.equal(c.messages.length, 2);
});

test('an oversized backup is rejected before the file contents are read', async () => {
  const c = setup(); let read = false;
  await c.runtime.importPlanFromFile({ size: 2000001, text: async () => { read = true; return '{}'; } });
  assert.equal(read, false); assert.match(c.messages[0], /2 MB/);
});

test('local edits made during file reading cannot be overwritten by the import', async () => {
  const c = setup(), original = c.state.plan;
  let finishRead;
  const pending = c.runtime.importPlanFromFile({ size: 100, text: () => new Promise(resolve => { finishRead = resolve; }) });
  c.state.plan[3].reverse(); c.state.editRevision++;
  finishRead(JSON.stringify({ version: 2, plan: c.runtime.buildPlan() })); await pending;
  assert.equal(c.state.plan, original); assert.equal(c.state.editRevision, 1);
  assert.equal(c.renders(), 0); assert.match(c.messages[0], /行程已有更新/);
});

test('a remote plan replacement during file reading is also preserved', async () => {
  const c = setup(); let finishRead;
  const pending = c.runtime.importPlanFromFile({ size: 100, text: () => new Promise(resolve => { finishRead = resolve; }) });
  c.state.plan = c.runtime.buildPlan(); c.state.plan[1] = [];
  const remote = c.state.plan;
  finishRead(JSON.stringify({ version: 2, plan: c.runtime.buildPlan() })); await pending;
  assert.equal(c.state.plan, remote); assert.equal(c.renders(), 0);
  assert.match(c.messages[0], /行程已有更新/);
});

function mergeFixture(c) {
  const base = Object.fromEntries(Array.from({ length: 10 }, (_, i) => [i + 1, []]));
  base[1] = ['new-chitose-airport', 'premier-cabin-asahikawa', 'aeon-mall-asahikawa-ekimae'];
  base._meals = c.runtime.buildMealPlan();
  return { base, local: plain(base), remote: plain(base) };
}

test('one unchanged side preserves the other side and never mutates merge inputs', () => {
  const c = setup(), f = mergeFixture(c);
  f.remote[1].reverse();
  const original = JSON.stringify(f);
  const first = c.runtime.mergeCloudPlans(f.base, f.local, f.remote);
  assert.equal(first.conflicts.length, 0); assert.deepEqual(plain(first.plan), f.remote);
  const second = c.runtime.mergeCloudPlans(f.base, f.remote, f.local);
  assert.equal(second.conflicts.length, 0); assert.deepEqual(plain(second.plan), f.remote);
  assert.equal(JSON.stringify(f), original);
});

test('changes on separate days and separate meal fields merge without overwriting', () => {
  const c = setup(), f = mergeFixture(c);
  f.local[1].push('tokiwa-park'); f.remote[2].push('ningle-terrace');
  f.local._meals[2].lunch.note = '本機備註'; f.remote._meals[2].lunch.time = '13:00';
  const result = c.runtime.mergeCloudPlans(f.base, f.local, f.remote);
  assert.equal(result.conflicts.length, 0);
  assert.deepEqual(plain(result.plan[1]), f.local[1]); assert.deepEqual(plain(result.plan[2]), f.remote[2]);
  assert.equal(result.plan._meals[2].lunch.note, '本機備註'); assert.equal(result.plan._meals[2].lunch.time, '13:00');
});

test('moving the same stop to different days requires a valid current conflict choice', () => {
  const c = setup(), f = mergeFixture(c), id = 'premier-cabin-asahikawa';
  f.local[1] = f.local[1].filter(x => x !== id); f.local[2].push(id);
  f.remote[1] = f.remote[1].filter(x => x !== id); f.remote[3].push(id);
  const pending = c.runtime.mergeCloudPlans(f.base, f.local, f.remote);
  const conflict = pending.conflicts.find(x => x.id === `place-${id}`);
  assert.ok(conflict);
  const choices = { [conflict.id]: { side: 'local', signature: JSON.stringify([conflict.local, conflict.remote]) } };
  const resolved = c.runtime.mergeCloudPlans(f.base, f.local, f.remote, choices);
  assert.equal(resolved.conflicts.length, 0); assert.ok(resolved.plan[2].includes(id)); assert.ok(!resolved.plan[3].includes(id));
  f.remote[3] = []; f.remote[4].push(id);
  assert.ok(c.runtime.mergeCloudPlans(f.base, f.local, f.remote, choices).conflicts.some(x => x.id === conflict.id));
});

test('incompatible reorder cycles and remove-versus-reorder require confirmation', () => {
  const c = setup(), f = mergeFixture(c), [a, b, d] = f.base[1];
  f.local[1] = [a, d, b]; f.remote[1] = [b, a, d];
  assert.ok(c.runtime.mergeCloudPlans(f.base, f.local, f.remote).conflicts.some(x => x.kind === 'order'));
  f.local[1] = [a, d];
  assert.ok(c.runtime.mergeCloudPlans(f.base, f.local, f.remote).conflicts.some(x => x.id === `place-${b}`));
});

test('independent meal changes cannot silently create an identical primary and backup', () => {
  const c = setup(), f = mergeFixture(c), slot = f.base._meals[2].dinner;
  slot.primaryId = 'unagi-nakajima'; slot.backupId = 'ramen-haruka';
  f.local = plain(f.base); f.remote = plain(f.base);
  f.local._meals[2].dinner.primaryId = 'ginneko-asahikawa';
  f.remote._meals[2].dinner.backupId = 'ginneko-asahikawa';
  assert.ok(c.runtime.mergeCloudPlans(f.base, f.local, f.remote).conflicts.some(x => x.kind === 'meal-pair'));
});

test('invalid remote timestamps do not crash applying a valid itinerary', () => {
  for (const updatedAt of [NaN, Infinity, 1e20]) {
    const c = setup();
    assert.doesNotThrow(() => c.runtime.applyRemotePayload({ plan: { ...c.state.plan, _meals: c.state.mealPlan }, version: 2, updatedAt }));
    assert.ok(Number.isFinite(Date.parse(c.state.lastSavedAt)));
  }
});
