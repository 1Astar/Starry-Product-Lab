# Starry Product Lab Pet Mode Design

## Goal

Improve the v5 desktop composition using the supplied Moonpie visual references and add three lightweight roaming desktop residents that give the OS a gentle system personality without obstructing portfolio content.

## Visual Direction

- Preserve the primary brand `✦ Starry Product Lab`.
- Use the supplied references for richer midnight-blue depth, moonlit paper, soft violet glass, fine gold star trails, handwritten annotations, custom archive-like icons, and clearer window hierarchy.
- Strengthen the project universe with more visible orbit structure and a project-file side panel feeling.
- Keep the interface gentle, poetic, and professional; avoid heavy cyberpunk, childish decoration, and SaaS feature-strip composition.

## Pet Assets

Create one four-state sprite set per resident:

1. GPT inspiration bubble creature: mint green, star white, softly glowing, round, small floating idea sparks.
2. Claude paper-roll reading creature: cream, pale violet, quiet and literary, paper-page and bookmark details.
3. Cursor engineering black cat: deep navy and charcoal, electric-blue accents, cable-like tail, cursor-like eyes.

Each set contains `idle`, `walk`, `sit`, and `react`. Assets share one illustration language, outline weight, lighting, and scale.

## Pet Behavior

- Pets roam only within the bottom 40% of the desktop.
- GPT prefers the left and Idea Inbox region.
- Claude prefers the center, About, Resume, and paper-note regions.
- Cursor prefers the right, Terminal, and Control Center region.
- Every 3–8 seconds a pet chooses a bounded target and state.
- Walking uses `requestAnimationFrame`; arrival switches to `idle` or `sit`.
- Pets do not cross the main window center or cover primary command buttons.
- Pointer position only changes facing/attention; pets do not chase the cursor.
- Clicking switches to `react`, shows one random line, then returns to normal.
- Long inactivity favors `sit`; a small sleep indicator may appear without adding a fifth state.
- Mobile does not roam; pets stay in a compact bottom resident tray.

## Dialogue

GPT:

- `先记下来，别让它跑掉。`
- `这像是个可以发芽的想法。`

Claude:

- `慢慢想，答案会自己浮出来。`
- `有些项目适合长大，不适合催熟。`

Cursor:

- `正在巡逻代码边界。`
- `别怕，我去追 bug。`

## Pet Mode

- Add a bottom-right `Pet Mode ✦` switch near Control Center.
- Default is on.
- Turning it off fades residents out and stops movement timers and animation frames.
- Turning it on restores each resident in its preferred region.
- Persist the preference in local storage.

## Architecture

- `pets.ts` owns resident definitions, zones, dialogue, and the pure state-transition helpers.
- `usePetRoaming.ts` owns timers, animation frames, inactivity handling, and bounded target selection.
- `DesktopPets.tsx` renders sprite states, reactions, and the mobile tray.
- `App.tsx` composes Pet Mode without changing existing project, Terminal, or window data contracts.

## Verification

- Unit tests cover zones, target bounds, state transitions, dialogue, and Pet Mode persistence.
- App tests cover switch behavior and reaction bubbles.
- Production build must pass.
- Desktop browser verification checks non-overlap, motion, reactions, and the three reference-driven interface improvements.
- Mobile verification checks the resident tray and absence of free roaming.
