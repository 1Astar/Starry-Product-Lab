import { describe, expect, it } from "vitest";
import { runTerminalCommand } from "./terminal";

describe("runTerminalCommand", () => {
  it("lists the supported commands", () => {
    expect(runTerminalCommand("help").lines).toEqual([
      "available commands:",
      "projects · about · resume · ideas",
      "cat moonpie.txt"
    ]);
  });

  it("returns the Moonpie easter egg", () => {
    expect(runTerminalCommand("cat moonpie.txt").lines).toEqual([
      "她喜欢把脑子里的小宇宙，做成别人能真正使用的产品。"
    ]);
  });

  it("routes application commands", () => {
    expect(runTerminalCommand("projects").openApp).toBe("projects");
    expect(runTerminalCommand("about").openApp).toBe("about");
    expect(runTerminalCommand("resume").openApp).toBe("resume");
    expect(runTerminalCommand("ideas").openApp).toBe("inbox");
  });

  it("handles unknown commands", () => {
    expect(runTerminalCommand("launch moon").lines).toEqual([
      "command not found: launch moon",
      'type "help" to see available commands.'
    ]);
  });
});
