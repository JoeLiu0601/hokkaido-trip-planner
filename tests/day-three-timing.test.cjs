const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const app = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
const timing = fs.readFileSync(path.join(__dirname, '..', 'timing-drafts.js'), 'utf8');
const current = ['hokkaido-shrine', 'teine-shrine', 'wakadori-naruto-honten', 'otaru-inari-shrine', 'taisho-glass', 'otaru-meruhen-crossing', 'otaru-gunjo-sui', 'otaru-tenguyama', 'otaru-canal', 'sandria-honten'];
function setup() {
  const state = {plan: {3: [...current], 4: ['moiwa-yama'], 6: ['sapporo-fushimi-inari']}};
  const code = timing + '\n' + app.slice(0, app.indexOf('const state ='))
    + app.slice(app.indexOf('function getDailyTimingDraft('), app.indexOf('function timingDraftHtml('))
    + '\n({getDailyTimingDraft,isDailyTimingDraftApplicable,getTimingDraftForStop})';
  const api = vm.runInNewContext(code, {state, window: {}});
  return {state, api};
}

test('current D3 receives sequential estimates through breakfast shopping without changing the plan', () => {
  const {state, api} = setup(), before = JSON.stringify(state.plan);
  assert.equal(api.isDailyTimingDraftApplicable(3), true);
  assert.equal(api.getTimingDraftForStop(3, 'hokkaido-shrine').time, '08:45–09:35');
  assert.equal(api.getTimingDraftForStop(3, 'otaru-gunjo-sui').time, '15:30–16:30');
  assert.equal(api.getTimingDraftForStop(3, 'otaru-tenguyama').time, '17:05–18:35');
  assert.equal(api.getTimingDraftForStop(3, 'sandria-honten').time, '22:20–22:45');
  const draft = api.getDailyTimingDraft(3);
  assert.ok(!draft.rows.some(row => row[3]?.includes('sapporo-fushimi-inari')));
  assert.ok(!draft.rows.some(row => row[3]?.includes('letao-otaru-honten')));
  let previous = 0;
  for (const row of draft.rows) {
    const [start, end] = row[0].split('–').map(time => time.split(':').map(Number)).map(([h,m]) => h*60+m);
    assert.ok(start >= previous && end >= start);
    previous = end;
  }
  assert.equal(JSON.stringify(state.plan), before);
});

test('current D3 supports one lunch alternative and an existing LeTAO stop, rejects stale ordering', () => {
  const {state, api} = setup();
  state.plan[3][2] = 'otaru-takeda';
  assert.equal(api.isDailyTimingDraftApplicable(3), true);
  assert.equal(api.getTimingDraftForStop(3, 'otaru-takeda').time, '11:25–12:25');
  state.plan[3].splice(5, 0, 'letao-otaru-honten');
  assert.equal(api.isDailyTimingDraftApplicable(3), true);
  assert.equal(api.getTimingDraftForStop(3, 'letao-otaru-honten').time, '14:15–14:45');
  state.plan[3].splice(3, 0, 'wakadori-naruto-honten');
  assert.equal(api.isDailyTimingDraftApplicable(3), false);
  state.plan[3] = [...current];
  [state.plan[3][6], state.plan[3][7]] = [state.plan[3][7], state.plan[3][6]];
  assert.equal(api.isDailyTimingDraftApplicable(3), false);
  assert.equal(api.getTimingDraftForStop(3, 'otaru-gunjo-sui'), null);
});
