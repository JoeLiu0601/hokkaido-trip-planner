const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
const code = source.slice(source.indexOf('function dayWeatherSwapMode('), source.indexOf('function renderDayOptions()'));
function setup() {
  const state = { selectedDay: 4, plan: { 3: ['hokkaido-shrine'], 4: ['noboribetsu-onsen-ichiba', 'sotorent-teine-pickup', 'moiwa-yama'], 6: ['ramen-haruka', 'sapporo-fushimi-inari'] } };
  let changes = 0;
  const api = vm.runInNewContext(code + '\n({dayWeatherSwapMode,dayWeatherSwapHtml,applyDayWeatherSwap})', { state, markDirty(){changes++;}, render(){}, recordChange(){} });
  return {state, api, changes:()=>changes};
}
test('weather swap preserves pickup and all unrelated ordering and reverses exactly', () => {
  const c=setup(), before=JSON.stringify(c.state.plan);
  assert.equal(c.api.applyDayWeatherSwap('normal'),true);
  assert.deepEqual(Array.from(c.state.plan[4]),['noboribetsu-onsen-ichiba','sotorent-teine-pickup','sapporo-fushimi-inari']);
  assert.deepEqual(Array.from(c.state.plan[6]),['ramen-haruka','moiwa-yama']);
  assert.equal(c.api.applyDayWeatherSwap('normal'),false,'ignore a stale button');
  c.state.selectedDay=6;
  assert.equal(c.api.applyDayWeatherSwap('swapped'),true);
  assert.equal(JSON.stringify(c.state.plan),before);
  assert.equal(c.changes(),2);
});
test('weather swap refuses duplicate, other-day and stale selected-day configurations', () => {
  const c=setup();
  c.state.plan[3].push('sapporo-fushimi-inari');
  assert.equal(c.api.applyDayWeatherSwap('normal'),false);
  c.state.plan[3].pop(); c.state.selectedDay=3;
  assert.equal(c.api.applyDayWeatherSwap('normal'),false);
  assert.equal(c.api.dayWeatherSwapHtml(),'');
  assert.equal(c.changes(),0);
});
