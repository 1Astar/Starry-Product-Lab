import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";
import { ideas, projects } from "./data";

describe("Star Lab OS", () => {
  it("renders the desktop boot hero with both primary actions", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: "Hello，我是刘星雨" })).toBeInTheDocument();
    expect(screen.getByText("AI 产品经理 / 独立产品创造者")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "探索我的项目宇宙" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "查看简历" })).toBeInTheDocument();
  });

  it("keeps the portfolio grouped into public work, work cases, and idea lab", () => {
    expect(projects).toHaveLength(7);
    expect(projects.map((project) => project.name)).toEqual([
      "随心而行",
      "竞品分析工作台",
      "AI Companion",
      "Star PM",
      "AI 宠物软硬件产品",
      "IoT 远程运维平台",
      "元井小程序/界面案例"
    ]);
    expect(projects.filter((project) => project.category === "公开作品")).toHaveLength(4);
    expect(projects.filter((project) => project.category === "工作案例")).toHaveLength(3);
    expect(ideas.map((idea) => idea.title)).toEqual(["AI 共读搭子", "传统文化游戏化", "项目恢复系统"]);
  });

  it("opens the project universe from the hero action", async () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "探索我的项目宇宙" }));

    expect(await screen.findByRole("heading", { name: "Projects｜项目宇宙" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "公开作品" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "工作案例" })).toBeInTheDocument();
    expect(screen.getByText(/部分公司项目已进行脱敏处理/)).toBeInTheDocument();
    expect(screen.getAllByText("AI Companion").length).toBeGreaterThan(0);
  });

  it("opens a project detail template from a project card", async () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "探索我的项目宇宙" }));
    fireEvent.click(await screen.findByRole("button", { name: "随心而行 查看设计过程" }));

    expect(await screen.findByRole("heading", { name: "随心而行", level: 2 })).toBeInTheDocument();
    expect(screen.getByText("我为什么做它")).toBeInTheDocument();
    expect(screen.getByText("下一步计划")).toBeInTheDocument();
  });

  it("uses real demo links and does not show GitHub links", async () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "探索我的项目宇宙" }));

    expect(await screen.findByRole("link", { name: "竞品分析工作台 体验脱敏 Demo" })).toHaveAttribute(
      "href",
      "https://competitive-analysis-workbench-demo.vercel.app/"
    );
    expect(screen.getByRole("link", { name: "随心而行 体验 Demo" })).toHaveAttribute(
      "href",
      "https://mystic-lab-sigma.vercel.app/"
    );
    expect(screen.getByRole("link", { name: "AI Companion 体验 Demo" })).toHaveAttribute(
      "href",
      "https://chris-phone.vercel.app/"
    );
    expect(screen.getByRole("link", { name: "Star PM 体验 Demo" })).toHaveAttribute(
      "href",
      "https://star-project-manage.vercel.app/"
    );
    expect(screen.getByRole("button", { name: "随心而行 查看设计过程" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "AI 宠物软硬件产品 面试可演示" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /GitHub/i })).not.toBeInTheDocument();
  });

  it("opens an annotation modal and closes it from the blank overlay", async () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "打开 灵感收件箱 说明" }));

    expect(await screen.findByRole("dialog", { name: "灵感收件箱" })).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("module-modal-backdrop"));

    await waitFor(() => {
      expect(screen.queryByRole("dialog", { name: "灵感收件箱" })).not.toBeInTheDocument();
    });
  });
});
