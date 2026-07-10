import {
  ArrowLeft,
  ArrowUpRight,
  Boxes,
  BriefcaseBusiness,
  ChevronRight,
  CircleUserRound,
  Cloud,
  Command,
  Download,
  ExternalLink,
  FileText,
  FlaskConical,
  FolderKanban,
  IdCard,
  Inbox,
  Mail,
  Map,
  Moon,
  Orbit,
  PackageOpen,
  Rocket,
  ScrollText,
  Sparkles,
  Star,
  Tags,
  TerminalSquare,
  Wifi,
  X
} from "lucide-react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import type { ComponentType, FormEvent, PointerEvent, ReactNode } from "react";
import { appFeedback, bootLines, displayStatement, ideas, projects } from "./data";
import { runTerminalCommand } from "./terminal";
import { DesktopPets } from "./DesktopPets";
import { ProjectGalaxy3D } from "./ProjectGalaxy3D";
import type { Project, ProjectAction, WindowId } from "./types";

type AppId = WindowId;
type LaunchSource = AppId | "welcome-action" | "control-center";

interface AppItem {
  id: Exclude<AppId, "home">;
  label: string;
  icon: ComponentType<{ size?: number }>;
  tone: string;
}

const appItems: AppItem[] = [
  { id: "projects", label: "项目宇宙", icon: Orbit, tone: "violet" },
  { id: "about", label: "关于我", icon: IdCard, tone: "rose" },
  { id: "resume", label: "简历", icon: ScrollText, tone: "paper" },
  { id: "inbox", label: "灵感收件箱", icon: PackageOpen, tone: "amber" },
  { id: "terminal", label: "Terminal", icon: TerminalSquare, tone: "dark" }
];

const appTitles: Record<AppId, string> = {
  home: "Welcome",
  projects: "项目宇宙",
  about: "关于我",
  resume: "简历",
  inbox: "灵感收件箱",
  terminal: "Terminal"
};

const origins: Record<LaunchSource, string> = {
  home: "40% 40%",
  projects: "92% 16%",
  about: "92% 32%",
  resume: "92% 48%",
  inbox: "92% 64%",
  terminal: "92% 80%",
  "welcome-action": "35% 65%",
  "control-center": "95% 95%"
};

function App() {
  const [activeApp, setActiveApp] = useState<AppId | null>("home");
  const [launchSource, setLaunchSource] = useState<LaunchSource>("home");
  const [launchPulse, setLaunchPulse] = useState<AppId | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [terminalHistory, setTerminalHistory] = useState<string[]>(bootLines);
  const [controlCenterOpen, setControlCenterOpen] = useState(false);
  const [petMode, setPetMode] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.localStorage.getItem("starry-pet-mode") !== "off";
  });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 78, damping: 24, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 78, damping: 24, mass: 0.5 });
  const backgroundX = useTransform(springX, [-1, 1], [-8, 8]);
  const backgroundY = useTransform(springY, [-1, 1], [-6, 6]);
  const terminalX = useTransform(springX, [-1, 1], [7, -7]);
  const terminalY = useTransform(springY, [-1, 1], [6, -6]);

  const selectedProject = useMemo(
    () => projects.find((project) => project.id === selectedProjectId) ?? null,
    [selectedProjectId]
  );

  useEffect(() => {
    window.localStorage.setItem("starry-pet-mode", petMode ? "on" : "off");
  }, [petMode]);

  const openApp = (id: AppId, source: LaunchSource = id) => {
    setLaunchSource(source);
    setLaunchPulse(id);
    setSelectedProjectId(null);
    setActiveApp(id);
    setControlCenterOpen(false);
    const feedback = appFeedback[id];
    if (feedback) setTerminalHistory((current) => [...current, ...feedback]);
    if (typeof window !== "undefined") window.setTimeout(() => setLaunchPulse(null), 520);
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

  const runCommand = (command: string) => {
    const result = runTerminalCommand(command);
    setTerminalHistory((current) => [...current, `$ ${command}`, ...result.lines]);
    if (result.openApp) openApp(result.openApp, "terminal");
  };

  return (
    <main className="os-shell" onPointerMove={handlePointerMove}>
      <motion.div className="wallpaper-layer" style={{ x: backgroundX, y: backgroundY }} />
      <TopBar onOpen={(id) => openApp(id, id)} />

      <div
        className="desktop-blank"
        data-testid="desktop-blank"
        onClick={(event) => {
          if (event.target === event.currentTarget) closeWindow();
        }}
      >
        <AnimatePresence>{activeApp ? <motion.div className="desktop-dim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} /> : null}</AnimatePresence>
        <DesktopPets enabled={petMode} activeApp={activeApp} />
        <DesktopIcons activeApp={activeApp} launchPulse={launchPulse} onOpen={(id) => openApp(id, id)} />
        <Dock activeApp={activeApp} launchPulse={launchPulse} onOpen={(id) => openApp(id, id)} />

        {activeApp !== "terminal" ? (
          <motion.aside className="floating-terminal" style={{ x: terminalX, y: terminalY }}>
            <WindowBar title="Moonpie Terminal" compact />
            <TerminalConsole lines={terminalHistory} compact />
          </motion.aside>
        ) : null}

        <AnimatePresence mode="wait">
          {activeApp ? (
            <AppWindow
              key={`${activeApp}-${selectedProjectId ?? "root"}`}
              title={selectedProject ? "Project File" : appTitles[activeApp]}
              ariaLabel={selectedProject ? "项目宇宙" : appTitles[activeApp]}
              activeApp={activeApp}
              origin={origins[launchSource]}
              onClose={closeWindow}
            >
              {activeApp === "home" ? (
                <WelcomePanel
                  onProjects={() => openApp("projects", "welcome-action")}
                  onResume={() => openApp("resume", "welcome-action")}
                  onIdeas={() => openApp("inbox", "welcome-action")}
                />
              ) : null}
              {activeApp === "projects" && selectedProject ? (
                <ProjectFile project={selectedProject} onBack={() => setSelectedProjectId(null)} />
              ) : null}
              {activeApp === "projects" && !selectedProject ? (
                <ProjectUniverse
                  onOpenProject={(project) => setSelectedProjectId(project.id)}
                  onOpenIdeas={() => openApp("inbox", "projects")}
                />
              ) : null}
              {activeApp === "about" ? <IdentityProfile /> : null}
              {activeApp === "resume" ? <ResumePreviewer /> : null}
              {activeApp === "inbox" ? <IdeaInbox /> : null}
              {activeApp === "terminal" ? <TerminalConsole lines={terminalHistory} onCommand={runCommand} /> : null}
            </AppWindow>
          ) : null}
        </AnimatePresence>

        <ControlCenter
          open={controlCenterOpen}
          onToggle={() => setControlCenterOpen((current) => !current)}
          onOpen={(id) => openApp(id, "control-center")}
        />
        <PetModeSwitch enabled={petMode} onToggle={() => setPetMode((current) => !current)} />
        <HandNotes activeApp={activeApp} />
      </div>
    </main>
  );
}

function PetModeSwitch({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button
      className={enabled ? "pet-mode-switch active" : "pet-mode-switch"}
      type="button"
      aria-label={enabled ? "关闭 Pet Mode" : "开启 Pet Mode"}
      aria-pressed={enabled}
      onClick={onToggle}
    >
      <Sparkles size={14} />
      <span>Pet Mode ✦</span>
      <i><b /></i>
    </button>
  );
}

function TopBar({ onOpen }: { onOpen: (id: AppId) => void }) {
  return (
    <header className="top-bar">
      <div className="top-menu">
        <Star size={16} fill="currentColor" />
        <strong>Starry Product Lab</strong>
        <button type="button">File</button>
        <button type="button">Edit</button>
        <button type="button">View</button>
        <button type="button" onClick={() => onOpen("projects")}>Projects</button>
        <button type="button">Tools</button>
        <button type="button">Window</button>
        <button type="button">Help</button>
      </div>
      <div className="top-status">
        <Cloud size={15} /><Wifi size={15} /><Moon size={15} />
        <span>Thu 07.09</span><span>17:08</span><Star size={13} fill="currentColor" />
      </div>
    </header>
  );
}

function DesktopIcons({
  activeApp,
  launchPulse,
  onOpen
}: {
  activeApp: AppId | null;
  launchPulse: AppId | null;
  onOpen: (id: AppItem["id"]) => void;
}) {
  return (
    <nav className="desktop-icons" aria-label="桌面应用">
      {appItems.map((item) => {
        const Icon = item.icon;
        return (
          <motion.button
            key={item.id}
            type="button"
            aria-label={`打开 ${item.label}`}
            className={activeApp === item.id ? "active" : ""}
            animate={launchPulse === item.id ? { y: [0, -9, 0], scale: [1, 1.06, 1] } : { y: 0, scale: 1 }}
            transition={{ duration: 0.42 }}
            onClick={() => onOpen(item.id)}
          >
            <span className={`app-icon ${item.tone}`}><Icon size={29} /></span>
            <span>{item.label}</span>
          </motion.button>
        );
      })}
    </nav>
  );
}

function Dock({
  activeApp,
  launchPulse,
  onOpen
}: {
  activeApp: AppId | null;
  launchPulse: AppId | null;
  onOpen: (id: AppItem["id"]) => void;
}) {
  return (
    <nav className="dock" aria-label="Starry Product Lab Dock">
      {appItems.map((item) => {
        const Icon = item.icon;
        return (
          <motion.button
            className={activeApp === item.id ? "active" : ""}
            key={item.id}
            type="button"
            aria-label={`从 Dock 打开 ${item.label}`}
            title={item.label}
            animate={launchPulse === item.id ? { y: [0, -7, 0] } : { y: 0 }}
            onClick={() => onOpen(item.id)}
          >
            <span className={`dock-icon ${item.tone}`}><Icon size={23} /></span>
          </motion.button>
        );
      })}
    </nav>
  );
}

function AppWindow({
  title,
  ariaLabel,
  activeApp,
  origin,
  onClose,
  children
}: {
  title: string;
  ariaLabel: string;
  activeApp: AppId;
  origin: string;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <motion.section
      className={`app-window app-${activeApp}`}
      role="dialog"
      aria-label={ariaLabel}
      initial={{ opacity: 0, scale: 0.94, y: 22, rotateX: 5, filter: "blur(8px)" }}
      animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.96, y: 16, rotateX: 3, filter: "blur(6px)" }}
      transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformOrigin: origin }}
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
      {onClose ? <button type="button" aria-label={`关闭 ${title}`} onClick={onClose}><X size={15} /></button> : <span />}
    </div>
  );
}

function WelcomePanel({
  onProjects,
  onResume,
  onIdeas
}: {
  onProjects: () => void;
  onResume: () => void;
  onIdeas: () => void;
}) {
  return (
    <div className="welcome-panel">
      <div className="welcome-brand">
        <span>✦ Starry Product Lab</span>
        <strong>把灵感变成可运行的产品</strong>
        <small>我觉得人与产品之间应该有一种更温柔、更有意义的连接。</small>
      </div>
      <div className="welcome-copy">
        <span>Welcome to Starry Product Lab</span>
        <h1>Hello，我是刘星雨</h1>
        <h2>AI 产品经理 / 独立产品创造者</h2>
        <p>我关注 AI 应用、C端体验、IoT 和工具型产品。<br />我喜欢把一个模糊想法，拆成清晰流程、交互原型和可运行产品。</p>
        <p className="universe-note">这里是我的产品宇宙：<br />有今日主线、暂时停靠，也有一些被关起来的小怪物们。</p>
        <div className="welcome-actions">
          <button type="button" onClick={onProjects}><Orbit size={16} />探索项目宇宙</button>
          <button type="button" onClick={onResume}><FileText size={16} />查看简历</button>
          <button type="button" onClick={onIdeas}><Inbox size={16} />打开灵感收件箱</button>
        </div>
      </div>
      <div className="welcome-orbit" aria-hidden="true">
        <span className="orbit-core"><Star size={22} fill="currentColor" /></span>
        <i /><i /><i />
      </div>
    </div>
  );
}

function ProjectUniverse({
  onOpenProject,
  onOpenIdeas
}: {
  onOpenProject: (project: Project) => void;
  onOpenIdeas: () => void;
}) {
  const publicWorks = projects.filter((project) => project.category === "公开作品");
  const workCases = projects.filter((project) => project.category === "工作案例");

  return (
    <div className="project-universe">
      <header className="universe-heading">
        <div><span>PROJECT ARCHIVE / 2026</span><h2>项目星图</h2><p>每一颗星，都是一次从想法到产品的航行。</p></div>
        <div className="universe-legend"><span><i className="public-dot" />公开作品</span><span><i className="case-dot" />工作案例</span><span><i className="idea-dot" />灵感实验</span></div>
      </header>

      <ProjectGalaxy3D projects={[...publicWorks, ...workCases]} ideas={ideas} onOpenProject={onOpenProject} onOpenIdeas={onOpenIdeas} />
      <p className="display-statement">{displayStatement}</p>
    </div>
  );
}

function ProjectPlanet({
  project,
  index,
  variant,
  onOpen
}: {
  project: Project;
  index: number;
  variant: "public" | "case";
  onOpen: (project: Project) => void;
}) {
  return (
    <motion.button
      className={`project-planet ${variant} ${variant}-${index + 1}`}
      type="button"
      aria-label={`打开项目档案 ${project.name}`}
      whileHover={{ y: -5, scale: 1.04 }}
      onClick={() => onOpen(project)}
    >
      <span className={`planet-visual crop-${project.id}`}><i /></span>
      <strong>{project.name}</strong>
      <small>{project.type}</small>
      <span className="planet-status">{project.status}</span>
      <span className="planet-hover">
        <b>为什么做</b>{project.why}
        <b>我负责什么</b>{project.role}
        <b>当前状态</b>{project.archive.current}
      </span>
    </motion.button>
  );
}

function ProjectFile({ project, onBack }: { project: Project; onBack: () => void }) {
  const projectNumber = projects.findIndex((item) => item.id === project.id) + 1;
  return (
    <div className="project-file">
      <button className="back-button" type="button" onClick={onBack}><ArrowLeft size={15} />返回星图</button>
      <div className="file-cover">
        <div>
          <span>PROJECT FILE {String(projectNumber).padStart(2, "0")}</span>
          <h2>{project.name}</h2>
          <p>{project.type}</p>
        </div>
        <div className="file-image" style={{ backgroundImage: `url(${project.coverImage ?? "/assets/portfolio-reference.png"})` }}>
          <span>{project.humanNote}</span>
        </div>
      </div>
      <div className="archive-flow">
        <ArchiveStep number="01" title="起点" text={project.archive.start} />
        <ArchiveStep number="02" title="迭代" text={project.archive.iteration} />
        <ArchiveStep number="03" title="当前" text={project.archive.current} />
        <ArchiveStep number="04" title="我的角色" text={project.role} />
      </div>
      <div className="file-bottom">
        <p><strong>{project.humanNote}</strong>{project.value}</p>
        <div className="project-actions">
          {project.actions.map((action) => <ProjectActionControl key={action.label} project={project} action={action} />)}
        </div>
      </div>
    </div>
  );
}

function ArchiveStep({ number, title, text }: { number: string; title: string; text: string }) {
  return <section><small>{number}</small><div><h3>{title}</h3><p>{text}</p></div></section>;
}

function ProjectActionControl({ project, action }: { project: Project; action: ProjectAction }) {
  const label = `${project.name} ${action.label}`;
  if (action.kind === "external" && action.url) {
    return <a aria-label={label} href={action.url} target="_blank" rel="noreferrer">{action.label}<ExternalLink size={12} /></a>;
  }
  return <button aria-label={label} type="button">{action.label}<ChevronRight size={13} /></button>;
}

function IdentityProfile() {
  return (
    <div className="identity-profile">
      <aside className="identity-card">
        <div className="avatar-mark"><CircleUserRound size={42} /></div>
        <span>PROFILE / LX-YU</span>
        <h2>刘星雨</h2>
        <p>AI 产品经理<br />独立产品创造者</p>
        <dl><div><dt>FOCUS</dt><dd>AI / C端 / IoT</dd></div><div><dt>MODE</dt><dd>Think · Build · Ship</dd></div></dl>
      </aside>
      <div className="profile-content">
        <section><span>ABOUT ME</span><h2>我不只写 PRD，也会把想法亲手做出来。</h2><p>擅长把模糊想法变成产品结构，把复杂流程变成清晰体验，再用 AI 工具、原型和代码验证它是否真的成立。</p></section>
        <section className="profile-timeline">
          <h3>产品路径</h3>
          <div><i /><span>发现问题</span><small>从用户与场景中找到真实摩擦</small></div>
          <div><i /><span>拆解结构</span><small>明确角色、流程、状态与边界</small></div>
          <div><i /><span>做出原型</span><small>让想法尽快进入可体验状态</small></div>
          <div><i /><span>持续迭代</span><small>用反馈把产品从可用推向有意义</small></div>
        </section>
        <blockquote>我觉得人与产品之间应该有一种更温柔、更有意义的连接。</blockquote>
      </div>
    </div>
  );
}

function ResumePreviewer() {
  return (
    <div className="resume-previewer">
      <aside className="preview-sidebar"><strong>文件</strong><span className="active"><FileText size={14} />刘星雨_简历.pdf</span><span><FolderKanban size={14} />项目案例</span></aside>
      <div className="resume-paper">
        <header><div><span>AI PRODUCT MANAGER</span><h2>刘星雨</h2><p>AI 产品经理 / 独立产品创造者</p></div><IdCard size={46} /></header>
        <section><h3>个人定位</h3><p>关注 AI 应用、C端体验、IoT 软硬件协同与工具型产品，擅长将模糊想法拆成清晰流程、交互原型和可运行产品。</p></section>
        <section><h3>核心能力</h3><div className="resume-skills"><span>产品结构</span><span>交互原型</span><span>AI 验证</span><span>软硬件协同</span></div></section>
        <footer><button type="button"><FileText size={15} />预览</button><button type="button"><Download size={15} />下载</button><a href="mailto:contact@example.com"><Mail size={15} />联系我</a></footer>
      </div>
    </div>
  );
}

function IdeaInbox() {
  return (
    <div className="idea-inbox">
      <header><div><span>INBOX / IDEAS</span><h2>灵感收件箱</h2><p>先把想法停靠，再决定它要不要长成项目。</p></div><PackageOpen size={34} /></header>
      <div className="note-desk">
        {ideas.map((idea, index) => (
          <motion.article
            className={`idea-note note-${index + 1}`}
            key={idea.title}
            initial={{ opacity: 0, y: 12, rotate: index - 1 }}
            animate={{ opacity: 1, y: 0, rotate: index - 1 }}
            whileHover={{ y: -7, rotate: 0, zIndex: 3 }}
          >
            <span className="note-pin" />
            <small>IDEA {String(index + 1).padStart(2, "0")}</small>
            <h3>{idea.title}</h3>
            <p>{idea.note}</p>
            <footer><span>{idea.status}</span><strong>关联：{idea.relatedProject}</strong></footer>
          </motion.article>
        ))}
      </div>
      <div className="parking-note"><FlaskConical size={17} /><span>灵感停车场</span><small>3 个想法正在安静发酵</small></div>
    </div>
  );
}

function TerminalConsole({
  lines,
  compact = false,
  onCommand
}: {
  lines: string[];
  compact?: boolean;
  onCommand?: (command: string) => void;
}) {
  const [command, setCommand] = useState("");
  const visibleLines = compact ? lines.slice(-7) : lines;

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next = command.trim();
    if (!next || !onCommand) return;
    onCommand(next);
    setCommand("");
  };

  return (
    <div className={compact ? "terminal-console compact" : "terminal-console"}>
      <code className="terminal-user">moonpie@starry-lab ~</code>
      <div className="terminal-log">
        {visibleLines.map((line, index) => <code key={`${line}-${index}`}>{line}</code>)}
      </div>
      {compact ? <code className="cursor-line">$ <i /></code> : (
        <form data-testid="terminal-form" onSubmit={submit}>
          <label htmlFor="terminal-command">$</label>
          <input id="terminal-command" aria-label="Terminal command" autoComplete="off" value={command} onChange={(event) => setCommand(event.target.value)} />
          <i />
        </form>
      )}
    </div>
  );
}

function ControlCenter({
  open,
  onToggle,
  onOpen
}: {
  open: boolean;
  onToggle: () => void;
  onOpen: (id: AppId) => void;
}) {
  const controls = [
    { label: "项目索引", detail: "7 个项目档案", icon: Map, target: "projects" as AppId },
    { label: "部署状态", detail: "4 个公开 Demo", icon: Cloud, target: "projects" as AppId },
    { label: "灵感记录", detail: "3 个等待处理", icon: Sparkles, target: "inbox" as AppId },
    { label: "标签分类", detail: "AI / C端 / IoT", icon: Tags, target: "projects" as AppId },
    { label: "桌面快捷键", detail: "点击图标启动", icon: Command, target: "terminal" as AppId }
  ];

  return (
    <div className="control-center-wrap">
      <AnimatePresence>
        {open ? (
          <motion.div className="control-center" role="menu" aria-label="Control Center" initial={{ opacity: 0, scale: 0.96, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 8 }}>
            <header><strong>Control Center</strong><small>Starry OS</small></header>
            {controls.map((control) => {
              const Icon = control.icon;
              return <button role="menuitem" type="button" key={control.label} onClick={() => onOpen(control.target)}><Icon size={17} /><span>{control.label}<small>{control.detail}</small></span><ChevronRight size={14} /></button>;
            })}
          </motion.div>
        ) : null}
      </AnimatePresence>
      <button className="control-trigger" type="button" aria-label="打开 Control Center" onClick={onToggle}><Command size={15} /><span>Control Center</span></button>
    </div>
  );
}

function HandNotes({ activeApp }: { activeApp: AppId | null }) {
  return (
    <div className="hand-notes" aria-hidden="true">
      {activeApp === "home" ? <span className="note-welcome">先认识我，再探索宇宙 <ArrowUpRight size={20} /></span> : null}
      {activeApp === "projects" ? <span className="note-projects">点击星球，打开项目档案 <ArrowUpRight size={20} /></span> : null}
      {activeApp === "inbox" ? <span className="note-ideas">想法先入库，不准乱开坑 <ArrowUpRight size={20} /></span> : null}
    </div>
  );
}

export default App;
