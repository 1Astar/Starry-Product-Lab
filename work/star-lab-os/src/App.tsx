import {
  Archive,
  Bot,
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  FileText,
  Folder,
  Inbox,
  LayoutGrid,
  LockKeyhole,
  Mail,
  Moon,
  MousePointerClick,
  PackageCheck,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Tag,
  TerminalSquare,
  UserRound
} from "lucide-react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useMemo, useRef, useState } from "react";
import type { PointerEvent } from "react";
import { displayStatement, ideas, moduleNotes, projects, terminalLines } from "./data";
import type { ModuleNote, ModuleNoteId, Project, ProjectAction, WindowId } from "./types";

gsap.registerPlugin(ScrollTrigger);

const dockItems: Array<{ id: WindowId; label: string; icon: typeof Sparkles }> = [
  { id: "home", label: "Home", icon: Sparkles },
  { id: "projects", label: "Projects", icon: Folder },
  { id: "about", label: "About Me", icon: UserRound },
  { id: "resume", label: "Resume", icon: FileText },
  { id: "inbox", label: "Idea Inbox", icon: Inbox },
  { id: "terminal", label: "Terminal", icon: TerminalSquare }
];

const windowVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 16 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.96, y: 10 }
};

const moduleIconMap: Record<ModuleNoteId, typeof Sparkles> = {
  "project-detail": PackageCheck,
  "idea-inbox": Inbox,
  "key-vault": LockKeyhole,
  "system-functions": Tag
};

function App() {
  const [activeWindow, setActiveWindow] = useState<WindowId>("home");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedModuleId, setSelectedModuleId] = useState<ModuleNoteId | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 90, damping: 24, mass: 0.45 });
  const smoothY = useSpring(mouseY, { stiffness: 90, damping: 24, mass: 0.45 });
  const heroX = useTransform(smoothX, [-1, 1], [-10, 10]);
  const heroY = useTransform(smoothY, [-1, 1], [-8, 8]);
  const terminalX = useTransform(smoothX, [-1, 1], [12, -12]);
  const terminalY = useTransform(smoothY, [-1, 1], [9, -9]);
  const workspaceX = useTransform(smoothX, [-1, 1], [-6, 6]);
  const workspaceY = useTransform(smoothY, [-1, 1], [-5, 5]);
  const starX = useTransform(smoothX, [-1, 1], [-12, 12]);
  const starY = useTransform(smoothY, [-1, 1], [-12, 12]);

  const selectedProject = useMemo(
    () => projects.find((project) => project.id === selectedProjectId) ?? null,
    [selectedProjectId]
  );
  const selectedModule = useMemo(
    () => moduleNotes.find((moduleNote) => moduleNote.id === selectedModuleId) ?? null,
    [selectedModuleId]
  );

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (typeof window === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    mouseX.set((event.clientX / window.innerWidth - 0.5) * 2);
    mouseY.set((event.clientY / window.innerHeight - 0.5) * 2);
  };

  const resetPointer = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const openWindow = (windowId: WindowId) => {
    setActiveWindow(windowId);
    if (windowId !== "projects") {
      setSelectedProjectId(null);
    }
  };

  const openProject = (project: Project) => {
    setActiveWindow("projects");
    setSelectedProjectId(project.id);
  };

  return (
    <main className="desktop-shell" onPointerMove={handlePointerMove} onPointerLeave={resetPointer}>
      <TopBar />
      <Dock activeWindow={activeWindow} onOpen={openWindow} />

      <section className="desktop-stage" aria-label="Star Lab OS desktop">
        <motion.div className="ambient-star star-one" style={{ x: starX, y: starY }} />
        <motion.div className="ambient-star star-two" style={{ x: heroX, y: terminalY }} />
        <motion.div className="ambient-star star-three" style={{ x: terminalX, y: workspaceY }} />

        <div className="hero-grid">
          <motion.section className="hero-window glass-panel" style={{ x: heroX, y: heroY }}>
            <WindowChrome title="Star Lab" />
            <div className="hero-copy">
              <p className="identity-line">AI 产品经理 / 独立产品创造者</p>
              <h1>
                Hello，<span className="keep-together">我是刘星雨</span>
              </h1>
              <p className="hero-text">
                我关注 AI 应用、C端体验、IoT 软硬件协同与工具型产品。
                喜欢把一个模糊想法，拆成清晰流程、交互原型和可运行的产品。
              </p>
              <div className="hero-actions">
                <button className="primary-action" type="button" onClick={() => openWindow("projects")}>
                  <Rocket size={18} />
                  探索我的项目宇宙
                </button>
                <button className="secondary-action" type="button" onClick={() => openWindow("resume")}>
                  <FileText size={18} />
                  查看简历
                </button>
              </div>
            </div>
          </motion.section>

          <motion.div style={{ x: terminalX, y: terminalY }}>
            <TerminalPanel compact />
          </motion.div>
        </div>

        <motion.section className="workspace-grid" style={{ x: workspaceX, y: workspaceY }}>
          <div className="window-slot main-slot">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeWindow}-${selectedProjectId ?? "list"}`}
                variants={windowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                {activeWindow === "home" && <HomeOverview onOpen={openWindow} />}
                {activeWindow === "projects" &&
                  (selectedProject ? (
                    <ProjectDetail project={selectedProject} onBack={() => setSelectedProjectId(null)} />
                  ) : (
                    <ProjectsWindow onOpenProject={openProject} />
                  ))}
                {activeWindow === "about" && <AboutWindow />}
                {activeWindow === "resume" && <ResumeWindow />}
                {activeWindow === "inbox" && <IdeaInboxWindow />}
                {activeWindow === "terminal" && <TerminalPanel />}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.section>

        <ModuleAnnotations onOpen={setSelectedModuleId} />
        <SelectedWorksSection onOpenProject={openProject} />
      </section>

      <AnimatePresence>
        {selectedModule && <ModuleModal moduleNote={selectedModule} onClose={() => setSelectedModuleId(null)} />}
      </AnimatePresence>
    </main>
  );
}

function TopBar() {
  return (
    <header className="top-bar">
      <div className="menu-left">
        <Star size={18} fill="currentColor" />
        <strong>Star Lab</strong>
        <span>File</span>
        <span>Edit</span>
        <span>View</span>
        <span>Projects</span>
        <span>Tools</span>
        <span>Window</span>
        <span>Help</span>
      </div>
      <div className="menu-right">
        <Moon size={16} />
        <span>Wed 07.08</span>
        <span>16:44</span>
      </div>
    </header>
  );
}

interface DockProps {
  activeWindow: WindowId;
  onOpen: (windowId: WindowId) => void;
}

function Dock({ activeWindow, onOpen }: DockProps) {
  return (
    <nav className="dock" aria-label="Star Lab OS Dock">
      {dockItems.map((item) => {
        const Icon = item.icon;
        return (
          <button
            className={activeWindow === item.id ? "dock-button active" : "dock-button"}
            key={item.id}
            type="button"
            aria-label={item.label}
            onClick={() => onOpen(item.id)}
          >
            <Icon size={24} />
          </button>
        );
      })}
    </nav>
  );
}

function WindowChrome({ title }: { title: string }) {
  return (
    <div className="window-chrome">
      <div className="traffic-lights" aria-hidden="true">
        <span className="red" />
        <span className="yellow" />
        <span className="green" />
      </div>
      <span className="window-title">{title}</span>
    </div>
  );
}

function HomeOverview({ onOpen }: { onOpen: (windowId: WindowId) => void }) {
  return (
    <section className="overview-panel glass-panel">
      <WindowChrome title="Desktop / Overview" />
      <div className="overview-content">
        <div>
          <h2>Star Lab OS</h2>
          <p>
            这里不是普通简历页，而是一个把项目、简历、产品思考和灵感入口串起来的个人操作系统。
          </p>
        </div>
        <div className="quick-grid">
          <QuickCard icon={LayoutGrid} title="Projects" text="公开作品、工作案例与详情模板" onClick={() => onOpen("projects")} />
          <QuickCard icon={UserRound} title="About Me" text="定位、能力和产品理念" onClick={() => onOpen("about")} />
          <QuickCard icon={FileText} title="Resume" text="简历预览、下载与联系" onClick={() => onOpen("resume")} />
          <QuickCard icon={Inbox} title="Idea Inbox" text="半公开灵感索引" onClick={() => onOpen("inbox")} />
        </div>
      </div>
    </section>
  );
}

interface QuickCardProps {
  icon: typeof Sparkles;
  title: string;
  text: string;
  onClick: () => void;
}

function QuickCard({ icon: Icon, title, text, onClick }: QuickCardProps) {
  return (
    <button className="quick-card" type="button" onClick={onClick}>
      <Icon size={22} />
      <span>{title}</span>
      <small>{text}</small>
    </button>
  );
}

function ProjectsWindow({ onOpenProject }: { onOpenProject: (project: Project) => void }) {
  const publicProjects = projects.filter((project) => project.category === "公开作品");
  const workCases = projects.filter((project) => project.category === "工作案例");

  return (
    <section className="projects-window glass-panel">
      <WindowChrome title="Projects" />
      <div className="window-heading">
        <div>
          <h2>Projects｜项目宇宙</h2>
          <p>把想法落到真实世界里的实验记录。</p>
        </div>
        <button className="ghost-tool" type="button">
          <Search size={16} />
          筛选
        </button>
      </div>
      <div className="display-statement">
        <ShieldCheck size={17} />
        <p>{displayStatement}</p>
      </div>
      <ProjectGroup
        title="公开作品"
        description="可以直接体验的展示版、Demo 或个人项目。"
        projects={publicProjects}
        onOpenProject={onOpenProject}
      />
      <ProjectGroup
        title="工作案例"
        description="只展示脱敏后的产品思路、流程结构和本人参与部分。"
        projects={workCases}
        onOpenProject={onOpenProject}
      />
      <section className="idea-lab-panel">
        <div className="project-section-heading">
          <div>
            <span>Idea Lab</span>
            <h3>灵感实验室</h3>
          </div>
          <p>半公开灵感索引，只保留标题、方向和状态。</p>
        </div>
        <div className="idea-chip-grid">
          {ideas.map((idea) => (
            <article className="idea-chip" key={idea.title}>
              <Sparkles size={16} />
              <div>
                <strong>{idea.title}</strong>
                <small>{idea.note}</small>
              </div>
              <span>{idea.status}</span>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}

interface ProjectGroupProps {
  title: string;
  description: string;
  projects: Project[];
  onOpenProject: (project: Project) => void;
}

function ProjectGroup({ title, description, projects: groupProjects, onOpenProject }: ProjectGroupProps) {
  return (
    <section className="project-section">
      <div className="project-section-heading">
        <div>
          <span>{title === "公开作品" ? "Public Works" : "Work Cases"}</span>
          <h3>{title}</h3>
        </div>
        <p>{description}</p>
      </div>
      <div className="project-grid">
        {groupProjects.map((project) => (
          <ProjectCard project={project} key={project.id} onOpenProject={onOpenProject} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, onOpenProject }: { project: Project; onOpenProject: (project: Project) => void }) {
  return (
    <motion.article
      className="project-card"
      whileHover={{ y: -8, rotate: project.id === "follow-heart" ? -1.4 : 1.2 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <div className={`project-visual visual-${project.id}`} aria-hidden="true">
        <div className="project-visual-glow" />
        <Sparkles size={18} />
      </div>
      <div className="project-card-top">
        <span>{project.type}</span>
        <strong>{project.status}</strong>
      </div>
      <h3>{project.name}</h3>
      <p>{project.value}</p>
      <dl>
        <div>
          <dt>我的角色</dt>
          <dd>{project.role}</dd>
        </div>
        <div>
          <dt>最近更新</dt>
          <dd>{project.updatedAt}</dd>
        </div>
      </dl>
      <ProjectActions project={project} onOpenProject={onOpenProject} />
    </motion.article>
  );
}

function ProjectActions({ project, onOpenProject }: { project: Project; onOpenProject: (project: Project) => void }) {
  return (
    <div className="project-actions">
      {project.actions.map((action) => (
        <ProjectActionControl action={action} key={action.label} project={project} onOpenProject={onOpenProject} />
      ))}
    </div>
  );
}

function ProjectActionControl({
  action,
  project,
  onOpenProject
}: {
  action: ProjectAction;
  project: Project;
  onOpenProject: (project: Project) => void;
}) {
  if (action.kind === "external" && action.url) {
    return (
      <a href={action.url} aria-label={`${project.name} ${action.label}`} target="_blank" rel="noreferrer">
        {action.label}
        <ExternalLink size={14} />
      </a>
    );
  }

  return (
    <button type="button" aria-label={`${project.name} ${action.label}`} onClick={() => onOpenProject(project)}>
      {action.label}
      <ChevronRight size={14} />
    </button>
  );
}

function ModuleAnnotations({ onOpen }: { onOpen: (moduleId: ModuleNoteId) => void }) {
  return (
    <section className="annotation-board" aria-label="Star Lab OS module annotations">
      <div className="annotation-heading">
        <Sparkles size={18} />
        <span>把宇宙装进浏览器，把想法变成可运行的星星。</span>
      </div>
      <div className="annotation-grid">
        {moduleNotes.map((moduleNote, index) => (
          <button
            className={`annotation-card note-${moduleNote.id}`}
            key={moduleNote.id}
            type="button"
            aria-label={`打开 ${moduleNote.title} 说明`}
            onClick={() => onOpen(moduleNote.id)}
          >
            <span className="hand-label">
              {moduleNote.title}
              <MousePointerClick size={15} />
            </span>
            <ModulePreview moduleNote={moduleNote} index={index} />
            <strong>{moduleNote.kicker}</strong>
            <small>{moduleNote.description}</small>
          </button>
        ))}
      </div>
    </section>
  );
}

function ModulePreview({ moduleNote, index }: { moduleNote: ModuleNote; index: number }) {
  const Icon = moduleIconMap[moduleNote.id];
  return (
    <div className={`module-preview preview-${moduleNote.id}`}>
      <WindowChrome title={moduleNote.title} />
      <div className="module-preview-body">
        <Icon size={26} />
        <div>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <p>{moduleNote.bullets[0]}</p>
        </div>
      </div>
      <div className="mini-lines" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
    </div>
  );
}

function ModuleModal({ moduleNote, onClose }: { moduleNote: ModuleNote; onClose: () => void }) {
  const Icon = moduleIconMap[moduleNote.id];
  return (
    <motion.div
      className="module-modal-backdrop"
      data-testid="module-modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.article
        className="module-modal glass-panel"
        role="dialog"
        aria-label={moduleNote.title}
        initial={{ opacity: 0, scale: 0.96, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        onClick={(event) => event.stopPropagation()}
      >
        <WindowChrome title={moduleNote.title} />
        <div className="module-modal-content">
          <div className="module-modal-icon">
            <Icon size={34} />
          </div>
          <div>
            <span className="modal-kicker">{moduleNote.kicker}</span>
            <h2>{moduleNote.title}</h2>
            <p>{moduleNote.description}</p>
          </div>
          <ul>
            {moduleNote.bullets.map((item) => (
              <li key={item}>
                <ShieldCheck size={16} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </motion.article>
    </motion.div>
  );
}

function SelectedWorksSection({ onOpenProject }: { onOpenProject: (project: Project) => void }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      typeof window.matchMedia !== "function" ||
      window.matchMedia("(max-width: 720px)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !sectionRef.current ||
      !trackRef.current
    ) {
      return;
    }

    const section = sectionRef.current;
    const track = trackRef.current;
    const ctx = gsap.context(() => {
      const distance = Math.max(0, track.scrollWidth - section.clientWidth);
      gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance + window.innerHeight * 0.8}`,
          scrub: 0.9,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className="selected-works" ref={sectionRef}>
      <div className="selected-works-head">
        <span>Selected Works</span>
        <h2>向下滚动，浏览我的项目宇宙</h2>
      </div>
      <div className="works-track" ref={trackRef}>
        {projects.map((project) => (
          <motion.article
            className="work-strip-card"
            key={project.id}
            whileHover={{ y: -10, rotate: project.id === "ai-companion" ? 1.4 : -1.2 }}
            transition={{ type: "spring", stiffness: 250, damping: 22 }}
          >
            <div className={`work-strip-image visual-${project.id}`} aria-hidden="true">
              <Sparkles size={24} />
            </div>
            <span>{project.type}</span>
            <h3>{project.name}</h3>
            <p>{project.value}</p>
            <div className="work-strip-actions">
              <PrimaryWorkAction project={project} onOpenProject={onOpenProject} />
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function PrimaryWorkAction({ project, onOpenProject }: { project: Project; onOpenProject: (project: Project) => void }) {
  const primaryExternal = project.actions.find((action) => action.kind === "external" && action.url);

  if (primaryExternal?.url) {
    return (
      <>
        <a href={primaryExternal.url} target="_blank" rel="noreferrer">
          {primaryExternal.label}
          <ExternalLink size={14} />
        </a>
        <button type="button" onClick={() => onOpenProject(project)}>
          详情 <ChevronRight size={14} />
        </button>
      </>
    );
  }

  return (
    <button type="button" onClick={() => onOpenProject(project)}>
      查看案例 <ChevronRight size={14} />
    </button>
  );
}

function ProjectDetail({ project, onBack }: { project: Project; onBack: () => void }) {
  return (
    <article className="detail-window glass-panel">
      <WindowChrome title="Project Detail" />
      <button className="back-button" type="button" onClick={onBack}>
        <ChevronLeft size={16} />
        返回项目宇宙
      </button>
      <div className="detail-layout">
        <aside className="detail-sidebar">
          <span>{project.type}</span>
          <h2>{project.name}</h2>
          <p>{project.summary}</p>
          <div className="screenshot-placeholder">
            <Sparkles size={34} />
            <small>关键页面截图位</small>
          </div>
        </aside>
        <section className="detail-content">
          <DetailBlock title="我为什么做它" text={project.why} />
          <DetailBlock title="用户/场景问题" text={project.problem} />
          <DetailBlock title="我的解决方案" text={project.solution} />
          <DetailList title="核心功能" items={project.features} />
          <DetailList title="我做了什么" items={project.contribution} />
          <DetailBlock title="当前进度" text={project.progress} />
          <DetailList title="下一步计划" items={project.next} />
          <div className="detail-links">
            {project.actions.map((action) =>
              action.kind === "external" && action.url ? (
                <a href={action.url} key={action.label} target="_blank" rel="noreferrer">
                  {action.label}
                  <ExternalLink size={14} />
                </a>
              ) : (
                <span className="detail-action-note" key={action.label}>
                  {action.label}
                </span>
              )
            )}
          </div>
        </section>
      </div>
    </article>
  );
}

function DetailBlock({ title, text }: { title: string; text: string }) {
  return (
    <section className="detail-block">
      <h3>{title}</h3>
      <p>{text}</p>
    </section>
  );
}

function DetailList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="detail-block">
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

function AboutWindow() {
  return (
    <section className="about-window glass-panel">
      <WindowChrome title="About Me" />
      <div className="window-heading">
        <div>
          <h2>About Me｜关于我</h2>
          <p>我不是只写 PRD 的产品经理。</p>
        </div>
      </div>
      <div className="about-columns">
        <div className="about-statement">
          <Bot size={30} />
          <p>我会自己想、自己拆、自己画、自己做、自己部署。</p>
        </div>
        <div className="capability-list">
          <h3>我擅长</h3>
          <ul>
            <li>把模糊想法变成产品结构</li>
            <li>把复杂流程变成清晰体验</li>
            <li>用 AI 工具辅助需求验证与原型开发</li>
            <li>独立完成从想法到上线展示</li>
          </ul>
        </div>
        <div className="capability-list">
          <h3>工具能力</h3>
          <ul>
            <li>AI 辅助原型与内容生产</li>
            <li>React / Vite 静态展示</li>
            <li>PRD、流程图、竞品分析</li>
            <li>IoT 软硬件协同沟通</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function ResumeWindow() {
  return (
    <section className="resume-window glass-panel">
      <WindowChrome title="Resume" />
      <div className="resume-card">
        <FileText size={44} />
        <div>
          <h2>刘星雨_AI产品经理_简历.pdf</h2>
          <p>页面版简历和 PDF 文件位会在正式内容补齐后接入。</p>
        </div>
      </div>
      <div className="resume-actions">
        <button type="button">预览</button>
        <button type="button">
          <Download size={16} />
          下载
        </button>
        <button type="button">
          <Mail size={16} />
          联系我
        </button>
      </div>
    </section>
  );
}

function IdeaInboxWindow() {
  return (
    <section className="inbox-window glass-panel">
      <WindowChrome title="Idea Inbox" />
      <div className="window-heading">
        <div>
          <h2>Idea Inbox｜灵感收件箱</h2>
          <p>只展示半公开索引，不展示敏感细节。</p>
        </div>
        <Archive size={20} />
      </div>
      <div className="idea-list">
        {ideas.map((idea) => (
          <article className="idea-row" key={idea.title}>
            <Sparkles size={18} />
            <div>
              <h3>{idea.title}</h3>
              <p>{idea.note}</p>
            </div>
            <span>{idea.status}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function TerminalPanel({ compact = false }: { compact?: boolean }) {
  return (
    <section className={compact ? "terminal-panel compact glass-panel" : "terminal-panel glass-panel"}>
      <WindowChrome title="Star Lab Terminal" />
      <pre aria-label="terminal boot log">
        {terminalLines.map((line, index) => (
          <motion.code
            className="terminal-line"
            key={line}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.42, duration: 0.26 }}
          >
            <span>{line}</span>
            {index === terminalLines.length - 1 && <b className="terminal-cursor" aria-hidden="true" />}
          </motion.code>
        ))}
      </pre>
      {!compact && (
        <div className="command-hints">
          <span>available commands:</span>
          <strong>projects</strong>
          <strong>about</strong>
          <strong>resume</strong>
          <strong>contact</strong>
          <strong>star</strong>
        </div>
      )}
    </section>
  );
}

export default App;
