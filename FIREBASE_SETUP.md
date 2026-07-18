# Firebase Setup — Toji Protocol

The app now stores each person's progress in Firestore instead of
`localStorage`. Follow these steps once to wire up your own Firebase
project.

## 1. Create the Firebase project

1. Go to [console.firebase.google.com](https://console.firebase.google.com) → **Add project** → give it a name (e.g. `toji-protocol`) → follow the prompts (Google Analytics is optional, you can skip it).

## 2. Register a Web App

1. On the project's Overview page, click the **`</>`** (Web) icon.
2. Give it a nickname (e.g. "Toji Protocol Web"). You don't need Firebase Hosting checked here unless you plan to use it (see step 6).
3. Firebase shows you a `firebaseConfig` object with `apiKey`, `authDomain`, etc.
4. Open `js/firebase-config.js` in this project and paste those values into the `firebaseConfig` object at the top.

## 3. Turn on Authentication

1. In the left sidebar: **Build → Authentication → Get started**.
2. Under **Sign-in method**, enable:
   - **Email/Password** — toggle it on, save.
   - **Google** — toggle it on, pick a support email, save.
3. Under **Settings → Authorized domains**, make sure the domain you'll actually run the app from is listed:
   - `localhost` is there by default (covers local testing).
   - Add your GitHub Pages domain (e.g. `yourusername.github.io`) or custom domain once you deploy — Google sign-in will fail on any origin not in this list.

## 4. Create the Firestore database

1. **Build → Firestore Database → Create database**.
2. Choose a location close to your users (can't be changed later).
3. Start in **production mode** (the security rules below lock it down properly — you don't need test mode).
4. Once created, go to the **Rules** tab, delete the default contents, and paste in everything from `firestore.rules` in this project. Click **Publish**.

   This restricts every user to reading/writing only their own document at `users/{their-uid}` — nobody can see or modify anyone else's progress.

## 5. Run it locally

Firebase Auth (especially the Google popup) needs a real `http://` or
`https://` origin — it won't work if you just double-click `index.html`
(`file://` URLs are blocked). Use the same Live Server setup already
described in `README.md`:

1. VS Code → open the `toji-protocol` folder.
2. Install the **Live Server** extension if you haven't.
3. Right-click `index.html` → **Open with Live Server**.
4. It'll open at `http://127.0.0.1:5500` — sign up, and you should see a new document appear under Firestore → Data → `users`.

## 6. Deploy it

Any static host works, since this is still a no-build vanilla app —
just make sure the host's domain is in the Authorized domains list
from step 3.

**Option A — keep using GitHub Pages** (as in the existing README):
push to GitHub, enable Pages in repo settings, then add
`yourusername.github.io` to Firebase's authorized domains.

**Option B — Firebase Hosting** (keeps everything in one place):

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
# When asked for your public directory, enter: .
# Configure as a single-page app: No
# Set up automatic builds with GitHub: optional, your call

firebase deploy
```

Firebase Hosting's own domain (`your-project.web.app`) is added to
Authorized domains automatically.

To deploy the security rules via CLI instead of pasting them in the
console:

```bash
firebase init firestore   # links this folder to your project + rules file
firebase deploy --only firestore:rules
```

## 7. Free tier limits (Spark plan)

Everything above runs on Firebase's free tier, which covers this app's
usage comfortably for personal or small-scale use:

- **Auth**: unlimited email/password and Google sign-ins.
- **Firestore**: 50,000 reads / 20,000 writes / 20,000 deletes per day, 1 GiB stored — one document per user, written a few times per session, is nowhere near this.

If you outgrow it, Firebase prompts an upgrade to the pay-as-you-go
Blaze plan; nothing changes in the app code either way.
