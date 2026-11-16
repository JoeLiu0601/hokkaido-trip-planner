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
    + '\n({buildPlan,completeScheduleHtml,getDailyTimingDraft,getTimingDraftForStop,getGroupRouteForDay})', {
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

test('weather swap replaces stale D4 and D6 tables, then restores originals when reversed', () => {
  const {state,api}=setup();
  state.plan[4].splice(state.plan[4].indexOf('moiwa-yama'),0,'sotorent-teine-pickup');
  state.plan[6].push('sapporo-fushimi-inari');
  const original4=api.completeScheduleHtml(4), original6=api.completeScheduleHtml(6);
  state.plan[4]=state.plan[4].map(id=>id==='moiwa-yama'?'sapporo-fushimi-inari':id);
  state.plan[6]=state.plan[6].map(id=>id==='sapporo-fushimi-inari'?'moiwa-yama':id);
  const snapshot=JSON.stringify(state.plan);
  for(const day of [4,6]) {
    const html=api.completeScheduleHtml(day);
    assert.match(html,/天候調整/);
    assert.doesNotMatch(html,/待重新估時/);
    assert.equal(api.getDailyTimingDraft(day).weatherAdjusted,true);
    assert.ok(api.getTimingDraftForStop(day,day===4?'sapporo-fushimi-inari':'moiwa-yama'));
    const rows=api.getDailyTimingDraft(day).rows;
    let end=0;
    for(const row of rows) {
      const range=row[0].match(/^(\d\d):(\d\d)–(\d\d):(\d\d)$/);
      assert.ok(range,row[0]);
      const start=Number(range[1])*60+Number(range[2]), finish=Number(range[3])*60+Number(range[4]);
      assert.ok(start>=end && finish>start,`D${day} rows must not overlap or reverse`);
      end=finish;
    }
  }
  assert.match(api.completeScheduleHtml(4),/SOTORENT 手稻站前店取滑雪用具/);
  assert.doesNotMatch(api.completeScheduleHtml(4),/<b>moiwa-yama<\/b>/);
  assert.match(api.completeScheduleHtml(6),/市電.*免費接駁/);
  assert.doesNotMatch(api.completeScheduleHtml(6),/伏見稻荷神社夜間參拜/);
  assert.match(api.completeScheduleHtml(6),/17:00–18:00/);
  assert.match(api.completeScheduleHtml(6),/21:30–22:30/);
  assert.doesNotMatch(api.completeScheduleHtml(4),/藻岩山夜景、纜車上下山|四種走法比較/);
  assert.match(api.completeScheduleHtml(4),/開車回APA、停車/);
  state.plan[6].reverse();
  assert.equal(api.getTimingDraftForStop(6,'moiwa-yama'),null,'reordering must hide the newly estimated clock times too');
  state.plan[6].reverse();
  assert.doesNotMatch(api.completeScheduleHtml(5,{group:'B'}),/夜景已排 D4/);
  assert.match(api.completeScheduleHtml(6,{group:'B'}),/8-27/);
  assert.equal(JSON.stringify(state.plan),snapshot,'reading routes must not edit shared data');
  state.plan[4]=state.plan[4].map(id=>id==='sapporo-fushimi-inari'?'moiwa-yama':id);
  state.plan[6]=state.plan[6].map(id=>id==='moiwa-yama'?'sapporo-fushimi-inari':id);
  assert.equal(api.completeScheduleHtml(4),original4);
  assert.equal(api.completeScheduleHtml(6),original6);
});
