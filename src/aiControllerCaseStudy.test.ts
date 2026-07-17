import { describe, expect, it } from "vitest";
import { aiControllerCaseStudy } from "./aiControllerCaseStudy";

describe("aiControllerCaseStudy", () => {
  it("models the AI controller as an industrial operations case study", () => {
    expect(aiControllerCaseStudy.eyebrow).toBe("CASE STUDY 04 · 2026");
    expect(aiControllerCaseStudy.title).toBe("AI 控制器 / 智能水泵控制系统");
    expect(aiControllerCaseStudy.sections.map((section) => section.id)).toEqual([
      "hero",
      "why",
      "problem-goal",
      "solution",
      "key-experience",
      "ui-showcase",
      "iterations",
      "reflection"
    ]);
    expect(aiControllerCaseStudy.solution.layers).toEqual(["设备接入", "绑定与归属", "状态采集", "远程控制", "控制回执", "告警诊断", "工单与售后", "运行服务"]);
    expect(aiControllerCaseStudy.solution.modules).toHaveLength(6);
    expect(aiControllerCaseStudy.showcase).toHaveLength(8);
  });
});
