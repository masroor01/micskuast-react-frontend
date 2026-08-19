# Market Intelligence Cell (MIC) SKUAST-K

This repository houses the modern, high-performance **React + TypeScript + Vite** frontend of the **Market Intelligence Cell (MIC) of SKUAST-Kashmir**, designed to match the styling and interactive analytics of `www.micskuast.in`.

It features real-time mandi prices dashboard panels, LSTM price forecasting widgets, anomaly warning radars, publications downloads, and an integrated secure live-editing administrative dashboard.

---

## 🏗️ Project Architecture & Stack
- **Build System:** Vite (extremely fast development and compilation)
- **Frontend Framework:** React 18 + TypeScript (strongly-typed modular architecture)
- **Routing:** React Router DOM (Single Page Application routing with client-side state)
- **Visual Analytics:** Chart.js & Plotly (responsive multi-dimensional price trend graphs)
- **Animations:** HTML5 Canvas (slow-moving square particle neural-net background)
- **Styling:** CSS Variables (supporting Light ☀️, Dark 🌙, and Warm Sepia ☕ themes)
- **Admin Backend:** Lightweight co-located PHP Configuration API (`public/api/config.php`)

---

## ⚡ How to Run Locally

### Prerequisites
Make sure you have **Node.js (v18+)** installed on your computer.

### Setup Instructions
1. **Open your Terminal** inside the project folder (`micskuast-react-frontend`).
2. **Install Dependencies:**
   ```bash
   npm install
   ```
3. **Start Local Development Server:**
   ```bash
   npm run dev
   ```
4. **Open in Browser:** Control-click the local link printed in the terminal (usually `http://localhost:5173`).

---

## 📦 Compiling for Production

To compile the React source files into optimized, browser-ready static assets:

1. Run the build command:
   ```bash
   npm run build
   ```
2. This creates a folder named **`dist/`** containing:
   - **`index.html`** (the main entry point)
   - **`assets/`** (compiled, hashed CSS and JS bundles, plus images/icons)

---

## 🚀 How to Deploy to Hostinger

Since this is a client-side React SPA hosted on a PHP server (Hostinger Apache), deployment is straightforward:

1. **Delete Old Files (Important):** Go to Hostinger File Manager inside **`public_html/assets/`** and delete any old `.js` or `.css` files to prevent caching conflicts.
2. **Upload Dist Contents:** Copy the *contents* of your local **`dist/`** folder directly into the server's **`public_html/`** folder.
3. **Keep the API and htaccess:** 
   - Ensure the server has the **`public_html/.htaccess`** file (enables clean page refreshes).
   - Ensure **`public_html/api/config.php`** is in place (holds your secure admin credentials and label database).
4. **Flush Cache:** Go to Hostinger **Litespeed Cache** and click **Flush All**.

---

## 🖊️ How to Update Website Labels & Content

You do **not** need to edit code to update texts, links, or contact numbers on the website.

### Option 1: Live On-Page Visual Editor (Recommended)
1. Go to `www.micskuast.in/#/admin` and log in with your Admin Password.
2. Navigate back to any page (Home, EWS, Publications, Forecasts, etc.).
3. You will see **blue pencil icons (✏️)** next to headers, links, address fields, and button labels.
4. Click any pencil icon, type your new text or URL in the modal, and click **Save**. The change is pushed instantly to the PHP database on the server!

### Option 2: Manually Editing Defaults in Code
If you want to edit the default hardcoded labels (for fallback purposes):
- **Footer Links & Contacts:** Edit [**`Footer.tsx`**](file:///C:/Users/masro/.gemini/antigravity/scratch/micskuast-react-frontend/src/components/Footer.tsx) labels.
- **Admin Configuration Panel:** Add new defaults to the dictionaries in [**`Admin.tsx`**](file:///C:/Users/masro/.gemini/antigravity/scratch/micskuast-react-frontend/src/pages/Admin.tsx) and the initializer in [**`public/api/config.php`**](file:///C:/Users/masro/.gemini/antigravity/scratch/micskuast-react-frontend/public/api/config.php).

---

## 🎨 Modifying Themes & Colors

All site styling is dynamic. To adjust theme parameters, open [**`index.css`**](file:///C:/Users/masro/.gemini/antigravity/scratch/micskuast-react-frontend/src/index.css) and customize the variables inside the root scopes:

- **☀️ Light Theme:** `:root { ... }`
- **🌙 Dark Theme:** `[data-theme="dark"] { ... }`
- **☕ Warm Theme:** `[data-theme="warm"] { ... }`

You can change background colors (`--color-bg`), card surfaces (`--color-surface`), border lines (`--color-border`), and text variables without modifying React files.

---

## 🌌 Background Animation Controls

The constellation animation is managed inside [**`ParticleBackground.tsx`**](file:///C:/Users/masro/.gemini/antigravity/scratch/micskuast-react-frontend/src/components/ParticleBackground.tsx).
- **Speed:** Modify the velocity values `vx` and `vy` (e.g. increase `0.22` for faster movement, or decrease it for slower drift).
- **Node Size:** Change the size parameter in the loop to make the square points larger or smaller.
- **Transparency:** Change the line connection transparency coefficient `0.28` or canvas `globalAlpha` inside `animate()` to make the graphics brighter or more subtle.

---

## 📁 Managing Team Profiles & Uploads
- **Meet Our Team Photos:** Save team pictures inside `public/team/` and edit the array parameters in [**`Home.tsx`**](file:///C:/Users/masro/.gemini/antigravity/scratch/micskuast-react-frontend/src/pages/Home.tsx) or [**`Team.tsx`**](file:///C:/Users/masro/.gemini/antigravity/scratch/micskuast-react-frontend/src/pages/Team.tsx).
- **PDF Publications:** Save files inside the PHP directory `/api/uploads/`. Edit card parameters in [**`Publications.tsx`**](file:///C:/Users/masro/.gemini/antigravity/scratch/micskuast-react-frontend/src/pages/Publications.tsx) to add new cards.

---

## 🛠️ Git Version Control Operations

To update your code and save it to GitHub:

1. **Stage all changes:**
   ```bash
   git add .
   ```
2. **Commit your work:**
   ```bash
   git commit -m "Commit description details"
   ```
3. **Push to GitHub:**
   ```bash
   git push origin master
   ```
