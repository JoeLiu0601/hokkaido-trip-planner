const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const app = fs.readFileSync('app.js', 'utf8');
const section = (start, end) => app.slice(app.indexOf(start), app.indexOf(end));
function setup() {
  const state = {plan:{}};
  const api = vm.runInNewContext(fs.readFileSync('timing-drafts.js','utf8') + '\n'
    + app.slice(0, app.indexOf('const state ='))
    + section('function isDayOneTimingDraftApplicable(', 'function getAccommodationMapUrl(')
    + section('const dayOptionalSpots =', 'function getDayTwoLunchInsertionIndex(')
    + '\n({buildPlan,completeScheduleHtml})', {
    state, window:{HOKKAIDO_TRAVEL_TOOLS:require('../travel-tools.js')},
    escapeHtml:value=>String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;'),
    spotById:id=>({id,name:id})
  });
  state.plan=api.buildPlan();
  return {state,api};
}

test('complete schedule exposes D6 travel and rest rows without changing shared data', () => {
  const {state,api}=setup();
  state.plan[6].push('sapporo-fushimi-inari');
  const before=JSON.stringify(state.plan), html=api.completeScheduleHtml(6);
  assert.match(html,/19:45–20:30/);
  assert.match(html,/20:30–21:00/);
  assert.match(html,/21:00–21:45/);
  assert.match(html,/計程車回APA/);
  assert.equal(JSON.stringify(state.plan),before);
  state.plan[6].reverse();
  assert.match(api.completeScheduleHtml(6),/目前景點卡的內容或排序與規劃不同/);
});

test('D1 main road travel and optional blue-pond branch remain separate', () => {
  const {state,api}=setup(), html=api.completeScheduleHtml(1);
  assert.match(html,/14:15–17:45/);
  assert.match(html,/彈性支線.*19:45–20:15/);
  assert.match(html,/不能與原本採買、晚餐時段直接相加/);
  state.plan[1].reverse();
  assert.match(api.completeScheduleHtml(1),/原規劃僅供參考/);
});

test('D10 station route shows luggage, food, bus and flight without the Motomachi outing', () => {
  const {state,api}=setup();
  const html=api.completeScheduleHtml(10,{station:true});
  assert.match(html,/D10車站備案/);
  assert.match(html,/09:15–10:00/);
  assert.match(html,/函館站採買、午餐與休息/);
  assert.match(html,/15:30–17:00/);
  assert.doesNotMatch(html,/<b>元町散步<\/b>/);
  assert.match(api.completeScheduleHtml(10,{station:false}),/<b>元町散步<\/b>/);
});

test('B ski route follows the selected route and reflects a D6 weather swap', () => {
  const {state,api}=setup();
  assert.match(api.completeScheduleHtml(6,{group:'B'}),/B線.*滑雪日/);
  assert.doesNotMatch(api.completeScheduleHtml(6,{group:'B'}),/Toriton 迴轉壽司午餐/);
  state.plan[6].push('moiwa-yama');
  assert.match(api.completeScheduleHtml(6,{group:'B'}),/藻岩山目前換到D6/);
  assert.doesNotMatch(api.completeScheduleHtml(6,{group:'B'}),/夜景已排 D4/);
});
