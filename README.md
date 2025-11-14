# QR Code Trap — Cybersecurity Demo

This is a **static, two‑page** demo you can host anywhere (GitHub Pages, local server, or a USB‑served kiosk). It simulates a QR‑led credential capture and immediately reveals what was captured to spark discussion.

## Files
- `index.html` — look‑alike login / captive portal
- `reveal.html` — shows captured inputs and environment details

## How it works
1. Attendee scans a QR code pointing to `index.html`.
2. They enter a **fake** username and password.
3. JavaScript stores the values in `sessionStorage` and redirects to `reveal.html?u=...&p=...`.
4. `reveal.html` reads from the query string / storage and displays the values and device info.

> ⚠️ **Ethics & Safety**: Use only with clear consent. Do not collect or log real credentials. Avoid using real brand names or logos.

## Quick start
Open `index.html` locally to test. For phones, host via a simple local server:

```bash
# Python 3
python -m http.server 8000
# visit http://localhost:8000 in your browser
```

## Host on GitHub Pages
1. Create a new public repo (e.g., `qr-code-trap`).
2. Upload `index.html` and `reveal.html`.
3. In **Settings → Pages**, set **Branch: main / root**. Wait ~1–2 minutes.
4. Your site will be live at `https://<your-username>.github.io/qr-code-trap/`.

## Create the QR code
Use any QR generator (e.g., `qrcode-monkey.com`, `qr-code-generator.com`) and paste your hosted URL to `index.html`. Save and print.

## Optional enhancements
- Add a checkbox \"I agree\" that must be ticked.
- Capture additional metadata (referrer, approximate geolocation prompt with clear consent).
- Auto-redirect to a legitimate site after capture to mimic real attacks.
- Add a timer to show \"It took X seconds to steal this\".

## De‑brief prompts
- What made the page feel legitimate?
- What clues in the URL or design looked off in hindsight?
- Would a password manager have filled on this page?
- How would MFA help if a password was stolen?
