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
import { FollowHeartCaseStudy } from "./FollowHeartCaseStudyView";
import { CompetitiveAnalysisCaseStudy } from "./CompetitiveAnalysisCaseStudyView";
import { JobRadarCaseStudy } from "./JobRadarCaseStudyView";
import { PhoneCompanionCaseStudy } from "./PhoneCompanionCaseStudyView";
import { NoddyCaseStudy } from "./NoddyCaseStudyView";
import { AIControllerCaseStudy } from "./AIControllerCaseStudyView";
import { getProjectVisuals } from "./projectVisuals";
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
  const isJobRadarSelected = selectedProjectId === "job-radar";

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
              {activeApp === "projects" && isJobRadarSelected ? (
                <JobRadarCaseStudy
                  onBack={() => setSelectedProjectId(null)}
                  onNavigate={(projectId) => setSelectedProjectId(projectId)}
                />
              ) : null}
              {activeApp === "projects" && selectedProject ? (
                selectedProject.id === "follow-heart" ? (
                  <FollowHeartCaseStudy
                    onBack={() => setSelectedProjectId(null)}
                    onNavigate={(projectId) => setSelectedProjectId(projectId)}
                  />
                ) : selectedProject.id === "competitor-workbench" ? (
                  <CompetitiveAnalysisCaseStudy
                    onBack={() => setSelectedProjectId(null)}
                    onNavigate={(projectId) => setSelectedProjectId(projectId)}
                  />
                ) : selectedProject.id === "ai-companion" ? (
                  <PhoneCompanionCaseStudy
                    onBack={() => setSelectedProjectId(null)}
                    onNavigate={(projectId) => setSelectedProjectId(projectId)}
                  />
                ) : selectedProject.id === "ai-pet-hardware" ? (
                  <NoddyCaseStudy
                    onBack={() => setSelectedProjectId(null)}
                    onNavigate={(projectId) => setSelectedProjectId(projectId)}
                  />
                ) : selectedProject.id === "iot-ops" ? (
                  <AIControllerCaseStudy
                    onBack={() => setSelectedProjectId(null)}
                    onNavigate={(projectId) => setSelectedProjectId(projectId)}
                  />
                ) : (
                  <ProjectFile
                    project={selectedProject}
                    onBack={() => setSelectedProjectId(null)}
                    onNavigate={(projectId) => setSelectedProjectId(projectId)}
                  />
                )
              ) : null}
              {activeApp === "projects" && !selectedProject && !isJobRadarSelected ? (
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
      initial={{ opacity: 0, scale: 0.94, y: 22, rotateX: 5 }}
      animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 16, rotateX: 3 }}
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
  const [activeGalaxyFilter, setActiveGalaxyFilter] = useState<"all" | "public" | "case" | "idea">("all");
  const publicWorks = projects.filter((project) => project.category === "公开作品");
  const workCases = projects.filter((project) => project.category === "工作案例");
  const filters = [
    { id: "all" as const, label: "全部", dot: "all-dot" },
    { id: "public" as const, label: "公开作品", dot: "public-dot" },
    { id: "case" as const, label: "工作案例", dot: "case-dot" },
    { id: "idea" as const, label: "灵感实验", dot: "idea-dot" }
  ];

  return (
    <div className="project-universe">
      <header className="universe-heading">
        <div><span>PROJECT ARCHIVE / 2026</span><h2>项目星图</h2><p>每一颗星，都是一次从想法到产品的航行。</p></div>
        <div className="universe-legend" aria-label="项目类别筛选">
          {filters.map((filter) => (
            <button
              key={filter.id}
              className={activeGalaxyFilter === filter.id ? "active" : ""}
              type="button"
              aria-pressed={activeGalaxyFilter === filter.id}
              onClick={() => setActiveGalaxyFilter(filter.id)}
            >
              <i className={filter.dot} />
              {filter.label}
            </button>
          ))}
        </div>
      </header>

      <ProjectGalaxy3D
        projects={[...publicWorks, ...workCases]}
        ideas={ideas}
        activeFilter={activeGalaxyFilter}
        onOpenProject={onOpenProject}
        onOpenIdeas={onOpenIdeas}
      />
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

interface CaseStudyContent {
  positioning: string;
  audience: string;
  context: string[];
  problems: string[];
  goals: string[];
  structure: string[];
  keyExperience: Array<{ title: string; text: string }>;
  showcases: Array<{ title: string; text: string }>;
  notes: string[];
  reflection: string;
}

const fallbackCaseStudy: CaseStudyContent = {
  positioning: "一个把想法落到真实世界里的产品实验。",
  audience: "对产品结构、交互体验和可运行 Demo 感兴趣的访客。",
  context: ["这个项目来自一个具体的体验摩擦：想法存在，但缺少一个能被真实使用的形态。", "我把它拆成定位、流程、界面和可验证 Demo，让它从灵感变成可展示的产品记录。"],
  problems: ["想法容易停留在描述里，无法被用户理解。", "流程、状态和页面缺少统一结构。", "项目中断后上下文很难恢复。"],
  goals: ["把核心体验做成可运行版本。", "让访客能看懂项目为什么存在。", "保留后续迭代入口。"],
  structure: ["入口", "核心流程", "状态反馈", "结果沉淀"],
  keyExperience: [
    { title: "从问题开始", text: "先确认用户在什么场景下会需要它，而不是先堆功能。" },
    { title: "拆成最小路径", text: "把体验压缩成可以快速验证的主路径，再逐步扩展支线。" },
    { title: "保留迭代证据", text: "记录为什么改、改了什么和下一步要验证什么。" }
  ],
  showcases: [
    { title: "主入口", text: "让用户一眼知道这个产品解决什么问题。" },
    { title: "核心界面", text: "展示最能说明产品结构的一屏。" },
    { title: "结果沉淀", text: "让使用行为能留下可回看的记录。" }
  ],
  notes: ["项目不是页面集合，而是一条可被理解的体验路径。", "展示时保留设计边界，不暴露不适合公开的信息。"],
  reflection: "下一步会继续补充真实截图、交互说明和复盘材料。"
};

function getCaseStudy(project: Project): CaseStudyContent {
  if (project.id === "follow-heart") {
    return {
      positioning: "随心而行，是一个把“占卜”从结果导向，变成“自我提问 + 仪式感交互 + 学习传统文化”的互动产品。",
      audience: "喜欢塔罗、传统文化、自我探索，但不想只看一段生硬答案的新手用户。",
      context: [
        "我喜欢塔罗、小六壬、梅花易数，也一直对传统文化和“通过互动去学习”这件事很感兴趣。",
        "我发现很多占卜产品只有“抽牌—出结果”，但缺少仪式感，也缺少真正帮助用户理解牌义、慢慢学会看的过程。",
        "所以我想做一个更像“陪你占、陪你学、陪你看见自己”的产品。"
      ],
      problems: ["抽牌过程太机械，没有沉浸感", "结果页像说明书，不像陪伴式解读", "用户容易看答案，却不理解为什么是这个答案", "学习和占卜是断开的，抽牌不能自然带来积累", "传统文化内容门槛高，新手不敢入门"],
      goals: ["用手势抽牌建立仪式感", "让结果页从单段答案变成分层阅读", "把学习嵌入每一次抽牌体验", "让图鉴和手札承接长期积累"],
      structure: ["提出问题", "洗牌 / 切牌 / 抽牌", "结果页四层解读", "看懂牌面", "图鉴收集", "手札沉淀"],
      keyExperience: [
        { title: "手势抽牌", text: "洗牌、切牌、抽牌和放大看牌不是装饰，它们让用户先进入状态，再接受解读。" },
        { title: "结果页分层", text: "牌面、解读、学习延伸和手札入口拆开呈现，避免把答案写成一坨长文。" },
        { title: "图鉴系统", text: "抽到即收集，让每一次占问都顺手带来一点传统文化积累。" },
        { title: "答案气质", text: "我希望它传达的是：答案不在牌里，在你心里，牌只是帮你提问。" }
      ],
      showcases: [
        { title: "开场页", text: "提出问题，选择开始，把用户从日常状态带入一次占问。" },
        { title: "洗牌页", text: "手势提示和牌背流动形成轻仪式感。" },
        { title: "抽牌页", text: "卡牌悬浮、选牌动画和 fallback 共同保证可玩与可用。" },
        { title: "结果页", text: "四个 Tab 分别承接看牌、解读、学习和记录。" },
        { title: "图鉴 / 手札", text: "把一次性结果变成可积累的学习路径。" }
      ],
      notes: ["不做纯占卜工具，因为我更在意用户能不能通过它看见自己。", "学习不单独做成课程，而是嵌进结果页和图鉴里。", "后续可以扩展到小六壬、梅花易数、中医启蒙等传统文化模块。"],
      reflection: "随心而行会继续围绕 P1 结果页优化，把“抽到答案”升级为“理解自己和理解文化”的过程。"
    };
  }
  if (project.id === "star-pm") {
    return {
      positioning: "一个面向“容易开很多坑的自己”的项目恢复系统。",
      audience: "同时推进多个项目、灵感很多但容易丢上下文的独立产品创造者。",
      context: ["我经常同时有很多产品想法，也会同时推进几个项目。", "普通待办工具只能记录做什么，很难记录为什么想做、做到哪了、下次从哪里恢复，以及相关链接、本地路径和部署地址。", "所以我想做一个真正能帮我接住灵感、恢复项目现场的系统。"],
      problems: ["灵感、任务、文档、链接、Git 更新分散", "项目放一阵子后，很难快速恢复上下文", "想法容易直接变坑，没有中间层", "项目进度记录和真实开发状态脱节"],
      goals: ["接住灵感但不立刻开坑", "让项目恢复有上下文", "把 Git 更新变成进展证据", "把个人项目串成一个底层操作系统"],
      structure: ["灵感收件箱", "项目恢复卡", "演进记录", "Git 更新同步", "本地启动 / Demo / 代码目录链接", "停车场机制"],
      keyExperience: [
        { title: "Idea 不等于 Task", text: "灵感先进入收件箱，经过判断后再进入项目，而不是一出现就变成待办压力。" },
        { title: "项目恢复卡", text: "恢复卡记录为什么做、做到哪、下一步是什么，让中断后的项目能重新接上。" },
        { title: "演进记录", text: "记录变化前、变化后和为什么改，因为“为什么改”比“改成什么”更值得被保存。" },
        { title: "Git 更新面板", text: "把 commit 和部署状态接到项目进展里，让开发动作成为产品进展的一部分。" }
      ],
      showcases: [
        { title: "Dashboard", text: "今日主线和暂时停靠一眼可见。" },
        { title: "灵感收件箱", text: "快速接住想法，避免散落在聊天和备忘录里。" },
        { title: "当前主线", text: "用恢复卡把上下文、链接和下一步放在同一处。" },
        { title: "项目库", text: "阶段、状态、Demo、代码目录和分类统一管理。" },
        { title: "演进记录", text: "用时间线保存每次变化的理由。" }
      ],
      notes: ["项目不是只看状态，更要保留上下文。", "停车场机制是为了保护注意力：灵感先入库，不准乱开坑。", "后续可以接入 AI Capture，让碎片输入自动沉淀成项目记录。"],
      reflection: "现在它仍偏个人使用，下一步是统一信息结构，让它成为我所有项目的底层操作系统。"
    };
  }
  if (project.id === "competitor-workbench") {
    return {
      positioning: "一个面向跨境 / 硬件立项场景的竞品分析工作台，把采集、清洗、拆解与输出串成一条链路。",
      audience: "需要把大量竞品资料整理成立项判断材料的产品经理或研究者。",
      context: ["竞品分析经常碎片化，数据来源杂、格式乱。", "真正耗时间的不是找资料，而是清洗、去重、统一、归档和输出。", "这个项目尝试把低效人工流程产品化。"],
      problems: ["数据字段不统一", "截图、链接、参数和判断分散", "非竞品和重复数据难清理", "输出报告依赖人工重新整理"],
      goals: ["把采集到输出串成流水线", "用 Schema 和列映射统一输入", "让 AI 补全服务于结构化判断", "输出 Excel / Markdown / 立项模板"],
      structure: ["数据采集", "Schema 统一", "列映射", "去重 / 非竞品标注", "三表流水线", "AI 补全", "输出报告"],
      keyExperience: [
        { title: "采集", text: "先允许来源复杂，再通过后续结构把它们收束。" },
        { title: "清洗", text: "字段映射、去重和非竞品标注是工具链的关键，不只是表格操作。" },
        { title: "分析", text: "把参数、场景、定位和差异点拆成可比较维度。" },
        { title: "输出", text: "让分析结果能直接进入 Excel、Markdown 或立项模板。" }
      ],
      showcases: [
        { title: "数据导入页", text: "接住不同来源的原始资料。" },
        { title: "字段映射页", text: "把乱字段映射到统一 Schema。" },
        { title: "清洗标注页", text: "处理重复、非竞品和缺失信息。" },
        { title: "洞察看板", text: "把复杂数据转成可判断材料。" },
        { title: "输出报告", text: "把结果转成可复用文档。" }
      ],
      notes: ["重点不是页面好看，而是信息结构能力。", "这个项目展示的是复杂流程抽象和工具型产品思维。"],
      reflection: "下一步会补充更多样本，让工具链从 Demo 走向更稳定的研究工作台。"
    };
  }
  if (project.id === "ai-companion" || project.id === "ai-pet-hardware") {
    return {
      positioning: "AI 宠物陪伴系统：从功能控制走向状态、情绪和关系感的陪伴体验。",
      audience: "需要在 App、小程序和硬件之间感受到陪伴反馈的 C 端用户。",
      context: ["这个案例重点展示我对“陪伴”而不是“功能堆砌”的理解。", "AI 陪伴不只是聊天，还包括状态反馈、行为反馈、声音反馈和界面反馈。", "公司相关内容均做脱敏处理，只展示产品设计思路、流程和界面结构。"],
      problems: ["只做控制会让宠物像设备，不像陪伴对象", "App 与小程序职责容易混在一起", "用户看不到宠物状态变化背后的情绪逻辑", "旧版本首页和状态页难以建立关系感"],
      goals: ["建立宠物状态反馈机制", "优化首页 / 状态页 / 陪伴模式", "明确 App、小程序和设备控制关系", "用 Before / After 说明体验变化"],
      structure: ["首页状态", "宠物状态页", "陪伴模式", "声音 / 行为反馈", "App + 小程序 + 设备关系", "脱敏展示边界"],
      keyExperience: [
        { title: "状态反馈", text: "让用户能看到宠物现在处于什么状态，而不是只看到功能按钮。" },
        { title: "情绪交互", text: "把情绪矩阵、声音和动作拆成可解释的反馈机制。" },
        { title: "跨端关系", text: "App 承接陪伴体验，小程序和设备控制承担轻入口和硬件动作。" },
        { title: "版本优化", text: "通过 Before / After 展示从控制型界面到陪伴型界面的转变。" }
      ],
      showcases: [
        { title: "旧版首页", text: "功能入口清楚，但陪伴感不强。" },
        { title: "新版状态页", text: "突出宠物状态、情绪和反馈。" },
        { title: "陪伴模式", text: "围绕专注、互动和反馈建立连续体验。" },
        { title: "关系图", text: "展示 App、小程序、设备和状态反馈的职责边界。" }
      ],
      notes: ["不展示公司敏感数据、内部指标、完整后台逻辑或不能公开的功能细节。", "重点呈现我负责的产品机制、交互流程和状态反馈拆解。"],
      reflection: "下一步可以继续补充脱敏 mockup 和前后版本对比，让陪伴体验的产品判断更直观。"
    };
  }
  if (project.id === "iot-ops" || project.id === "yuanjing-miniapp") {
    return {
      positioning: "工业水泵智能控制与运维平台：从设备控制工具升级为面向工业水泵运营的 IoT 管理平台，完成用户权限、设备生命周期、远程控制及售后闭环设计。",
      audience: "水泵设备主用户、子用户、经销商、平台管理员，以及负责售后维护的服务人员。",
      context: [
        "针对经销商无法管理设备、转交场景复杂、售后人员权限不足等问题，我基于已有水泵控制器硬件能力，规划自主化智能控制与运维平台。",
        "这个项目的核心不是强调 AI，而是把硬件控制能力产品化，形成设备远程管理、运行监测、权限协同和售后闭环。",
        "页面展示均做脱敏处理，重点呈现业务流程、用户体系、移动端工作台和 Web 后台规划。"
      ],
      problems: ["经销商无法管理设备", "设备转交场景复杂，归属关系容易混乱", "售后人员权限不足，难以及时介入", "工业设备故障处理链路长，异常发现、任务分配、处理反馈和关闭缺少统一闭环"],
      goals: ["从客户定制项目沉淀为自主智能设备管理平台", "以设备为核心资产，建立设备 → 主用户 → 子用户 → 经销商的关系模型", "实现实时监测、远程启停、档位调整和参数控制", "搭建设备异常到工单关闭的售后服务闭环", "覆盖生产 → 部署 → 使用 → 维护的全生命周期管理"],
      structure: ["设备层", "数据采集层", "控制服务层", "用户端 / 管理后台", "售后服务"],
      keyExperience: [
        { title: "为什么设计多角色权限", text: "工业设备不是单人使用场景，需要同时处理主用户控制权、子用户协作、经销商管理设备和售后人员介入权限。" },
        { title: "为什么重构扫码归属", text: "设备绑定、解绑、转交流程决定了资产归属是否清晰；扫码绑定不能只追求快，还要避免交付后管理混乱。" },
        { title: "为什么设计工单闭环", text: "针对工业设备故障处理链路长的问题，设计从异常发现、任务分配、处理反馈到关闭的售后闭环。" },
        { title: "为什么规划后台管理", text: "型号配置、SN 码生成、固件管理、用户管理、经销商管理和工单管理共同支撑设备从生产到运营的生命周期。" }
      ],
      showcases: [
        { title: "01 标题 + 产品截图", text: "工业水泵智能控制与运维平台，从单一设备控制升级为设备运营管理系统。" },
        { title: "02 痛点", text: "经销商无法管理设备、转交场景复杂、售后人员权限不足，是平台化前最核心的问题。" },
        { title: "03 产品架构图", text: "设备层 → 数据采集层 → 控制服务层 → 用户端 / 管理后台 → 售后服务。" },
        { title: "04 三个产品决策", text: "多角色权限、扫码归属重构和工单闭环，是这套平台从控制工具变成运营系统的关键。" }
      ],
      notes: [
        "我的职责：产品规划 & 交互设计，梳理业务流程、信息架构、设备关系模型、扫码归属、运行监控、远程控制和工单闭环，并输出 Axure / 原型方案推动 1.0 落地。",
        "工业 IoT 产品的核心不是单纯实现远程控制，而是围绕设备资产管理、用户关系管理和售后服务闭环构建持续运营能力。",
        "后续可以结合运行数据引入异常预测、能耗优化和智能调控，但这一版重点先讲清 IoT 产品化。"
      ],
      reflection: "这类项目最能证明我处理复杂系统的能力：先把设备、角色、权限、状态和服务链路拆清楚，再把技术控制能力翻译成用户和后台都能理解的产品流程。"
    };
  }
  return fallbackCaseStudy;
}

function ProjectFile({
  project,
  onBack,
  onNavigate
}: {
  project: Project;
  onBack: () => void;
  onNavigate: (projectId: string) => void;
}) {
  const projectNumber = projects.findIndex((item) => item.id === project.id) + 1;
  const caseStudy = getCaseStudy(project);
  const caseVisuals = getProjectVisuals(project.id, project.coverImage);
  const primaryVisual = caseVisuals[0];
  const previousProject = projects[(projectNumber + projects.length - 2) % projects.length];
  const nextProject = projects[projectNumber % projects.length];
  return (
    <article className="project-file case-study-page">
      <div className="case-progress" aria-hidden="true" />
      <button className="back-button" type="button" onClick={onBack}><ArrowLeft size={15} />返回星图</button>
      <nav className="case-toc" aria-label="项目详情目录">
        {["Hero", "Why", "Goal", "Structure", "Experience", "Showcase", "Notes", "Next"].map((item, index) => (
          <a key={item} href={`#case-${index + 1}`}>{String(index + 1).padStart(2, "0")} {item}</a>
        ))}
      </nav>

      <section className="case-hero" id="case-1">
        <div className="case-hero-copy">
          <span>CASE STUDY {String(projectNumber).padStart(2, "0")}</span>
          <span className="legacy-project-file-label">PROJECT FILE {String(projectNumber).padStart(2, "0")}</span>
          <h2>{project.name}</h2>
          <p>{caseStudy.positioning}</p>
          <div className="case-tags">
            <span>{project.type}</span><span>角色：{project.role}</span><span>{project.updatedAt}</span><span>{project.status}</span>
          </div>
          <div className="project-actions">
            {project.actions.map((action) => <ProjectActionControl key={action.label} project={project} action={action} />)}
          </div>
        </div>
        <div className="case-hero-visual">
          <div className="case-mockup" style={{ backgroundImage: `url(${primaryVisual})` }}>
            <span>{project.humanNote}</span>
          </div>
        </div>
      </section>

      <div className="archive-flow case-overview">
        <ArchiveStep number="01" title="起点" text={project.archive.start} />
        <ArchiveStep number="02" title="迭代" text={project.archive.iteration} />
        <ArchiveStep number="03" title="当前" text={project.archive.current} />
        <ArchiveStep number="04" title="我的角色" text={project.role} />
      </div>

      <section className="case-section case-dark" id="case-2">
        <div className="case-section-label"><small>02</small><h3>Why / Context</h3></div>
        <div className="case-section-body">
          <p className="case-lead">{project.why}</p>
          {caseStudy.context.map((text) => <p key={text}>{text}</p>)}
          <div className="case-audience"><strong>用户是谁</strong><span>{caseStudy.audience}</span></div>
          <CaseVisual title="Context Board" note={caseStudy.audience} coverImage={primaryVisual} />
        </div>
      </section>

      <section className="case-section case-paper" id="case-3">
        <div className="case-section-label"><small>03</small><h3>Problem & Goal</h3></div>
        <div className="problem-goal-grid">
          <div><h4>当前问题</h4>{caseStudy.problems.map((item) => <p key={item}>{item}</p>)}</div>
          <div><h4>产品目标</h4>{caseStudy.goals.map((item) => <p key={item}>{item}</p>)}</div>
        </div>
        <CaseVisual title="Goal Signal" note={caseStudy.goals[0]} coverImage={primaryVisual} />
      </section>

      <section className="case-section case-dark structure-section" id="case-4">
        <div className="case-section-label"><small>04</small><h3>Solution Structure</h3></div>
        <div className="structure-map">
          {caseStudy.structure.map((item, index) => (
            <div key={item} className="structure-node">
              <small>{String(index + 1).padStart(2, "0")}</small>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="case-section key-experience" id="case-5">
        <div className="sticky-mockup">
          <div className="case-mockup large" style={{ backgroundImage: `url(${primaryVisual})` }}>
            <span>{project.name} / experience flow</span>
          </div>
        </div>
        <div className="experience-copy">
          <div className="case-section-label"><small>05</small><h3>Key Experience</h3></div>
          {caseStudy.keyExperience.map((item, index) => (
            <motion.article key={item.title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <small>{String(index + 1).padStart(2, "0")}</small>
              <h4>{item.title}</h4>
              <p>{item.text}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="case-section case-paper" id="case-6">
        <div className="case-section-label"><small>06</small><h3>UI Showcase</h3></div>
        <div className="showcase-rail">
          {caseStudy.showcases.map((item, index) => (
            <motion.article key={item.title} className="showcase-card" whileHover={{ y: -8, scale: 1.02 }}>
              <div style={{ backgroundImage: `url(${caseVisuals[index % caseVisuals.length]})` }} />
              <small>SCREEN {String(index + 1).padStart(2, "0")}</small>
              <h4>{item.title}</h4>
              <p>{item.text}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="case-section notes-section" id="case-7">
        <div className="case-section-label"><small>07</small><h3>Design Notes / Iterations</h3></div>
        <div className="note-fragments">
          {caseStudy.notes.map((note, index) => <blockquote key={note} className={`fragment-${index + 1}`}>{note}</blockquote>)}
        </div>
      </section>

      <section className="case-section reflection-section" id="case-8">
        <div className="case-section-label"><small>08</small><h3>Reflection / Next</h3></div>
        <div className="reflection-body">
          <p>{caseStudy.reflection}</p>
          <CaseVisual title="Next Orbit" note={project.next[0]} coverImage={primaryVisual} />
          <div className="next-list">{project.next.map((item) => <span key={item}>{item}</span>)}</div>
          <footer className="project-nav">
            <button type="button" aria-label="上一个项目" onClick={() => onNavigate(previousProject.id)}><ArrowLeft size={15} />{previousProject.name}</button>
            <button type="button" aria-label="下一个项目" onClick={() => onNavigate(nextProject.id)}>{nextProject.name}<ChevronRight size={15} /></button>
          </footer>
        </div>
      </section>
    </article>
  );
}

function CaseVisual({ title, note, coverImage }: { title: string; note: string; coverImage?: string }) {
  return (
    <figure className="case-visual">
      <div style={{ backgroundImage: `url(${coverImage ?? "/assets/portfolio-reference.png"})` }} />
      <figcaption><small>{title}</small><span>{note}</span></figcaption>
    </figure>
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
  const identities = [
    { title: "产品结构者", text: "把零散需求变成清晰流程、状态和边界" },
    { title: "体验观察者", text: "关注用户为什么迟疑、迷路和放弃" },
    { title: "独立创造者", text: "用 AI、原型和代码快速验证想法" }
  ];
  const focusAreas = ["AI 陪伴与情绪体验", "C 端工具与复杂体验", "IoT 软硬件协同", "文化与学习产品"];
  const workflow = ["观察场景", "发现问题", "梳理角色与流程", "设计最小验证方案", "制作原型或 Demo", "持续迭代"];
  const tools = [
    { title: "研究", items: ["竞品拆解", "用户场景", "访谈记录", "信息归档"] },
    { title: "设计", items: ["Figma", "流程图", "交互原型", "界面结构"] },
    { title: "AI 验证", items: ["ChatGPT", "Claude", "需求拆解", "内容生成"] },
    { title: "开发部署", items: ["React", "TypeScript", "Vercel", "GitHub"] }
  ];

  return (
    <article className="identity-profile about-page">
      <section className="about-hero">
        <div>
          <span>PROFILE / LIU XINGYU</span>
          <h2>我不只写 PRD，也会把想法亲手做出来。</h2>
          <p>我是刘星雨，一名偏 C 端体验与 AI 应用的产品经理，也是一名会亲手把想法做成 Demo 的独立产品创造者。</p>
          <p>我喜欢从生活中捕捉还没有被好好解决的问题，把模糊念头拆成产品结构、交互流程和可运行体验。</p>
          <p>对我来说，产品应该让复杂的事情变得自然，让人与技术之间产生更温柔、更有意义的连接。</p>
        </div>
        <aside className="identity-card">
          <div className="avatar-mark"><CircleUserRound size={42} /></div>
          <h3>刘星雨</h3>
          <p>AI 产品经理 / 独立产品创造者</p>
          <dl><div><dt>FOCUS</dt><dd>AI / C端 / IoT</dd></div><div><dt>MODE</dt><dd>Think · Build · Ship</dd></div></dl>
        </aside>
      </section>

      <section className="about-section identity-modes">
        <span>01 / ROLES</span>
        <h2>三种身份</h2>
        <div className="identity-mode-grid">
          {identities.map((item) => (
            <article key={item.title}>
              <Sparkles size={18} />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section focus-section">
        <span>02 / FOCUS</span>
        <h2>关注方向</h2>
        <div className="focus-orbits">
          {focusAreas.map((item, index) => <span key={item} className={`focus-${index + 1}`}>{item}</span>)}
        </div>
      </section>

      <section className="about-section workflow-section">
        <span>03 / HOW I WORK</span>
        <h2>产品工作方式</h2>
        <div className="workflow-line">
          {workflow.map((item, index) => (
            <div key={item}>
              <small>{String(index + 1).padStart(2, "0")}</small>
              <strong>{item}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="about-section tools-section">
        <span>04 / TOOLKIT</span>
        <h2>工具与个人档案</h2>
        <div className="tool-grid">
          {tools.map((group) => (
            <article key={group.title}>
              <h3>{group.title}</h3>
              {group.items.map((item) => <span key={item}>{item}</span>)}
            </article>
          ))}
        </div>
        <div className="personal-file">
          <p>小档案：喜欢星星、塔罗、AI 工具和把灵感做成别人能使用的产品。</p>
          <a href="mailto:contact@example.com"><Mail size={15} />联系我</a>
        </div>
      </section>
    </article>
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
