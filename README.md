# Market Intelligence Cell (MIC) — SKUAST-Kashmir
### Comprehensive Technical Documentation & Developer Guide

Welcome to the official developer manual and codebase documentation for the **Market Intelligence Cell (MIC) of SKUAST-Kashmir**. This application is a high-performance, single-page web dashboard designed to deliver dynamic price forecasts, early warning market anomaly signals, and comprehensive agricultural publication directories to farmers, traders, and policymakers in Jammu & Kashmir.

This document serves as an exhaustive reference guide to help developers maintain, compile, deploy, and update any element of this project without needing an AI coding assistant.

---

## Table of Contents
1. [Core Architecture & Folder Structure](#1-core-architecture--folder-structure)
2. [Local Development Environment Setup](#2-local-development-environment-setup)
3. [Production Compiling & Bundle Optimization](#3-production-compiling-&-bundle-optimization)
4. [Hostinger Deployment Guide (Apache + PHP Backend)](#4-hostinger-deployment-guide-apache--php-backend)
5. [Administrative Visual Label Editor & PHP Database Bridge](#5-administrative-visual-label-editor--php-database-bridge)
6. [Multi-Theme Customization Engine (CSS Variables)](#6-multi-theme-customization-engine-css-variables)
7. [Vector Constellation Background (HTML5 Canvas)](#7-vector-constellation-background-html5-canvas)
8. [Content Modification Manual](#8-content-modification-manual)
   - [Managing Team Profiles](#managing-team-profiles)
   - [Managing Publications (PDFs)](#managing-publications-pdfs)
   - [Modifying Mandi Price Charts & LSTM Forecast Parameters](#modifying-mandi-price-charts--lstm-forecast-parameters)
9. [Git Version Control & Repository Pipeline](#9-git-version-control--repository-pipeline)
10. [Developer Troubleshooting & FAQ](#10-developer-troubleshooting--faq)

---

## 1. Core Architecture & Folder Structure

The project is structured following modern frontend engineering principles using **Vite + React 18 + TypeScript (TSX) + Vanilla CSS**. Below is the directory breakdown with file responsibilities:

```
micskuast-react-frontend/
├── public/
│   ├── .htaccess                   # Apache URL rewrite configuration for Hostinger clean routing
│   ├── logos/                      # Institutional high-res logos (mic.png, skuast.png, hadp.png)
│   ├── team/                       # Team portrait image files (shaheen.png, baba.png, etc.)
│   └── api/
│       ├── config.php              # PHP SQLite configuration database & API endpoints provider
│       └── uploads/                # Directory where publications PDF files are stored on the server
├── index.html                      # Entry HTML point; holds the pre-load theme blocker script
├── package.json                    # Project metadata, dependencies list, and script command aliases
├── tsconfig.json                   # TypeScript compiler configuration rules
├── vite.config.ts                  # Vite bundler, directory aliases, and build parameters config
├── src/
│   ├── App.tsx                     # Main React application shell; mounts routes and global canvas
│   ├── App.css                     # (Optional wrapper styles) - Cleared for index.css system
│   ├── index.css                   # Global design system, theme variables, core layouts, utility styles
│   ├── main.tsx                    # Root React DOM rendering node entrypoint
│   ├── components/
│   │   ├── Header.tsx              # Desktop & Mobile Drawer navigation bar; contains theme toggle controls
│   │   ├── Footer.tsx              # Page footer containing all contact credentials wrapped in EditableLabels
│   │   ├── EditableLabel.tsx       # Live editor controller; renders edit pencile icons to authenticated admins
│   │   ├── ParticleBackground.tsx  # Square particle constellation canvas background animation loop
│   │   └── RealTimePrices.tsx      # Real-Time Price Trend Dashboard panel using Chart.js
│   └── pages/
│       ├── Home.tsx                # Homepage featuring Announcement banners, APMC cards, and Team profiles
│       ├── Publications.tsx        # Directory cards with dual View/Download split actions
│       ├── Forecasts.tsx           # LSTM model query widgets and J&K Orchard Ledger dashboard
│       ├── EWS.tsx                 # Instability quadrant grids, warning matrices, and volatility curves
│       ├── Markets.tsx             # Arrival-price trackers and historical Agmarknet Mandi logs
│       ├── OutlookList.tsx         # List view of Publications publications and text briefs
│       ├── OutlookDetail.tsx       # Detailed reading layout for publications
│       ├── Team.tsx                # Secondary Meet Our Team grid view
│       └── Admin.tsx               # Secure Administrator authentication login panel & dashboard configuration
```

---

## 2. Local Development Environment Setup

### Prerequisites
To run and edit this code locally, you must install the following software on your system:
- **Node.js:** Version 18.0.0 or higher. Download it from [nodejs.org](https://nodejs.org/).
- **Git:** Version Control System. Download it from [git-scm.com](https://git-scm.com/).
- **VS Code:** Recommended editor. Download it from [code.visualstudio.com](https://code.visualstudio.com/).

### Local Setup Steps
1. **Open VS Code** and load the project folder (`C:\Users\masro\.gemini\antigravity\scratch\micskuast-react-frontend`).
2. **Open the Terminal** inside VS Code (press **`Ctrl + ~`** or go to *Terminal ➔ New Terminal*).
3. **Install node dependencies:**
   ```bash
   npm install
   ```
4. **Boot the local development server:**
   ```bash
   npm run dev
   ```
5. **Preview the site:** Open your browser and navigate to `http://localhost:5173`. Any code modifications you save will immediately trigger hot module replacement (HMR) and update live in your browser tab!

---

## 3. Production Compiling & Bundle Optimization

When you are ready to ship your updates to the live server, you must convert the React typescript code into optimized, static production files.

Run the compiler script:
```bash
npm run build
```

### What happens during compilation?
- The compiler performs static type-checking (`tsc`) to verify no syntax errors exist.
- Vite bundles and minifies the code, splits packages (like Chart.js and Plotly) into asynchronous chunks, and strips out development references.
- Assets are generated with cache-busting hashes (e.g. `index-DCp31w4W.js` and `index-5dcC8nFg.css`).
- Outputs are saved inside the local **`dist/`** directory.

---

## 4. Hostinger Deployment Guide (Apache + PHP Backend)

This application is built as a single-page client-side router (SPA), which means the server needs to redirect all page routes (e.g., `/ews` or `/forecasts`) to `index.html` so React can parse them. 

### Step-by-Step Deployment Steps
1. **Log in** to your Hostinger hPanel ➔ open the **File Manager** for `micskuast.in`.
2. Go to **`public_html/`**.
3. **Important Cleanup:** Enter the **`public_html/assets/`** directory and delete any older `.js` or `.css` files (keep only the Vite default `react-CHdo91hT.svg` file).
4. **Upload files:**
   - Go to your local **`dist/`** folder.
   - Upload `index.html` directly to **`public_html/`** (overwrite the old one).
   - Enter the local `dist/assets/` folder, select all new hashed `.js` and `.css` bundles, and upload them directly into **`public_html/assets/`**.
5. **Config File & Rewrite Integrity Check:**
   - Make sure that **`public_html/.htaccess`** is present in the root folder. It contains rewrite rules to prevent 404 errors on browser page reloads:
     ```apache
     <IfModule mod_rewrite.c>
       RewriteEngine On
       RewriteBase /
       RewriteRule ^index\.html$ - [L]
       RewriteCond %{REQUEST_FILENAME} !-f
       RewriteCond %{REQUEST_FILENAME} !-d
       RewriteRule . /index.html [L]
     </IfModule>
     ```
   - Make sure **`public_html/api/config.php`** is present inside the `/api` folder. Do **not** overwrite this file unless you intend to reset your admin credentials or revert your live label database.
6. **Flush Litespeed Cache:** In Hostinger hPanel, click **Litespeed Cache** ➔ **Flush All** to force the server to distribute the new files instantly.

---

## 5. Administrative Visual Label Editor & PHP Database Bridge

The site features an on-page visual label editor. This lets you modify links, addresses, headings, and menus live without editing the code.

### How the Visual Editor Works
- The UI contains custom **`<EditableLabel />`** components mapping to specific database keys (e.g., `footer_phone`, `nav_ews`, `home_hero_title`).
- When a user logs in via `/admin` with the correct password, a token is saved locally to **`sessionStorage`** (`admin_authenticated = true`).
- If this token exists, React displays a small **blue pencil icon (✏️)** next to every dynamic label on the page.
- Clicking this icon opens an edit modal. Saving a label triggers a `POST` request to `public/api/config.php?action=update`, which updates the local configuration database.
- Visitors to the site trigger a `GET` request to `public/api/config.php?action=get` on load, which injects the latest live copy.

### Resetting Admin Credentials & Database Defaults
If you need to change your admin password or edit default settings, edit **`public/api/config.php`** directly:
- **Change Admin Password:** Modify the hash array or configure the secure login controller logic.
- **Fallbacks Database:** If the database config fails to initialize or SQLite is unavailable, the fallback settings are declared in `src/pages/Admin.tsx` (`defaultLabels` list) and inside `config.php`.

---

## 6. Multi-Theme Customization Engine (CSS Variables)

The application supports three visual themes: **☀️ Light (Agri-Clean)**, **🌙 Dark (High Contrast)**, and **☕ Warm (Eye-Comfort Sepia)**.

The theme settings are controlled inside [**`src/index.css`**](file:///C:/Users/masro/.gemini/antigravity/scratch/micskuast-react-frontend/src/index.css). The color configurations are declared as CSS custom properties:

```css
/* LIGHT THEME (Default) */
:root {
  --color-bg: #f9fafb;
  --color-surface: #fff;
  --color-text-main: #171f26;
  --color-text-muted: #677583;
  --color-border: #e2e6e9;
  --color-header-bg: rgba(255, 255, 255, 0.85);
  --color-primary: hsl(142, 72%, 18%); /* Green */
}

/* DARK THEME */
[data-theme="dark"] {
  --color-bg: #14181f;
  --color-surface: #1d212b;
  --color-text-main: #e7ebef;
  --color-text-muted: #9da6af;
  --color-border: #303541;
  --color-header-bg: rgba(20, 24, 33, 0.85);
  --color-primary: hsl(142, 65%, 70%);
}

/* WARM SEPIA THEME */
[data-theme="warm"] {
  --color-bg: #f5efe5;
  --color-surface: #fbf8f4;
  --color-text-main: #35261d;
  --color-text-muted: #846f62;
  --color-border: #e0dad1;
  --color-header-bg: rgba(247, 241, 227, 0.85);
  --color-primary: #104122;
}
```

### Adding New Theme Variables
To style new components with theme support, avoid hardcoding hex colors (like `#ffffff` or `#000000`). Instead, always declare variables (like `background-color: var(--color-surface)` or `color: var(--color-text-main)`). The components will automatically adapt when a user toggles the theme!

---

## 7. Vector Constellation Background (HTML5 Canvas)

The background constellation animation is handled inside [**`src/components/ParticleBackground.tsx`**](file:///C:/Users/masro/.gemini/antigravity/scratch/micskuast-react-frontend/src/components/ParticleBackground.tsx). It uses a lightweight `requestAnimationFrame` render loop on an HTML5 canvas element.

### Customizing the Animation Parameters
Open `ParticleBackground.tsx` to tweak the following configuration variables:

- **Particle Density:** Adjust the denominator in the particle initializer calculation:
  ```typescript
  const particleCount = Math.min(50, Math.floor((width * height) / 30000));
  ```
  *(Increase `30000` to decrease the number of particles, or decrease it to increase density).*
- **Movement Speed:** Modify the velocity multipliers `vx` and `vy`:
  ```typescript
  vx: (Math.random() - 0.5) * 0.22,
  vy: (Math.random() - 0.5) * 0.22,
  ```
  *(Increase `0.22` to make the particles move faster, or decrease it for a slower drift).*
- **Square Node Sizes:** Change the randomized width allocations:
  ```typescript
  size: Math.random() < 0.15 ? Math.random() * 4 + 7 : Math.random() * 2 + 3.5
  ```
  *(`7` to `11` represents the pixel width of larger nodes, and `3.5` to `5.5` represents smaller nodes).*
- **Visual Opacity & Thickness:**
  - Nodes draw fill opacity: `ctx.globalAlpha = 0.35` (35%).
  - Connecting lines draw stroke opacity: `ctx.globalAlpha = (1 - dist / maxDistance) * 0.28`.
  - Line thickness: `ctx.lineWidth = 1.0`.

---

## 8. Content Modification Manual

### Managing Team Profiles
To update team pictures or credentials on the Home or Team page:
1. Copy the new portrait file to the `public/team/` directory.
2. Open [**`src/pages/Home.tsx`**](file:///C:/Users/masro/.gemini/antigravity/scratch/micskuast-react-frontend/src/pages/Home.tsx) and find the team array (`teamMembers` object list).
3. Update the `name`, `role`, `designation`, and `image` file references (e.g., `image: '/team/new_photo.png'`).

### Managing Publications (PDFs)
To add a new research paper, textbook, or bulletin:
1. Upload the PDF file to Hostinger inside **`public_html/api/uploads/`**.
2. Open [**`src/pages/Publications.tsx`**](file:///C:/Users/masro/.gemini/antigravity/scratch/micskuast-react-frontend/src/pages/Publications.tsx).
3. Add a new card object to the `publicationsData` array:
   ```typescript
   {
     id: 'new-id-key',
     title: 'Title of the Publication',
     category: 'Research Papers', // Must match one of: 'Commodity Outlooks', 'Market Intelligence Reports', 'Research Papers', 'Books'
     description: 'Brief overview description of the document.',
     fileUrl: '/api/uploads/file_name.pdf', // URL to view
     downloadUrl: '/api/uploads/file_name.pdf' // URL to download
   }
   ```
4. Rebuild the project using `npm run build` and upload the new JS bundle.

### Modifying Mandi Price Charts & LSTM Forecast Parameters
- **APMC Mandi Logs:** Historical mandi prices are plotted inside `src/pages/Markets.tsx`. If you want to update default price curves, update the initial arrays in the Chart.js configuration state.
- **Orchard Ledger Plotly Dashboard:** Chart layouts and categorical totals are rendered inside `src/pages/OrchardLedger.tsx`. If you want to update agricultural production indices or area weights, edit the core constants at the top of that file (`SERIES`, `AREA_BY_CROP`, `YEARS`).

---

## 9. Git Version Control & Repository Pipeline

To stage and push your code updates to GitHub, open your terminal and run the following commands:

1. **Check Modified Files:**
   ```bash
   git status
   ```
2. **Stage all changes:**
   ```bash
   git add .
   ```
3. **Commit your changes:**
   ```bash
   git commit -m "feat: description of the adjustments made"
   ```
4. **Push to GitHub:**
   ```bash
   git push origin master
   ```

---

## 10. Developer Troubleshooting & FAQ

#### Q1: I uploaded the new build but the website shows a blank screen!
- **Reason:** The browser is trying to fetch older compiled assets. Go into your Hostinger control panel, flush your cache (Litespeed), and refresh your browser tab using **`Ctrl + F5`**.
- **Alternative Reason:** You might have uploaded the JS and CSS files into the wrong directory. Ensure all hashed files from `dist/assets/` are placed inside `public_html/assets/`, and the new `index.html` is placed inside `public_html/`.

#### Q2: Refreshes on sub-pages (e.g. `/ews` or `/forecasts`) return a 404 error!
- **Reason:** The server's rewriting configuration is missing. Ensure the **`.htaccess`** file is uploaded to the root `public_html/` folder on your server.

#### Q3: Changes I make in the Admin Label Editor do not save!
- **Reason:** The SQLite file `/api/config.php` does not have write permissions, or the `/api` directory on Hostinger is read-only.
- **Fix:** In your Hostinger File Manager, right-click on the `api` folder and select **Permissions**. Set the folder permissions to **`755`** and the file permissions for `config.php` to **`644`**.

#### Q4: The background constellation is not moving or has disappeared!
- **Reason:** A syntax error or javascript exception in another React component may have stopped the animation loop. Inspect the browser console (right-click ➔ *Inspect* ➔ *Console*) to check for errors.
