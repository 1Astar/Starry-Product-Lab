# Star Lab OS Desktop Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the existing portfolio as a faithful interactive night-desktop interface while preserving its approved project content and links.

**Architecture:** Keep `data.ts` and `types.ts` as the content source. Replace the page shell with a desktop composition that owns icon selection and one active animated window, while reusable project, detail, resume, about, inbox, and terminal components render inside that window. Use real project screenshots as card media and a card-list mobile layout below 760px.

**Tech Stack:** React, TypeScript, Vite, Framer Motion, Lucide React, Vitest, Testing Library.

## Global Constraints

- Work only in `work/star-lab-os-v4-desktop`; preserve `work/star-lab-os`.
- Preserve all approved project copy, categories, action labels, and Demo URLs.
- Do not include Today Note or the key-vault/password module.
- Desktop icons and Dock controls open animated windows; clicking the empty desktop closes the active window.
- Mobile uses a card-list layout without desktop dragging.
- Keep all source files UTF-8.

---

### Task 1: Desktop interaction contract

**Files:**
- Modify: `src/App.test.tsx`

**Interfaces:**
- Consumes: existing `App` export.
- Produces: tests for desktop icons, window opening/closing, project links, excluded modules, and mobile-safe content.

- [ ] Add failing tests that click `项目宇宙`, open its dialog, close it from the desktop backdrop, and confirm the existing Demo URLs.
- [ ] Run `npm test -- --run` and confirm the desktop tests fail against the inherited interface.

### Task 2: Desktop shell and windows

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/styles.css`

**Interfaces:**
- Consumes: `projects`, `ideas`, `displayStatement`, and `terminalLines`.
- Produces: `DesktopIcon`, `Dock`, `AppWindow`, `ProjectsPanel`, `ProjectDetail`, `AboutPanel`, `ResumePanel`, `IdeasPanel`, and `TerminalPanel`.

- [ ] Implement the macOS-style menu bar, left Dock, desktop icon grid, central Selected Works window, compact terminal, handwritten annotations, and system-function strip.
- [ ] Add Framer Motion open/close transitions, restrained pointer parallax, project hover motion, and blank-desktop close behavior.
- [ ] Preserve the approved project actions and project-detail flow.
- [ ] Remove Today Note and all key-vault/password UI.

### Task 3: Real project media

**Files:**
- Create: `public/assets/projects/*.png`
- Modify: `src/data.ts`
- Modify: `src/types.ts`

**Interfaces:**
- Consumes: four approved public Demo URLs.
- Produces: `image` paths used by project cards and detail views.

- [ ] Capture or create one representative image for each public project.
- [ ] Add optional project image paths without changing existing project copy or URLs.
- [ ] Verify every rendered image loads and uses a stable aspect ratio.

### Task 4: Verification

**Files:**
- Create: `design-qa.md`

**Interfaces:**
- Consumes: reference image and rendered desktop/mobile screenshots.
- Produces: a comparison ledger with `final result: passed`.

- [ ] Run `npm test -- --run` and `npm run build`.
- [ ] Start the Vite server on an unused port.
- [ ] Verify desktop window opening, blank-area closing, project actions, and mobile card layout in the in-app browser.
- [ ] Compare the rendered desktop screenshot against the reference image, fix P0-P2 differences, and record the final QA result.
