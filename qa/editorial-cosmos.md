# Starry Product Lab v9 Editorial Cosmos QA

## Scope

- Preserved v8 and created a separate v9 folder: `work/star-lab-os-v9-editorial-cosmos`.
- Upgraded the Project Universe from an even information map into an asymmetric cosmic archive.
- Added six project poster assets under `public/assets/projects`.
- Added Moonpie-style human notes to project labels and project files.
- Added contextual pet positioning for inbox, resume/about, terminal, and projects.

## Visual Updates

- Project labels now vary in size, rotation, position, and hierarchy.
- Project file covers use dedicated poster art instead of cropped reference screenshots.
- Planets use procedural surface textures, stronger highlights, rim light, and local reflectance.
- Window surfaces have stronger layered shadows and glass depth.
- Typography adds more editorial serif headings and restrained handwritten annotations.

## Interaction

- Clicking a project in the galaxy launches a small star before opening the project file.
- GPT leans toward Idea Inbox, Claude toward resume/about paper surfaces, Cursor toward Terminal/projects.
- Existing Terminal, Control Center, Pet Mode, and project actions remain intact.

## Verification

- `npm test -- --run`: 4 files passed, 18 tests passed.
- `npm run build`: passed.
- Local preview: `http://127.0.0.1:5184/`.
- Browser screenshots:
  - `qa-v9-project-galaxy.png`
  - `qa-v9-project-file.png`
