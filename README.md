
# Phishing Simulation Live Panel (Firebase)

This package contains drop-in scripts and updated reveal pages to enable a working live panel backed by Firebase Realtime Database—without changing your existing logos, fonts, colors, or layout.

## Files
- `firebase-config.js`: Initializes Firebase via CDN ES modules, signs in anonymously, and exposes `window.__FIREBASE__`.
- `capture-reveal.js`: Reads the visible "Entered values" on reveal pages and pushes submissions to RTDB.
- `live-panel.js`: Listens for new submissions and appends rows to the existing table in `live.html`.
- `reveal.html`, `reveal-google.html`, `reveal-google-2.html`: Updated copies with two script tags appended at the end.

## How to integrate
1. Place all files alongside your existing HTML pages.
2. On reveal pages, ensure these tags are at the end of the `<body>`:
   ```html
   <script type="module" src="firebase-config.js"></script>
   <script type="module" src="capture-reveal.js"></script>
   ```
3. On `live.html`, add:
   ```html
   <script type="module" src="firebase-config.js"></script>
   <script type="module" src="live-panel.js"></script>
   ```
4. In Firebase Console:
   - Enable **Authentication → Anonymous**.
   - Create **Realtime Database** and set rules (training setup):
     ```json
     {
       "rules": {
         ".read": "auth != null",
         ".write": "auth != null"
       }
     }
     ```
5. (Optional) Use session labels: add `?session=fall-sim` to both reveal and live URLs.

## Notes
- Scripts are ES modules using Firebase CDN; no bundler needed.
- No markup or style changes beyond inserting script tags.

