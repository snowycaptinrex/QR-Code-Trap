// firebase-config.js
// Uses Firebase CDN ES modules and anonymous auth to enable RTDB reads/writes.
// Drop this file into your project and include with:
//   <script type="module" src="firebase-config.js"></script>

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-database.js";

// --- Your Firebase config ---
const firebaseConfig = {
  apiKey: "AIzaSyAjh0cU_zD5WICdZLFvkuZq8h5fkGQXZQw",
  authDomain: "qr-code-c8bc8.firebaseapp.com",
  projectId: "qr-code-c8bc8",
  storageBucket: "qr-code-c8bc8.firebasestorage.app",
  messagingSenderId: "628189062444",
  appId: "1:628189062444:web:5f5ae511660b8cf191b889"
  // databaseURL is optional for web; RTDB works with default instance when enabled.
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth: sign in anonymously so DB rules (auth != null) permit access
const auth = getAuth(app);
signInAnonymously(auth).catch(err => console.error("Anonymous auth error:", err));

onAuthStateChanged(auth, (user) => {
  if (user) console.debug("Anon auth OK, uid:", user.uid);
});

// Realtime Database handle
const db = getDatabase(app);

// Expose globally for other modules
window.__FIREBASE__ = { app, auth, db };
