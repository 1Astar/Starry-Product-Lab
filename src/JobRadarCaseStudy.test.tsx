import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { JobRadarCaseStudy } from "./JobRadarCaseStudyView";

vi.mock("framer-motion", () => ({
  motion: {
    article: "article",
    div: "div",
  },
}));

describe("JobRadarCaseStudy", () => {
  it("renders the Job Radar Idea Lab case study sections", () => {
    render(<JobRadarCaseStudy onBack={vi.fn()} onNavigate={vi.fn()} />);

    expect(screen.getByText("CASE STUDY 04 · IDEA LAB · 2026")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Job Radar" })).toBeInTheDocument();
    expect(screen.getByText("不是每个写着 AI 的岗位，都真的值得投。")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "我为什么会做它？" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "求职工具不应该只帮人“投得更多”" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "一次投递判断，是一条从页面到决策的链路" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "重点体验：先判断，再投递" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "它不是为了海投，而是为了少踩坑" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "这个项目让我重新理解了求职里的“判断成本”" })).toBeInTheDocument();
  });

  it("routes back to Idea Lab and navigates to the next idea", () => {
    const onBack = vi.fn();
    const onNavigate = vi.fn();
    render(<JobRadarCaseStudy onBack={onBack} onNavigate={onNavigate} />);

    fireEvent.click(screen.getAllByRole("button", { name: "返回 Idea Lab" })[0]);
    expect(onBack).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole("button", { name: "查看下一个 Idea：AI 共读陪伴" }));
    expect(onNavigate).toHaveBeenCalledWith("idea-reading-companion");
  });
});
