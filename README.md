# QR Code Trap — **Live Panel** Version (Firebase)

This variant adds a real‑time **Live Panel** that updates on a second screen as participants submit the form. It uses **Firebase Realtime Database**, so there’s no server to run.

## Files
- `index.html` — look‑alike login that records entries to Firebase and redirects to the reveal page
- `reveal.html` — shows the user what was captured locally
- `live.html` — the real‑time dashboard (open this on the projector/second screen)
- `firebase-config.js` — paste your Firebase web app config and set a `SESSION_ID`

## Set up Firebase (one‑time)
1. Go to <https://console.firebase.google.com> → **Create project** (no Google Analytics needed).
2. In your project, go to **Build → Realtime Database → Create database**.
   - Choose a location and **Start in test mode** (training only; do not use for real data).
3. Go to **Project settings → Your apps → Web** and **Register app** to get your config snippet.
4. Open `firebase-config.js` and paste your config values. Set `SESSION_ID` (e.g., `nov-2025-wichita`).

> **Important**: Test mode opens read/write to anyone with the URL. Use **fake data only** and delete the database after the event.

## Host the pages
- **Option A: GitHub Pages** (recommended; no installs)
  1. Create a repo (e.g., `qr-code-trap-live`).
  2. Upload these four files.
  3. In **Settings → Pages**, select `main` branch / root. Wait ~1–2 minutes.
  4. Your site is now live at `https://<your-username>.github.io/qr-code-trap-live/`.

- **Option B: Any static host** (Netlify, Vercel, etc.)

> Opening the files via `file://` may block the Firebase SDK — host them over `http(s)://`.

## Run the activity
1. Open **`live.html`** on the second screen (projector/TV). It will show live submissions for the given `SESSION_ID`.
2. Print a QR code that points participants to **`index.html`** (hosted URL).
3. As participants enter **fake** credentials and submit, the rows will appear in the live panel instantly.
4. Use `reveal.html` to debrief on individual phones.

## Privacy & ethics
- Only use **fake usernames/passwords**.
- Avoid real logos/brands to prevent confusion.
- After the session, **delete the database** or change rules to lock it down.

## (Optional) Database Rules Example
Training‑only permissive rules (remember to remove after the event):
```
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```
A better approach is to time‑limit writes and scope to a path, but for a quick demo test mode is sufficient.

## Troubleshooting
- **Nothing shows on live panel**: Check that `firebase-config.js` is filled correctly and your host uses `http(s)://`.
- **CORS or SDK errors**: You likely opened the file directly; use GitHub Pages or another static host.
- **Mixed session data**: Change `SESSION_ID` in `firebase-config.js` to isolate events.
```
