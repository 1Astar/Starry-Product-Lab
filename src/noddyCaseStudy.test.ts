import { describe, expect, it } from "vitest";
import { noddyCaseStudy } from "./noddyCaseStudy";

describe("noddyCaseStudy", () => {
  it("models Noddy as an eight-section companion case study", () => {
    expect(noddyCaseStudy.eyebrow).toBe("CASE STUDY 02 · 2026");
    expect(noddyCaseStudy.title).toBe("AI 宠物 / Noddy");
    expect(noddyCaseStudy.sections.map((section) => section.id)).toEqual([
      "hero",
      "why",
      "problem-goal",
      "solution",
      "key-experience",
      "ui-showcase",
      "iterations",
      "reflection"
    ]);
    expect(noddyCaseStudy.solution.flow[0]).toBe("用户靠近 / 触摸 / 呼唤 / 陪伴");
    expect(noddyCaseStudy.solution.modules).toHaveLength(6);
    expect(noddyCaseStudy.showcase).toHaveLength(7);
  });
});
