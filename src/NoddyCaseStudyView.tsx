import { ArrowLeft, ChevronRight, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { noddyCaseStudy, type NoddyVisual } from "./noddyCaseStudy";

interface NoddyCaseStudyProps {
  onBack: () => void;
  onNavigate: (projectId: string) => void;
}

export function NoddyCaseStudy({ onBack, onNavigate }: NoddyCaseStudyProps) {
  const data = noddyCaseStudy;

  return (
    <article className="noddy-case">
      <button className="noddy-back" type="button" onClick={onBack}>
        <ArrowLeft size={16} />返回项目宇宙
      </button>
      <nav className="noddy-toc" aria-label="Noddy 章节导航">
        {data.sections.map((section) => (
          <a key={section.id} href={`#noddy-${section.id}`}>
            {section.label} {section.title}
          </a>
        ))}
      </nav>

      <section className="noddy-hero" id="noddy-hero">
        <div className="noddy-hero-copy">
          <span>{data.eyebrow}</span>
          <h1>{data.title}</h1>
          <p>{data.subtitle}</p>
          {data.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className="noddy-tags">
            {data.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <div className="noddy-actions">
            <button type="button">查看产品原型<ExternalLink size={14} /></button>
            <a href="#noddy-iterations">查看设计过程</a>
          </div>
        </div>
        <CompanionLab note={data.note} />
      </section>

      <section className="noddy-section noddy-warm-dark" id="noddy-why">
        <SectionLabel label="02" title="我为什么会做它？" />
        <div className="noddy-why-grid">
          <div>
            {data.why.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <ListBlock title="用户背景" items={data.why.users} />
          </div>
          <div className="noddy-evolution-stack">
            {data.why.evolution.map((visual) => (
              <VisualCard key={visual.title} visual={visual} />
            ))}
          </div>
        </div>
      </section>

      <section className="noddy-paper" id="noddy-problem-goal">
        <SectionLabel label="03" title="现有体验的问题" />
        <div className="noddy-columns">
          <ListBlock title="问题清单" items={data.problems} />
          <ListBlock title="产品目标" items={data.goals} />
        </div>
        <div className="noddy-before-after">
          {data.beforeAfter.map((item) => (
            <p key={item.before}>
              <span>{item.before}</span>
              <strong>{item.after}</strong>
            </p>
          ))}
        </div>
      </section>

      <section className="noddy-section noddy-system-section" id="noddy-solution">
        <SectionLabel label="04" title="一次陪伴，不是一句回复，而是一条完整的状态链路" />
        <div className="noddy-system-map">
          <div className="noddy-core">
            <i />
            <strong>Noddy</strong>
            <span>companion state</span>
          </div>
          <div className="noddy-flow">
            {data.solution.flow.map((step, index) => (
              <p key={step}>
                <small>{String(index + 1).padStart(2, "0")}</small>
                {step}
              </p>
            ))}
          </div>
          <div className="noddy-modules">
            {data.solution.modules.map((module) => (
              <article key={module.title}>
                <h3>{module.title}</h3>
                <p>{module.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="noddy-section noddy-key-experience" id="noddy-key-experience">
        <div className="noddy-sticky-mockup">
          <DeviceMockup title="Noddy App" caption="状态 / 情绪 / 日记 / 连接" />
        </div>
        <div className="noddy-experience-copy">
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

      <section className="noddy-paper noddy-showcase" id="noddy-ui-showcase">
        <SectionLabel label="06" title="UI Showcase" />
        <div className="noddy-showcase-rail">
          {data.showcase.map((visual, index) => (
            <motion.article key={visual.title} whileHover={{ y: -8, rotate: index % 2 ? 1 : -1 }}>
              <VisualCard visual={visual} />
              <h3>{visual.title}</h3>
              <p>{visual.caption}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="noddy-section noddy-notes" id="noddy-iterations">
        <SectionLabel label="07" title="它不是一开始就“像活的”" />
        <div className="noddy-note-grid">
          {data.notes.map((note) => (
            <article key={note.title}>
              <h3>{note.title}</h3>
              <p>{note.text}</p>
            </article>
          ))}
        </div>
        <div className="noddy-timeline">
          {data.timeline.map((item) => (
            <p key={item.label}>
              <strong>{item.label}</strong>
              <span>{item.text}</span>
            </p>
          ))}
        </div>
      </section>

      <section className="noddy-section noddy-reflection" id="noddy-reflection">
        <SectionLabel label="08" title="这个项目让我重新理解了“陪伴感”" />
        {data.reflection.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <ListBlock title="当前成果" items={data.reflection.outcomes} />
        <ListBlock title="下一步" items={data.reflection.next} />
        <blockquote>{data.reflection.closing}</blockquote>
        <div className="noddy-actions">
          <button type="button">查看 Noddy 原型<ExternalLink size={14} /></button>
          <button type="button" onClick={() => onNavigate("star-pm")}>查看下一个项目：Star PM<ChevronRight size={14} /></button>
          <button type="button" onClick={onBack}>返回项目宇宙</button>
        </div>
      </section>
    </article>
  );
}

function SectionLabel({ label, title }: { label: string; title: string }) {
  return (
    <header className="noddy-section-label">
      <small>{label}</small>
      <h2>{title}</h2>
    </header>
  );
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="noddy-list-block">
      <h3>{title}</h3>
      {items.map((item) => (
        <p key={item}>{item}</p>
      ))}
    </div>
  );
}

function CompanionLab({ note }: { note: string }) {
  return (
    <figure className="noddy-lab">
      <div className="noddy-pet" aria-hidden="true">
        <span className="ear left" />
        <span className="ear right" />
        <span className="face"><i /><i /></span>
      </div>
      <div className="lab-card app-home">App 首页<br /><small>现在怎么样</small></div>
      <div className="lab-card mood">情绪坐标<br /><small>平静 / 开心 / 困了</small></div>
      <div className="lab-card diary">互动日记<br /><small>今天的小相处</small></div>
      <div className="lab-card rule">声音动作规则<br /><small>节奏 / 幅度 / 停顿</small></div>
      <figcaption>{note}</figcaption>
    </figure>
  );
}

function DeviceMockup({ title, caption }: { title: string; caption: string }) {
  return (
    <div className="noddy-device-mockup">
      <span>{title}</span>
      <div className="mood-orb" />
      <h3>Noddy 在这里</h3>
      <p>{caption}</p>
      <div className="status-bars"><i /><i /><i /></div>
    </div>
  );
}

function VisualCard({ visual }: { visual: NoddyVisual }) {
  return (
    <figure className={`noddy-visual-card visual-${visual.kind}`}>
      <div><i /><span>{visual.kind}</span></div>
      <figcaption>
        <strong>{visual.title}</strong>
        <small>{visual.caption}</small>
      </figcaption>
    </figure>
  );
}
