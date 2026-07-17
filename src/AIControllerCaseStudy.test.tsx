import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AIControllerCaseStudy } from "./AIControllerCaseStudyView";

describe("AIControllerCaseStudy", () => {
  it("renders the industrial controller creative case study sections", () => {
    render(<AIControllerCaseStudy onBack={vi.fn()} onNavigate={vi.fn()} />);

    expect(screen.getByText("CASE STUDY 04 · 2026")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "AI 控制器 / 智能水泵控制系统" })).toBeInTheDocument();
    expect(screen.getByText("B 端产品的安全感，来自每一次控制都有状态、权限和回执。")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "我为什么会做它？" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "一台设备接入后，真正要管理的是整条运行链路" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "它不是一个控制按钮项目" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "这个项目让我重新理解了 B 端产品的“可靠”" })).toBeInTheDocument();
  });

  it("routes back and next project actions", () => {
    const onBack = vi.fn();
    const onNavigate = vi.fn();
    render(<AIControllerCaseStudy onBack={onBack} onNavigate={onNavigate} />);

    fireEvent.click(screen.getAllByRole("button", { name: "返回项目宇宙" })[0]);
    expect(onBack).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole("button", { name: "查看下一个项目：传统文化游戏化学习" }));
    expect(onNavigate).toHaveBeenCalledWith("culture-game");
  });
});
