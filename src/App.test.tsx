import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("Starry Product Lab OS", () => {
  it("opens on the Welcome window with the approved brand and commands", () => {
    render(<App />);

    expect(screen.getByRole("dialog", { name: "Welcome" })).toBeInTheDocument();
    expect(screen.getByText("✦ Starry Product Lab")).toBeInTheDocument();
    expect(screen.getByText("把灵感变成可运行的产品")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Hello，我是刘星雨" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "探索项目宇宙" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "查看简历" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "打开灵感收件箱" })).toBeInTheDocument();
  });

  it("opens the three-layer Project Universe and writes Terminal feedback", async () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "探索项目宇宙" }));

    expect(await screen.findByRole("dialog", { name: "项目宇宙" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "公开作品", level: 3 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "工作案例", level: 3 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "灵感实验", level: 3 })).toBeInTheDocument();
    expect(screen.getByText("> opening Project Universe...")).toBeInTheDocument();
    expect(screen.getByText("> 4 public works loaded")).toBeInTheDocument();
    expect(screen.getByText("> 3 work cases are privacy-safe")).toBeInTheDocument();
  });

  it("opens a product-thinking Project File and preserves Demo actions", async () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "探索项目宇宙" }));
    fireEvent.click(await screen.findByRole("button", { name: "打开项目档案 随心而行" }));

    expect(await screen.findByText("CASE STUDY 01 · 2026")).toBeInTheDocument();
    expect(screen.getByText("用一次有仪式感的占问，慢慢看懂牌，也慢慢看见自己。")).toBeInTheDocument();
    expect(screen.getByText("P1 迭代中")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "体验 Demo" })).toHaveAttribute(
      "href",
      "https://mystic-lab-sigma.vercel.app/"
    );
  });

  it("renders About Me as a scrollable portfolio page", async () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "打开 关于我" }));

    expect(await screen.findByRole("heading", { name: "我不只写 PRD，也会把想法亲手做出来。" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "三种身份" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "关注方向" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "产品工作方式" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "工具与个人档案" })).toBeInTheDocument();
  });

  it("renders project files as creative case studies", async () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "探索项目宇宙" }));
    fireEvent.click(await screen.findByRole("button", { name: "打开项目档案 随心而行" }));

    expect(await screen.findByText("CASE STUDY 01 · 2026")).toBeInTheDocument();
    expect(screen.getByText("塔罗 Tarot")).toBeInTheDocument();
    expect(screen.getByText("小六壬")).toBeInTheDocument();
    expect(screen.getByText("梅花易数")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "我为什么会做它？" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "一次占问，是一条完整的体验链路" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "查看下一个项目：Star PM" })).toBeInTheDocument();
  });

  it("renders Idea Inbox as notes with status and related projects", async () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "打开灵感收件箱" }));

    expect(await screen.findByRole("dialog", { name: "灵感收件箱" })).toBeInTheDocument();
    expect(screen.getByText("关联：AI Companion")).toBeInTheDocument();
    expect(screen.getByText("关联：随心而行")).toBeInTheDocument();
    expect(screen.getByText("关联：Star PM")).toBeInTheDocument();
    expect(screen.getByText("> scanning Idea Inbox...")).toBeInTheDocument();
  });

  it("runs Terminal commands and routes app commands", async () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "打开 Terminal" }));

    const input = await screen.findByLabelText("Terminal command");
    fireEvent.change(input, { target: { value: "cat moonpie.txt" } });
    fireEvent.submit(screen.getByTestId("terminal-form"));
    expect(screen.getByText("她喜欢把脑子里的小宇宙，做成别人能真正使用的产品。")).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "ideas" } });
    fireEvent.submit(screen.getByTestId("terminal-form"));
    expect(await screen.findByRole("dialog", { name: "灵感收件箱" })).toBeInTheDocument();
  });

  it("uses a compact Control Center instead of the old system strip", async () => {
    render(<App />);

    expect(screen.queryByText("系统功能")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "打开 Control Center" }));
    expect(await screen.findByRole("menu", { name: "Control Center" })).toBeInTheDocument();
    expect(screen.getByText("项目索引")).toBeInTheDocument();
    expect(screen.getByText("部署状态")).toBeInTheDocument();
    expect(screen.getByText("桌面快捷键")).toBeInTheDocument();
  });

  it("toggles and persists Pet Mode", () => {
    window.localStorage.clear();
    render(<App />);

    const toggle = screen.getByRole("button", { name: "关闭 Pet Mode" });
    expect(screen.getByLabelText("桌面小居民")).toBeInTheDocument();
    fireEvent.click(toggle);
    expect(screen.queryByLabelText("桌面小居民")).not.toBeInTheDocument();
    expect(window.localStorage.getItem("starry-pet-mode")).toBe("off");
  });

  it("closes the active window from the empty desktop", async () => {
    render(<App />);
    fireEvent.click(screen.getByTestId("desktop-blank"));

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });
});
