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

  it("renders nothing when Pet Mode is off", () => {
    render(<DesktopPets enabled={false} />);
    expect(screen.queryByLabelText("桌面小居民")).not.toBeInTheDocument();
  });
});
