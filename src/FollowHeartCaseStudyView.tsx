import { useEffect, useMemo, useRef, useState, type PointerEvent } from "react";
import { useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowLeft, ExternalLink, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { followHeartCaseStudy, type FollowHeartVisual } from "./followHeartCaseStudy";

gsap.registerPlugin(ScrollTrigger);

interface FollowHeartCaseStudyProps {
  onBack: () => void;
  onNavigate: (projectId: string) => void;
}

export function FollowHeartCaseStudy({ onBack, onNavigate }: FollowHeartCaseStudyProps) {
  const data = followHeartCaseStudy;
  const [activeNode, setActiveNode] = useState(0);
  const [lightbox, setLightbox] = useState<FollowHeartVisual | null>(null);
  const [activeExperience, setActiveExperience] = useState(0);
  const heroX = useMotionValue(0);
  const heroY = useMotionValue(0);
  const smoothX = useSpring(heroX, { stiffness: 80, damping: 24 });
  const smoothY = useSpring(heroY, { stiffness: 80, damping: 24 });
  const posterX = useTransform(smoothX, [-1, 1], [-10, 10]);
  const posterY = useTransform(smoothY, [-1, 1], [-8, 8]);
  const showcaseRef = useRef<HTMLDivElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  useEffect(() => {
    if (prefersReducedMotion || !showcaseRef.current || !railRef.current) return;
    const context = gsap.context(() => {
      const distance = Math.max(0, railRef.current!.scrollWidth - showcaseRef.current!.clientWidth);
      gsap.to(railRef.current, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: showcaseRef.current,
          start: "top top",
          end: () => `+=${distance + 420}`,
          scrub: 0.8,
          pin: true,
          invalidateOnRefresh: true
        }
      });
    }, showcaseRef);
    return () => context.revert();
  }, [prefersReducedMotion]);

  function handleHeroPointerMove(event: PointerEvent<HTMLElement>) {
    if (prefersReducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    heroX.set(((event.clientX - rect.left) / rect.width) * 2 - 1);
    heroY.set(((event.clientY - rect.top) / rect.height) * 2 - 1);
  }

  return (
    <article className="follow-heart-case" onPointerMove={handleHeroPointerMove}>
      <div className="follow-heart-progress" aria-hidden="true" />
      <button className="follow-heart-back" type="button" onClick={onBack}>
        <ArrowLeft size={16} />返回项目宇宙
      </button>
      <nav className="follow-heart-toc" aria-label="随心而行章节导航">
        {data.sections.map((section) => (
          <a key={section.id} href={`#follow-${section.id}`}>
            {section.label} {section.title}
          </a>
        ))}
      </nav>

      <section className="follow-heart-hero" id="follow-hero">
        <div className="follow-heart-hero-copy">
          <span>{data.eyebrow}</span>
          <h1>{data.title}</h1>
          <p>{data.subtitle}</p>
          {data.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className="follow-heart-scope">
            <strong>{data.scope.primary}</strong>
            {data.scope.parallel.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <div className="follow-heart-tags">
            {data.hero.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <div className="follow-heart-actions">
            <a href="https://mystic-lab-sigma.vercel.app/" target="_blank" rel="noreferrer">
              体验 Demo<ExternalLink size={14} />
            </a>
            <a href="#follow-iterations">查看设计过程</a>
          </div>
        </div>
        <figure
          className="follow-heart-hero-art"
          style={{
            transform: `translate3d(${posterX.get()}px, ${posterY.get()}px, 0)`
          }}
        >
          <img src={data.hero.poster} alt="随心而行塔罗星球项目主视觉" />
          <figcaption>{data.hero.note}</figcaption>
        </figure>
      </section>

      <section className="follow-heart-section follow-heart-dark" id="follow-why">
        <SectionLabel label="02" title="我为什么会做它？" />
        <div className="follow-heart-why-grid">
          <div>
            {data.why.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <ListBlock title="用户背景" items={data.why.users} />
          </div>
          <VisualStack visuals={data.why.stack} />
        </div>
      </section>

      <section className="follow-heart-paper" id="follow-problem-goal">
        <SectionLabel label="03" title="现有体验的问题" />
        <div className="follow-heart-columns">
          <ListBlock title="问题清单" items={data.problems} />
          <ListBlock title="产品目标" items={data.goals} />
        </div>
        <div className="follow-heart-before-after">
          {data.beforeAfter.map((item) => (
            <p key={item.before}>
              <span>{item.before}</span>
              <strong>{item.after}</strong>
            </p>
          ))}
        </div>
      </section>

      <section className="follow-heart-section follow-heart-dark" id="follow-solution">
        <SectionLabel label="04" title="一次占问，是一条完整的体验链路" />
        <div className="follow-heart-experience-model">
          <div className="follow-heart-model-intro">
            <h3>{data.experienceModel.title}</h3>
            <p>{data.experienceModel.summary}</p>
            <strong>{data.experienceModel.flow.join(" → ")}</strong>
          </div>
          <div className="follow-heart-model-layers">
            {data.experienceModel.layers.map((layer) => (
              <article key={layer.title}>
                <h3>{layer.title}</h3>
                <blockquote>“{layer.userQuote}”</blockquote>
                <p>{layer.entry}</p>
                <div>
                  {layer.examples.map((example) => (
                    <span key={example}>{example}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="follow-heart-orbit">
          {data.solutionNodes.map((node, index) => (
            <button
              key={node.title}
              type="button"
              aria-label={`查看模块 ${node.title}`}
              className={index === activeNode ? "is-active" : ""}
              onClick={() => setActiveNode(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>{node.title}
            </button>
          ))}
        </div>
        <figure className="follow-heart-node-preview">
          <img src={data.solutionNodes[activeNode].image} alt={data.solutionNodes[activeNode].title} />
          <figcaption>{data.solutionNodes[activeNode].text}</figcaption>
        </figure>
      </section>

      <section className="follow-heart-comic" aria-label="随心而行三格小漫画">
        {data.comic.map((panel, index) => (
          <article key={panel.title}>
            <small>0{index + 1}</small>
            <h3>{panel.title}</h3>
            <p>{panel.text}</p>
          </article>
        ))}
      </section>

      <section className="follow-heart-section follow-heart-sticky" id="follow-key-experience">
        <div className="follow-heart-sticky-visual">
          <img src={data.experiences[activeExperience].image} alt={data.experiences[activeExperience].title} />
        </div>
        <div className="follow-heart-experience-copy">
          <SectionLabel label="05" title="Key Experience" />
          {data.experiences.map((item, index) => (
            <article key={item.title} onMouseEnter={() => setActiveExperience(index)} onFocus={() => setActiveExperience(index)}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="follow-heart-showcase" id="follow-ui-showcase" ref={showcaseRef}>
        <SectionLabel label="06" title="UI Showcase" />
        <div className="follow-heart-showcase-rail" ref={railRef}>
          {data.showcase.map((visual) => (
            <article key={visual.title}>
              <button type="button" aria-label={`放大查看 ${visual.title}`} onClick={() => setLightbox(visual)}>
                <img src={visual.image} alt={visual.title} />
              </button>
              <h3>{visual.title}</h3>
              <p>{visual.caption}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="follow-heart-paper follow-heart-notes" id="follow-iterations">
        <SectionLabel label="07" title="它不是一开始就叫“随心而行”" />
        {data.notes.map((note) => (
          <article key={note.title}>
            <h3>{note.title}</h3>
            <p>{note.text}</p>
          </article>
        ))}
        <div className="follow-heart-timeline">
          {data.timeline.map((item) => (
            <p key={item.label}>
              <strong>{item.label}</strong>
              <span>{item.text}</span>
            </p>
          ))}
        </div>
      </section>

      <section className="follow-heart-section follow-heart-reflection" id="follow-reflection">
        <SectionLabel label="08" title="这个项目让我重新理解了“仪式感”" />
        {data.reflection.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <ListBlock title="当前成果" items={data.reflection.outcomes} />
        <ListBlock title="下一步" items={data.reflection.next} />
        <blockquote>{data.reflection.closing}</blockquote>
        <div className="follow-heart-actions">
          <a href="https://mystic-lab-sigma.vercel.app/" target="_blank" rel="noreferrer">
            体验随心而行<ExternalLink size={14} />
          </a>
          <button type="button" onClick={() => onNavigate("star-pm")}>查看下一个项目：Star PM</button>
          <button type="button" onClick={onBack}>回到项目宇宙</button>
        </div>
      </section>

      {lightbox ? (
        <div className="follow-heart-lightbox" role="dialog" aria-label={lightbox.title}>
          <button type="button" aria-label="关闭截图预览" onClick={() => setLightbox(null)}>
            <X size={18} />
          </button>
          <img src={lightbox.image} alt={lightbox.title} />
          <p>{lightbox.caption}</p>
        </div>
      ) : null}
    </article>
  );
}

function SectionLabel({ label, title }: { label: string; title: string }) {
  return (
    <header className="follow-heart-section-label">
      <small>{label}</small>
      <h2>{title}</h2>
    </header>
  );
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="follow-heart-list-block">
      <h3>{title}</h3>
      {items.map((item) => (
        <p key={item}>{item}</p>
      ))}
    </div>
  );
}

function VisualStack({ visuals }: { visuals: FollowHeartVisual[] }) {
  return (
    <div className="follow-heart-visual-stack">
      {visuals.map((visual) => (
        <figure key={visual.title}>
          <img src={visual.image} alt={visual.title} />
          <figcaption>{visual.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}
