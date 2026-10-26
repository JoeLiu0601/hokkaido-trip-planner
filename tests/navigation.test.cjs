const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');
const assert = require('node:assert/strict');

const app = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
const section = (start, end) => app.slice(app.indexOf(start), app.indexOf(end));
const runtime = vm.runInNewContext(
  app.slice(0, app.indexOf('const flights ='))
  + section('const dayOneTimingDraft =', 'const dayOneTimedStopIds =')
  + section('const accommodations =', 'const storageKey =')
  + section('function getMapUrl(', 'function isDayOneTimingDraftApplicable(')
  + section('function getDrivingPlaceQuery(', 'const hakodateTransitLegs =')
  + '\nfunction spotById(id) { return spots.find(spot => spot.id === id); }'
  + '\n({ state, spotById, getStopNavigation, getDrivingRouteUrlForStop });',
  { state: { plan: {} } }
);

const cases = [
  ['D1 airport before pickup', 1, ['new-chitose-airport'], ''],
  ['D1 rental shuttle', 1, ['new-chitose-airport', 'nippon-rentacar-new-chitose'], ''],
  ['D1 hotel without a pickup', 1, ['premier-cabin-asahikawa'], ''],
  ['D1 hotel after pickup', 1, ['nippon-rentacar-new-chitose', 'premier-cabin-asahikawa'], 'driving'],
  ['D1 shopping on foot', 1, ['premier-cabin-asahikawa', 'aeon-mall-asahikawa-ekimae'], 'walking'],
  ['D2 hotel to Biei', 2, ['biei-shrine'], 'driving'],
  ['D2 unspecified previous stop does not block live navigation', 2, ['furano-field', 'biei-shrine'], 'driving'],
  ['D2 field has no confirmed driving destination', 2, ['furano-field'], ''],
  ['D2 APA to Odori on foot', 2, ['apa-sapporo-susukino-ekinishi', 'sapporo-odori'], 'walking'],
  ['D2 church is not a walk from APA', 2, ['apa-sapporo-susukino-ekinishi', 'miyanomori-frances-church'], 'driving'],
  ['D3 shrine by car', 3, ['hokkaido-shrine'], 'driving'],
  ['D3 Otaru shops on foot', 3, ['taisho-glass', 'otaru-meruhen-crossing'], 'walking'],
  ['D4 onsen street on foot', 4, ['noboribetsu-valley', 'noboribetsu-onsen-street'], 'walking'],
  ['D5 park from APA on foot', 5, ['nakajima-park'], 'walking'],
  ['D5 unagi on foot', 5, ['nakajima-park', 'unagi-nakajima'], 'walking'],
  ['D5 ropeway after retrieving car', 5, ['unagi-nakajima', 'moiwa-yama'], 'driving'],
  ['D6 adjacent mall on foot', 6, ['sapporo-beer-museum', 'ario-sapporo'], 'walking'],
  ['D6 Toriton by car', 6, ['ario-sapporo', 'toriton-kita8'], 'driving'],
  ['D6 underground shops after parking', 6, ['toriton-kita8', 'kinotoya-bake-pole-town'], 'walking'],
  ['D7 lake region has no confirmed parking destination', 7, ['toyako-lake'], ''],
  ['D8 Toya to Hakodate before return', 8, ['lagent-hakodate-ekimae'], 'driving'],
  ['D8 park after returning car', 8, ['lagent-hakodate-ekimae', 'goryokaku'], 'transit'],
  ['D8 tower on foot', 8, ['goryokaku', 'goryokaku-tower'], 'walking'],
  ['D8 burger on foot', 8, ['goryokaku-tower', 'lucky-pierrot-goryokaku'], 'walking'],
  ['D8 later hotel visit is not another drive', 8, ['goryokaku', 'lagent-hakodate-ekimae'], 'transit'],
  ['D9 Hachimanzaka by transit', 9, ['hachimanzaka'], 'transit'],
  ['D9 bay walk', 9, ['hachimanzaka', 'kanemori-warehouse'], 'walking'],
  ['D9 ropeway base on foot', 9, ['kanemori-warehouse', 'hakodate-mt'], 'walking'],
  ['D9 midnight shrine is a taxi destination map', 9, ['hakodate-mt', 'hakodate-gokoku-shrine'], ''],
  ['D10 morning market on foot', 10, ['morning-market'], 'walking'],
  ['D10 walk to bus boarding point', 10, ['motomachi', 'hakodate-station-airport-bus'], 'walking'],
  ['D10 airport by transit', 10, ['hakodate-station-airport-bus', 'hakodate-airport'], 'transit']
];

for (const [name, day, stops, mode] of cases) {
  test(name, () => {
    runtime.state.plan[day] = stops;
    const index = stops.length - 1;
    const nav = runtime.getStopNavigation(day, index, runtime.spotById(stops[index]));
    const url = new URL(nav.url);
    assert.equal(nav.mode, mode);
    assert.equal(url.searchParams.has('origin'), false, 'primary action must not lock the user to a planned origin');
    if (!mode) {
      assert.equal(nav.label, '搜尋地點');
      assert.match(url.pathname, /\/search\//);
      return;
    }
    assert.equal(url.searchParams.get('travelmode'), mode);
    assert.equal(url.searchParams.get('dir_action'), mode === 'transit' ? null : 'navigate');
    assert.ok(url.searchParams.get('destination'));
    if (stops[index] === 'hakodate-mt') assert.match(url.searchParams.get('destination'), /山麓駅/);
    if (stops[index] === 'moiwa-yama') assert.match(url.searchParams.get('destination'), /山麓駅/);
    if (stops[index] === 'kinotoya-bake-pole-town') assert.match(nav.note, /停車/);
  });
}

test('planned route keeps hotel origin only in secondary preview', () => {
  runtime.state.plan[8] = ['lagent-hakodate-ekimae'];
  const url = new URL(runtime.getDrivingRouteUrlForStop(8, 0, 'lagent-hakodate-ekimae'));
  assert.match(url.searchParams.get('origin'), /Toya Kohan Tei/);
  assert.equal(url.searchParams.get('dir_action'), null);
  runtime.state.plan[5] = ['unagi-nakajima', 'moiwa-yama'];
  const moiwa = new URL(runtime.getDrivingRouteUrlForStop(5, 1, 'moiwa-yama'));
  assert.match(moiwa.searchParams.get('origin'), /APA/);
});

test('unplaced library or meal options do not claim a transport mode', () => {
  runtime.state.plan[2] = ['biei-shrine'];
  const nav = runtime.getStopNavigation(2, -1, runtime.spotById('unagi-nakajima'));
  assert.equal(nav.label, '搜尋地點');
  assert.equal(nav.mode, '');
});
