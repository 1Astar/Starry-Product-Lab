import { ArrowLeft, ChevronRight, ExternalLink, Radar, ShieldAlert, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { jobRadarCaseStudy, type JobRadarVisual } from "./jobRadarCaseStudy";

interface JobRadarCaseStudyProps {
  onBack: () => void;
  onNavigate: (projectId: string) => void;
}

export function JobRadarCaseStudy({ onBack, onNavigate }: JobRadarCaseStudyProps) {
  const data = jobRadarCaseStudy;

  return (
    <article className="job-case">
      <button className="job-back" type="button" onClick={onBack}>
        <ArrowLeft size={16} />返回 Idea Lab
      </button>
      <nav className="job-toc" aria-label="Job Radar 章节导航">
        {data.sections.map((section) => (
          <a key={section.id} href={`#job-${section.id}`}>{section.label} {section.title}</a>
        ))}
      </nav>

      <section className="job-hero" id="job-hero">
        <div className="job-hero-copy">
          <span>{data.eyebrow}</span>
          <h1>{data.title}</h1>
          <p>{data.subtitle}</p>
          {data.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <div className="job-tags">{data.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          <div className="job-actions">
            <button type="button">查看插件原型<ExternalLink size={14} /></button>
            <a href="#job-key-experience">查看判断流程</a>
            <button type="button" onClick={onBack}>返回 Idea Lab</button>
          </div>
        </div>
        <JobRadarPoster note={data.note} />
      </section>

      <section className="job-section job-dark" id="job-why">
        <SectionLabel label="02" title="我为什么会做它？" />
        <div className="job-why-grid">
          <div>
            {data.why.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <ListBlock title="用户背景" items={data.why.users} />
          </div>
          <div className="job-signal-stack">
            {data.why.signals.map((visual, index) => (
              <motion.div key={visual.title} whileHover={{ y: -8, rotate: index % 2 ? 1 : -1 }}>
                <VisualCard visual={visual} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="job-paper" id="job-problem-goal">
        <SectionLabel label="03" title="求职工具不应该只帮人“投得更多”" />
        <div className="job-columns">
          <ListBlock title="现有体验的问题" items={data.problems} />
          <ListBlock title="产品目标" items={data.goals} />
        </div>
        <div className="job-before-after">
          <p><span>批量投递</span><strong>先判断是否值得投</strong></p>
          <p><span>关键词匹配</span><strong>公司质量优先</strong></p>
          <p><span>模板开场白</span><strong>岗位适配表达</strong></p>
        </div>
      </section>

      <section className="job-section job-solution" id="job-solution">
        <SectionLabel label="04" title="一次投递判断，是一条从页面到决策的链路" />
        <div className="job-radar-map">
          <div className="job-radar-core"><Radar size={52} /><strong>Job Radar</strong><span>scan before apply</span></div>
          <div className="job-flow">
            {data.solution.flow.map((step, index) => (
              <p key={step}><small>{String(index + 1).padStart(2, "0")}</small>{step}</p>
            ))}
          </div>
          <div className="job-modules">
            {data.solution.modules.map((module) => (
              <article key={module.title}><h3>{module.title}</h3><p>{module.text}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="job-section job-key-experience" id="job-key-experience">
        <div className="job-sticky-mockup"><BrowserMockup /></div>
        <div className="job-experience-copy">
          <SectionLabel label="05" title="重点体验：先判断，再投递" />
          {data.experiences.map((item, index) => (
            <motion.article key={item.title} whileHover={{ x: 8 }}>
              <small>{String(index + 1).padStart(2, "0")}</small>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              {item.emphasis ? <blockquote>{item.emphasis}</blockquote> : null}
            </motion.article>
          ))}
        </div>
      </section>

      <section className="job-paper job-showcase" id="job-ui-showcase">
        <SectionLabel label="06" title="UI Showcase" />
        <div className="job-showcase-rail">
          {data.showcase.map((visual, index) => (
            <motion.article key={visual.title} whileHover={{ y: -8, rotate: index % 2 ? 1 : -1 }}>
              <VisualCard visual={visual} />
              <h3>{visual.title}</h3>
              <p>{visual.caption}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="job-section job-notes" id="job-iterations">
        <SectionLabel label="07" title="它不是为了海投，而是为了少踩坑" />
        <div className="job-note-grid">
          {data.notes.map((note) => <article key={note.title}><h3>{note.title}</h3><p>{note.text}</p></article>)}
        </div>
        <p className="job-hand-note">真正的效率，是少投那些一开始就不该投的岗位。</p>
        <div className="job-timeline">
          {data.timeline.map((item) => <p key={item.label}><strong>{item.label}</strong><span>{item.text}</span></p>)}
        </div>
        <div className="job-not-doing">{data.notDoing.map((item) => <span key={item}>{item}</span>)}</div>
      </section>

      <section className="job-section job-reflection" id="job-reflection">
        <SectionLabel label="08" title="这个项目让我重新理解了求职里的“判断成本”" />
        {data.reflection.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        <ListBlock title="当前成果" items={data.reflection.outcomes} />
        <ListBlock title="下一步" items={data.reflection.next} />
        <blockquote>{data.reflection.closing}</blockquote>
        <div className="job-actions">
          <button type="button">查看 Job Radar 原型<ExternalLink size={14} /></button>
          <button type="button" onClick={() => onNavigate("idea-reading-companion")}>查看下一个 Idea：AI 共读陪伴<ChevronRight size={14} /></button>
          <button type="button" onClick={onBack}>返回 Idea Lab</button>
        </div>
      </section>
    </article>
  );
}

function SectionLabel({ label, title }: { label: string; title: string }) {
  return <header className="job-section-label"><small>{label}</small><h2>{title}</h2></header>;
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return <div className="job-list-block"><h3>{title}</h3>{items.map((item) => <p key={item}>{item}</p>)}</div>;
}

function JobRadarPoster({ note }: { note: string }) {
  return (
    <figure className="job-poster">
      <div className="job-browser">
        <span>boss.zhipin.com / product manager</span>
        <div className="job-card">AI 产品经理<br /><small>18-25K · 北京</small></div>
        <div className="job-card muted">智能硬件 PM<br /><small>JD loading...</small></div>
      </div>
      <div className="job-side-panel">
        <Radar size={28} />
        <strong>可聊</strong>
        <small>匹配 72 / 成长 80 / 风险 34</small>
        <em>先确认公司与岗位真实性</em>
      </div>
      <span className="risk-ticket"><ShieldAlert size={16} />伪 AI 风险</span>
      <span className="green-ticket">强投候选</span>
      <figcaption>{note}</figcaption>
    </figure>
  );
}

function BrowserMockup() {
  return (
    <div className="job-browser-mock">
      <span>Chrome Side Panel</span>
      <div className="score-orbit"><Radar size={44} /></div>
      <h3>岗位雷达扫描中</h3>
      <p>公司质量优先 / JD 解析 / 简历匹配 / 投递建议</p>
      <div className="job-score-row"><strong>岗位匹配</strong><i /></div>
      <div className="job-score-row"><strong>成长价值</strong><i /></div>
      <div className="job-score-row danger"><strong>风险指数</strong><i /></div>
    </div>
  );
}

function VisualCard({ visual }: { visual: JobRadarVisual }) {
  return (
    <figure className={`job-visual-card visual-${visual.kind}`}>
      <div><Sparkles size={16} /><span>{visual.kind}</span></div>
      <figcaption><strong>{visual.title}</strong><small>{visual.caption}</small></figcaption>
    </figure>
  );
}
