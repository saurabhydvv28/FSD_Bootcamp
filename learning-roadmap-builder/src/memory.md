# Agent Memory — Learning Roadmap Builder (React + Vite)

**Created:** 2026-06-18  
**Project:** `learning-roadmap-builder`  
**Stack:** React 18 + Vite 5 + GSAP 3

---

## ✅ Completed Tasks

### Session 1 — 2026-06-18
- Analyzed the original `learning-roadmap-builder.html` (1284 lines, vanilla JS + GSAP)
- Scaffolded a full React + Vite project at `learning-roadmap-builder/`
- Converted all HTML/CSS/JS into React component architecture
- Created the following project files:

| File | Purpose |
|---|---|
| `package.json` | Deps: react, react-dom, gsap, vite, @vitejs/plugin-react |
| `vite.config.js` | Vite config with react plugin |
| `index.html` | Entry HTML, Google Fonts import |
| `src/main.jsx` | ReactDOM.createRoot entry |
| `src/index.css` | Global CSS vars, scrollbar, category color/stripe/tag classes |
| `src/data.js` | Initial state (roadmaps, milestones, activities), constants |
| `src/App.jsx` | Root component — all state management, event handlers |
| `src/App.module.css` | App layout styles |
| `src/hooks/useToast.js` | GSAP-powered toast hook with ref |
| `src/components/Sidebar.jsx` | Left sidebar: nav, roadmap list, new roadmap button |
| `src/components/Sidebar.module.css` | Sidebar styles |
| `src/components/Topbar.jsx` | Top bar: title, tab group, action buttons |
| `src/components/Topbar.module.css` | Topbar styles |
| `src/components/RoadmapCanvas.jsx` | Canvas view: draggable nodes, SVG connections |
| `src/components/RoadmapCanvas.module.css` | Canvas + node styles |
| `src/components/MilestonesGrid.jsx` | Grid view with filter buttons |
| `src/components/MilestonesGrid.module.css` | Grid/card styles |
| `src/components/Dashboard.jsx` | Stats, category bars, activity, skills, roadmap overview |
| `src/components/Dashboard.module.css` | Dashboard styles |
| `src/components/Modal.jsx` | MilestoneModal + RoadmapModal |
| `src/components/Modal.module.css` | Modal styles |
| `src/memory.md` | This file |

---

## 📋 Remaining Tasks

- [ ] **Install dependencies** — run `npm install` inside the project directory (requires network access)
- [ ] **Test & run** — run `npm run dev` and verify the app renders correctly
- [ ] **GSAP connection animations** — `animateConnections()` (stroke-dashoffset draw-on) is not yet wired; connections render statically in SVG. Add a `useEffect` in `RoadmapCanvas` to animate paths after render.
- [ ] **Auto-layout GSAP tween** — currently does instant position update via state; original used `gsap.to(el, { left, top })`. Add a smooth CSS transition or interpolation.
- [ ] **`animateStatNumbers`** — Dashboard stat cards animate on mount but re-renders don't re-trigger the counter animation. Wrap stat value in a keyed component or use a `useEffect` dep on value.
- [ ] **`animateProgressBars`** — same issue as stat numbers on Dashboard re-render.
- [ ] **Persist state to localStorage** — original was in-memory only; optionally add `useEffect` to save/load.
- [ ] **Mobile / responsive layout** — sidebar collapses to hamburger on small screens.
- [ ] **Export / Import roadmap** — add JSON export and import feature.
- [ ] **Keyboard shortcuts** — `Escape` to cancel connect mode, `N` to add milestone.

---

## 🏗️ Architecture Notes

- All app state lives in `App.jsx` (roadmaps, milestones, activities, UI state)
- CSS Modules used for component-scoped styles; global category color classes live in `index.css`
- GSAP imported directly from `gsap` npm package (no CDN)
- `useToast` hook returns `{ toastRef, showToast }` — attach `toastRef` to a `.toast` div in the root
- `connectMode` / `connectFrom` flow: toggle → click source → click target → dependency added → mode exits
- Node drag uses `mousedown` + `mousemove` / `mouseup` on `window` (same as original)
- SVG connections are pure React (no DOM manipulation) — re-render on every milestone position change

---

## 📝 Instructions for Next Agent

1. Read this file first for full context.
2. Run `npm install` then `npm run dev` inside `learning-roadmap-builder/` to boot the dev server.
3. Pick up any item from **Remaining Tasks** above.
4. After finishing, update ✅ Completed and 📋 Remaining sections.
5. Add a new dated block under **Session Log**.

---

## 🗂️ Session Log

### Session 1 — 2026-06-18
- Converted full vanilla HTML app → React + Vite component architecture
- 21 files created across `src/` and project root
- Network access unavailable in this env; `npm install` was not run
