# Starry Product Lab v7 QA

## Scope

- New version folder: `work/star-lab-os-v7-cosmic-depth`
- Source preserved: `work/star-lab-os-v6-pets`
- Focus: semi-3D cosmic OS direction, project planets, floating glass panels, tactile icons, pinned idea notes, terminal screen treatment, and new GPT Idea Orb pet assets.

## Verification

- `npm test -- --run`
  - Result: 4 test files passed, 17 tests passed.
- `npm run build`
  - Result: build completed successfully.
  - Note: Vite reported a chunk-size warning after adding Three.js. This is expected for the current static prototype and does not block the build.
- Local browser check
  - URL: `http://127.0.0.1:5180/`
  - Welcome window loaded with `Starry Product Lab` and `Hello，我是刘星雨`.
  - GPT pet frame loaded from `/assets/pets/idea-orb-idle.png`.
  - Project Universe opened from the Welcome action.
  - Three.js canvas rendered inside `.galaxy-3d`.
  - Terminal feedback showed project universe loading lines.
  - Browser screenshot captured successfully.

## Assets

- `public/assets/pets/idea-orb-idle.png`
- `public/assets/pets/idea-orb-walk-left.png`
- `public/assets/pets/idea-orb-walk-right.png`
- `public/assets/pets/idea-orb-sit.png`
- `public/assets/pets/idea-orb-react.png`
- `public/assets/pets/idea-orb-sleep.png`

All six Idea Orb files are 512x512 transparent PNG assets. The right-walk pose is mirrored from the left-walk pose to keep the character silhouette consistent.
