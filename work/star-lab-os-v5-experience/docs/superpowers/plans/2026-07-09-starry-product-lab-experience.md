# Starry Product Lab Experience Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the approved Starry Product Lab OS experience with a Welcome-first desktop, project star map, product-file archives, dynamic Terminal, paper-note Idea Inbox, and compact Control Center.

**Architecture:** Keep approved portfolio content in `data.ts`, extend its typed records only for archive and idea-note fields, and isolate Terminal behavior in a pure command module. `App.tsx` owns shared OS state and composes focused app panels; `styles.css` owns the reference-aligned desktop and mobile presentation.

**Tech Stack:** React, TypeScript, Vite, Framer Motion, Lucide React, Vitest, Testing Library.

## Global Constraints

- Modify only `work/star-lab-os-v5-experience`; preserve v4.
- Primary brand is `✦ Starry Product Lab`.
- Moonpie is Terminal personality only.
- Preserve approved project names, categories, action labels, and Demo URLs.
- Remove the persistent bottom feature strip.
- Mobile uses stable lists instead of positioned desktop star-map geometry.
- Keep UTF-8 source files.

---

### Task 1: OS behavior contract

**Files:**
- Modify: `src/App.test.tsx`
- Create: `src/terminal.ts`
- Create: `src/terminal.test.ts`

**Interfaces:**
- `runTerminalCommand(command: string): TerminalCommandResult`
- `TerminalCommandResult = { lines: string[]; openApp?: WindowId }`

- [ ] Add tests proving Welcome is default, Projects/Ideas/Resume append exact system lines, Terminal commands return exact copy, Control Center toggles, and the old system strip is absent.
- [ ] Run `npm test -- --run`; confirm new expectations fail against inherited v4 behavior.
- [ ] Implement the pure command map for `help`, `projects`, `about`, `resume`, `ideas`, and `cat moonpie.txt`.
- [ ] Run `npm test -- --run`; confirm command tests pass.

### Task 2: Typed archive content

**Files:**
- Modify: `src/types.ts`
- Modify: `src/data.ts`

**Interfaces:**
- Add `Project.archive: { start: string; iteration: string; current: string }`.
- Add `Idea.relatedProject: string`.
- Export `bootLines` and `appFeedback`.

- [ ] Add the approved 随心而行 archive copy exactly.
- [ ] Map other archive fields from existing `why`, `solution`, `progress`, and `role` copy without inventing new experience.
- [ ] Add related-project labels to the three existing ideas.
- [ ] Add exact Moonpie boot and app-feedback lines.

### Task 3: Welcome-first OS shell

**Files:**
- Modify: `src/App.tsx`

**Interfaces:**
- Shared state: active app, launch source, selected project, terminal history, command input, Control Center visibility.
- `openApp(id, source)` appends `appFeedback[id]`, triggers icon launch pulse, and opens from the matching transform origin.

- [ ] Make Welcome the default active app and render the approved brand, tagline, supporting line, identity copy, and three commands.
- [ ] Give desktop and Dock icons distinct archive-style icon treatments.
- [ ] Add icon bounce, dim layer, origin-aware window transition, reverse close transition, and blank-desktop close.
- [ ] Replace the persistent system strip with the bottom-right Control Center popover.

### Task 4: App personalities

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/styles.css`

**Interfaces:**
- `ProjectUniverse`, `ProjectFile`, `IdentityProfile`, `ResumePreviewer`, `IdeaInbox`, `TerminalConsole`, `ControlCenter`.

- [ ] Build the three-layer project star map and mobile project list.
- [ ] Build Project File views with start, iteration, current stage, role, and approved actions.
- [ ] Add hover archive overlays showing why, role, and status.
- [ ] Build About as identity card, timeline, capabilities, and product belief.
- [ ] Keep Resume as a file previewer.
- [ ] Build Idea Inbox as layered paper notes with status and related project.
- [ ] Connect Terminal input to `runTerminalCommand` and shared app navigation.

### Task 5: Verification and handoff

**Files:**
- Create: `design-qa.md`

**Interfaces:**
- Verify the source reference and local implementation at desktop and mobile widths.

- [ ] Run `npm test -- --run` and `npm run build`.
- [ ] Start Vite on an unused port without replacing v4.
- [ ] In the in-app browser verify Welcome, app launches, Terminal commands, Project File, Idea Inbox, Control Center, blank close, and mobile layout.
- [ ] Record comparison evidence and final QA result in `design-qa.md`.
