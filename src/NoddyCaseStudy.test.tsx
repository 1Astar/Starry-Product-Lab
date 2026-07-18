import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { NoddyCaseStudy } from "./NoddyCaseStudyView";

describe("NoddyCaseStudy", () => {
  it("renders the Noddy creative case study sections", () => {
    render(<NoddyCaseStudy onBack={vi.fn()} onNavigate={vi.fn()} />);

    expect(screen.getByText("CASE STUDY 02 · 2026")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "AI 宠物 / Noddy" })).toBeInTheDocument();
    expect(screen.getByText("真正的陪伴感，不是它一直说话，而是它在合适的时候回应你。")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "我为什么会做它？" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "一次陪伴，不是一句回复，而是一条完整的状态链路" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "它不是一开始就“像活的”" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "这个项目让我重新理解了“陪伴感”" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Noddy 陪伴首页原型图（已脱敏）" })).toHaveAttribute(
      "src",
      "/assets/case-studies/noddy/home-masked.png"
    );
  });

  it("routes back and next project actions", () => {
    const onBack = vi.fn();
    const onNavigate = vi.fn();
    render(<NoddyCaseStudy onBack={onBack} onNavigate={onNavigate} />);

    fireEvent.click(screen.getAllByRole("button", { name: "返回项目宇宙" })[0]);
    expect(onBack).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole("button", { name: "查看下一个项目：Star PM" }));
    expect(onNavigate).toHaveBeenCalledWith("star-pm");
  });
});
