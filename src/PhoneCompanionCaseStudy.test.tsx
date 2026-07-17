import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PhoneCompanionCaseStudy } from "./PhoneCompanionCaseStudyView";

describe("PhoneCompanionCaseStudy", () => {
  it("renders the small phone Idea Lab case study sections", () => {
    render(<PhoneCompanionCaseStudy onBack={vi.fn()} onNavigate={vi.fn()} />);

    expect(screen.getByText("CASE STUDY 02 · IDEA LAB · 2026")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "AI 陪伴小手机" })).toBeInTheDocument();
    expect(screen.getByText("陪伴感不是多说几句话，而是让人感觉它也在和你一起生活。")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "我为什么会做它？" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "AI 陪伴为什么容易变成“会聊天的工具”？" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "一台小手机，装下的是关系的连续性" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "重点体验：AI 不是一直说话，而是一直“在场”" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "我不想再做一个“可爱聊天框”" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "这个项目让我重新理解了 AI 陪伴的“在场感”" })).toBeInTheDocument();
  });

  it("routes back to Idea Lab and navigates to the next idea", () => {
    const onBack = vi.fn();
    const onNavigate = vi.fn();
    render(<PhoneCompanionCaseStudy onBack={onBack} onNavigate={onNavigate} />);

    fireEvent.click(screen.getAllByRole("button", { name: "返回 Idea Lab" })[0]);
    expect(onBack).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole("button", { name: "查看下一个 Idea：竞品分析工作台" }));
    expect(onNavigate).toHaveBeenCalledWith("competitor-workbench");
  });
});
