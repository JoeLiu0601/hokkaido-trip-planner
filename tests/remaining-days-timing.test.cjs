const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const app = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
const timing = fs.readFileSync(path.join(__dirname, '..', 'timing-drafts.js'), 'utf8');
function setup() {
  const state = {plan: {
    5: ['nakajima-park','unagi-nakajima','daimaru-sapporo','pokemon-center-sapporo','stellar-place','shiroi-koibito-park','tanukikoji-shopping-street'],
    6: ['sapporo-beer-museum','ario-sapporo','toriton-kita8','kinotoya-bake-pole-town','3coins-pole-town','ramen-haruka','sapporo-fushimi-inari'],
    7: ['makkari-village','silo-observatory','toyako-lake','toya-kohan-tei','restaurant-boyotei'],
    9: ['hachimanzaka','kanemori-warehouse','hakodate-mt','hakodate-hachimangu','hakodate-gokoku-shrine']
  }};
  const code = timing + '\n' + app.slice(0, app.indexOf('const state ='))
    + app.slice(app.indexOf('function isDayOneTimingDraftApplicable('), app.indexOf('function timingDraftHtml('))
    + '\n({getDailyTimingDraft,isDayTimingDraftApplicable,getTimingDraftForStop})';
  const api = vm.runInNewContext(code, {state, window: {}});
  return {state, api};
}

test('current D5/6/7/9 plans receive times without changing shared stops or base templates', () => {
  const {state, api} = setup(), before = JSON.stringify(state.plan);
  for (const day of [5,6,7,9]) assert.equal(api.isDayTimingDraftApplicable(day), true, `D${day}`);
  assert.equal(api.getTimingDraftForStop(5,'stellar-place').time, '14:20–14:45');
  assert.equal(api.getTimingDraftForStop(5,'shiroi-koibito-park').time, '16:00–18:00');
  assert.equal(api.getTimingDraftForStop(6,'sapporo-fushimi-inari').time, '20:30–21:00');
  assert.equal(api.getTimingDraftForStop(7,'restaurant-boyotei').time, '17:30–19:00');
  assert.equal(api.getTimingDraftForStop(9,'hakodate-mt').time, '15:30–17:00');
  assert.equal(api.getTimingDraftForStop(9,'hakodate-hachimangu').optional, true);
  assert.match(api.getTimingDraftForStop(9,'hakodate-hachimangu').time, /擇一/);
  assert.equal(JSON.stringify(state.plan), before);
  for (const day of [5,6,7]) {
    let previous = 0;
    for (const row of api.getDailyTimingDraft(day).rows) {
      const match = /^(\d{2}):(\d{2})–(\d{2}):(\d{2})$/.exec(row[0]);
      if (!match) continue;
      const [,h,m,eh,em] = match.map(Number), start = h*60+m, end = eh*60+em;
      assert.ok(start >= previous && end >= start, `D${day}: ${row[0]}`);
      previous = end;
    }
  }
});

test('new timing variants refuse reordered, duplicate and weather-swapped routes', () => {
  const {state, api} = setup();
  state.plan[5].reverse();
  assert.equal(api.isDayTimingDraftApplicable(5), false);
  state.plan[6][6] = 'moiwa-yama';
  assert.equal(api.isDayTimingDraftApplicable(6), false);
  state.plan[7].unshift(state.plan[7].pop());
  assert.equal(api.isDayTimingDraftApplicable(7), false);
  state.plan[9].push('hakodate-hachimangu');
  assert.equal(api.isDayTimingDraftApplicable(9), false);
});
