export type WindowId = "home" | "projects" | "about" | "resume" | "inbox" | "terminal";

export type ProjectStatus = "MVP 展示版" | "进行中" | "概念验证" | "长期迭代";

export interface Project {
  id: string;
  name: string;
  type: string;
  value: string;
  role: string;
  status: ProjectStatus;
  demoUrl: string;
  updatedAt: string;
  summary: string;
  why: string;
  problem: string;
  solution: string;
  features: string[];
  contribution: string[];
  progress: string;
  next: string[];
}

export interface Idea {
  title: string;
  note: string;
  status: string;
}

export type ModuleNoteId = "project-detail" | "idea-inbox" | "key-vault" | "system-functions";

export interface ModuleNote {
  id: ModuleNoteId;
  title: string;
  kicker: string;
  description: string;
  bullets: string[];
}
