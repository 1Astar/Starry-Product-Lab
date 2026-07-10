import {
  ArrowLeft,
  ArrowUpRight,
  BriefcaseBusiness,
  ChevronRight,
  Cloud,
  Download,
  ExternalLink,
  FileText,
  Inbox,
  LayoutGrid,
  Mail,
  Menu,
  Moon,
  Rocket,
  Sparkles,
  Star,
  Tags,
  TerminalSquare,
  UserRound,
  Wifi,
  X
} from "lucide-react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useMemo, useState } from "react";
import type { ComponentType, PointerEvent, ReactNode } from "react";
import { displayStatement, ideas, projects, terminalLines } from "./data";
import type { Project, ProjectAction, WindowId } from "./types";

type AppId = Exclude<WindowId, "home">;

interface AppItem {
  id: AppId;
  label: string;
  menuLabel: string;
  icon: ComponentType<{ size?: number }>;
  tone: string;
}

const appItems: AppItem[] = [
  { id: "projects", label: "项目宇宙", menuLabel: "Projects", icon: Star, tone: "violet" },
  { id: "about", label: "关于我", menuLabel: "About Me", icon: UserRound, tone: "rose" },
  { id: "resume", label: "简历", menuLabel: "Resume", icon: FileText, tone: "paper" },
  { id: "inbox", label: "灵感收件箱", menuLabel: "Idea Inbox", icon: Inbox, tone: "amber" },
  { id: "terminal", label: "Terminal", menuLabel: "Terminal", icon: TerminalSquare, tone: "dark" }
];

const appTitles: Record<AppId, string> = {
  projects: "项目宇宙",
  about: "关于我",
  resume: "简历",
  inbox: "灵感收件箱",
  terminal: "Terminal"
};

const windowMotion = {
  hidden: { opacity: 0, scale: 0.96, y: 18 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.96, y: 14 }
};

function App() {
  const [activeApp, setActiveApp] = useState<AppId | null>("projects");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 24, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 24, mass: 0.5 });
  const backgroundX = useTransform(springX, [-1, 1], [-8, 8]);
  const backgroundY = useTransform(springY, [-1, 1], [-6, 6]);
  const terminalX = useTransform(springX, [-1, 1], [7, -7]);
  const terminalY = useTransform(springY, [-1, 1], [6, -6]);

  const selectedProject = useMemo(
    () => projects.find((project) => project.id === selectedProjectId) ?? null,
    [selectedProjectId]
  );

  const openApp = (id: AppId) => {
    setSelectedProjectId(null);
    setActiveApp(id);
  };

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (typeof window === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    mouseX.set((event.clientX / window.innerWidth - 0.5) * 2);
    mouseY.set((event.clientY / window.innerHeight - 0.5) * 2);
  };

  const closeWindow = () => {
    setSelectedProjectId(null);
    setActiveApp(null);
  };

  return (
    <main className="os-shell" onPointerMove={handlePointerMove}>
      <motion.div className="wallpaper-layer" style={{ x: backgroundX, y: backgroundY }} />
      <TopBar onOpen={openApp} />

      <div
        className="desktop-blank"
        data-testid="desktop-blank"
        onClick={(event) => {
          if (event.target === event.currentTarget) closeWindow();
        }}
      >
        <DesktopIntro onProjects={() => openApp("projects")} onResume={() => openApp("resume")} />
        <DesktopIcons onOpen={openApp} />
        <Dock activeApp={activeApp} onOpen={openApp} />

        <motion.aside className="floating-terminal" style={{ x: terminalX, y: terminalY }}>
          <WindowBar title="Star Lab Terminal" compact />
          <TerminalBody compact />
        </motion.aside>

        <AnimatePresence mode="wait">
          {activeApp ? (
            <AppWindow
              key={`${activeApp}-${selectedProjectId ?? "root"}`}
              title={selectedProject ? "Project Detail" : appTitles[activeApp]}
              activeApp={activeApp}
              onClose={closeWindow}
            >
              {activeApp === "projects" && selectedProject ? (
                <ProjectDetail project={selectedProject} onBack={() => setSelectedProjectId(null)} />
              ) : null}
              {activeApp === "projects" && !selectedProject ? (
                <ProjectsPanel onOpenProject={(project) => setSelectedProjectId(project.id)} />
              ) : null}
              {activeApp === "about" ? <AboutPanel /> : null}
              {activeApp === "resume" ? <ResumePanel /> : null}
              {activeApp === "inbox" ? <IdeasPanel /> : null}
              {activeApp === "terminal" ? <TerminalBody /> : null}
            </AppWindow>
          ) : null}
        </AnimatePresence>

        <HandNotes />
        <SystemStrip onOpen={openApp} />
      </div>
    </main>
  );
}

function TopBar({ onOpen }: { onOpen: (id: AppId) => void }) {
  return (
    <header className="top-bar">
      <div className="top-menu">
        <Star size={17} fill="currentColor" />
        <strong>Star Lab</strong>
        <button type="button">File</button>
        <button type="button">Edit</button>
        <button type="button">View</button>
        <button type="button" onClick={() => onOpen("projects")}>Projects</button>
        <button type="button">Tools</button>
        <button type="button">Window</button>
        <button type="button">Help</button>
      </div>
      <div className="top-status">
        <Cloud size={15} />
        <Wifi size={15} />
        <Moon size={15} />
        <span>Thu 07.09</span>
        <span>10:28</span>
        <Star size={14} fill="currentColor" />
      </div>
    </header>
  );
}

function DesktopIntro({ onProjects, onResume }: { onProjects: () => void; onResume: () => void }) {
  return (
    <section className="desktop-intro" aria-label="个人介绍">
      <span>AI 产品经理 / 独立产品创造者</span>
      <h1>Hello，我是刘星雨</h1>
      <p>关注 AI 应用、C端体验、IoT 软硬件协同与工具型产品。</p>
      <div>
        <button type="button" onClick={onProjects}><Rocket size={15} />探索项目宇宙</button>
        <button type="button" onClick={onResume}><FileText size={15} />查看简历</button>
      </div>
    </section>
  );
}

function DesktopIcons({ onOpen }: { onOpen: (id: AppId) => void }) {
  return (
    <nav className="desktop-icons" aria-label="桌面应用">
      {appItems.map((item) => {
        const Icon = item.icon;
        return (
          <button key={item.id} type="button" aria-label={`打开 ${item.label}`} onClick={() => onOpen(item.id)}>
            <span className={`app-icon ${item.tone}`}><Icon size={29} /></span>
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

function Dock({ activeApp, onOpen }: { activeApp: AppId | null; onOpen: (id: AppId) => void }) {
  return (
    <nav className="dock" aria-label="Star Lab OS Dock">
      {appItems.map((item) => {
        const Icon = item.icon;
        return (
          <button
            className={activeApp === item.id ? "active" : ""}
            key={item.id}
            type="button"
            aria-label={`从 Dock 打开 ${item.label}`}
            title={item.label}
            onClick={() => onOpen(item.id)}
          >
            <span className={`dock-icon ${item.tone}`}><Icon size={24} /></span>
          </button>
        );
      })}
      <span className="dock-divider" />
      <button type="button" aria-label="应用菜单"><Menu size={23} /></button>
    </nav>
  );
}

function AppWindow({
  title,
  activeApp,
  onClose,
  children
}: {
  title: string;
  activeApp: AppId;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <motion.section
      className={`app-window app-${activeApp}`}
      role="dialog"
      aria-label={title === "Project Detail" ? "项目宇宙" : title}
      variants={windowMotion}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
      onClick={(event) => event.stopPropagation()}
    >
      <WindowBar title={title} onClose={onClose} />
      <div className="window-content">{children}</div>
    </motion.section>
  );
}

function WindowBar({ title, onClose, compact = false }: { title: string; onClose?: () => void; compact?: boolean }) {
  return (
    <div className={compact ? "window-bar compact" : "window-bar"}>
      <div className="traffic-lights" aria-hidden="true"><i /><i /><i /></div>
      <span>{title}</span>
      {onClose ? (
        <button type="button" aria-label={`关闭 ${title}`} onClick={onClose}><X size={15} /></button>
      ) : <span />}
    </div>
  );
}

function ProjectsPanel({ onOpenProject }: { onOpenProject: (project: Project) => void }) {
  const publicProjects = projects.filter((project) => project.category === "公开作品");
  const caseProjects = projects.filter((project) => project.category === "工作案例");

  return (
    <div className="projects-panel">
      <div className="projects-toolbar">
        <div>
          <h2>Selected Works <Star size={17} fill="currentColor" /></h2>
          <p>把想法落到真实世界里的实验记录。</p>
        </div>
        <div className="project-tabs"><button className="active" type="button">全部</button><button type="button">主线项目</button><button type="button">进行中</button></div>
      </div>
      <ProjectSection title="公开作品" projects={publicProjects} onOpenProject={onOpenProject} />
      <ProjectSection title="工作案例" projects={caseProjects} onOpenProject={onOpenProject} compact />
      <section className="idea-lab">
        <div><Sparkles size={16} /><strong>灵感实验室</strong></div>
        {ideas.map((idea) => <span key={idea.title}>{idea.title}<small>{idea.status}</small></span>)}
      </section>
      <p className="display-statement">{displayStatement}</p>
    </div>
  );
}

function ProjectSection({
  title,
  projects: list,
  onOpenProject,
  compact = false
}: {
  title: string;
  projects: Project[];
  onOpenProject: (project: Project) => void;
  compact?: boolean;
}) {
  return (
    <section className="project-section">
      <div className="section-label"><span>{title}</span><small>{list.length} projects</small></div>
      <div className={compact ? "project-grid compact" : "project-grid"}>
        {list.map((project, index) => (
          <ProjectCard project={project} index={index} key={project.id} onOpenProject={onOpenProject} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  onOpenProject
}: {
  project: Project;
  index: number;
  onOpenProject: (project: Project) => void;
}) {
  return (
    <motion.article className="project-card" whileHover={{ y: -6, rotate: index % 2 === 0 ? -1 : 1 }}>
      <div className={`project-image crop-${project.id}`}>
        <span>{project.status}</span>
      </div>
      <div className="project-card-body">
        <h3>{project.name}</h3>
        <small>{project.type}</small>
        <p>{project.value}</p>
        <div className="project-actions">
          {project.actions.map((action) => (
            <ProjectActionControl key={action.label} project={project} action={action} onOpenProject={onOpenProject} />
          ))}
        </div>
        <span className="updated">更新于 {project.updatedAt}</span>
      </div>
    </motion.article>
  );
}

function ProjectActionControl({
  project,
  action,
  onOpenProject
}: {
  project: Project;
  action: ProjectAction;
  onOpenProject: (project: Project) => void;
}) {
  const label = `${project.name} ${action.label}`;
  if (action.kind === "external" && action.url) {
    return <a aria-label={label} href={action.url} target="_blank" rel="noreferrer">{action.label}<ExternalLink size={12} /></a>;
  }
  return <button aria-label={label} type="button" onClick={() => onOpenProject(project)}>{action.label}<ChevronRight size={13} /></button>;
}

function ProjectDetail({ project, onBack }: { project: Project; onBack: () => void }) {
  return (
    <div className="project-detail">
      <button className="back-button" type="button" onClick={onBack}><ArrowLeft size={16} />返回项目宇宙</button>
      <div className="detail-hero">
        <div>
          <span>{project.type}</span>
          <h2>{project.name}</h2>
          <p>{project.summary}</p>
          <div className="project-actions">
            {project.actions.map((action) => (
              <ProjectActionControl key={action.label} project={project} action={action} onOpenProject={() => undefined} />
            ))}
          </div>
        </div>
        <div className={`detail-image crop-${project.id}`} />
      </div>
      <div className="detail-grid">
        <DetailBlock title="我为什么做它" text={project.why} />
        <DetailBlock title="用户 / 场景问题" text={project.problem} />
        <DetailBlock title="我的解决方案" text={project.solution} />
        <DetailList title="核心功能" items={project.features} />
        <DetailList title="我做了什么" items={project.contribution} />
        <DetailBlock title="当前进度" text={project.progress} />
        <DetailList title="下一步计划" items={project.next} />
      </div>
    </div>
  );
}

function DetailBlock({ title, text }: { title: string; text: string }) {
  return <section><h3>{title}</h3><p>{text}</p></section>;
}

function DetailList({ title, items }: { title: string; items: string[] }) {
  return <section><h3>{title}</h3><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></section>;
}

function AboutPanel() {
  return (
    <div className="simple-panel about-panel">
      <span className="panel-kicker">AI Product Manager × Independent Builder</span>
      <h2>我不是只写 PRD 的产品经理。</h2>
      <p>我会自己想、自己拆、自己画、自己做、自己部署。擅长把模糊想法变成产品结构，把复杂流程变成清晰体验。</p>
      <div className="capability-grid">
        {["产品结构与流程拆解", "C 端交互体验", "AI 工具辅助验证", "IoT 软硬件协同", "原型开发与部署", "产品复盘与表达"].map((item) => <span key={item}><Sparkles size={15} />{item}</span>)}
      </div>
      <blockquote>把宇宙装进浏览器，把想法变成可运行的星星。</blockquote>
    </div>
  );
}

function ResumePanel() {
  return (
    <div className="simple-panel resume-panel">
      <div className="file-preview">
        <FileText size={46} />
        <div><small>PDF DOCUMENT</small><h2>刘星雨_AI产品经理_简历.pdf</h2><p>AI 产品经理 / 独立产品创造者</p></div>
      </div>
      <div className="resume-actions">
        <button type="button"><FileText size={16} />预览</button>
        <button type="button"><Download size={16} />下载</button>
        <a href="mailto:contact@example.com"><Mail size={16} />联系我</a>
      </div>
      <p className="resume-note">简历文件将在确认最终版本后接入；当前窗口保留预览与下载入口。</p>
    </div>
  );
}

function IdeasPanel() {
  return (
    <div className="simple-panel ideas-panel">
      <div className="inbox-heading"><Inbox size={22} /><div><h2>Idea Inbox</h2><p>精选灵感，只展示方向与状态。</p></div></div>
      {ideas.map((idea, index) => (
        <article key={idea.title}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <div><h3>{idea.title}</h3><p>{idea.note}</p></div>
          <small>{idea.status}</small>
        </article>
      ))}
    </div>
  );
}

function TerminalBody({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "terminal-body compact" : "terminal-body"}>
      <code>moonpie@star-lab ~</code>
      {terminalLines.map((line, index) => (
        <motion.code key={line} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.45 }}>
          {line}
        </motion.code>
      ))}
      <code className="cursor-line">$ <i /></code>
    </div>
  );
}

function HandNotes() {
  return (
    <div className="hand-notes" aria-hidden="true">
      <span className="note-projects">项目宇宙 <ArrowUpRight size={21} /></span>
      <span className="note-terminal">会呼吸的 Terminal <ArrowUpRight size={20} /></span>
      <span className="note-ideas">灵感收件箱 <ArrowUpRight size={20} /></span>
    </div>
  );
}

function SystemStrip({ onOpen }: { onOpen: (id: AppId) => void }) {
  return (
    <section className="system-strip">
      <strong>系统功能</strong>
      <button type="button" onClick={() => onOpen("projects")}><BriefcaseBusiness size={21} /><span>项目索引<small>公开作品 / 工作案例</small></span></button>
      <button type="button" onClick={() => onOpen("projects")}><Cloud size={21} /><span>部署入口<small>Vercel Demo 状态</small></span></button>
      <button type="button" onClick={() => onOpen("inbox")}><Sparkles size={21} /><span>灵感记录<small>精选想法与状态</small></span></button>
      <button type="button" onClick={() => onOpen("projects")}><Tags size={21} /><span>标签分类<small>按主题 / 类型 / 阶段</small></span></button>
      <button type="button" onClick={() => onOpen("terminal")}><LayoutGrid size={21} /><span>桌面快捷键<small>点击图标打开窗口</small></span></button>
    </section>
  );
}

export default App;
