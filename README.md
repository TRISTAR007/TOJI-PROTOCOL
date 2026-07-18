# Toji Protocol — 365 Day Calisthenics Transformation

A self-contained, no-build fitness tracker: a 365-day bodyweight calisthenics
program, a full exercise library with reference images, a Nigerian-food
nutrition plan, and progress tracking — all in plain HTML/CSS/JS.

## Folder structure

```
toji-protocol/
├── index.html              → the whole app (structure/markup)
├── css/
│   └── styles.css          → design system + all styling
├── js/
│   ├── data.js              → exercise database & 365-day program data
│   └── app.js                → all interactive logic (rendering, tracking, storage)
├── images/
│   └── exercises/            → one reference photo per exercise
└── README.md
```

No build step, no npm install, no framework — open `index.html` and it runs.

## Opening it in VS Code

1. Unzip the folder if needed, then in VS Code: **File → Open Folder…** and select `toji-protocol`.
2. Install the **Live Server** extension (by Ritwick Dey) if you don't have it — Extensions panel, search "Live Server".
3. Right-click `index.html` → **Open with Live Server**. It'll open in your browser at `http://127.0.0.1:5500` and auto-reload when you edit files.

(You can also just double-click `index.html` to open it directly in a browser — everything works, you just won't get live-reload.)

## Publishing to GitHub

From inside the `toji-protocol` folder:

```bash
git init
git add .
git commit -m "Initial commit: Toji Protocol"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

Create the empty repo on GitHub first (github.com → New repository), then run the commands above with your repo's URL.

### Hosting it live with GitHub Pages (free)

1. On GitHub, go to your repo → **Settings → Pages**.
2. Under "Build and deployment", set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)`.
3. Save. Your site will be live at `https://<your-username>.github.io/<repo-name>/` within a minute or two.

## How progress is saved

All tracking (checklist ticks, water intake, habit calendar, measurements,
strength tests) is saved to your browser's `localStorage` under the key
`tojiProtocolProgress` — nothing is sent anywhere. Clearing your browser
data or switching browsers/devices will reset it, since there's no backend.

## Extending it

- **Add a new exercise:** add an entry to the `exercises` object in `js/data.js` (copy an existing one as a template), drop a photo in `images/exercises/`, and point `image:` at it.
- **Fill in weeks 3–52:** `getWorkoutForDay()` in `js/app.js` currently cycles the week 1 template for every week after week 2, scaling intensity by phase. Add real per-week workouts to `week1Workouts`-style arrays in `js/data.js` and extend `getWorkoutForDay()` to pull from them as you write more of the program.
- **Colors/fonts:** everything lives in the `:root` variables at the top of `css/styles.css` — change a variable once, it updates everywhere.

## Credits

Exercise reference art: custom-generated illustrations styled after *Jujutsu Kaisen*'s Toji Fushiguro, used for personal training reference.
