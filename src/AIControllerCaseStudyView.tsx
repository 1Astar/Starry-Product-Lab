import { ArrowLeft, ChevronRight, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { aiControllerCaseStudy, type AIControllerVisual } from "./aiControllerCaseStudy";

interface AIControllerCaseStudyProps {
  onBack: () => void;
  onNavigate: (projectId: string) => void;
}

export function AIControllerCaseStudy({ onBack, onNavigate }: AIControllerCaseStudyProps) {
  const data = aiControllerCaseStudy;

  return (
    <article className="controller-case">
      <button className="controller-back" type="button" onClick={onBack}>
        <ArrowLeft size={16} />返回项目宇宙
      </button>
      <nav className="controller-toc" aria-label="AI 控制器章节导航">
        {data.sections.map((section) => (
          <a key={section.id} href={`#controller-${section.id}`}>
            {section.label} {section.title}
          </a>
        ))}
      </nav>

      <section className="controller-hero" id="controller-hero">
        <div className="controller-hero-copy">
          <span>{data.eyebrow}</span>
          <h1>{data.title}</h1>
          <p>{data.subtitle}</p>
          {data.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className="controller-tags">
            {data.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <div className="controller-actions">
            <button type="button">查看产品介绍<ExternalLink size={14} /></button>
            <a href="#controller-iterations">查看设计过程</a>
          </div>
        </div>
        <ControlPoster note={data.note} />
      </section>

      <section className="controller-section controller-dark" id="controller-why">
        <SectionLabel label="02" title="我为什么会做它？" />
        <div className="controller-why-grid">
          <div>
            {data.why.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <ListBlock title="用户背景" items={data.why.users} />
          </div>
          <div className="controller-evolution-stack">
            {data.why.evolution.map((visual) => (
              <VisualCard key={visual.title} visual={visual} />
            ))}
          </div>
        </div>
      </section>

      <section className="controller-paper" id="controller-problem-goal">
        <SectionLabel label="03" title="现有设备运维的问题" />
        <div className="controller-columns">
          <ListBlock title="问题清单" items={data.problems} />
          <ListBlock title="产品目标" items={data.goals} />
        </div>
        <div className="controller-before-after">
          {data.beforeAfter.map((item) => (
            <p key={item.before}>
              <span>{item.before}</span>
              <strong>{item.after}</strong>
            </p>
          ))}
        </div>
      </section>

      <section className="controller-section controller-system" id="controller-solution">
        <SectionLabel label="04" title="一台设备接入后，真正要管理的是整条运行链路" />
        <div className="controller-layer-map">
          <div className="controller-field">
            <span>现场设备</span>
            <i />
            <strong>AI Controller</strong>
          </div>
          <div className="controller-layers">
            {data.solution.layers.map((layer, index) => (
              <p key={layer}>
                <small>{String(index + 1).padStart(2, "0")}</small>
                {layer}
              </p>
            ))}
          </div>
          <div className="controller-modules">
            {data.solution.modules.map((module) => (
              <article key={module.title}>
                <h3>{module.title}</h3>
                <p>{module.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="controller-section controller-key-experience" id="controller-key-experience">
        <div className="controller-sticky-panel">
          <div className="controller-platform-mock">
            <span>Ops Console</span>
            <h3>设备在线 · 控制待回执</h3>
            <div className="status-row"><i className="ok" />运行中</div>
            <div className="status-row"><i className="warn" />1 条告警待处理</div>
            <div className="status-row"><i className="off" />最近同步 12 秒前</div>
          </div>
        </div>
        <div className="controller-experience-copy">
          <SectionLabel label="05" title="Key Experience" />
          {data.experiences.map((item, index) => (
            <motion.article key={item.title} whileHover={{ x: 8 }}>
              <small>{String(index + 1).padStart(2, "0")}</small>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="controller-paper controller-showcase" id="controller-ui-showcase">
        <SectionLabel label="06" title="UI Showcase" />
        <div className="controller-showcase-rail">
          {data.showcase.map((visual) => (
            <motion.article key={visual.title} whileHover={{ y: -8 }}>
              <VisualCard visual={visual} />
              <h3>{visual.title}</h3>
              <p>{visual.caption}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="controller-section controller-notes" id="controller-iterations">
        <SectionLabel label="07" title="它不是一个控制按钮项目" />
        <div className="controller-note-grid">
          {data.notes.map((note) => (
            <article key={note.title}>
              <h3>{note.title}</h3>
              <p>{note.text}</p>
            </article>
          ))}
        </div>
        <div className="controller-timeline">
          {data.timeline.map((item) => (
            <p key={item.label}>
              <strong>{item.label}</strong>
              <span>{item.text}</span>
            </p>
          ))}
        </div>
      </section>

      <section className="controller-section controller-reflection" id="controller-reflection">
        <SectionLabel label="08" title="这个项目让我重新理解了 B 端产品的“可靠”" />
        {data.reflection.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <ListBlock title="当前成果" items={data.reflection.outcomes} />
        <ListBlock title="下一步" items={data.reflection.next} />
        <blockquote>{data.reflection.closing}</blockquote>
        <div className="controller-actions">
          <button type="button">查看 AI 控制器产品介绍<ExternalLink size={14} /></button>
          <button type="button" onClick={() => onNavigate("culture-game")}>查看下一个项目：传统文化游戏化学习<ChevronRight size={14} /></button>
          <button type="button" onClick={onBack}>返回项目宇宙</button>
        </div>
      </section>
    </article>
  );
}

function SectionLabel({ label, title }: { label: string; title: string }) {
  return (
    <header className="controller-section-label">
      <small>{label}</small>
      <h2>{title}</h2>
    </header>
  );
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="controller-list-block">
      <h3>{title}</h3>
      {items.map((item) => (
        <p key={item}>{item}</p>
      ))}
    </div>
  );
}

function ControlPoster({ note }: { note: string }) {
  return (
    <figure className="controller-poster">
      <img
        className="controller-case-screenshot"
        src="/assets/case-studies/ai-controller/dashboard-masked.png"
        alt="智能水泵小程序状态看板原型图（已脱敏）"
      />
      <div className="pump-body"><i /><span>pump</span></div>
      <div className="controller-chip">AI<br />CTRL</div>
      <div className="cloud-node">云平台</div>
      <div className="mini-node">小程序</div>
      <div className="alarm-node">告警工单</div>
      <div className="service-node">售后运维</div>
      <figcaption>{note}</figcaption>
    </figure>
  );
}

function VisualCard({ visual }: { visual: AIControllerVisual }) {
  return (
    <figure className={`controller-visual-card visual-${visual.tone}`}>
      <div>
        <i />
        <span>{visual.tone}</span>
      </div>
      <figcaption>
        <strong>{visual.title}</strong>
        <small>{visual.caption}</small>
      </figcaption>
    </figure>
  );
}
