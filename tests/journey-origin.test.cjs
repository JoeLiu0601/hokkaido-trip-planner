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

function setup() {
  const state = { selectedDay: 2 }, statuses = {};
  const runtime = vm.runInNewContext(
    app.slice(0, app.indexOf('const state ='))
    + sceneSource + '\nconst scenes = window.HOKKAIDO_SCENES; let selectedGroup = "A";'
    + section(app, 'function spotById(', 'function getSpotLogistics(')
    + section(app, 'function getAccommodationMapUrl(', 'function getDayFiveReturnUrl(')
    + section(journey, '  const companions =', '  const winterStops =')
    + section(journey, '  const winterStops =', '  const speeds =')
    + '\nlet playback = null, previewPosition = null, playing = false, previousFrameTime = null, animationFrame = null;'
    + section(journey, '  function playbackOrigin(', '  function timeLabel(')
    + section(journey, '  function timeLabel(', '  function winterFocusCardHtml(')
    + section(journey, '  function winterFocusCardHtml(', '  function focusCardHtml(')
    + section(journey, '  function isOptional(', '  function durationText(')
    + section(journey, '  function renderOverview(', '  function setMode(')
    + '\n({buildPlan, dayDepartures, dayOneTimingDraft, nextPlaybackStop, playbackPosition, routeGeometry,'
    + 'start(day, ids) { state.selectedDay = day; playback = createPlayback(ids); previewPosition = null; return playback; },'
    + 'preview(value) { previewPosition = value; }, originCard() { return winterFocusCardHtml(playback.origin.id); },'
    + 'overview(group) { selectedGroup = group; renderOverview(); return host.innerHTML; }})',
    { state, statuses, window: {}, statusFor: id => statuses[id] || 'pending',
      isDayOneTimingDraftApplicable: () => true, escapeHtml: value => String(value),
      host: { innerHTML: '', classList: { remove() {} } }, progress: () => ({}), groupRouteSwitchHtml: () => '' }
  );
  state.plan = runtime.buildPlan();
  return { r: runtime, state, statuses };
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
