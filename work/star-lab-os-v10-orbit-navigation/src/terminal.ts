import type { WindowId } from "./types";

export interface TerminalCommandResult {
  lines: string[];
  openApp?: WindowId;
}

const routes: Record<string, WindowId> = {
  projects: "projects",
  about: "about",
  resume: "resume",
  ideas: "inbox"
};

export function runTerminalCommand(rawCommand: string): TerminalCommandResult {
  const command = rawCommand.trim().toLowerCase();

  if (command === "help") {
    return {
      lines: ["available commands:", "projects · about · resume · ideas", "cat moonpie.txt"]
    };
  }

  if (command === "cat moonpie.txt") {
    return {
      lines: ["她喜欢把脑子里的小宇宙，做成别人能真正使用的产品。"]
    };
  }

  if (routes[command]) {
    return {
      lines: [`opening ${command}...`],
      openApp: routes[command]
    };
  }

  if (!command) {
    return { lines: [] };
  }

  return {
    lines: [`command not found: ${command}`, 'type "help" to see available commands.']
  };
}
