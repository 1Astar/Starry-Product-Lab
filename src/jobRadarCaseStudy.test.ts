import { describe, expect, it } from "vitest";
import { jobRadarCaseStudy } from "./jobRadarCaseStudy";

describe("jobRadarCaseStudy", () => {
  it("models Job Radar as an eight-section Idea Lab case study", () => {
    expect(jobRadarCaseStudy.eyebrow).toBe("CASE STUDY 04 · IDEA LAB · 2026");
    expect(jobRadarCaseStudy.title).toBe("Job Radar");
    expect(jobRadarCaseStudy.sections.map((section) => section.id)).toEqual([
      "hero",
      "why",
      "problem-goal",
      "solution",
      "key-experience",
      "ui-showcase",
      "iterations",
      "reflection"
    ]);
    expect(jobRadarCaseStudy.solution.flow).toEqual(["打开岗位页面", "采集岗位信息", "AI 解析", "判断模型", "行动输出", "后续动作"]);
    expect(jobRadarCaseStudy.solution.modules).toHaveLength(6);
    expect(jobRadarCaseStudy.showcase).toHaveLength(8);
  });
});
