import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DesktopPets } from "./DesktopPets";

describe("DesktopPets", () => {
  it("renders three residents and shows a personality line on click", () => {
    render(<DesktopPets enabled />);

    expect(screen.getByRole("button", { name: "灵感泡泡兽" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "纸卷阅读兽" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "工程小黑猫" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "灵感泡泡兽" }));
    expect(screen.getByRole("status")).toHaveTextContent("先记下来，别让它跑掉。");
  });

  it("shows the comic bubble on pointer interaction", () => {
    render(<DesktopPets enabled />);

    fireEvent.pointerDown(screen.getByRole("button", { name: "灵感泡泡兽" }));

    expect(screen.getByRole("status")).toHaveTextContent("先记下来，别让它跑掉。");
  });

  it("lets a resident be dragged around the desktop", () => {
    render(<DesktopPets enabled />);

    const pet = screen.getByRole("button", { name: "灵感泡泡兽" });
    fireEvent.pointerDown(pet, { pointerId: 1, clientX: 120, clientY: 580 });
    fireEvent.pointerMove(pet, { pointerId: 1, clientX: 260, clientY: 640 });
    fireEvent.pointerUp(pet, { pointerId: 1, clientX: 260, clientY: 640 });

    expect(pet).toHaveStyle({ left: "260px", top: "640px" });
  });

  it("renders nothing when Pet Mode is off", () => {
    render(<DesktopPets enabled={false} />);
    expect(screen.queryByLabelText("桌面小居民")).not.toBeInTheDocument();
  });
});
