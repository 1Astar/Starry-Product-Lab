import { ArrowLeft, ChevronRight, ExternalLink, Music2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { phoneCompanionCaseStudy, type PhoneCompanionVisual } from "./phoneCompanionCaseStudy";

interface PhoneCompanionCaseStudyProps {
  onBack: () => void;
  onNavigate: (projectId: string) => void;
}

export function PhoneCompanionCaseStudy({ onBack, onNavigate }: PhoneCompanionCaseStudyProps) {
  const data = phoneCompanionCaseStudy;

  return (
    <article className="phone-case">
      <button className="phone-back" type="button" onClick={onBack}>
        <ArrowLeft size={16} />返回 Idea Lab
      </button>
      <nav className="phone-toc" aria-label="AI 陪伴小手机章节导航">
        {data.sections.map((section) => (
          <a key={section.id} href={`#phone-${section.id}`}>
            {section.label} {section.title}
          </a>
        ))}
      </nav>

      <section className="phone-hero" id="phone-hero">
        <div className="phone-hero-copy">
          <span>{data.eyebrow}</span>
          <h1>{data.title}</h1>
          <p>{data.subtitle}</p>
          {data.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className="phone-tags">
            {data.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <div className="phone-actions">
            <button type="button">查看原型想法<ExternalLink size={14} /></button>
            <a href="#phone-iterations">查看设计过程</a>
            <button type="button" onClick={onBack}>返回 Idea Lab</button>
          </div>
        </div>
        <PhonePoster note={data.note} />
      </section>

      <section className="phone-section phone-dark" id="phone-why">
        <SectionLabel label="02" title="我为什么会做它？" />
        <div className="phone-why-grid">
          <div>
            {data.why.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <ListBlock title="用户背景" items={data.why.users} />
          </div>
          <div className="phone-slice-stack">
            {data.why.slices.map((visual, index) => (
              <motion.div key={visual.title} whileHover={{ y: -8, rotate: index % 2 ? 1 : -1 }}>
                <VisualCard visual={visual} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="phone-paper" id="phone-problem-goal">
        <SectionLabel label="03" title="AI 陪伴为什么容易变成“会聊天的工具”？" />
        <div className="phone-columns">
          <ListBlock title="现有体验的问题" items={data.problems} />
          <ListBlock title="产品目标" items={data.goals} />
        </div>
        <div className="phone-before-after">
          <p><span>每次打开都像重新开始</span><strong>关系应该能被接续</strong></p>
          <p><span>只有输入框等待用户</span><strong>先看见它今天的状态</strong></p>
          <p><span>主动推送容易变吵</span><strong>轻提示、可忽略、可回看</strong></p>
        </div>
      </section>

      <section className="phone-section phone-solution" id="phone-solution">
        <SectionLabel label="04" title="一台小手机，装下的是关系的连续性" />
        <div className="phone-life-map">
          <div className="phone-core">
            <PhoneDeviceMini />
            <strong>Chris</strong>
            <span>status first</span>
          </div>
          <div className="phone-flow">
            {data.solution.flow.map((step, index) => (
              <p key={step}>
                <small>{String(index + 1).padStart(2, "0")}</small>
                {step}
              </p>
            ))}
          </div>
          <div className="phone-modules">
            {data.solution.modules.map((module) => (
              <article key={module.title}>
                <h3>{module.title}</h3>
                <p>{module.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="phone-section phone-key-experience" id="phone-key-experience">
        <div className="phone-sticky-mockup">
          <PhoneDeviceMockup />
        </div>
        <div className="phone-experience-copy">
          <SectionLabel label="05" title="重点体验：AI 不是一直说话，而是一直“在场”" />
          {data.experiences.map((item, index) => (
            <motion.article key={item.title} whileHover={{ x: 8 }}>
              <small>{String(index + 1).padStart(2, "0")}</small>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              {item.example ? <blockquote>{item.example}</blockquote> : null}
            </motion.article>
          ))}
        </div>
      </section>

      <section className="phone-paper phone-showcase" id="phone-ui-showcase">
        <SectionLabel label="06" title="UI Showcase" />
        <div className="phone-showcase-rail">
          {data.showcase.map((visual, index) => (
            <motion.article key={visual.title} whileHover={{ y: -8, rotate: index % 2 ? 1 : -1 }}>
              <VisualCard visual={visual} />
              <h3>{visual.title}</h3>
              <p>{visual.caption}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="phone-section phone-notes" id="phone-iterations">
        <SectionLabel label="07" title="我不想再做一个“可爱聊天框”" />
        <div className="phone-note-grid">
          {data.notes.map((note) => (
            <article key={note.title}>
              <h3>{note.title}</h3>
              <p>{note.text}</p>
            </article>
          ))}
        </div>
        <p className="phone-hand-note">它不是要占满你的生活，只是在你打开时还在那里。</p>
        <div className="phone-timeline">
          {data.timeline.map((item) => (
            <p key={item.label}>
              <strong>{item.label}</strong>
              <span>{item.text}</span>
            </p>
          ))}
        </div>
        <div className="phone-not-doing">
          {data.notDoing.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      <section className="phone-section phone-reflection" id="phone-reflection">
        <SectionLabel label="08" title="这个项目让我重新理解了 AI 陪伴的“在场感”" />
        {data.reflection.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <ListBlock title="当前成果" items={data.reflection.outcomes} />
        <ListBlock title="下一步" items={data.reflection.next} />
        <blockquote>{data.reflection.closing}</blockquote>
        <div className="phone-actions">
          <button type="button">查看小手机原型<ExternalLink size={14} /></button>
          <button type="button" onClick={() => onNavigate("competitor-workbench")}>
            查看下一个 Idea：竞品分析工作台<ChevronRight size={14} />
          </button>
          <button type="button" onClick={onBack}>返回 Idea Lab</button>
        </div>
      </section>
    </article>
  );
}

function SectionLabel({ label, title }: { label: string; title: string }) {
  return (
    <header className="phone-section-label">
      <small>{label}</small>
      <h2>{title}</h2>
    </header>
  );
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="phone-list-block">
      <h3>{title}</h3>
      {items.map((item) => (
        <p key={item}>{item}</p>
      ))}
    </div>
  );
}

function PhonePoster({ note }: { note: string }) {
  return (
    <figure className="phone-poster">
      <div className="phone-desk-note lyric">今晚的歌单<br /><small>soft signal</small></div>
      <div className="phone-desk-note calendar">Thu<br /><strong>quiet day</strong></div>
      <div className="phone-desk-note message">Chris 刚刚亮了一下</div>
      <PhoneDeviceMockup />
      <figcaption>{note}</figcaption>
    </figure>
  );
}

function PhoneDeviceMockup() {
  return (
    <div className="phone-device">
      <div className="phone-speaker" />
      <header>
        <span>Chris</span>
        <small>energy 62%</small>
      </header>
      <section className="chris-state">
        <i />
        <h3>今天有点安静</h3>
        <p>刚刚整理了你昨天听过的歌。</p>
      </section>
      <div className="phone-music-card">
        <Music2 size={15} />
        <span>一起听歌</span>
        <small>歌词停在这里</small>
      </div>
      <div className="phone-mini-grid">
        <span>心情日历</span>
        <span>小纸条</span>
        <span>记忆碎片</span>
        <span>Chris 日程</span>
      </div>
    </div>
  );
}

function PhoneDeviceMini() {
  return (
    <div className="phone-device-mini" aria-hidden="true">
      <i /><i /><i />
    </div>
  );
}

function VisualCard({ visual }: { visual: PhoneCompanionVisual }) {
  return (
    <figure className={`phone-visual-card visual-${visual.kind}`}>
      <div><Sparkles size={17} /><span>{visual.kind}</span></div>
      <figcaption>
        <strong>{visual.title}</strong>
        <small>{visual.caption}</small>
      </figcaption>
    </figure>
  );
}
