import { ArrowLeft, ChevronRight, ExternalLink, FileSpreadsheet, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { competitiveAnalysisCaseStudy, type CompetitiveAnalysisVisual } from "./competitiveAnalysisCaseStudy";

interface CompetitiveAnalysisCaseStudyProps {
  onBack: () => void;
  onNavigate: (projectId: string) => void;
}

export function CompetitiveAnalysisCaseStudy({ onBack, onNavigate }: CompetitiveAnalysisCaseStudyProps) {
  const data = competitiveAnalysisCaseStudy;

  return (
    <article className="analysis-case">
      <button className="analysis-back" type="button" onClick={onBack}>
        <ArrowLeft size={16} />返回 Idea Lab
      </button>
      <nav className="analysis-toc" aria-label="竞品分析工作台章节导航">
        {data.sections.map((section) => (
          <a key={section.id} href={`#analysis-${section.id}`}>
            {section.label} {section.title}
          </a>
        ))}
      </nav>

      <section className="analysis-hero" id="analysis-hero">
        <div className="analysis-hero-copy">
          <span>{data.eyebrow}</span>
          <h1>{data.title}</h1>
          <p>{data.subtitle}</p>
          {data.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className="analysis-tags">
            {data.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <div className="analysis-actions">
            <a href="https://competitive-analysis-workbench-demo.vercel.app/" target="_blank" rel="noreferrer">
              查看工具 Demo<ExternalLink size={14} />
            </a>
            <a href="#analysis-key-experience">查看分析流程</a>
            <button type="button" onClick={onBack}>返回 Idea Lab</button>
          </div>
        </div>
        <ResearchDesk note={data.note} />
      </section>

      <section className="analysis-section analysis-dark" id="analysis-why">
        <SectionLabel label="02" title="我为什么会做它？" />
        <div className="analysis-why-grid">
          <div>
            {data.why.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <ListBlock title="用户背景" items={data.why.users} />
          </div>
          <div className="analysis-evidence-stack">
            {data.why.evidence.map((visual, index) => (
              <motion.div key={visual.title} whileHover={{ y: -8, rotate: index % 2 ? 1 : -1 }}>
                <VisualCard visual={visual} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="analysis-paper" id="analysis-problem-goal">
        <SectionLabel label="03" title="竞品分析为什么总是做完就散？" />
        <div className="analysis-columns">
          <ListBlock title="现有体验的问题" items={data.problems} />
          <ListBlock title="产品目标" items={data.goals} />
        </div>
        <div className="analysis-before-after">
          <p><span>截图很多</span><strong>字段更稳</strong></p>
          <p><span>链接很多</span><strong>证据可追溯</strong></p>
          <p><span>结论靠感觉</span><strong>判断有框架</strong></p>
        </div>
      </section>

      <section className="analysis-section analysis-solution" id="analysis-solution">
        <SectionLabel label="04" title="从散乱资料到产品判断，是一条工作流" />
        <div className="analysis-pipeline">
          <div className="analysis-source-pile">
            <span>Excel</span>
            <span>商品链接</span>
            <span>社媒摘录</span>
            <span>退货单</span>
          </div>
          <div className="analysis-flow">
            {data.solution.flow.map((step, index) => (
              <p key={step}>
                <small>{String(index + 1).padStart(2, "0")}</small>
                {step}
              </p>
            ))}
          </div>
          <div className="analysis-modules">
            {data.solution.modules.map((module) => (
              <article key={module.title}>
                <h3>{module.title}</h3>
                <p>{module.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="analysis-section analysis-key-experience" id="analysis-key-experience">
        <div className="analysis-sticky-mockup">
          <WorkbenchMockup />
        </div>
        <div className="analysis-experience-copy">
          <SectionLabel label="05" title="重点体验：不是生成一份报告，而是建立判断链路" />
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

      <section className="analysis-paper analysis-showcase" id="analysis-ui-showcase">
        <SectionLabel label="06" title="UI Showcase" />
        <div className="analysis-showcase-rail">
          {data.showcase.map((visual, index) => (
            <motion.article key={visual.title} whileHover={{ y: -8, rotate: index % 2 ? 1 : -1 }}>
              <VisualCard visual={visual} />
              <h3>{visual.title}</h3>
              <p>{visual.caption}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="analysis-section analysis-notes" id="analysis-iterations">
        <SectionLabel label="07" title="它不是一开始就是工作台" />
        <div className="analysis-note-grid">
          {data.notes.map((note) => (
            <article key={note.title}>
              <h3>{note.title}</h3>
              <p>{note.text}</p>
            </article>
          ))}
        </div>
        <p className="analysis-hand-note">先别急着写结论，先让字段站稳。</p>
        <div className="analysis-timeline">
          {data.timeline.map((item) => (
            <p key={item.label}>
              <strong>{item.label}</strong>
              <span>{item.text}</span>
            </p>
          ))}
        </div>
        <div className="analysis-not-doing">
          {data.notDoing.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      <section className="analysis-section analysis-reflection" id="analysis-reflection">
        <SectionLabel label="08" title="这个项目让我重新理解了“分析工具”的价值" />
        {data.reflection.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <ListBlock title="当前成果" items={data.reflection.outcomes} />
        <ListBlock title="下一步" items={data.reflection.next} />
        <blockquote>{data.reflection.closing}</blockquote>
        <div className="analysis-actions">
          <a href="https://competitive-analysis-workbench-demo.vercel.app/" target="_blank" rel="noreferrer">
            查看竞品分析 Demo<ExternalLink size={14} />
          </a>
          <button type="button" onClick={() => onNavigate("job-radar")}>
            查看下一个 Idea：Job Radar<ChevronRight size={14} />
          </button>
          <button type="button" onClick={onBack}>返回 Idea Lab</button>
        </div>
      </section>
    </article>
  );
}

function SectionLabel({ label, title }: { label: string; title: string }) {
  return (
    <header className="analysis-section-label">
      <small>{label}</small>
      <h2>{title}</h2>
    </header>
  );
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="analysis-list-block">
      <h3>{title}</h3>
      {items.map((item) => (
        <p key={item}>{item}</p>
      ))}
    </div>
  );
}

function ResearchDesk({ note }: { note: string }) {
  return (
    <figure className="analysis-desk">
      <div className="desk-paper excel">Excel<br /><small>历史表</small></div>
      <div className="desk-paper product">商品卡<br /><small>price / sales</small></div>
      <div className="desk-paper return">退货单<br /><small>Top reasons</small></div>
      <div className="analysis-workbench">
        <FileSpreadsheet size={32} />
        <strong>Schema Mapping</strong>
        <span>字段自动归位</span>
      </div>
      <div className="desk-output report">调研报告</div>
      <div className="desk-output prd">PRD 草稿</div>
      <figcaption>{note}</figcaption>
    </figure>
  );
}

function WorkbenchMockup() {
  return (
    <div className="analysis-workbench-mock">
      <span>Product Research Workbench</span>
      <div className="mapping-row"><strong>名称</strong><i /><small>竞品名称</small></div>
      <div className="mapping-row"><strong>销量</strong><i /><small>月销 / 平台</small></div>
      <div className="mapping-row"><strong>评价</strong><i /><small>正负反馈</small></div>
      <div className="report-block">
        <Sparkles size={18} />
        <p>市场判定 / 购买动机 / 机会公式 / 行动建议</p>
      </div>
    </div>
  );
}

function VisualCard({ visual }: { visual: CompetitiveAnalysisVisual }) {
  return (
    <figure className={`analysis-visual-card visual-${visual.kind}`}>
      <div><i /><span>{visual.kind}</span></div>
      <figcaption>
        <strong>{visual.title}</strong>
        <small>{visual.caption}</small>
      </figcaption>
    </figure>
  );
}
