# Summer Trip Companion

A installable (PWA) trip companion for the 7-17 July 2026 Norway / Germany /
Spain family trip. Works offline once loaded, and lives entirely as static
files — no server or build step needed.

## Files

| File            | What it's for                                                              |
|------------------|-----------------------------------------------------------------------------|
| `index.html`     | Page structure and styling. You shouldn't need to edit this often.         |
| `app.js`         | Rendering logic — turns `data.js` into the screens you see. Edit only if you want to change *how* something looks or behaves. |
| `data.js`        | **All trip content lives here.** Days, bookings, hotels, things to do, app links, weather locations, tips. Edit this file to update the trip. |
| `manifest.json`  | PWA metadata (name, icons, colors). Edit if you rename the app.            |
| `sw.js`          | Offline cache. Bump `CACHE_NAME` if you ever see stale content after an update. |
| `icon-192.png`, `icon-512.png` | App icons shown on the home screen.                          |

## What's new in this version

1. **Tap any day for full details.** The Trip Dashboard and Timeline cards
   are now tappable. Tapping opens a screen with that day's weather, things
   to do, route, hotel, and bookings all in one place, with Prev/Next day
   buttons to flip through the trip.
2. **Apps tab now lets you save a real app link per provider.** Airlines and
   travel agencies don't publish reliable, documented links that always open
   their app directly (Hotels.com is the one exception here, which is why it
   already worked). Each card now has a **Set App Link** button: open the
   app once, find the booking, use its Share or Copy Link feature, and paste
   that link in. From then on, that button opens the app directly. This is
   saved in your browser's local storage, so it's per-device.
3. **Everything editable from one file.** All trip content has been moved
   into `data.js`, with comments explaining exactly how to add a day, fix a
   booking, or add a thing to do — no need to touch HTML/CSS/JS structure.

## How to update the trip

Open `data.js`. Read the comment block at the top — it explains the shape of
every section with examples. The short version:

- **Add a day:** copy one entry in `TRIP.days`, paste it as a new one, edit
  the fields.
- **Add a thing to do / highlight:** add an entry to that day's
  `highlights` array.
- **Fix a booking:** edit `TRIP.bookings`.
- **Fix an app link:** edit `TRIP.appLinks`, or just use "Set App Link" in
  the Apps tab on your phone (no code editing needed for that one).

You can edit `data.js` directly on GitHub: open the file, click the pencil
(edit) icon, make your change, and commit directly to `main`. GitHub Pages
will redeploy automatically within a minute or two.

## Publishing changes

This repo is set up for GitHub Pages, so any commit to `main` updates the
live site automatically at:

https://huisky2000.github.io/summer2026/

If you don't see your change after a minute, do a hard refresh (or remove
and reinstall the app icon) — the service worker caches files for offline
use and occasionally needs a nudge to pick up new content.
