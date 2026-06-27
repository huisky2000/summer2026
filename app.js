/*
  ============================================================================
  APP LOGIC — you should not need to edit this file to update trip content.
  Edit data.js instead. This file only renders what's in the TRIP object.
  ============================================================================
*/

const weatherCodes = {
  0: "Clear", 1: "Mostly clear", 2: "Partly cloudy", 3: "Cloudy",
  45: "Fog", 48: "Fog", 51: "Light drizzle", 53: "Drizzle", 55: "Heavy drizzle",
  61: "Light rain", 63: "Rain", 65: "Heavy rain", 71: "Snow", 80: "Rain showers",
  81: "Rain showers", 82: "Heavy showers", 95: "Thunderstorm"
};

const APP_LINK_STORE_PREFIX = "germanyTrip.appLink.";

// ---------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------
function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function mapsSearchUrl(query) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function mapsDirectionsUrl(route) {
  const params = new URLSearchParams();
  params.set("api", "1");
  if (route.origin) params.set("origin", route.origin);
  if (route.destination) params.set("destination", route.destination);
  if (route.waypoints && route.waypoints.length) params.set("waypoints", route.waypoints.join("|"));
  params.set("travelmode", route.mode || "driving");
  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

function getSavedAppLink(providerId) {
  return localStorage.getItem(APP_LINK_STORE_PREFIX + providerId) || "";
}

function setSavedAppLink(providerId, url) {
  if (url) localStorage.setItem(APP_LINK_STORE_PREFIX + providerId, url);
  else localStorage.removeItem(APP_LINK_STORE_PREFIX + providerId);
}

function bestLinkForProvider(providerId) {
  const provider = TRIP.appLinks[providerId];
  if (!provider) return "#";
  const saved = getSavedAppLink(providerId);
  if (saved) return saved;
  if (provider.app) return provider.app;
  return provider.web;
}

function findDayIndexById(dayId) {
  return TRIP.days.findIndex(d => d.id === dayId);
}

function findWeatherLocation(id) {
  return TRIP.weatherLocations.find(w => w.id === id);
}

function findBooking(id) {
  return TRIP.bookings.find(b => b.id === id);
}

// ---------------------------------------------------------------------
// Dashboard (Trip Dashboard, #today)
// ---------------------------------------------------------------------
function renderDashboard() {
  const grid = document.getElementById("dashboardGrid");
  grid.innerHTML = TRIP.days.map(day => `
    <div class="mini tappable day day-${day.accent}" data-day-id="${escapeHtml(day.id)}">
      <strong>${escapeHtml(day.date)}${day.hotel ? ": " + escapeHtml(day.hotel.name) : ""}</strong>
      <span>${escapeHtml(day.summary)}</span>
    </div>
  `).join("");

  grid.querySelectorAll(".mini.tappable").forEach(card => {
    card.addEventListener("click", () => openDaySheet(card.dataset.dayId));
  });
}

// ---------------------------------------------------------------------
// Timeline (#timeline)
// ---------------------------------------------------------------------
function renderTimeline() {
  const grid = document.getElementById("timelineGrid");
  grid.innerHTML = TRIP.days.map(day => `
    <div class="mini tappable" data-day-id="${escapeHtml(day.id)}">
      <strong>${escapeHtml(day.date)}</strong>
      <span>${escapeHtml(day.summary)}</span>
    </div>
  `).join("");

  grid.querySelectorAll(".mini.tappable").forEach(card => {
    card.addEventListener("click", () => openDaySheet(card.dataset.dayId));
  });
}

// ---------------------------------------------------------------------
// Routes (#routes)
// ---------------------------------------------------------------------
function renderRoutes() {
  const list = document.getElementById("routesList");
  const daysWithRoutes = TRIP.days.filter(d => d.route || (d.stops && d.stops.length));

  list.innerHTML = daysWithRoutes.map(day => {
    const stopsHtml = (day.stops && day.stops.length)
      ? `<div class="route">${day.stops.map((s, i) => `
          <div class="stop"><span class="dot">${i + 1}</span><span>${escapeHtml(s.label)}</span></div>
        `).join("")}</div>`
      : "";

    let actionsHtml = "";
    if (day.route) {
      const navUrl = mapsDirectionsUrl(day.route);
      actionsHtml += `<a class="btn" href="${navUrl}">Navigate ${escapeHtml(day.date)}</a>`;
    }
    if (day.hotel) {
      actionsHtml += `<a class="btn secondary" href="${mapsSearchUrl(day.hotel.mapQuery)}">Open ${escapeHtml(day.hotel.name)}</a>`;
    }
    actionsHtml += `<button class="btn secondary" data-day-id="${escapeHtml(day.id)}" data-action="open-day">Day Details</button>`;

    return `
      <article class="mini day day-${day.accent}" style="margin-bottom:10px;">
        <h3>${escapeHtml(day.date)}: ${escapeHtml(day.summary)}</h3>
        ${stopsHtml}
        <div class="actions">${actionsHtml}</div>
      </article>
    `;
  }).join("");

  list.querySelectorAll("[data-action='open-day']").forEach(btn => {
    btn.addEventListener("click", () => openDaySheet(btn.dataset.dayId));
  });
}

// ---------------------------------------------------------------------
// Traffic shortcuts (#traffic)
// ---------------------------------------------------------------------
function renderTraffic() {
  const actions = document.getElementById("trafficActions");
  actions.innerHTML = TRIP.trafficSpots.map(spot => `
    <a class="btn secondary" href="https://www.google.com/maps/@?api=1&map_action=map&center=${spot.lat}%2C${spot.lon}&zoom=11&basemap=roadmap">${escapeHtml(spot.name)}</a>
  `).join("");
}

// ---------------------------------------------------------------------
// Bookings (#bookings)
// ---------------------------------------------------------------------
function renderBookings() {
  const grid = document.getElementById("bookingsGrid");
  grid.innerHTML = TRIP.bookings.map(b => {
    const provider = TRIP.appLinks[b.appLinkId];
    const linkUrl = bestLinkForProvider(b.appLinkId);
    return `
      <div class="mini">
        <strong>${escapeHtml(b.title)}</strong>
        <span>${b.lines.map(escapeHtml).join("<br>")}</span>
        ${provider ? `<div class="actions"><a class="btn secondary" href="${linkUrl}">Open in ${escapeHtml(provider.name)}</a></div>` : ""}
      </div>
    `;
  }).join("");
}

// ---------------------------------------------------------------------
// Editable notes (#bookings, notes grid)
// ---------------------------------------------------------------------
function renderNotes() {
  const grid = document.getElementById("notesGrid");
  grid.innerHTML = TRIP.noteFields.map(f => `
    <label class="mini">
      <strong>${escapeHtml(f.label)}</strong>
      <textarea data-save="${escapeHtml(f.key)}" placeholder="${escapeHtml(f.placeholder)}"></textarea>
    </label>
  `).join("");

  grid.querySelectorAll("[data-save]").forEach(field => {
    const key = "germanyTrip." + field.dataset.save;
    field.value = localStorage.getItem(key) || "";
    field.addEventListener("input", () => localStorage.setItem(key, field.value));
  });
}

// ---------------------------------------------------------------------
// Apps tab (#apps) — each card: open saved/app/web link + "Set App Link"
// ---------------------------------------------------------------------
function renderApps() {
  const grid = document.getElementById("appsGrid");
  const providerIds = Object.keys(TRIP.appLinks);

  grid.innerHTML = providerIds.map(id => {
    const p = TRIP.appLinks[id];
    const saved = getSavedAppLink(id);
    const primaryUrl = bestLinkForProvider(id);
    const statusLabel = saved
      ? `<span class="pill">Using your saved app link</span>`
      : (p.app ? `<span class="pill">Using built-in app link</span>` : `<span class="pill">Using official website</span>`);

    let extraButtons = "";
    if (p.webCheckin) extraButtons += `<a class="btn secondary" href="${p.webCheckin}">Check-in</a>`;
    if (p.webFind) extraButtons += `<a class="btn secondary" href="${p.webFind}">Find Booking</a>`;
    if (p.webHome) extraButtons += `<a class="btn secondary" href="${p.webHome}">Website Home</a>`;

    return `
      <div class="mini">
        <strong>${escapeHtml(p.name)}</strong>
        ${statusLabel}
        <p style="margin-top:6px;">${escapeHtml(p.note || "")}</p>
        <div class="actions">
          <a class="btn" href="${primaryUrl}">Open ${escapeHtml(p.name)}</a>
          ${extraButtons}
          <button class="btn secondary" data-action="set-link" data-provider="${escapeHtml(id)}">Set App Link</button>
          ${saved ? `<button class="btn secondary" data-action="clear-link" data-provider="${escapeHtml(id)}">Clear Saved Link</button>` : ""}
        </div>
      </div>
    `;
  }).join("");

  grid.querySelectorAll("[data-action='set-link']").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.provider;
      const current = getSavedAppLink(id);
      const next = window.prompt(
        `Paste the link that opens ${TRIP.appLinks[id].name} directly in its app.\n\nTip: open the app, find this booking, use Share or Copy Link, then paste that link here.`,
        current
      );
      if (next === null) return; // cancelled
      setSavedAppLink(id, next.trim());
      renderApps();
      renderBookings();
    });
  });

  grid.querySelectorAll("[data-action='clear-link']").forEach(btn => {
    btn.addEventListener("click", () => {
      setSavedAppLink(btn.dataset.provider, "");
      renderApps();
      renderBookings();
    });
  });
}

// ---------------------------------------------------------------------
// Weather (#weather)
// ---------------------------------------------------------------------
const weatherCache = {};

async function fetchWeather(loc) {
  if (weatherCache[loc.id]) return weatherCache[loc.id];
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}&longitude=${loc.lon}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Weather unavailable");
  const data = await res.json();
  weatherCache[loc.id] = data;
  return data;
}

function weatherCardHtml(loc, data) {
  const current = data.current;
  const daily = data.daily;
  const text = weatherCodes[current.weather_code] || "Weather";
  return `
    <div class="mini weather-card">
      <strong>${escapeHtml(loc.name)}</strong>
      <div class="weather-main">
        <span class="temp">${Math.round(current.temperature_2m)}&deg;C</span>
        <span>${escapeHtml(text)}</span>
      </div>
      <span class="pill">Wind ${Math.round(current.wind_speed_10m)} km/h</span>
      <span class="pill">Rain ${current.precipitation} mm</span>
      <span class="pill">Today ${Math.round(daily.temperature_2m_min[0])}-${Math.round(daily.temperature_2m_max[0])}&deg;C</span>
    </div>
  `;
}

async function loadWeather() {
  const grid = document.getElementById("weatherGrid");
  const cards = await Promise.all(TRIP.weatherLocations.map(async (loc) => {
    try {
      const data = await fetchWeather(loc);
      return weatherCardHtml(loc, data);
    } catch (err) {
      return `
        <div class="mini weather-card">
          <strong>${escapeHtml(loc.name)}</strong>
          <span>Weather could not load. Open when online or check your weather app.</span>
        </div>`;
    }
  }));
  grid.innerHTML = cards.join("");
}

// ---------------------------------------------------------------------
// Tips (#tips)
// ---------------------------------------------------------------------
function renderTips() {
  const grid = document.getElementById("tipsGrid");
  grid.innerHTML = TRIP.tips.map(t => `
    <div class="mini">
      <strong>${escapeHtml(t.title)}</strong>
      <span>${escapeHtml(t.note)}</span>
    </div>
  `).join("");

  const list = document.getElementById("carKitList");
  list.innerHTML = TRIP.carKitItems.map(item => `<li>${escapeHtml(item)}</li>`).join("");
}

// ---------------------------------------------------------------------
// Day Detail Sheet
// ---------------------------------------------------------------------
let currentSheetDayId = null;

async function openDaySheet(dayId) {
  currentSheetDayId = dayId;
  const day = TRIP.days.find(d => d.id === dayId);
  if (!day) return;

  document.getElementById("sheetTitle").textContent = day.date;
  document.getElementById("sheetDate").textContent = day.dateLong || "";

  const idx = findDayIndexById(dayId);
  document.getElementById("sheetPrevBtn").disabled = idx <= 0;
  document.getElementById("sheetNextBtn").disabled = idx >= TRIP.days.length - 1;
  document.getElementById("sheetPrevBtn").style.opacity = idx <= 0 ? "0.4" : "1";
  document.getElementById("sheetNextBtn").style.opacity = idx >= TRIP.days.length - 1 ? "0.4" : "1";

  const body = document.getElementById("sheetBody");
  body.innerHTML = `<p>Loading day details...</p>`;

  // Weather for this day's location
  let weatherHtml = "";
  const loc = day.weatherLocationId ? findWeatherLocation(day.weatherLocationId) : null;
  if (loc) {
    try {
      const data = await fetchWeather(loc);
      weatherHtml = `<div class="sheet-section"><h3>Weather in ${escapeHtml(loc.name)}</h3>${weatherCardHtml(loc, data)}</div>`;
    } catch (err) {
      weatherHtml = `<div class="sheet-section"><h3>Weather in ${escapeHtml(loc.name)}</h3><div class="mini">Weather could not load right now.</div></div>`;
    }
  }

  // Highlights / things to do
  let highlightsHtml = "";
  if (day.highlights && day.highlights.length) {
    highlightsHtml = `
      <div class="sheet-section">
        <h3>Highlights &amp; Things To Do</h3>
        ${day.highlights.map(h => `
          <div class="highlight-card">
            <strong>${escapeHtml(h.title)}</strong>
            ${h.time ? `<span class="h-time">${escapeHtml(h.time)}</span>` : ""}
            ${h.note ? `<p>${escapeHtml(h.note)}</p>` : ""}
            ${h.mapQuery ? `<a class="btn secondary" href="${mapsSearchUrl(h.mapQuery)}">Open in Maps</a>` : ""}
          </div>
        `).join("")}
      </div>
    `;
  }

  // Route
  let routeHtml = "";
  if (day.route || (day.stops && day.stops.length)) {
    const stopsHtml = (day.stops && day.stops.length)
      ? `<div class="route">${day.stops.map((s, i) => `<div class="stop"><span class="dot">${i + 1}</span><span>${escapeHtml(s.label)}</span></div>`).join("")}</div>`
      : "";
    const navBtn = day.route ? `<a class="btn" href="${mapsDirectionsUrl(day.route)}">Navigate This Route</a>` : "";
    routeHtml = `<div class="sheet-section"><h3>Route</h3>${stopsHtml}<div class="actions">${navBtn}</div></div>`;
  }

  // Hotel
  let hotelHtml = "";
  if (day.hotel) {
    hotelHtml = `
      <div class="sheet-section">
        <h3>Where You Sleep</h3>
        <div class="mini">
          <strong>${escapeHtml(day.hotel.name)}</strong>
          <div class="actions"><a class="btn secondary" href="${mapsSearchUrl(day.hotel.mapQuery)}">Open in Maps</a></div>
        </div>
      </div>
    `;
  }

  // Bookings relevant to this day
  let bookingsHtml = "";
  if (day.bookingIds && day.bookingIds.length) {
    const items = day.bookingIds.map(findBooking).filter(Boolean);
    if (items.length) {
      bookingsHtml = `
        <div class="sheet-section">
          <h3>Bookings For This Day</h3>
          ${items.map(b => {
            const provider = TRIP.appLinks[b.appLinkId];
            const linkUrl = bestLinkForProvider(b.appLinkId);
            return `
              <div class="mini" style="margin-bottom:8px;">
                <strong>${escapeHtml(b.title)}</strong>
                <span>${b.lines.map(escapeHtml).join("<br>")}</span>
                ${provider ? `<div class="actions"><a class="btn secondary" href="${linkUrl}">Open in ${escapeHtml(provider.name)}</a></div>` : ""}
              </div>
            `;
          }).join("")}
        </div>
      `;
    }
  }

  body.innerHTML = highlightsHtml + routeHtml + hotelHtml + bookingsHtml + weatherHtml;

  document.getElementById("sheetBackdrop").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeDaySheet() {
  document.getElementById("sheetBackdrop").classList.remove("open");
  document.body.style.overflow = "";
  currentSheetDayId = null;
}

function navigateSheetDay(delta) {
  if (!currentSheetDayId) return;
  const idx = findDayIndexById(currentSheetDayId);
  const nextIdx = idx + delta;
  if (nextIdx < 0 || nextIdx >= TRIP.days.length) return;
  openDaySheet(TRIP.days[nextIdx].id);
}

function setupSheetControls() {
  document.getElementById("sheetCloseBtn").addEventListener("click", closeDaySheet);
  document.getElementById("sheetBackdrop").addEventListener("click", (e) => {
    if (e.target.id === "sheetBackdrop") closeDaySheet();
  });
  document.getElementById("sheetPrevBtn").addEventListener("click", () => navigateSheetDay(-1));
  document.getElementById("sheetNextBtn").addEventListener("click", () => navigateSheetDay(1));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDaySheet();
  });
}

// ---------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------
function renderHeader() {
  document.getElementById("appTitle").textContent = TRIP.meta.title;
  document.getElementById("appSubtitle").textContent = TRIP.meta.subtitle;
  document.title = TRIP.meta.title;
}

// ---------------------------------------------------------------------
// Init
// ---------------------------------------------------------------------
function initApp() {
  renderHeader();
  renderDashboard();
  renderTimeline();
  renderRoutes();
  renderTraffic();
  renderBookings();
  renderNotes();
  renderApps();
  renderTips();
  setupSheetControls();
  loadWeather();

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js")
        .then(reg => console.log("Service Worker registered!", reg))
        .catch(err => console.error("Service Worker registration failed: ", err));
    });
  }
}

initApp();
