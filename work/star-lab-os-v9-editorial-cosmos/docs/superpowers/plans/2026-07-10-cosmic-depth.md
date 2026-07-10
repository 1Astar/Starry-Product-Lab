# Cosmic Depth Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade Starry Product Lab from a flat desktop portfolio into a semi-3D cosmic operating system while preserving v6 behavior and content.

**Architecture:** Keep the existing React/Vite app and static data model. Add a focused Three.js-backed project galaxy component, replace flat visual treatments with CSS material layers, and update the pet system only where GPT needs new pose assets and simplified click lines.

**Tech Stack:** React, TypeScript, Vite, Framer Motion, Three.js, CSS/Tailwind-style utility classes already present in project CSS, built-in ImageGen with local chroma-key removal.

## Global Constraints

- Work only in `work/star-lab-os-v7-cosmic-depth`.
- Preserve v6 as the original version.
- Do not add databases, API keys, real secrets, or GitHub links.
- Keep brand copy as `✦ Starry Product Lab` and `把灵感变成可运行的产品`.
- Keep static portfolio content and Demo links from v6.
- Latest pet click lines: GPT `先记下来，别让它跑掉。`; Claude `慢慢想，答案会自己浮出来。`; Cursor `正在巡逻代码边界。`

---

### Task 1: Set Up 3D Project Galaxy

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `src/ProjectGalaxy3D.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `Project[]` from `src/data.ts`
- Produces: `<ProjectGalaxy3D projects={projects} onOpenProject={fn} onOpenIdeas={fn} />`

- [ ] Add the `three` dependency.
- [ ] Create a Three.js component that renders mini planets with light/dark sides, orbit rings, star particles, and native HTML nameplates.
- [ ] Make `随心而行` the center/main planet and keep other public/work/idea items in orbit layers.
- [ ] Wire planet/nameplate clicks to the existing project file opening behavior.

### Task 2: Rework Visual Materials

**Files:**
- Modify: `src/styles.css`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: existing class names for windows, icons, terminal, inbox, project file, control center.
- Produces: semi-3D glass panels, acrylic icons, ceramic dock controls, cleaner cosmic background, and depth-aware window animation.

- [ ] Add depth tokens: radial gradients, rim light, bloom, noise texture, layered shadows, and perspective containers.
- [ ] Upgrade windows from flat translucent rectangles to floating glass panels with inner glow, edge highlight, and subtle perspective.
- [ ] Upgrade desktop icons and dock icons to tactile acrylic/ceramic buttons with hover lift and rotation.
- [ ] Clean the wallpaper into a layered star/lake/observatory atmosphere with central readability.
- [ ] Convert Idea Inbox notes into pinned paper notes with pins, paper shadows, and slight rotations.
- [ ] Convert Terminal into an inset monitor with scanlines, curved screen illusion, and stronger cursor treatment.

### Task 3: Redo GPT Pet Assets And Runtime

**Files:**
- Add: `public/assets/pets/idea-orb-idle.png`
- Add: `public/assets/pets/idea-orb-walk-left.png`
- Add: `public/assets/pets/idea-orb-walk-right.png`
- Add: `public/assets/pets/idea-orb-sit.png`
- Add: `public/assets/pets/idea-orb-react.png`
- Add: `public/assets/pets/idea-orb-sleep.png`
- Modify: `src/pets.ts`
- Modify: `src/usePetRoaming.ts`
- Modify: `src/DesktopPets.tsx`
- Modify: `src/styles.css`

**Interfaces:**
- Consumes: existing `DesktopPets` and `usePetRoaming` state machine.
- Produces: GPT pet rendered from six transparent pose PNGs, click copy fixed to one line per pet, and optional sleep state.

- [ ] Generate six Idea Orb poses on chroma-key backgrounds.
- [ ] Remove chroma-key backgrounds locally and save transparent PNG assets in the project.
- [ ] Update the pet model to support `sleep` and optional per-state image assets.
- [ ] Keep Claude and Cursor existing sprites but update their click dialogue to the latest one-line copy.
- [ ] Keep Pet Mode behavior and roaming zones intact.

### Task 4: Verify And Package

**Files:**
- Modify: `src/*.test.tsx`
- Modify: `src/*.test.ts`
- Add: `qa/cosmic-depth.md`
- Create: `outputs/starry-product-lab-v7-cosmic-depth.zip`

**Interfaces:**
- Consumes: Vitest, Vite build, local dev server, in-app browser when available.
- Produces: working local URL, passing tests/build if possible, and packaged v7 output.

- [ ] Update tests for new project galaxy and pet dialogue behavior.
- [ ] Run `npm test -- --run`.
- [ ] Run `npm run build`.
- [ ] Start Vite on an available local port and verify HTTP 200.
- [ ] Attempt browser visual QA; record any browser screenshot/tool limitation honestly.
- [ ] Package the v7 folder into `outputs/starry-product-lab-v7-cosmic-depth.zip`.
