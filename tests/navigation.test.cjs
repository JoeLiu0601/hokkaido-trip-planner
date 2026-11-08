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
  + section('const hakodateTransitLegs =', 'function normalizeSyncCode(')
  + section('function getDayFiveReturnUrl()', 'function dayDepartureHtml(')
  + '\nfunction spotById(id) { return spots.find(spot => spot.id === id); }'
  + '\n({ state, spotById, getStopNavigation, getDrivingRouteUrlForStop, getGroupRouteForDay, getDayFiveReturnUrl, getDayFiveMeetingUrl, getDriveInfoForStop, getDaySixTransport, daySixStepUrl });',
  { state: { plan: {} } }
);

const cases = [
  ['D1 airport before pickup', 1, ['new-chitose-airport'], ''],
  ['D1 rental shuttle', 1, ['new-chitose-airport', 'nippon-rentacar-new-chitose'], ''],
  ['D1 hotel without a pickup', 1, ['premier-cabin-asahikawa'], ''],
  ['D1 hotel after pickup', 1, ['nippon-rentacar-new-chitose', 'premier-cabin-asahikawa'], 'driving'],
  ['D1 shopping on foot', 1, ['premier-cabin-asahikawa', 'aeon-mall-asahikawa-ekimae'], 'walking'],
  ['D2 hotel to Biei', 2, ['biei-shrine'], 'driving'],
  ['D2 retired previous stop does not block live navigation', 2, ['furano-field', 'biei-shrine'], 'driving'],
  ['D7 Yotei scenery has no confirmed driving destination', 7, ['yotei-mountain'], ''],
  ['D2 APA to Odori on foot', 2, ['apa-sapporo-susukino-ekinishi', 'sapporo-odori'], 'walking'],
  ['D2 church is not a walk from APA', 2, ['apa-sapporo-susukino-ekinishi', 'miyanomori-frances-church'], 'driving'],
  ['D3 shrine by car', 3, ['hokkaido-shrine'], 'driving'],
  ['D3 Otaru shops on foot', 3, ['taisho-glass', 'otaru-meruhen-crossing'], 'walking'],
  ['D4 onsen street on foot', 4, ['noboribetsu-valley', 'noboribetsu-onsen-street'], 'walking'],
  ['D5 park from APA on foot', 5, ['nakajima-park'], 'walking'],
  ['D5 unagi on foot', 5, ['nakajima-park', 'unagi-nakajima'], 'walking'],
  ['D5 park meeting reached by transit before the shared ride', 5, ['unagi-nakajima', 'shiroi-koibito-park'], 'transit'],
  ['D5 ropeway by transit without a car', 5, ['unagi-nakajima', 'moiwa-yama'], 'transit'],
  ['D5 ropeway first by transit', 5, ['moiwa-yama'], 'transit'],
  ['D5 reordered park is not an assumed walk from ropeway', 5, ['moiwa-yama', 'nakajima-park'], 'transit'],
  ['D6 museum from hotel by transit', 6, ['sapporo-beer-museum'], 'transit'],
  ['D6 adjacent mall on foot', 6, ['sapporo-beer-museum', 'ario-sapporo'], 'walking'],
  ['D6 Ario to Toriton on foot', 6, ['ario-sapporo', 'toriton-kita8'], 'walking'],
  ['D6 Ario Rokkatei to Toriton on foot', 6, ['ario-sapporo', 'rokkatei-ario-sapporo', 'toriton-kita8'], 'walking'],
  ['D6 Toriton to underground shops by transit', 6, ['toriton-kita8', 'kinotoya-bake-pole-town'], 'transit'],
  ['D6 underground shops on foot', 6, ['kinotoya-bake-pole-town', '3coins-pole-town'], 'walking'],
  ['D6 nearby ramen on foot', 6, ['3coins-pole-town', 'ramen-haruka'], 'walking'],
  ['D6 reordered shop after museum by transit', 6, ['sapporo-beer-museum', '3coins-pole-town'], 'transit'],
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
    if (day === 5 || day === 6) assert.equal(runtime.getDrivingRouteUrlForStop(day, index, stops[index]), '');
  });
}

test('D5 Pokemon stays in Daimaru and the onward subway goes through Odori', () => {
  runtime.state.plan[5] = ['unagi-nakajima', 'daimaru-sapporo', 'pokemon-center-sapporo', 'shiroi-koibito-park'];
  const nav = runtime.getStopNavigation(5, 2, runtime.spotById('pokemon-center-sapporo'));
  assert.equal(nav.mode, '');
  assert.match(nav.label, /同棟.*8F/);
  assert.match(runtime.getDriveInfoForStop(5, 1, 'daimaru-sapporo'), /中島公園.*麻生.*さっぽろ/);
  assert.match(runtime.getDriveInfoForStop(5, 3, 'shiroi-koibito-park'), /真駒内.*大通.*宮の沢/);
  runtime.state.plan[5].splice(3, 0, 'stellar-place');
  assert.equal(runtime.getStopNavigation(5, 3, runtime.spotById('stellar-place')).mode, 'walking');
});

test('planned route keeps hotel origin only in secondary preview', () => {
  runtime.state.plan[8] = ['lagent-hakodate-ekimae'];
  const url = new URL(runtime.getDrivingRouteUrlForStop(8, 0, 'lagent-hakodate-ekimae'));
  assert.match(url.searchParams.get('origin'), /Toya Kohan Tei/);
  assert.equal(url.searchParams.get('dir_action'), null);
  runtime.state.plan[5] = ['unagi-nakajima', 'moiwa-yama'];
  assert.equal(runtime.getDrivingRouteUrlForStop(5, 1, 'moiwa-yama'), '');
});

test('unplaced library or meal options do not claim a transport mode', () => {
  runtime.state.plan[2] = ['biei-shrine'];
  const nav = runtime.getStopNavigation(2, -1, runtime.spotById('unagi-nakajima'));
  assert.equal(nav.label, '搜尋地點');
  assert.equal(nav.mode, '');
});

test('group B shows D5 and D6 without changing the shared sightseeing plan', () => {
  const original = JSON.stringify(runtime.state.plan);
  for (let day = 1; day <= 10; day++) {
    assert.equal(runtime.getGroupRouteForDay(day, 'A'), null);
    const route = runtime.getGroupRouteForDay(day, 'B');
    if (day === 5 || day === 6) assert.ok(route?.stages.length);
    else assert.equal(route, null);
  }
  assert.match(runtime.getGroupRouteForDay(5, 'B').route, /15:00.*16:00.*白色戀人/);
  assert.match(runtime.getGroupRouteForDay(6, 'B').route, /待確認/);
  assert.equal(JSON.stringify(runtime.state.plan), original);
});

test('D5 ski group navigates to the park parking rather than the night ropeway', () => {
  const url = new URL(runtime.getDayFiveMeetingUrl());
  assert.match(url.searchParams.get('destination'), /白い恋人.*駐車場/);
  assert.equal(url.searchParams.get('travelmode'), 'driving');
  assert.equal(url.searchParams.get('dir_action'), 'navigate');
  assert.equal(url.searchParams.has('origin'), false);
  runtime.state.plan[5] = ['unagi-nakajima', 'shiroi-koibito-park'];
  assert.match(runtime.getDriveInfoForStop(5, 1, 'shiroi-koibito-park'), /南北線.*大通.*東西線.*宮の沢/);
  assert.match(runtime.getDriveInfoForStop(5, 1, 'shiroi-koibito-park'), /逛完搭他們的車回 APA/);
});

test('D5 shared ride returns to APA using the current location', () => {
  const url = new URL(runtime.getDayFiveReturnUrl());
  assert.match(url.searchParams.get('destination'), /APA.*Susukino/);
  assert.equal(url.searchParams.get('travelmode'), 'driving');
  assert.equal(url.searchParams.get('dir_action'), 'navigate');
  assert.equal(url.searchParams.has('origin'), false);
});

test('D6 return route follows Toriton only when it is the previous stop', () => {
  runtime.state.plan[6] = ['toriton-kita8', 'kinotoya-bake-pole-town'];
  const text = runtime.getDriveInfoForStop(6, 1, 'kinotoya-bake-pole-town');
  assert.match(text, /東区役所前.*東豐線.*福住.*大通/);
  runtime.state.plan[6] = ['ario-sapporo', 'kinotoya-bake-pole-town'];
  assert.doesNotMatch(runtime.getDriveInfoForStop(6, 1, 'kinotoya-bake-pole-town'), /Toriton 用餐後/);
});

test('D6 transit guides navigate to boarding, the train leg and the final walk separately', () => {
  const before = JSON.stringify(runtime.state.plan);
  const legs = [
    { stops: ['sapporo-beer-museum'], from: /豊水すすきの/, to: /東区役所前/, direction: /往栄町/, exit: /4 號出口/, time: '29' },
    { stops: ['toriton-kita8', 'kinotoya-bake-pole-town'], from: /東区役所前/, to: /大通/, direction: /往福住/, exit: /Pole Town/, time: '57' }
  ];
  for (const leg of legs) {
    runtime.state.plan[6] = leg.stops;
    const index = leg.stops.length - 1;
    const guide = runtime.getDaySixTransport(6, index, leg.stops[index]);
    assert.match(guide.summary, leg.direction);
    assert.match(guide.steps[2].text, leg.exit);
    assert.ok(guide.timetable[0][1].includes(leg.time));
    const train = new URL(runtime.daySixStepUrl(guide.steps[1]));
    assert.equal(train.searchParams.get('travelmode'), 'transit');
    assert.match(train.searchParams.get('origin'), leg.from);
    assert.match(train.searchParams.get('destination'), leg.to);
    const nav = runtime.getStopNavigation(6, index, runtime.spotById(leg.stops[index]));
    const boarding = new URL(nav.boardingUrl);
    assert.match(boarding.searchParams.get('destination'), leg.from);
    assert.equal(boarding.searchParams.get('travelmode'), 'walking');
    assert.equal(boarding.searchParams.has('origin'), false);
    assert.equal(new URL(runtime.daySixStepUrl(guide.steps[2])).searchParams.has('origin'), false);
    const plan = JSON.stringify(runtime.state.plan);
    runtime.getDaySixTransport(6, index, leg.stops[index]);
    assert.equal(JSON.stringify(runtime.state.plan), plan, 'guidance must not edit the plan');
  }
  runtime.state.plan = JSON.parse(before);
});

test('D6 does not attach original transit instructions after reordering or on another day', () => {
  runtime.state.plan[6] = ['ario-sapporo', 'sapporo-beer-museum', 'kinotoya-bake-pole-town'];
  assert.equal(runtime.getDaySixTransport(6, 1, 'sapporo-beer-museum'), null);
  assert.equal(runtime.getDaySixTransport(6, 2, 'kinotoya-bake-pole-town'), null);
  assert.equal(runtime.getDaySixTransport(6, -1, 'sapporo-beer-museum'), null);
  runtime.state.plan[5] = ['sapporo-beer-museum'];
  assert.equal(runtime.getDaySixTransport(5, 0, 'sapporo-beer-museum'), null);
});

test('D6 hotel return is offered after dinner only when dinner is the final stop', () => {
  runtime.state.plan[6] = ['3coins-pole-town', 'ramen-haruka'];
  assert.equal(runtime.getDaySixTransport(6, 1, 'ramen-haruka').steps.length, 2);
  const url = new URL(runtime.daySixStepUrl(runtime.getDaySixTransport(6, 1, 'ramen-haruka').steps[1]));
  assert.match(url.searchParams.get('destination'), /アパホテル.*すすきの駅西/);
  assert.equal(url.searchParams.get('travelmode'), 'walking');
  runtime.state.plan[6].push('donki-tanukikoji');
  assert.equal(runtime.getDaySixTransport(6, 1, 'ramen-haruka').steps.length, 1);
});

test('travel view prioritizes the boarding walk without changing other days navigation', () => {
  const journey = fs.readFileSync(path.join(__dirname, '..', 'journey.js'), 'utf8');
  const body = journey.slice(journey.indexOf('  function navigationFor('), journey.indexOf('  function companionGroupTransform('));
  const navFor = vm.runInNewContext(body + '\n navigationFor;', { ...runtime, stationRouteActive: () => false });
  runtime.state.selectedDay = 6;
  runtime.state.plan[6] = ['sapporo-beer-museum'];
  assert.match(navFor('sapporo-beer-museum').label, /走到豊水すすきの/);
  assert.equal(new URL(navFor('sapporo-beer-museum').url).searchParams.get('travelmode'), 'walking');
  runtime.state.selectedDay = 3;
  runtime.state.plan[3] = ['hokkaido-shrine'];
  assert.equal(new URL(navFor('hokkaido-shrine').url).searchParams.get('travelmode'), 'driving');
});

test('a manually restored D5 night visit does not promise the former shared ride', () => {
  runtime.state.plan[5] = ['unagi-nakajima', 'moiwa-yama'];
  assert.match(runtime.getDriveInfoForStop(5, 1, 'moiwa-yama'), /資生館小学校前.*ロープウェイ入口.*接駁.*夜景目前排 D4.*回程與集合需另排/);
});

test('Hakodate tram branches and station return are explicit', () => {
  runtime.state.plan[9] = ['hachimanzaka'];
  assert.match(runtime.getDriveInfoForStop(9, 0, 'hachimanzaka'), /5 系統.*函館どつく前.*末廣町.*2 系統.*不經/);
  runtime.state.plan[8] = ['lagent-hakodate-ekimae', 'goryokaku'];
  assert.match(runtime.getDriveInfoForStop(8, 1, 'goryokaku'), /函館站前門市.*函館駅前.*2 或 5.*湯の川.*五稜郭公園前/);
  runtime.state.plan[8] = ['lucky-pierrot-goryokaku', 'lagent-hakodate-ekimae'];
  assert.match(runtime.getDriveInfoForStop(8, 1, 'lagent-hakodate-ekimae'), /2 系統.*谷地頭.*5 系統.*函館どつく前.*函館駅前/);
});
