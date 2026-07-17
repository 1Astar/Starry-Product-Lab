import { describe, expect, it } from "vitest";
import { getProjectVisuals } from "./projectVisuals";

describe("project case-study visuals", () => {
  it("uses the captured public demo screenshot as the primary visual", () => {
    expect(getProjectVisuals("follow-heart", "/assets/projects/follow-heart-poster.svg")).toEqual([
      "/assets/screenshots/follow-heart-demo.png"
    ]);
  });

  it("keeps a work case on its supplied desensitized poster", () => {
    expect(getProjectVisuals("iot-ops", "/assets/projects/iot-ops-poster.svg")).toEqual([
      "/assets/projects/iot-ops-poster.svg"
    ]);
  });
});
