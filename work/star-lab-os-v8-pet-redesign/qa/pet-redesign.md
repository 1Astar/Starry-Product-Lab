# Starry Product Lab v8 Pet Redesign QA

## Scope

- Preserved v7 and created a separate v8 folder: `work/star-lab-os-v8-pet-redesign`.
- Replaced the desktop residents with the approved black-and-white pet direction.
- Added 18 transparent PNG state assets under `public/assets/pets/v8`.
- Updated pet dialogue presentation into comic-style speech bubbles.

## Pet Assets

- GPT: idle, walk-left, walk-right, sit, react, sleep.
- Claude: idle, walk-left, walk-right, sit, react, sleep.
- Cursor: idle, walk-left, walk-right, sit, react, sleep.

## Interaction

- Pet Mode remains available from the lower-right switch.
- Clicking or pressing a resident triggers its react state and speech bubble.
- Dialogue lines:
  - GPT: 先记下来，别让它跑掉。
  - Claude: 慢慢想，答案会自己浮出来。
  - Cursor: 正在巡逻代码边界。

## Verification

- `npm test -- --run`: 4 files passed, 18 tests passed.
- `npm run build`: passed.
- Local preview: `http://127.0.0.1:5183/` returned TCP success.
