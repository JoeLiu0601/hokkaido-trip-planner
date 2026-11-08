const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const tools = require('../travel-tools.js');
const original = ['morning-market','motomachi','hakodate-station-airport-bus','hakodate-airport'];

test('station route replaces the displayed route reversibly without touching any shared day', () => {
  const plan = {5:['unagi-nakajima'],9:['hachimanzaka'],10:[...original]};
  const before = JSON.stringify(plan);
  const route = tools.ids(10,plan[10],true);
  assert.deepEqual(route,['hokkaido-shikisai-hakodate','hakodate-station-airport-bus','hakodate-airport']);
  assert.deepEqual(tools.ids(10,plan[10],false),original);
  assert.deepEqual(tools.ids(5,plan[5],true),plan[5]);
  assert.equal(JSON.stringify(plan),before);
  assert.notEqual(tools.progressKey('trip',true),tools.progressKey('trip',false));
  assert.equal(route.includes('lagent-hakodate-ekimae'),false);
  assert.match(tools.spot(10,{id:'hokkaido-shikisai-hakodate'},true).name,/採買與午餐/);
  assert.match(tools.timing(10,'hokkaido-shikisai-hakodate',true).note,/帶著全部行李/);
});

test('station route refuses an unexpected custom plan and does not resurrect removed transport', () => {
  for(const ids of [[...original,'extra'],['morning-market','hakodate-airport'],['hakodate-airport']]) {
    assert.equal(tools.stationSupported(ids),false);
    assert.deepEqual(tools.ids(10,ids,true),ids);
  }
});

test('offline cache seeds exist and network failure returns cached pages while cloud traffic stays untouched', async () => {
  const handlers = {}, deleted = [];
  let cachedPaths = [], responded;
  const cache = { addAll: async paths => {cachedPaths=paths;}, match: async request => new URL(typeof request==='string'?request:request.url).pathname.endsWith('/app.js') ? 'cached script' : 'cached page', put:async()=>{} };
  vm.runInNewContext(fs.readFileSync('sw.js','utf8'),{
    URL, Response,
    self:{registration:{scope:'https://example.com/trip/'},location:{origin:'https://example.com'},addEventListener:(name,fn)=>handlers[name]=fn,skipWaiting:async()=>{},clients:{claim:async()=>{},matchAll:async()=>[]}},
    caches:{open:async()=>cache,keys:async()=>['unrelated-cache','hokkaido-shell-old'],delete:async name=>deleted.push(name)},
    fetch:async()=>{throw new Error('offline');}
  });
  await handlers.install({waitUntil:p=>responded=p}); await responded;
  for(const path of cachedPaths) assert.ok(fs.existsSync(path.split('?')[0]), `missing offline asset ${path}`);
  handlers.fetch({request:{method:'GET',url:'https://example.com/trip/?view=travel',mode:'navigate'},respondWith:p=>responded=p});
  assert.equal(await responded,'cached page');
  handlers.fetch({request:{method:'GET',url:'https://example.com/trip/app.js?v=new',mode:'cors'},respondWith:p=>responded=p});
  assert.equal(await responded,'cached script');
  let intercepted=false;
  handlers.fetch({request:{method:'GET',url:'https://firestore.googleapis.com/data'},respondWith:()=>intercepted=true});
  assert.equal(intercepted,false);
  await handlers.activate({waitUntil:p=>responded=p}); await responded;
  assert.deepEqual(deleted,['hokkaido-shell-old']);
});
