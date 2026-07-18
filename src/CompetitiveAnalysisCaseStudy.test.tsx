import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CompetitiveAnalysisCaseStudy } from "./CompetitiveAnalysisCaseStudyView";

describe("CompetitiveAnalysisCaseStudy", () => {
  it("renders the product tool case study sections", () => {
    render(<CompetitiveAnalysisCaseStudy onBack={vi.fn()} onNavigate={vi.fn()} />);

    expect(screen.getByText("CASE STUDY 03 · PRODUCT TOOL · 2026")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "竞品分析工作台" })).toBeInTheDocument();
    expect(screen.getByText("真正有用的竞品分析，不是截图更多，而是判断更稳。")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "我为什么会做它？" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "竞品分析为什么总是做完就散？" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "从散乱资料到产品判断，是一条工作流" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "重点体验：不是生成一份报告，而是建立判断链路" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "它不是一开始就是工作台" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "这个项目让我重新理解了“分析工具”的价值" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "竞品分析工作台 Demo 截图（已脱敏）" })).toHaveAttribute(
      "src",
      "/assets/case-studies/competitive-analysis/workbench-demo-masked.png"
    );
  });

  it("routes back to Idea Lab and navigates to the next idea", () => {
    const onBack = vi.fn();
    const onNavigate = vi.fn();
    render(<CompetitiveAnalysisCaseStudy onBack={onBack} onNavigate={onNavigate} />);

    fireEvent.click(screen.getAllByRole("button", { name: "返回 Idea Lab" })[0]);
    expect(onBack).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole("button", { name: "查看下一个 Idea：Job Radar" }));
    expect(onNavigate).toHaveBeenCalledWith("job-radar");
  });
});
