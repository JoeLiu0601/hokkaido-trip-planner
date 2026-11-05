const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const source = fs.readFileSync(path.join(__dirname, '..', 'journey.js'), 'utf8');
const section = (a, b) => source.slice(source.indexOf(a), source.indexOf(b));

test('opening a timeline row leaves the active navigation destination alone; map previews still work', () => {
  let click;
  const previews = [];
  vm.runInNewContext(section('  host.addEventListener("click", (event) => {', '  host.addEventListener("input",'), {
    host: { addEventListener(type, handler) { click = handler; }, querySelector: () => null },
    previewStop: id => previews.push(id)
  });
  function target(from) {
    return { closest: selector => selector === '[data-preview-stop]' ? { dataset: { previewFrom: from, previewStop: 'destination' } } : null };
  }
  let prevented = false;
  click({ target: target('timeline'), preventDefault() { prevented = true; } });
  assert.equal(prevented, false);
  assert.deepEqual(previews, []);
  click({ target: target('map'), preventDefault() { prevented = true; } });
  assert.equal(prevented, true);
  assert.deepEqual(previews, ['destination']);
});

test('More closes when tapping outside, following settings or pressing Escape', () => {
  const handlers = {};
  let focused = false;
  const menu = { open: true, contains: target => target.inside === true, querySelector: () => ({ focus() { focused = true; } }) };
  vm.runInNewContext(section('  const menu = document.getElementById("planner-menu");', '  document.getElementById("day-tabs")?.addEventListener'), {
    document: { getElementById: () => menu, addEventListener: (type, handler) => { handlers[type] = handler; } }
  });
  handlers.click({ target: { inside: true, closest: () => null } });
  assert.equal(menu.open, true);
  handlers.click({ target: { inside: false } });
  assert.equal(menu.open, false);
  menu.open = true;
  handlers.click({ target: { inside: true, closest: () => ({}) } });
  assert.equal(menu.open, false);
  menu.open = true;
  handlers.keydown({ key: 'Escape' });
  assert.equal(menu.open, false);
  assert.equal(focused, true);
});
