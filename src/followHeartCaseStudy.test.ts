import { describe, expect, it } from "vitest";
import { followHeartCaseStudy } from "./followHeartCaseStudy";

describe("followHeartCaseStudy", () => {
  it("models Mystic Lab as tarot plus parallel divination entries", () => {
    expect(followHeartCaseStudy.title).toBe("随心而行");
    expect(followHeartCaseStudy.scope.primary).toBe("塔罗 Tarot");
    expect(followHeartCaseStudy.scope.parallel).toEqual(["小六壬", "梅花易数"]);
    expect(followHeartCaseStudy.experienceModel.flow).toEqual(["问题", "仪式", "答案", "理解", "成长"]);
    expect(followHeartCaseStudy.experienceModel.layers.map((layer) => layer.title)).toEqual([
      "第一层：即时体验",
      "第二层：仪式体验",
      "第三层：成长体验"
    ]);
    expect(followHeartCaseStudy.sections.map((section) => section.id)).toEqual([
      "hero",
      "why",
      "problem-goal",
      "solution",
      "key-experience",
      "ui-showcase",
      "iterations",
      "reflection"
    ]);
  });

  it("uses clean assets for every public visual slot", () => {
    const allAssets = [
      followHeartCaseStudy.hero.poster,
      ...followHeartCaseStudy.why.stack.map((item) => item.image),
      ...followHeartCaseStudy.showcase.map((item) => item.image)
    ];

    expect(allAssets).toContain("/assets/case-studies/follow-heart/system-entry.png");
    expect(allAssets).toContain("/assets/case-studies/follow-heart/tarot-result.png");
    expect(allAssets.every((path) => path.startsWith("/assets/case-studies/follow-heart/"))).toBe(true);
    expect(allAssets.some((path) => path.includes("c392a4fb"))).toBe(false);
    expect(allAssets.some((path) => path.includes("976ec898"))).toBe(false);
  });
});
