const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync('departure-prep.js','utf8');

function setup(initial = '{}') {
  let raw = initial, fail = false, writes = 0;
  const handlers = {}, windowHandlers = {}, count = {}, status = {};
  const inputs = ['passport','license','translation','phone'].map(id => ({dataset:{prepId:id},checked:false}));
  const host = {
    addEventListener:(type,fn)=>handlers[type]=fn,
    querySelectorAll:()=>inputs,
    querySelector:selector=>selector==='[data-prep-count]'?count:status
  };
  const window = {
    addEventListener:(type,fn)=>windowHandlers[type]=fn,
    localStorage:{getItem:()=>raw,setItem:(key,value)=>{if(fail)throw Error('storage full');raw=value;writes++;}}
  };
  vm.runInNewContext(source,{window,document:{getElementById:()=>host}});
  return { html:()=>window.HOKKAIDO_DEPARTURE_PREP.html(), count, status,
    setRaw:value=>raw=JSON.stringify(value), saved:()=>JSON.parse(raw), writes:()=>writes,
    fail:value=>fail=value,
    toggle:open=>handlers.toggle({target:{id:'departure-prep',open}}),
    storage:key=>windowHandlers.storage({key}),
    change(id,done){const input=inputs.find(i=>i.dataset.prepId===id)||{dataset:{prepId:id}};input.checked=done;handlers.change({target:{closest:()=>input}});}
  };
}

test('preparation restores only known boolean checks and starts collapsed on a new visit',()=>{
  const c=setup(JSON.stringify({passport:true,license:'true',unknown:true}));
  assert.match(c.html(),/data-prep-id="passport" checked/);
  assert.doesNotMatch(c.html(),/data-prep-id="license" checked/);
  assert.match(c.html(),/1 \/ 10 已備妥/);
  assert.doesNotMatch(c.html(),/<details[^>]*\sopen/);
  c.toggle(true);
  assert.match(c.html(),/<details[^>]*\sopen/);
  assert.doesNotMatch(setup(JSON.stringify(c.saved())).html(),/<details[^>]*\sopen/);
  c.change('unknown',true);
  assert.equal(c.writes(),0);
});

test('preparation merges recent checks from another tab and keeps separate itinerary storage untouched',()=>{
  const c=setup(JSON.stringify({passport:true}));
  c.setRaw({passport:true,entry:true});
  c.change('license',true);
  assert.deepEqual(c.saved(),{passport:true,entry:true,license:true});
  c.change('passport',false);
  assert.deepEqual(c.saved(),{entry:true,license:true});
  c.setRaw({phone:true});
  c.storage('unrelated-trip-key');
  assert.match(c.html(),/data-prep-id="license" checked/);
  c.storage('hokkaido-departure-prep-20261223');
  assert.match(c.html(),/data-prep-id="phone" checked/);
  assert.doesNotMatch(c.html(),/data-prep-id="license" checked/);
  c.setRaw({}); c.storage(null);
  assert.equal(c.count.textContent,'0 / 10 已備妥');
});

test('failed writes retain multiple checks in this visit and can be saved after recovery',()=>{
  const c=setup(); c.fail(true);
  c.change('passport',true); c.change('license',true);
  assert.match(c.html(),/2 \/ 10 已備妥/);
  assert.match(c.status.textContent,/無法儲存/);
  assert.deepEqual(c.saved(),{});
  c.change('passport',false);
  assert.match(c.html(),/1 \/ 10 已備妥/);
  c.fail(false); c.change('translation',true);
  assert.deepEqual(c.saved(),{license:true,translation:true});
  assert.doesNotMatch(c.status.textContent,/無法儲存/);
});
