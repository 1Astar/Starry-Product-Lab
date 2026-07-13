import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ideas, projects } from "./data";
import { ProjectGalaxy3D } from "./ProjectGalaxy3D";

describe("ProjectGalaxy3D", () => {
  it("keeps the galaxy quiet until a planet is hovered", () => {
    render(<ProjectGalaxy3D projects={projects} ideas={ideas} onOpenProject={vi.fn()} onOpenIdeas={vi.fn()} />);

    expect(screen.queryByText("用轻量互动把传统文化体验变成更容易进入的自我探索工具。")).not.toBeInTheDocument();

    fireEvent.mouseEnter(screen.getByRole("button", { name: "打开项目档案 随心而行" }));

    expect(screen.getByRole("region", { name: "随心而行 悬浮档案" })).toBeInTheDocument();
    expect(screen.getByText("用轻量互动把传统文化体验变成更容易进入的自我探索工具。")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "查看项目 随心而行" })).toBeInTheDocument();

    fireEvent.mouseLeave(screen.getByRole("button", { name: "打开项目档案 随心而行" }));

    expect(screen.queryByRole("region", { name: "随心而行 悬浮档案" })).not.toBeInTheDocument();
  });
});
