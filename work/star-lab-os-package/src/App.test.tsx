import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";
import { projects } from "./data";

describe("Star Lab OS", () => {
  it("renders the desktop boot hero with both primary actions", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: "Hello，我是刘星雨" })).toBeInTheDocument();
    expect(screen.getByText("AI 产品经理 / 独立产品创造者")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "探索我的项目宇宙" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "查看简历" })).toBeInTheDocument();
  });

  it("keeps the four featured projects complete", () => {
    expect(projects).toHaveLength(4);
    expect(projects.map((project) => project.name)).toEqual([
      "竞品分析工作台",
      "随心而行",
      "AI Companion",
      "Star PM"
    ]);
  });

  it("opens the project universe from the hero action", async () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "探索我的项目宇宙" }));

    expect(await screen.findByRole("heading", { name: "Projects｜项目宇宙" })).toBeInTheDocument();
    expect(screen.getAllByText("AI Companion").length).toBeGreaterThan(0);
  });

  it("opens a project detail template from a project card", async () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "探索我的项目宇宙" }));
    fireEvent.click(await screen.findByRole("button", { name: "查看 随心而行 详情" }));

    expect(await screen.findByRole("heading", { name: "随心而行", level: 2 })).toBeInTheDocument();
    expect(screen.getByText("我为什么做它")).toBeInTheDocument();
    expect(screen.getByText("下一步计划")).toBeInTheDocument();
  });

  it("uses real demo links and does not show GitHub links", async () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "探索我的项目宇宙" }));

    expect(await screen.findByRole("link", { name: "竞品分析工作台 Demo" })).toHaveAttribute(
      "href",
      "https://competitive-analysis-workbench-demo.vercel.app/"
    );
    expect(screen.getByRole("link", { name: "随心而行 Demo" })).toHaveAttribute(
      "href",
      "https://mystic-lab-sigma.vercel.app/"
    );
    expect(screen.getByRole("link", { name: "AI Companion Demo" })).toHaveAttribute(
      "href",
      "https://chris-phone.vercel.app/"
    );
    expect(screen.getByRole("link", { name: "Star PM Demo" })).toHaveAttribute(
      "href",
      "https://star-project-manage.vercel.app/"
    );
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
