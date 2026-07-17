import { describe, expect, it } from "vitest";
import { competitiveAnalysisCaseStudy } from "./competitiveAnalysisCaseStudy";

describe("competitiveAnalysisCaseStudy", () => {
  it("models the competitive analysis workbench as an eight-section product tool case study", () => {
    expect(competitiveAnalysisCaseStudy.eyebrow).toBe("CASE STUDY 03 · PRODUCT TOOL · 2026");
    expect(competitiveAnalysisCaseStudy.title).toBe("竞品分析工作台");
    expect(competitiveAnalysisCaseStudy.sections.map((section) => section.id)).toEqual([
      "hero",
      "why",
      "problem-goal",
      "solution",
      "key-experience",
      "ui-showcase",
      "iterations",
      "reflection"
    ]);
    expect(competitiveAnalysisCaseStudy.solution.flow).toEqual(["导入数据", "字段映射", "竞品卡片", "分析模块", "输出结果"]);
    expect(competitiveAnalysisCaseStudy.solution.modules).toHaveLength(6);
    expect(competitiveAnalysisCaseStudy.showcase).toHaveLength(8);
  });
});
