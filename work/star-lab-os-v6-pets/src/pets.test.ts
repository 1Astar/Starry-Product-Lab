import { describe, expect, it } from "vitest";
import { getTargetForZone, nextRestState, petDefinitions, pickDialogue } from "./pets";

describe("pet roaming rules", () => {
  it("keeps each resident inside its preferred horizontal zone and bottom 40 percent", () => {
    const viewport = { width: 1000, height: 800 };

    expect(getTargetForZone("left", viewport, () => 0.5)).toEqual({ x: 210, y: 624 });
    expect(getTargetForZone("center", viewport, () => 0.5)).toEqual({ x: 500, y: 624 });
    expect(getTargetForZone("right", viewport, () => 0.5)).toEqual({ x: 790, y: 624 });
  });

  it("only returns idle or sit after arriving", () => {
    expect(nextRestState(() => 0.2)).toBe("idle");
    expect(nextRestState(() => 0.8)).toBe("sit");
  });

  it("selects dialogue from the resident personality", () => {
    expect(pickDialogue(petDefinitions[0], () => 0)).toBe("先记下来，别让它跑掉。");
    expect(pickDialogue(petDefinitions[2], () => 0.99)).toBe("别怕，我去追 bug。");
  });
});
