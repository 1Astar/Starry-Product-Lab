import { describe, expect, it } from "vitest";
import { phoneCompanionCaseStudy } from "./phoneCompanionCaseStudy";

describe("phoneCompanionCaseStudy", () => {
  it("models AI Companion as an eight-section small phone Idea Lab case study", () => {
    expect(phoneCompanionCaseStudy.eyebrow).toBe("CASE STUDY 02 · IDEA LAB · 2026");
    expect(phoneCompanionCaseStudy.title).toBe("AI 陪伴小手机");
    expect(phoneCompanionCaseStudy.sections.map((section) => section.id)).toEqual([
      "hero",
      "why",
      "problem-goal",
      "solution",
      "key-experience",
      "ui-showcase",
      "iterations",
      "reflection"
    ]);
    expect(phoneCompanionCaseStudy.solution.flow).toEqual([
      "用户此刻状态",
      "AI 小伙伴状态感知",
      "陪伴入口",
      "关系沉淀",
      "下一次回应更有上下文"
    ]);
    expect(phoneCompanionCaseStudy.solution.modules).toHaveLength(6);
    expect(phoneCompanionCaseStudy.showcase).toHaveLength(7);
  });
});
