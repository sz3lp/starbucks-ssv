# ☕ GreenApron SSV — Starbucks Shift Supervisor Companion

> The complete, mobile-first operational guide, shift playcaller, and practice tool designed to help you excel as a Starbucks Shift Supervisor (SSV).

Access it anywhere on your phone via **GitHub Pages** — works 100% offline with zero server dependencies.

---

## 📱 Features Built for the Floor

### 1. 📋 Shift Routines & Checklists
- **Opening (Pre-Open to Peak):** Two-partner perimeter check, alarm disarm, safe audit, till setup ($200 par), milk & freezer temp logs, Mastrena II calibration, sanitizer PPM testing, and drip/iced brew cadence.
- **Peak & Playcaller Routine:** Planted positions, aces in their places, Drive-Thru window times (<45s), Mobile Order & Pay handoff, customer connection, and till skims.
- **Mid-Shift & Transition:** 18-hour food pull & thaw, partner 30-min meal break management, Hobart cycles, and midday till audit.
- **Closing Routine:** Till countdowns, deposit dual-witnessing, safe balancing, Cafiza machine cleaning, pastry case teardown, and night security protocols.
- **Clean Play Routine:** Weekly deep clean tracking (ice machine baffle, drain enzyme treatments, oven cleaning).
- *All checklists persist to `localStorage` and include interactive progress bars and reset tools.*

### 2. ♟️ Playcaller & Deployment Matrix
- **Dynamic Station Deployments:** Select your store type (*Drive-Thru + Café* or *Café Only*) and your partner count (2 through 8+).
- **Aces in Their Places:** Instantly shows primary and flex/secondary roles for every barista on shift.
- **Live Break Timers:** Add barista names and start 10-minute rest or 30-minute meal countdowns with audio chimes and visual overdue alarms.

### 3. 🏷️ Day-Dot Expiration Tool & Database
- **Starbucks Day-Dot Colors:** Accurate day-of-week color stripe indicators:
  - Sunday: **Black** | Monday: **Blue** | Tuesday: **Yellow** | Wednesday: **Red**
  - Thursday: **Brown** | Friday: **Green** | Saturday: **Orange**
- **Digital Day-Dot Sticker Generator:** Select item (Mocha, Sweet Cream, Whipped Cream, Refreshers, etc.), input prep time, and get an exact formatted day-dot sticker showing expiration day, date, time, and partner initials.
- **Searchable Master Shelf-Life Directory:** Instant lookup for 20+ Starbucks items with ambient vs refrigerated rules.

### 4. 💵 Cash & Safe Audit Calculator
- **Safe Count Calculator:** Input quantities of bills ($100 to $1) and rolled coins (quarters, dimes, nickels, pennies) + loose coins.
- **Variance Detection:** Automatically sums safe funds and calculates discrepancy against your store safe par ($1,200 default or custom) with Green (Balanced), Red (Short), or Yellow (Over) tags.
- **Cash Handling Guidelines:** Dual-witness rules, drawer skims, deposit bag logging, and audit variance thresholds.

### 5. ⏱️ Customer Support (CS) Cycle Timer
- **Custom Cadences:** 8 min (Peak rush), 10 min (Standard), 15 min (Shoulder), or 30 min (Quiet).
- **Visual & Audio Alerts:** Plays tone chimes and browser vibration when the CS cycle expires.
- **4-Step Cycle Reminders:** 1. Brew Coffee ➔ 2. Restock Line ➔ 3. Lobby Sweep ➔ 4. Cycle Dishes.

### 6. ☕ Beverage Standards & Recipe Matrix
- **Quick Shot & Pump Matrix:** Standard shot counts (Short: 1, Tall: 1, Grande: 2, Venti Hot: 2, Venti Iced: 3) and syrup pumps (2/3/4/5/6/7).
- **Cold Foam Recipes:** Vanilla Sweet Cream, Salted Caramel Cream Cold Foam, Chocolate Cold Foam, and Matcha Cold Foam with exact blender button standards.
- **Instant Search:** Filter recipes by name, ingredients, or size specs.

### 7. 🎓 Leadership, Scenarios & SSV Certification Quiz
- **LATTE Service Recovery Model:** Detailed breakdown of Listen, Acknowledge, Take Action, Thank, and Encourage Return.
- **Real Floor Scenarios:** Step-by-step resolution guides for angry mobile order customers, partner call-outs before peak, Mastrena errors, safe discrepancies, and Third Place policy violations.
- **Interactive Practice Quiz:** 12 certification-level multiple choice questions with immediate feedback, scoring, and standard explanations.
- **QASA / Steritech Audit Guide:** Critical points for temperature logs, sanitizer concentration (200-400 PPM), dishwashers (>180°F rinse), and ice bin hygiene.

### 8. 📝 Shift Handover Log
- Open-to-Mid, Mid-to-Close, and Close-to-Open logs for 86'd items, equipment maintenance tickets, and partner shout-outs.
- **One-Click Copy:** Formats handover notes into a clean message ready to paste into your store's communication app or text thread.

---

## 🚀 How to Host on GitHub Pages (Access from Your Phone)

### Option A: Using GitHub CLI (Fastest — 1 Minute)

1. Open PowerShell or Terminal in the `starbucks-ssv-app` folder:
   ```bash
   cd c:\Users\lukep\SentientZone\starbucks-ssv-app
   git init
   git add .
   git commit -m "Initial commit of GreenApron SSV companion"
   ```

2. Create a public repository on your GitHub account and push:
   ```bash
   gh repo create starbucks-ssv --public --source=. --remote=origin --push
   ```

3. Enable GitHub Pages:
   ```bash
   gh repo edit --enable-pages --pages-branch=main
   ```
   Your app will be live at:
   `https://<your-username>.github.io/starbucks-ssv/`

---

### Option B: Manual GitHub Website Setup

1. Go to [github.com/new](https://github.com/new) and create a new repository called **`starbucks-ssv`** (set to **Public**).
2. Push your files:
   ```bash
   cd starbucks-ssv-app
   git init
   git add .
   git commit -m "Initial release"
   git branch -M main
   git remote add origin https://github.com/<your-username>/starbucks-ssv.git
   git push -u origin main
   ```
3. In your GitHub repository:
   - Click **Settings** (gear icon) ➔ **Pages** (in the left sidebar).
   - Under **Build and deployment** ➔ **Source**, choose **Deploy from a branch**.
   - Select branch **`main`** and folder **`/ (root)`**, then click **Save**.
4. In ~60 seconds, GitHub will display your live URL!

---

## 📲 How to Install as an App on Your Phone (PWA)

Once hosted on GitHub Pages:

### On iPhone (Safari):
1. Open your GitHub Pages URL in **Safari**.
2. Tap the **Share** button (box with upward arrow).
3. Scroll down and tap **"Add to Home Screen"**.
4. Tap **Add**. GreenApron SSV will now appear on your home screen with its own custom icon and launch in full-screen standalone mode without any browser URL bars!

### On Android (Chrome):
1. Open the URL in **Chrome**.
2. Tap the **Three Dots** menu in the top-right corner.
3. Tap **"Install app"** or **"Add to Home Screen"**.
4. Tap **Install**.

---

## 🛠️ Offline Support
This app includes a Service Worker (`sw.js`). Once you load the page once, it will remain fully accessible on your phone even if your store's Wi-Fi drops or you have zero cell reception in the backroom or walk-in cooler!
