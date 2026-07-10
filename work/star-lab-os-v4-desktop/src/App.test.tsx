import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("Star Lab OS desktop", () => {
  it("opens Projects from a desktop icon and closes it from the blank desktop", async () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "打开 项目宇宙" }));
    expect(await screen.findByRole("dialog", { name: "项目宇宙" })).toBeInTheDocument();
    expect(screen.getByText("公开作品")).toBeInTheDocument();
    expect(screen.getByText("工作案例")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("desktop-blank"));
    await waitFor(() => {
      expect(screen.queryByRole("dialog", { name: "项目宇宙" })).not.toBeInTheDocument();
    });
  });

  it("preserves approved Demo links and project actions", async () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "打开 项目宇宙" }));

    expect(await screen.findByRole("link", { name: "随心而行 体验 Demo" })).toHaveAttribute(
      "href",
      "https://mystic-lab-sigma.vercel.app/"
    );
    expect(screen.getByRole("link", { name: "竞品分析工作台 体验脱敏 Demo" })).toHaveAttribute(
      "href",
      "https://competitive-analysis-workbench-demo.vercel.app/"
    );
    expect(screen.getByRole("link", { name: "AI Companion 体验 Demo" })).toHaveAttribute(
      "href",
      "https://chris-phone.vercel.app/"
    );
    expect(screen.getByRole("link", { name: "Star PM 体验 Demo" })).toHaveAttribute(
      "href",
      "https://star-project-manage.vercel.app/"
    );
    expect(screen.getByRole("button", { name: "AI 宠物软硬件产品 面试可演示" })).toBeInTheDocument();
  });

  it("opens project detail inside the animated desktop window", async () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "打开 项目宇宙" }));
    fireEvent.click(await screen.findByRole("button", { name: "随心而行 查看设计过程" }));

    expect(await screen.findByRole("heading", { name: "随心而行", level: 2 })).toBeInTheDocument();
    expect(screen.getByText("我为什么做它")).toBeInTheDocument();
    expect(screen.getByText("下一步计划")).toBeInTheDocument();
  });

  it("opens the other desktop apps", async () => {
    render(<App />);

    for (const label of ["关于我", "简历", "灵感收件箱", "Terminal"]) {
      fireEvent.click(screen.getByRole("button", { name: `打开 ${label}` }));
      expect(await screen.findByRole("dialog", { name: label })).toBeInTheDocument();
    }
  });

  it("does not render Today Note or a password vault", () => {
    render(<App />);

    expect(screen.queryByText("Today Note")).not.toBeInTheDocument();
    expect(screen.queryByText(/密码管理|密钥索引保险箱/)).not.toBeInTheDocument();
  });
});
