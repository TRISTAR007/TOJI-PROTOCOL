/* ====================================================================
   TOJI PROTOCOL — Firebase setup
   Loads first (after the Firebase CDN <script> tags in index.html) and
   before auth.js / firestore.js / app.js, all of which rely on the
   `auth` and `db` handles created here.

   HOW TO GET YOUR CONFIG VALUES:
   1. Go to https://console.firebase.google.com and create a project
      (or open an existing one).
   2. Project Settings (gear icon) → General tab → "Your apps".
   3. Click the </> (Web) icon to register a web app, name it anything.
   4. Firebase shows you a `firebaseConfig` object — copy those values
      into the object below.
   ==================================================================== */

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Boot Firebase. This must run before firebase.auth() / firebase.firestore()
// are called anywhere else.
firebase.initializeApp(firebaseConfig);

// Shared handles — declared with `const` at top level of a classic
// (non-module) script, so they're visible to every script that loads
// after this one (auth.js, firestore.js, app.js), the same way
// `programData` from data.js is visible to app.js.
const auth = firebase.auth();
const db = firebase.firestore();

// Keep the user signed in across page reloads / browser restarts,
// rather than only for the current tab session.
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).catch((err) => {
    console.warn('Could not set auth persistence:', err);
});
