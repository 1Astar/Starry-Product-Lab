import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { FollowHeartCaseStudy } from "./FollowHeartCaseStudyView";

describe("FollowHeartCaseStudy", () => {
  it("exports a renderable component", () => {
    expect(FollowHeartCaseStudy).toBeTypeOf("function");
  });

  it("renders all eight creative case-study sections", () => {
    render(<FollowHeartCaseStudy onBack={vi.fn()} onNavigate={vi.fn()} />);

    expect(screen.getByText("CASE STUDY 01 · 2026")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "随心而行" })).toBeInTheDocument();
    expect(screen.getByText("塔罗 Tarot")).toBeInTheDocument();
    expect(screen.getByText("小六壬")).toBeInTheDocument();
    expect(screen.getByText("梅花易数")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "我为什么会做它？" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "现有体验的问题" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "一次占问，是一条完整的体验链路" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Key Experience" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "UI Showcase" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "它不是一开始就叫“随心而行”" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "这个项目让我重新理解了“仪式感”" })).toBeInTheDocument();
  });

  it("changes the active solution node and opens a lightbox image", () => {
    render(<FollowHeartCaseStudy onBack={vi.fn()} onNavigate={vi.fn()} />);

    fireEvent.click(screen.getByRole("button", { name: "查看模块 看懂牌面" }));
    expect(screen.getByText("点击牌面符号，理解图像证据与象征来源。")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "放大查看 为什么是红心、三把剑与乌云" }));
    expect(screen.getByRole("dialog", { name: "为什么是红心、三把剑与乌云" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "关闭截图预览" }));
    expect(screen.queryByRole("dialog", { name: "为什么是红心、三把剑与乌云" })).not.toBeInTheDocument();
  });

  it("routes the back and next project actions", () => {
    const onBack = vi.fn();
    const onNavigate = vi.fn();
    render(<FollowHeartCaseStudy onBack={onBack} onNavigate={onNavigate} />);

    fireEvent.click(screen.getByRole("button", { name: "返回项目宇宙" }));
    expect(onBack).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole("button", { name: "查看下一个项目：Star PM" }));
    expect(onNavigate).toHaveBeenCalledWith("star-pm");
  });
});
