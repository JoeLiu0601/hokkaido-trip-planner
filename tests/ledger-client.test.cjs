const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const L = require('../ledger-core.js');
const key = 'hokkaido-ledger-preview-v1';
const source = fs.readFileSync(path.join(__dirname, '..', 'ledger.js'), 'utf8');

// Run the actual client handlers with a small DOM adapter. These tests exercise
// persistence and events, not browser rendering or native file selection.
function storage(initial = null) {
  const values = new Map(initial === null ? [] : [[key, initial]]);
  return {
    failWrite: false,
    getItem: id => values.get(id) ?? null,
    setItem(id, value) { if (this.failWrite) throw Error('quota'); values.set(id, value); },
    removeItem: id => values.delete(id), clear: () => values.clear()
  };
}
function client(store, href = 'https://example.test/ledger.html') {
  const elements = new Map(), windowEvents = new Map();
  let url = new URL(href);
  const element = id => {
    if (!elements.has(id)) elements.set(id, {
      hidden: true, open: false, value: '', innerHTML: '', textContent: '', dataset: {}, events: new Map(),
      setAttribute() {}, querySelectorAll: () => [],
      addEventListener(name, handler) { this.events.set(name, handler); },
      fire(name, event = {}) { return this.events.get(name)?.(event); },
      showModal() { this.open = true; }, close() { this.open = false; }
    });
    return elements.get(id);
  };
  const location = { get href() { return url.href; }, get search() { return url.search; } };
  const window = {
    TripLedger: L,
    history: { replaceState(a, b, value) { url = new URL(value, url); } },
    addEventListener(name, handler) { windowEvents.set(name, handler); }
  };
  const document = { getElementById: element, querySelectorAll: () => [], body: { dataset: {} } };
  const instrumented = source.replace(/\}\)\(\);\s*$/, 'window.__test = { commit, getState: () => ({ book, blocked, lastStored, demo }) }; })();');
  vm.runInNewContext(instrumented, { window, document, localStorage: store, location, URL, URLSearchParams, Intl, console });
  return { ...window.__test, element, location, event: (name, value) => windowEvents.get(name)?.(value) };
}
function bill(id = 'one', amount = 1200) {
  const b = L.empty();
  b.entries.push(L.expense({ id, title: '測試晚餐', date: '2026-12-24', currency: 'JPY', amount, payer: 'p1', participants: b.members.map(m => m.id) }, b.members));
  return b;
}
const json = value => JSON.stringify(value);

test('a failed storage write preserves the last book and persisted data', () => {
  const original = bill(), store = storage(json(original)), c = client(store);
  const before = c.getState().book;
  store.failWrite = true;
  assert.throws(() => c.commit(bill('new', 2400), 'new'), /儲存失敗/);
  assert.equal(c.getState().book, before);
  assert.equal(store.getItem(key), json(original));
  assert.equal(c.element('undo-bar').hidden, true);
});

test('a stale tab cannot overwrite a newer book even while a form is open', () => {
  const store = storage(json(bill())), a = client(store), b = client(store);
  b.element('entry-dialog').open = true;
  a.commit(bill('new', 2400), 'new');
  b.event('storage', { key });
  assert.equal(b.getState().book.entries[0].id, 'one');
  assert.match(b.element('page-message').textContent, /另一分頁已更新/);
  assert.throws(() => b.commit(bill('stale'), 'stale'), /另一個分頁已更新/);
  assert.equal(JSON.parse(store.getItem(key)).entries[0].id, 'new');
});

test('clearing storage in another tab reloads the displayed book', () => {
  const store = storage(json(bill())), c = client(store);
  store.clear(); c.event('storage', { key: null });
  assert.equal(c.getState().book.entries.length, 0);
  assert.equal(c.getState().lastStored, null);
});

test('corrupt persisted data remains untouched until a validated repair is confirmed', () => {
  const raw = '{broken', store = storage(raw), c = client(store);
  assert.equal(c.getState().blocked, true);
  assert.throws(() => c.commit(bill(), 'new'), /目前帳本無法讀取/);
  assert.equal(store.getItem(key), raw);
});

test('import previews a validated book before replacing it and undo restores the original', async () => {
  const original = bill(), imported = bill('imported', 3456), store = storage(json(original)), c = client(store);
  await c.element('import-ledger').fire('change', { target: { files: [{ size: 1000, text: async () => json(imported) }] } });
  assert.equal(c.element('import-dialog').open, true);
  assert.equal(store.getItem(key), json(original));
  c.element('confirm-import').fire('click');
  assert.equal(JSON.parse(store.getItem(key)).entries[0].id, 'imported');
  assert.equal(c.element('import-dialog').open, false);
  c.element('undo').fire('click');
  assert.equal(store.getItem(key), json(original));
  assert.equal(c.getState().book.entries[0].id, 'one');
});

test('wrong backup types and oversized files cannot replace the existing book', async () => {
  const original = json(bill()), store = storage(original), c = client(store);
  for (const file of [{ size: 20, text: async () => '{"plan":{}}' }, { size: 8, text: async () => '{broken' }, { size: 2000001, text: async () => json(bill('large')) }]) {
    await c.element('import-ledger').fire('change', { target: { files: [file] } });
    assert.equal(c.element('import-dialog').open, false);
    assert.equal(store.getItem(key), original);
    assert.match(c.element('page-message').textContent, /無法匯入/);
    assert.doesNotMatch(c.element('page-message').textContent, /Unexpected|SyntaxError/);
  }
});

test('backup text is escaped before it reaches expense cards or name inputs', () => {
  const b = bill(); b.members[0].name = '<img src=x>'; b.entries[0].title = '<svg onload="x">';
  const c = client(storage(json(b)));
  assert.doesNotMatch(c.element('entry-list').innerHTML, /<svg|<img/);
  assert.match(c.element('entry-list').innerHTML, /&lt;svg/);
  assert.match(c.element('member-fields').innerHTML, /&lt;img/);
});

test('a confirmed repair can be undone without losing the original corrupt backup', async () => {
  const raw = '{broken', store = storage(raw), c = client(store);
  await c.element('import-ledger').fire('change', { target: { files: [{ size: 1000, text: async () => json(bill()) }] } });
  c.element('confirm-import').fire('click');
  assert.equal(c.getState().blocked, false);
  assert.equal(JSON.parse(store.getItem(key)).entries.length, 1);
  c.element('undo').fire('click');
  assert.equal(store.getItem(key), raw);
  assert.equal(c.getState().blocked, true);
});

test('demo edits do not persist and leaving removes only the demo query parameter', () => {
  const original = json(bill()), store = storage(original);
  const c = client(store, 'https://example.test/trip/ledger.html?demo=1&from=trip#top');
  assert.equal(c.getState().demo, true);
  c.commit(bill('demo-edit'), 'sample');
  assert.equal(store.getItem(key), original);
  c.element('leave-demo').fire('click');
  assert.equal(c.getState().demo, false);
  assert.equal(c.getState().book.entries[0].id, 'one');
  assert.equal(c.location.href, 'https://example.test/trip/ledger.html?from=trip#top');
  const refreshed = client(store, c.location.href);
  assert.equal(refreshed.getState().demo, false);
  assert.equal(refreshed.getState().book.entries[0].id, 'one');
});
