const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.join(__dirname, '..');
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const journey = fs.readFileSync(path.join(root, 'journey.js'), 'utf8');
const sceneSource = fs.readFileSync(path.join(root, 'journey-scenes.js'), 'utf8');
const section = (source, a, b) => source.slice(source.indexOf(a), source.indexOf(b));
const plain = value => JSON.parse(JSON.stringify(value));

function setup(times = {}, timingApplicable = () => true) {
  const state = { selectedDay: 2 }, statuses = {}, storage = {};
  const runtime = vm.runInNewContext(
    fs.readFileSync(path.join(root, 'timing-drafts.js'), 'utf8') + '\n' + app.slice(0, app.indexOf('const state ='))
    + sceneSource + '\nconst scenes = window.HOKKAIDO_SCENES; let selectedGroup = "A";'
    + section(app, 'function spotById(', 'function getSpotLogistics(')
    + section(app, 'function getAccommodationMapUrl(', 'function getDayFiveReturnUrl(')
    + section(journey, '  const companions =', '  const winterStops =')
    + section(journey, '  const winterStops =', '  const speeds =')
    + '\nconst travelTools = window.HOKKAIDO_TRAVEL_TOOLS;'
    + section(app, 'const dayOptionalSpots =', 'function airportBusTimetableHtml(')
    + section(app, 'function getDayDinnerInsertionIndex(', 'function dayDinnerOptionsHtml(')
    + section(app, 'function getDayThreeLunchInsertionIndex(', 'function dayThreeLunchOptionsHtml(')
    + section(journey, '  const mealChoicesByDay =', '  const dayTabs =')
    + section(journey, '  function dayTenRouteKey(', '  function progressKey(')
    + '\nlet playback = null, previewPosition = null, playing = false, previousFrameTime = null, animationFrame = null;'
    + section(journey, '  function playbackOrigin(', '  function timeLabel(')
    + section(journey, '  function timeLabel(', '  function winterFocusCardHtml(')
    + section(journey, '  function winterFocusCardHtml(', '  function focusCardHtml(')
    + section(journey, '  function nextMealChoice(', '  function durationText(')
    + section(journey, '  function renderOverview(', '  function setMode(')
    + '\nlet mode = "travel", progressContext = "", playbackContext = "", feedback = "", focusedCardKey = "", undoProgress = null, pendingMeal = null;'
    + section(journey, '  function renderJourney()', '  switchButtons.forEach((button) => button.addEventListener')
    + '\n({buildPlan, dayDepartures, dayOneTimingDraft, dayEightDraft: dailyTimingDrafts[8], nextPlaybackStop, playbackPosition, routeGeometry, travelIds, travelTiming, nextMealChoice,'
    + 'start(day, ids) { state.selectedDay = day; playback = createPlayback(ids); previewPosition = null; return playback; },'
    + 'preview(value) { previewPosition = value; }, originCard() { return winterFocusCardHtml(playback.origin.id); },'
    + 'overview(group) { selectedGroup = group; renderOverview(); return host.innerHTML; },'
    + 'travel(day) { state.selectedDay = day; renderJourney(); return host.innerHTML; }})',
    { state, statuses, window: {HOKKAIDO_TRAVEL_TOOLS: require('../travel-tools.js')}, statusFor: id => statuses[id] || 'pending',
      readLocalStorage: key => storage[key] || null, isDayTimingDraftApplicable: timingApplicable,
      navigationFor: id => ({ url: `https://maps.example/${id}` }),
      isDayOneTimingDraftApplicable: () => true, escapeHtml: value => String(value),
      getDailyTimingDraft: day => day === 8 ? runtime.dayEightDraft : null,
      getTimingDraftForStop: (day, id) => day === 1 ? runtime.dayOneTimingDraft[id] : times[id],
      host: { innerHTML: '', classList: { remove() {} }, setAttribute() {}, querySelectorAll: () => [], querySelector: selector => selector === '.journey-next-card' ? { innerHTML: '' } : null },
      workspace: { classList: { toggle() {} } }, document: { body: { classList: { toggle() {}, add() {} } } },
      switchButtons: [], refreshDayNavigation() {}, progressKey: () => 'test-trip', paintPlayback() {},
      dayFlightHtml: () => '', dayDepartureHtml: () => '', timelineHtml: ids => ids.join(','),
      mapHtml: () => '', stopHtml: id => id, focusCardHtml: () => '',
      bindDisclosures() {}, bindDayOptionButtons() {}, getDayTimingDraftHtml() { throw new Error('Trial section must not render'); },
      progress: () => ({}), groupRouteSwitchHtml: () => '' }
  );
  state.plan = runtime.buildPlan();
  return { r: runtime, state, statuses, storage };
}

test('the full overview renders ten days and all three companions for both route groups', () => {
  const { r } = setup();
  for (const group of ['A', 'B']) {
    const html = r.overview(group);
    assert.match(html, /北海道十日總覽/);
    assert.equal((html.match(/<button[^>]*class="journey-overview-card(?:\s|")/g) || []).length, 10);
    for (const pal of ['pikachu', 'piplup', 'mew']) {
      assert.equal((html.match(new RegExp(`assets/${pal}-travel-cutout\\.png`, 'g')) || []).length, 1);
    }
    assert.doesNotMatch(html, /data-companion=/);
  }
});

test('formal daily views render every day without trial blocks and keep tools collapsed', () => {
  const { r, state, storage } = setup();
  const before = JSON.stringify(state.plan);
  for (let day = 1; day <= 10; day++) {
    const html = r.travel(day);
    assert.match(html, /今天這樣走/);
    assert.doesNotMatch(html, /journey-day-timing-title|初步試排/);
    assert.match(html, /<details class="winter-route-details">/);
    assert.ok(html.indexOf('journey-timeline-section') < html.indexOf('winter-route-details'));
    assert.equal(html.includes('airport-bus-quick'), day === 10);
  }
  for (const route of ['main', 'station']) {
    storage['hokkaido-d10-route-local'] = route;
    const html = r.travel(10);
    assert.ok(html.indexOf('airport-bus-quick') < html.indexOf('travel-route-picker'));
    assert.match(html, /https:\/\/maps\.example\/hakodate-station-airport-bus/);
    assert.match(html, /17:00 截止報到/);
  }
  assert.equal(JSON.stringify(state.plan), before);
  state.plan[2] = [];
  assert.doesNotThrow(() => r.travel(2));
});

test('overview highlights the planned night views and never adds a removed destination', () => {
  const { r, state } = setup();
  const card = html => html.split('aria-label="查看 Day 3 ')[1].split('</button>')[0];
  assert.match(card(r.overview('A')), /天狗山/);
  assert.match(card(r.overview('A')), /小樽運河/);
  state.plan[3] = state.plan[3].filter(id => id !== 'otaru-tenguyama');
  assert.doesNotMatch(card(r.overview('A')), /天狗山/);
});

test('D2–D10 prepend the configured departure only to playback, retaining itinerary stops', () => {
  const { r, state } = setup(), before = JSON.stringify(state.plan);
  for (let day = 2; day <= 10; day++) {
    const ids = state.plan[day];
    const playback = r.start(day, ids);
    assert.equal(playback.origin.departure, r.dayDepartures[day]);
    assert.equal(playback.stops[0].origin, true);
    assert.deepEqual(Array.from(playback.stops.slice(1), stop => stop.id), Array.from(ids));
    assert.equal(r.nextPlaybackStop().id, ids[0]);
    assert.equal(r.playbackPosition().id, playback.origin.id);
    assert.equal(r.playbackPosition().label, '出發點');
  }
  assert.equal(JSON.stringify(state.plan), before);
});

test('the map starts at the hotel and adds its segment to the first attraction', () => {
  const { r, state } = setup();
  const playback = r.start(2, state.plan[2]);
  const geometry = r.routeGeometry(playback.stops.map(stop => stop.id));
  assert.equal(geometry.points[0].id, playback.origin.id);
  assert.equal(geometry.points[1].id, 'biei-shrine');
  assert.equal(geometry.segments.length, state.plan[2].length);
  r.preview(50);
  assert.equal(r.playbackPosition().from, 0);
  assert.equal(r.playbackPosition().to, 1);
  assert.equal(r.playbackPosition().fraction, 0.5);
  r.preview(100);
  assert.equal(r.playbackPosition().label, '第 1 站');
  assert.equal(r.playbackPosition().id, 'biei-shrine');
});

test('completed progress moves onward without treating the hotel as an unfinished stop', () => {
  const { r, state, statuses } = setup();
  r.start(2, state.plan[2]);
  statuses[state.plan[2][0]] = 'done';
  assert.equal(r.nextPlaybackStop().id, state.plan[2][1]);
  assert.equal(r.playbackPosition().id, state.plan[2][1]);
  for (const id of state.plan[2]) statuses[id] = 'done';
  assert.equal(r.nextPlaybackStop(), undefined);
  assert.equal(r.playbackPosition().id, state.plan[2].at(-1));
});

test('undecided meals are the next action at the right point, without rewinding completed visits', () => {
  const { r, state, statuses } = setup();
  state.selectedDay = 3;
  const ids = state.plan[3];
  const lunch = ids.indexOf('otaru-inari-shrine');
  const dinner = ids.indexOf('otaru-canal') + 1;
  assert.equal(r.nextMealChoice(ids, 0), undefined);
  assert.equal(r.nextMealChoice(ids, lunch).id, 'd3-lunch-choice');
  assert.equal(r.nextMealChoice([...ids.slice(0, lunch), 'otaru-new-sanko', ...ids.slice(lunch)], lunch), undefined);
  statuses['otaru-inari-shrine'] = 'done';
  assert.equal(r.nextMealChoice(ids, dinner).id, 'd3-dinner-choice');
  statuses['d3-dinner-choice'] = 'skipped';
  assert.equal(r.nextMealChoice(ids, dinner), undefined);

  state.selectedDay = 2;
  const furano = ['hinode-park', 'ningle-terrace', 'apa-sapporo-susukino-ekinishi'];
  assert.equal(r.nextMealChoice(furano, 2).id, 'd2-dinner-choice');
  assert.equal(r.nextMealChoice(['ningle-terrace', 'lawson-furano-kitanomine'], 1), undefined);
  assert.equal(r.nextMealChoice(['sunagawa-highway-oasis', 'apa-sapporo-susukino-ekinishi'], 2), undefined);
});

test('D8 travel adds the two morning stages and keeps check-in at the end of the route', () => {
  let applicable = true;
  const { r, state } = setup({}, day => day !== 8 || applicable);
  const hotel = 'lagent-hakodate-ekimae';
  const original = [...state.plan[8]];
  const projected = ['d8-luggage-drop', 'd8-car-return', ...original];
  assert.deepEqual(Array.from(r.travelIds(8)), projected);
  assert.deepEqual(Array.from(state.plan[8]), original);

  state.plan[8] = [hotel, ...original.filter(id => id !== hotel)];
  assert.deepEqual(Array.from(r.travelIds(8)), projected);
  state.selectedDay = 8;
  assert.equal(r.travelTiming(hotel).time, '20:05–20:35');

  applicable = false;
  assert.deepEqual(Array.from(r.travelIds(8)), state.plan[8]);
});

test('the departure preview shows the hotel map without completion controls', () => {
  const { r, state } = setup(), before = plain(state.plan);
  r.start(8, state.plan[8]);
  const html = r.originCard();
  assert.match(html, /洞爺湖 湖畔亭/);
  assert.match(html, /07:00/);
  assert.match(html, /google\.com\/maps\/search/);
  assert.doesNotMatch(html, /data-journey-status/);
  assert.deepEqual(plain(state.plan), before);
});

test('D1 retains the timed airport origin and empty itineraries add no departure', () => {
  const { r } = setup();
  const ids = ['new-chitose-airport', 'nippon-rentacar-new-chitose', 'premier-cabin-asahikawa', 'aeon-mall-asahikawa-ekimae', 'asahikawa-heiwa-dori'];
  const first = r.start(1, ids);
  assert.equal(first.origin, null);
  assert.equal(first.timed, true);
  assert.equal(first.winter, true);
  assert.equal(first.min, 660);
  assert.equal(first.stops[0].id, 'new-chitose-airport');
  const empty = r.start(2, []);
  assert.equal(empty.origin, null);
  assert.equal(empty.stops.length, 0);
  assert.equal(r.playbackPosition(), null);
});

test('road playback uses the selected route time after midnight and falls back when stops are reordered', () => {
  const { r } = setup({
    'hachimanzaka': { time: '10:10–11:00' },
    'hakodate-gokoku-shrine': { time: '23:40–翌日00:30' }
  });
  const ids = ['hachimanzaka', 'hakodate-gokoku-shrine'];
  const timed = r.start(9, ids);
  assert.equal(timed.timed, true);
  assert.equal(timed.min, 570);
  assert.equal(timed.max, 1470);
  assert.equal(r.playbackPosition().id, timed.origin.id);
  r.preview(timed.max);
  assert.equal(r.playbackPosition().label, '翌日 00:30');
  assert.equal(r.playbackPosition().id, ids[1]);
  assert.equal(r.start(9, ids.reverse()).timed, false);
});
