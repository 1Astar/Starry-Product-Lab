export type PetKind = "gpt" | "claude" | "cursor";
export type PetState = "idle" | "walk" | "sit" | "react";
export type PetZone = "left" | "center" | "right";

export interface PetDefinition {
  id: PetKind;
  name: string;
  zone: PetZone;
  speed: number;
  sprite: string;
  dialogue: [string, string];
}

export interface PetRuntime extends PetDefinition {
  state: PetState;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  facing: 1 | -1;
  message: string | null;
  sleeping: boolean;
}

export const petDefinitions: PetDefinition[] = [
  {
    id: "gpt",
    name: "灵感泡泡兽",
    zone: "left",
    speed: 24,
    sprite: "/assets/pets/gpt-sprites.png",
    dialogue: ["先记下来，别让它跑掉。", "这像是个可以发芽的想法。"]
  },
  {
    id: "claude",
    name: "纸卷阅读兽",
    zone: "center",
    speed: 18,
    sprite: "/assets/pets/claude-sprites.png",
    dialogue: ["慢慢想，答案会自己浮出来。", "有些项目适合长大，不适合催熟。"]
  },
  {
    id: "cursor",
    name: "工程小黑猫",
    zone: "right",
    speed: 29,
    sprite: "/assets/pets/cursor-sprites.png",
    dialogue: ["正在巡逻代码边界。", "别怕，我去追 bug。"]
  }
];

const zoneBounds: Record<PetZone, [number, number]> = {
  left: [0.08, 0.34],
  center: [0.36, 0.64],
  right: [0.66, 0.92]
};

export function getTargetForZone(
  zone: PetZone,
  viewport: { width: number; height: number },
  random = Math.random
) {
  const [minX, maxX] = zoneBounds[zone];
  return {
    x: Math.round(viewport.width * (minX + (maxX - minX) * random())),
    y: Math.round(viewport.height * (0.62 + 0.32 * random()))
  };
}

export function nextRestState(random = Math.random): Extract<PetState, "idle" | "sit"> {
  return random() < 0.58 ? "idle" : "sit";
}

export function pickDialogue(pet: PetDefinition, random = Math.random) {
  return pet.dialogue[Math.min(1, Math.floor(random() * pet.dialogue.length))];
}

export function createInitialPets(viewport: { width: number; height: number }): PetRuntime[] {
  return petDefinitions.map((pet, index) => {
    const target = getTargetForZone(pet.zone, viewport, () => 0.35 + index * 0.14);
    return {
      ...pet,
      state: index === 1 ? "sit" : "idle",
      x: target.x,
      y: target.y,
      targetX: target.x,
      targetY: target.y,
      facing: index === 2 ? -1 : 1,
      message: null,
      sleeping: false
    };
  });
}
