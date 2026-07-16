# Follow Heart Case Study Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the independent 「随心而行」Creative Case Study long page inside the existing Starry Product Lab OS project detail flow.

**Architecture:** Keep the current desktop, project galaxy, and other project detail pages intact. Add a dedicated data module and React component for `follow-heart`; `App.tsx` only branches to this component when the selected project id is `follow-heart`. Use project-owned assets under `public/assets/case-studies/follow-heart/`.

**Tech Stack:** React, TypeScript, Framer Motion, GSAP ScrollTrigger, Vitest, Testing Library, Vite.

## Global Constraints

- Only change the `follow-heart` project detail page; other project pages, the project galaxy, and desktop windows stay as they are.
- Use real provided screenshots and the generated hero poster; do not use screenshots with color-picker overlays as readable case-study content.
- Tarot is the main case narrative; 小六壬 and 梅花易数 are parallel Mystic Lab divination entries.
- AI is described as a reading companion, not an oracle.
- Gestures are the highlight, but touch, mouse, and assistive buttons remain part of the product story.
- Respect `prefers-reduced-motion` by disabling or reducing scroll/visual motion.
- The `typescript-project-specifications` skill is required by local instructions but is not available in the current skill list; execution must compensate with focused TypeScript tests, `tsc -b`, and code review.

---

## File Structure

- Create `src/followHeartCaseStudy.ts`: all page data, section ids, screenshot paths, and asset metadata.
- Create `src/FollowHeartCaseStudy.tsx`: dedicated long-page component for the eight sections and interactions.
- Create `src/FollowHeartCaseStudy.test.tsx`: render and interaction tests for the dedicated page.
- Modify `src/App.tsx`: replace the current generic `follow-heart` branch with `FollowHeartCaseStudy`.
- Modify `src/App.test.tsx`: update the project-file test to assert the independent case-study page.
- Modify `src/styles.css`: add local styles for `.follow-heart-case` and its child classes.
- Copy assets into `public/assets/case-studies/follow-heart/`:
  - `hero-poster.png`
  - `system-entry.png`
  - `how-to-ask.png`
  - `question-input.png`
  - `open-question.png`
  - `gesture-cut.png`
  - `pinch-draw.png`
  - `tarot-result.png`
  - `card-hotspot.png`
  - `liuren-calendar.png`

## Asset Sources

Use these local sources:

- Hero poster: `C:\Users\l1397\.codex\generated_images\019f40df-0789-75b1-b5e0-e604cf96c159\exec-1baad472-594d-4cc8-a138-3ac4e7584238.png`
- System entry: `C:\Users\l1397\AppData\Local\Temp\codex-clipboard-50c18f4a-0b4f-446f-b8a9-d95e55a487c6.png`
- How to ask: `C:\Users\l1397\AppData\Local\Temp\codex-clipboard-c2968a90-d749-4b93-96cb-576fe4e78475.png`
- Question input: `C:\Users\l1397\AppData\Local\Temp\codex-clipboard-3bd5ee32-e2cd-42e2-8307-c5b9457b821a.png`
- Open question: `C:\Users\l1397\AppData\Local\Temp\codex-clipboard-2a77c3e9-7978-4c00-a189-4241ed32705a.png`
- Gesture cut: `C:\Users\l1397\AppData\Local\Temp\codex-clipboard-02cf80df-8f36-44bc-9d58-a9bdd1274990.png`
- Pinch draw: `C:\Users\l1397\AppData\Local\Temp\codex-clipboard-8ff07ae1-9823-4d3b-9486-bbd21f60f774.png`
- Tarot result: `C:\Users\l1397\AppData\Local\Temp\codex-clipboard-a9d1bf88-5098-402f-b506-a95d8a631432.png`
- Card hotspot: `C:\Users\l1397\AppData\Local\Temp\codex-clipboard-73bcd66e-d14c-4482-b35c-0c4d3ad4be5f.png`
- Liuren calendar: `C:\Users\l1397\AppData\Local\Temp\codex-clipboard-4cd26d3f-5d2b-4573-95e7-349b49edc119.png`

### Task 1: Case Study Data And Asset Registry

**Files:**
- Create: `src/followHeartCaseStudy.ts`
- Create: `src/followHeartCaseStudy.test.ts`
- Create assets folder: `public/assets/case-studies/follow-heart/`

**Interfaces:**
- Produces: `followHeartCaseStudy: FollowHeartCaseStudyData`
- Produces: `followHeartAssetPaths: Record<string, string>`
- Consumes later: `FollowHeartCaseStudy` imports `followHeartCaseStudy`

- [ ] **Step 1: Write the failing data test**

Create `src/followHeartCaseStudy.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { followHeartCaseStudy } from "./followHeartCaseStudy";

describe("followHeartCaseStudy", () => {
  it("models Mystic Lab as tarot plus parallel divination entries", () => {
    expect(followHeartCaseStudy.title).toBe("随心而行");
    expect(followHeartCaseStudy.scope.primary).toBe("塔罗 Tarot");
    expect(followHeartCaseStudy.scope.parallel).toEqual(["小六壬", "梅花易数"]);
    expect(followHeartCaseStudy.sections.map((section) => section.id)).toEqual([
      "hero",
      "why",
      "problem-goal",
      "solution",
      "key-experience",
      "ui-showcase",
      "iterations",
      "reflection"
    ]);
  });

  it("uses clean assets for every public visual slot", () => {
    const allAssets = [
      followHeartCaseStudy.hero.poster,
      ...followHeartCaseStudy.why.stack.map((item) => item.image),
      ...followHeartCaseStudy.showcase.map((item) => item.image)
    ];

    expect(allAssets).toContain("/assets/case-studies/follow-heart/system-entry.png");
    expect(allAssets).toContain("/assets/case-studies/follow-heart/tarot-result.png");
    expect(allAssets.every((path) => path.startsWith("/assets/case-studies/follow-heart/"))).toBe(true);
    expect(allAssets.some((path) => path.includes("c392a4fb"))).toBe(false);
    expect(allAssets.some((path) => path.includes("976ec898"))).toBe(false);
  });
});
```

- [ ] **Step 2: Run the data test to verify it fails**

Run: `npm test -- src/followHeartCaseStudy.test.ts --run`

Expected: FAIL because `src/followHeartCaseStudy.ts` does not exist.

- [ ] **Step 3: Copy the assets into the project**

Use PowerShell `Copy-Item` with exact destinations:

```powershell
New-Item -ItemType Directory -Force public\assets\case-studies\follow-heart
Copy-Item -LiteralPath "C:\Users\l1397\.codex\generated_images\019f40df-0789-75b1-b5e0-e604cf96c159\exec-1baad472-594d-4cc8-a138-3ac4e7584238.png" -Destination "public\assets\case-studies\follow-heart\hero-poster.png"
Copy-Item -LiteralPath "C:\Users\l1397\AppData\Local\Temp\codex-clipboard-50c18f4a-0b4f-446f-b8a9-d95e55a487c6.png" -Destination "public\assets\case-studies\follow-heart\system-entry.png"
Copy-Item -LiteralPath "C:\Users\l1397\AppData\Local\Temp\codex-clipboard-c2968a90-d749-4b93-96cb-576fe4e78475.png" -Destination "public\assets\case-studies\follow-heart\how-to-ask.png"
Copy-Item -LiteralPath "C:\Users\l1397\AppData\Local\Temp\codex-clipboard-3bd5ee32-e2cd-42e2-8307-c5b9457b821a.png" -Destination "public\assets\case-studies\follow-heart\question-input.png"
Copy-Item -LiteralPath "C:\Users\l1397\AppData\Local\Temp\codex-clipboard-2a77c3e9-7978-4c00-a189-4241ed32705a.png" -Destination "public\assets\case-studies\follow-heart\open-question.png"
Copy-Item -LiteralPath "C:\Users\l1397\AppData\Local\Temp\codex-clipboard-02cf80df-8f36-44bc-9d58-a9bdd1274990.png" -Destination "public\assets\case-studies\follow-heart\gesture-cut.png"
Copy-Item -LiteralPath "C:\Users\l1397\AppData\Local\Temp\codex-clipboard-8ff07ae1-9823-4d3b-9486-bbd21f60f774.png" -Destination "public\assets\case-studies\follow-heart\pinch-draw.png"
Copy-Item -LiteralPath "C:\Users\l1397\AppData\Local\Temp\codex-clipboard-a9d1bf88-5098-402f-b506-a95d8a631432.png" -Destination "public\assets\case-studies\follow-heart\tarot-result.png"
Copy-Item -LiteralPath "C:\Users\l1397\AppData\Local\Temp\codex-clipboard-73bcd66e-d14c-4482-b35c-0c4d3ad4be5f.png" -Destination "public\assets\case-studies\follow-heart\card-hotspot.png"
Copy-Item -LiteralPath "C:\Users\l1397\AppData\Local\Temp\codex-clipboard-4cd26d3f-5d2b-4573-95e7-349b49edc119.png" -Destination "public\assets\case-studies\follow-heart\liuren-calendar.png"
```

- [ ] **Step 4: Create the data module**

Create `src/followHeartCaseStudy.ts` with this public shape:

```ts
export interface FollowHeartCaseSection {
  id: "hero" | "why" | "problem-goal" | "solution" | "key-experience" | "ui-showcase" | "iterations" | "reflection";
  label: string;
  title: string;
}

export interface FollowHeartVisual {
  title: string;
  caption: string;
  image: string;
}

export interface FollowHeartCaseStudyData {
  title: string;
  eyebrow: string;
  subtitle: string;
  intro: string[];
  scope: {
    primary: string;
    parallel: string[];
  };
  hero: {
    poster: string;
    note: string;
    tags: string[];
  };
  sections: FollowHeartCaseSection[];
  why: {
    paragraphs: string[];
    users: string[];
    stack: FollowHeartVisual[];
  };
  problems: string[];
  goals: string[];
  beforeAfter: Array<{ before: string; after: string }>;
  solutionNodes: Array<{ title: string; text: string; image: string }>;
  comic: Array<{ title: string; text: string }>;
  experiences: Array<{ title: string; text: string; image: string }>;
  showcase: FollowHeartVisual[];
  notes: Array<{ title: string; text: string }>;
  timeline: Array<{ label: string; text: string }>;
  reflection: {
    paragraphs: string[];
    outcomes: string[];
    next: string[];
    closing: string;
  };
}

export const followHeartCaseStudy: FollowHeartCaseStudyData = {
  title: "随心而行",
  eyebrow: "CASE STUDY 01 · 2026",
  subtitle: "用一次有仪式感的占问，慢慢看懂牌，也慢慢看见自己。",
  intro: [
    "随心而行是一个融合手势交互、塔罗学习、AI 陪读与自我记录的互动产品。",
    "它并不试图替用户决定未来，而是通过抽牌、解读、图鉴和手札，帮助用户整理此刻真正关心的问题。"
  ],
  scope: {
    primary: "塔罗 Tarot",
    parallel: ["小六壬", "梅花易数"]
  },
  hero: {
    poster: "/assets/case-studies/follow-heart/hero-poster.png",
    note: "答案不在牌里，它只是帮你听见自己。",
    tags: ["C 端体验", "手势交互", "AI 解读", "传统文化学习", "独立产品", "P1 迭代中"]
  },
  sections: [
    { id: "hero", label: "01", title: "Hero" },
    { id: "why", label: "02", title: "Why / Context" },
    { id: "problem-goal", label: "03", title: "Problem & Goal" },
    { id: "solution", label: "04", title: "Solution Structure" },
    { id: "key-experience", label: "05", title: "Key Experience" },
    { id: "ui-showcase", label: "06", title: "UI Showcase" },
    { id: "iterations", label: "07", title: "Design Notes / Iterations" },
    { id: "reflection", label: "08", title: "Reflection / Next" }
  ],
  why: {
    paragraphs: [
      "最初，我只是想验证一件很小的事情：能不能不用点击按钮，而是像真实抽牌一样，通过手势完成洗牌、切牌和抽牌？",
      "但继续设计时，我逐渐发现，单纯增加手势，只是让一个普通塔罗产品换了一种操作方式。",
      "真正吸引我的不是更酷地抽到一张牌，而是用户为什么会在某个时刻想要抽牌，以及产品能不能陪用户重新看待自己的问题。"
    ],
    users: ["在关系、工作或生活中感到困惑的人", "想获得一个新观察角度的人", "喜欢神秘文化但面对复杂牌义无从下手的人", "不希望被生硬教育，却愿意在体验中慢慢理解的人"],
    stack: [
      { title: "入口体系", caption: "Mystic Lab 同时承接塔罗、小六壬与梅花易数。", image: "/assets/case-studies/follow-heart/system-entry.png" },
      { title: "手势实验", caption: "把抽牌从一次点击变成一个身体参与的动作。", image: "/assets/case-studies/follow-heart/gesture-cut.png" },
      { title: "结果解读", caption: "从答案文本走向牌面、问题和自我提问。", image: "/assets/case-studies/follow-heart/tarot-result.png" }
    ]
  },
  problems: ["抽牌过程太机械", "结果信息堆叠", "学习与占问割裂", "答案替代思考", "摄像头存在使用门槛"],
  goals: ["让抽牌成为一个动作", "让解读具有层次", "让学习藏在体验中", "保留选择权", "兼顾仪式感与可用性"],
  beforeAfter: [
    { before: "点击随机抽牌", after: "主动完成一次仪式" },
    { before: "一次性长文本", after: "分层理解与自我提问" }
  ],
  solutionNodes: [
    { title: "选择占问方式", text: "塔罗、小六壬、梅花易数从同一个 Mystic Lab 入口进入。", image: "/assets/case-studies/follow-heart/system-entry.png" },
    { title: "写下问题", text: "用自己的语言描述此刻真正关心的事。", image: "/assets/case-studies/follow-heart/question-input.png" },
    { title: "仪式化抽牌", text: "通过手势、触控或鼠标完成洗牌、切牌与抽牌。", image: "/assets/case-studies/follow-heart/gesture-cut.png" },
    { title: "分层解读", text: "标准牌义、结合问题与自我提问分层出现。", image: "/assets/case-studies/follow-heart/tarot-result.png" },
    { title: "看懂牌面", text: "点击牌面符号，理解图像证据与象征来源。", image: "/assets/case-studies/follow-heart/card-hotspot.png" },
    { title: "保存手札", text: "把问题、牌面、解读和感受沉淀为相遇记录。", image: "/assets/case-studies/follow-heart/pinch-draw.png" }
  ],
  comic: [
    { title: "写下问题", text: "先让困惑落到一句话里。" },
    { title: "捏合抽牌", text: "用动作慢慢抵达那张牌。" },
    { title: "回到自己", text: "牌面不是结论，而是一面镜子。" }
  ],
  experiences: [
    { title: "不是点击抽牌，而是完成一次动作", text: "洗牌、切牌、抽牌分别对应收拢、挥手与捏合，也保留触控、鼠标和辅助按钮。", image: "/assets/case-studies/follow-heart/gesture-cut.png" },
    { title: "结果页不直接扔出一坨答案", text: "此刻解读、看懂牌面、牌义图鉴和我的相遇拆成四个 Tab。", image: "/assets/case-studies/follow-heart/tarot-result.png" },
    { title: "AI 是陪读员，不是神谕", text: "AI 提供观察方式和追问，不替用户宣判结果。", image: "/assets/case-studies/follow-heart/open-question.png" }
  ],
  showcase: [
    { title: "从一个真正的问题开始", caption: "鼓励用户用自己的语言描述此刻的困惑。", image: "/assets/case-studies/follow-heart/question-input.png" },
    { title: "把封闭问题打开", caption: "从“会不会”改成“我需要看清什么”。", image: "/assets/case-studies/follow-heart/open-question.png" },
    { title: "手掌收拢，牌阵开始流动", caption: "系统用识别进度和反馈告诉用户自己被看见了。", image: "/assets/case-studies/follow-heart/gesture-cut.png" },
    { title: "当你准备好了，就捏住那一张牌", caption: "手指捏合锁定牌面，触屏用户也可以长按或拖动。", image: "/assets/case-studies/follow-heart/pinch-draw.png" },
    { title: "先看牌，再看问题，最后回到自己", caption: "标准知识与 AI 情境解读分层展示。", image: "/assets/case-studies/follow-heart/tarot-result.png" },
    { title: "为什么是红心、三把剑与乌云", caption: "通过热点把抽象牌义重新落回图像证据。", image: "/assets/case-studies/follow-heart/card-hotspot.png" },
    { title: "传统文化不止塔罗", caption: "小六壬通过起课和换算进入同一个产品体系。", image: "/assets/case-studies/follow-heart/liuren-calendar.png" }
  ],
  notes: [
    { title: "从“手势塔罗”开始", text: "最初重点是验证摄像头能否识别动作，并完成洗牌、切牌和抽牌。" },
    { title: "从“得到答案”转向“理解问题”", text: "结果页从标准牌义堆叠，重新规划为牌面、解读、学习延伸和手札入口。" },
    { title: "学习不应该成为第二套产品", text: "用户抽到一张牌，就顺便学会看懂一张牌。其他都是 DLC，先把第一章通关。" }
  ],
  timeline: [
    { label: "概念阶段", text: "手势塔罗网页" },
    { label: "P0", text: "抽牌链路跑通" },
    { label: "P1", text: "知识库结构、三层解读、结果页四个 Tab" },
    { label: "P2", text: "星星、月亮、愚者、恋人、高塔牌面热点" },
    { label: "P3", text: "接入真实 LLM，增加五个教学按钮" },
    { label: "P4", text: "愚人之旅地图" },
    { label: "P5", text: "补全 78 张牌义与小阿卡那体系" }
  ],
  reflection: {
    paragraphs: [
      "仪式感并不是增加更多特效。",
      "真正有效的仪式感来自：用户明确知道自己正在完成什么，每一个动作都得到反馈，过程具有等待、选择和确认。",
      "一个产品不需要替用户回答所有问题。有时，更好的体验是帮助他提出一个更准确的问题。"
    ],
    outcomes: ["已跑通摄像头与手势识别的抽牌链路", "已完成抽牌动画与基础结果展示", "已确定知识库、三层解读和结果页四 Tab 结构", "已建立图鉴、相遇记录与传统文化延展方向"],
    next: ["完善结果页四 Tab", "补齐五张牌示例数据", "优化移动端与 Safari fallback", "制作牌面热点交互", "接入 AI 情境解读"],
    closing: "随心而行不会告诉你应该走向哪里。它只是陪你停下来，看清自己已经站在哪里。"
  }
};
```

- [ ] **Step 5: Run the data test to verify it passes**

Run: `npm test -- src/followHeartCaseStudy.test.ts --run`

Expected: PASS with 2 tests.

- [ ] **Step 6: Commit**

```bash
git add src/followHeartCaseStudy.ts src/followHeartCaseStudy.test.ts public/assets/case-studies/follow-heart
git commit -m "feat: add follow heart case study data"
```

### Task 2: Dedicated Follow Heart Component

**Files:**
- Create: `src/FollowHeartCaseStudy.tsx`
- Create: `src/FollowHeartCaseStudy.test.tsx`

**Interfaces:**
- Consumes: `followHeartCaseStudy` from `src/followHeartCaseStudy.ts`
- Produces: `FollowHeartCaseStudy(props: { onBack: () => void; onNavigate: (projectId: string) => void }): JSX.Element`

- [ ] **Step 1: Write the failing render and interaction test**

Create `src/FollowHeartCaseStudy.test.tsx`:

```tsx
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { FollowHeartCaseStudy } from "./FollowHeartCaseStudy";

describe("FollowHeartCaseStudy", () => {
  it("renders all eight creative case-study sections", () => {
    render(<FollowHeartCaseStudy onBack={vi.fn()} onNavigate={vi.fn()} />);

    expect(screen.getByText("CASE STUDY 01 · 2026")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "随心而行" })).toBeInTheDocument();
    expect(screen.getByText("塔罗 Tarot")).toBeInTheDocument();
    expect(screen.getByText("小六壬")).toBeInTheDocument();
    expect(screen.getByText("梅花易数")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "我为什么会做它？" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "现有体验的问题" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "一次占问，是一条完整的体验链路" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Key Experience" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "UI Showcase" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "它不是一开始就叫“随心而行”" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "这个项目让我重新理解了“仪式感”" })).toBeInTheDocument();
  });

  it("changes the active solution node and opens a lightbox image", () => {
    render(<FollowHeartCaseStudy onBack={vi.fn()} onNavigate={vi.fn()} />);

    fireEvent.click(screen.getByRole("button", { name: "查看模块 看懂牌面" }));
    expect(screen.getByText("点击牌面符号，理解图像证据与象征来源。")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "放大查看 为什么是红心、三把剑与乌云" }));
    expect(screen.getByRole("dialog", { name: "为什么是红心、三把剑与乌云" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "关闭截图预览" }));
    expect(screen.queryByRole("dialog", { name: "为什么是红心、三把剑与乌云" })).not.toBeInTheDocument();
  });

  it("routes the back and next project actions", () => {
    const onBack = vi.fn();
    const onNavigate = vi.fn();
    render(<FollowHeartCaseStudy onBack={onBack} onNavigate={onNavigate} />);

    fireEvent.click(screen.getByRole("button", { name: "返回项目宇宙" }));
    expect(onBack).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole("button", { name: "查看下一个项目：Star PM" }));
    expect(onNavigate).toHaveBeenCalledWith("star-pm");
  });
});
```

- [ ] **Step 2: Run the component test to verify it fails**

Run: `npm test -- src/FollowHeartCaseStudy.test.tsx --run`

Expected: FAIL because `src/FollowHeartCaseStudy.tsx` does not exist.

- [ ] **Step 3: Create the component skeleton**

Create `src/FollowHeartCaseStudy.tsx` with:

```tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
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

  function handleHeroPointerMove(event: React.PointerEvent<HTMLElement>) {
    if (prefersReducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    heroX.set((event.clientX - rect.left) / rect.width * 2 - 1);
    heroY.set((event.clientY - rect.top) / rect.height * 2 - 1);
  }

  return (
    <article className="follow-heart-case" onPointerMove={handleHeroPointerMove}>
      <div className="follow-heart-progress" aria-hidden="true" />
      <button className="follow-heart-back" type="button" onClick={onBack}>
        <ArrowLeft size={16} />返回项目宇宙
      </button>
      <nav className="follow-heart-toc" aria-label="随心而行章节导航">
        {data.sections.map((section) => (
          <a key={section.id} href={`#follow-${section.id}`}>{section.label} {section.title}</a>
        ))}
      </nav>

      <section className="follow-heart-hero" id="follow-hero">
        <div className="follow-heart-hero-copy">
          <span>{data.eyebrow}</span>
          <h1>{data.title}</h1>
          <p>{data.subtitle}</p>
          {data.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <div className="follow-heart-scope">
            <strong>{data.scope.primary}</strong>
            {data.scope.parallel.map((item) => <span key={item}>{item}</span>)}
          </div>
          <div className="follow-heart-tags">
            {data.hero.tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
          <div className="follow-heart-actions">
            <a href="https://mystic-lab-sigma.vercel.app/" target="_blank" rel="noreferrer">体验 Demo<ExternalLink size={14} /></a>
            <a href="#follow-iterations">查看设计过程</a>
          </div>
        </div>
        <motion.figure className="follow-heart-hero-art" style={{ x: posterX, y: posterY }}>
          <img src={data.hero.poster} alt="随心而行塔罗星球项目主视觉" />
          <figcaption>{data.hero.note}</figcaption>
        </motion.figure>
      </section>

      <section className="follow-heart-section follow-heart-dark" id="follow-why">
        <SectionLabel label="02" title="我为什么会做它？" />
        <div className="follow-heart-why-grid">
          <div>{data.why.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
          <VisualStack visuals={data.why.stack} />
        </div>
      </section>

      <section className="follow-heart-paper" id="follow-problem-goal">
        <SectionLabel label="03" title="现有体验的问题" />
        <div className="follow-heart-columns">
          <ListBlock title="现有体验的问题" items={data.problems} />
          <ListBlock title="产品目标" items={data.goals} />
        </div>
        <div className="follow-heart-before-after">
          {data.beforeAfter.map((item) => <p key={item.before}><span>{item.before}</span><strong>{item.after}</strong></p>)}
        </div>
      </section>

      <section className="follow-heart-section follow-heart-dark" id="follow-solution">
        <SectionLabel label="04" title="一次占问，是一条完整的体验链路" />
        <div className="follow-heart-orbit">
          {data.solutionNodes.map((node, index) => (
            <button key={node.title} type="button" aria-label={`查看模块 ${node.title}`} className={index === activeNode ? "is-active" : ""} onClick={() => setActiveNode(index)}>
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
        {data.comic.map((panel, index) => <article key={panel.title}><small>0{index + 1}</small><h3>{panel.title}</h3><p>{panel.text}</p></article>)}
      </section>

      <section className="follow-heart-section follow-heart-sticky" id="follow-key-experience">
        <div className="follow-heart-sticky-visual">
          <img src={data.experiences[activeExperience].image} alt={data.experiences[activeExperience].title} />
        </div>
        <div className="follow-heart-experience-copy">
          <SectionLabel label="05" title="Key Experience" />
          {data.experiences.map((item, index) => (
            <article key={item.title} onMouseEnter={() => setActiveExperience(index)}>
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
        {data.notes.map((note) => <article key={note.title}><h3>{note.title}</h3><p>{note.text}</p></article>)}
        <div className="follow-heart-timeline">
          {data.timeline.map((item) => <p key={item.label}><strong>{item.label}</strong><span>{item.text}</span></p>)}
        </div>
      </section>

      <section className="follow-heart-section follow-heart-reflection" id="follow-reflection">
        <SectionLabel label="08" title="这个项目让我重新理解了“仪式感”" />
        {data.reflection.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        <ListBlock title="当前成果" items={data.reflection.outcomes} />
        <ListBlock title="下一步" items={data.reflection.next} />
        <blockquote>{data.reflection.closing}</blockquote>
        <div className="follow-heart-actions">
          <a href="https://mystic-lab-sigma.vercel.app/" target="_blank" rel="noreferrer">体验随心而行<ExternalLink size={14} /></a>
          <button type="button" onClick={() => onNavigate("star-pm")}>查看下一个项目：Star PM</button>
          <button type="button" onClick={onBack}>返回项目宇宙</button>
        </div>
      </section>

      {lightbox ? (
        <div className="follow-heart-lightbox" role="dialog" aria-label={lightbox.title}>
          <button type="button" aria-label="关闭截图预览" onClick={() => setLightbox(null)}><X size={18} /></button>
          <img src={lightbox.image} alt={lightbox.title} />
          <p>{lightbox.caption}</p>
        </div>
      ) : null}
    </article>
  );
}

function SectionLabel({ label, title }: { label: string; title: string }) {
  return <header className="follow-heart-section-label"><small>{label}</small><h2>{title}</h2></header>;
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return <div className="follow-heart-list-block"><h3>{title}</h3>{items.map((item) => <p key={item}>{item}</p>)}</div>;
}

function VisualStack({ visuals }: { visuals: FollowHeartVisual[] }) {
  return <div className="follow-heart-visual-stack">{visuals.map((visual) => <figure key={visual.title}><img src={visual.image} alt={visual.title} /><figcaption>{visual.caption}</figcaption></figure>)}</div>;
}
```

- [ ] **Step 4: Run the component test to verify it passes**

Run: `npm test -- src/FollowHeartCaseStudy.test.tsx --run`

Expected: PASS with 3 tests.

- [ ] **Step 5: Commit**

```bash
git add src/FollowHeartCaseStudy.tsx src/FollowHeartCaseStudy.test.tsx
git commit -m "feat: add follow heart case study page"
```

### Task 3: App Integration

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/App.test.tsx`

**Interfaces:**
- Consumes: `FollowHeartCaseStudy`
- Keeps: generic `ProjectFile` for all non-`follow-heart` projects

- [ ] **Step 1: Write the failing app integration assertion**

Update the existing `renders project files as creative case studies` test in `src/App.test.tsx` so the `follow-heart` case asserts unique page content:

```tsx
expect(await screen.findByText("CASE STUDY 01 · 2026")).toBeInTheDocument();
expect(screen.getByText("塔罗 Tarot")).toBeInTheDocument();
expect(screen.getByText("小六壬")).toBeInTheDocument();
expect(screen.getByText("梅花易数")).toBeInTheDocument();
expect(screen.getByRole("heading", { name: "我为什么会做它？" })).toBeInTheDocument();
expect(screen.getByRole("heading", { name: "一次占问，是一条完整的体验链路" })).toBeInTheDocument();
expect(screen.getByRole("button", { name: "查看下一个项目：Star PM" })).toBeInTheDocument();
```

- [ ] **Step 2: Run the app test to verify it fails**

Run: `npm test -- src/App.test.tsx --run`

Expected: FAIL because `App.tsx` still renders the generic `ProjectFile` for `follow-heart`.

- [ ] **Step 3: Wire `FollowHeartCaseStudy` into `App.tsx`**

Add the import:

```ts
import { FollowHeartCaseStudy } from "./FollowHeartCaseStudy";
```

In the project window branch, replace the current `ProjectFile` call with:

```tsx
{activeApp === "projects" && selectedProject ? (
  selectedProject.id === "follow-heart" ? (
    <FollowHeartCaseStudy
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
```

- [ ] **Step 4: Run the app test to verify it passes**

Run: `npm test -- src/App.test.tsx --run`

Expected: PASS with existing app tests.

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx src/App.test.tsx
git commit -m "feat: route follow heart to dedicated case study"
```

### Task 4: Editorial Styling And Reduced Motion

**Files:**
- Modify: `src/styles.css`
- Modify: `src/FollowHeartCaseStudy.test.tsx`

**Interfaces:**
- Consumes: class names emitted by `FollowHeartCaseStudy`
- Produces: readable desktop and mobile layout inside the existing glass window

- [ ] **Step 1: Add a style-regression test for class boundaries**

Append this test to `src/FollowHeartCaseStudy.test.tsx`:

```tsx
it("scopes its styling to the follow-heart case page", () => {
  const { container } = render(<FollowHeartCaseStudy onBack={vi.fn()} onNavigate={vi.fn()} />);

  expect(container.querySelector(".follow-heart-case")).toBeInTheDocument();
  expect(container.querySelector(".case-study-page")).not.toBeInTheDocument();
});
```

- [ ] **Step 2: Run the test to verify it fails if the class is absent**

Run: `npm test -- src/FollowHeartCaseStudy.test.tsx --run`

Expected: PASS if Task 2 emitted `.follow-heart-case`; if it fails, update the component class before styling.

- [ ] **Step 3: Add scoped CSS**

Append a dedicated section to `src/styles.css`:

```css
.follow-heart-case {
  position: relative;
  min-height: 100%;
  color: #f8f0ff;
  overflow-x: hidden;
  background:
    radial-gradient(circle at 72% 8%, rgba(216, 164, 255, 0.24), transparent 34%),
    radial-gradient(circle at 20% 38%, rgba(246, 200, 107, 0.12), transparent 30%),
    linear-gradient(180deg, rgba(10, 8, 24, 0.96), rgba(22, 10, 36, 0.98));
}

.follow-heart-case section {
  position: relative;
  padding: clamp(56px, 8vw, 112px) clamp(24px, 5vw, 72px);
}

.follow-heart-back {
  position: sticky;
  top: 14px;
  z-index: 20;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.follow-heart-toc {
  position: fixed;
  right: clamp(20px, 3vw, 42px);
  top: 112px;
  z-index: 16;
  display: grid;
  gap: 8px;
  max-width: 160px;
}

.follow-heart-toc a {
  color: rgba(248, 240, 255, 0.62);
  font-size: 12px;
  text-decoration: none;
}

.follow-heart-hero {
  min-height: min(900px, 92vh);
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(360px, 1.1fr);
  align-items: center;
  gap: clamp(28px, 5vw, 72px);
}

.follow-heart-hero-copy h1 {
  margin: 12px 0 18px;
  font-size: clamp(48px, 7vw, 108px);
  line-height: 0.94;
  color: #fff8ec;
}

.follow-heart-hero-copy p {
  max-width: 660px;
  color: rgba(248, 240, 255, 0.82);
  font-size: clamp(16px, 1.35vw, 22px);
  line-height: 1.8;
}

.follow-heart-hero-art img,
.follow-heart-visual-stack img,
.follow-heart-node-preview img,
.follow-heart-sticky-visual img,
.follow-heart-showcase img,
.follow-heart-lightbox img {
  width: 100%;
  display: block;
  object-fit: cover;
}

.follow-heart-hero-art {
  margin: 0;
  transform-style: preserve-3d;
}

.follow-heart-hero-art img {
  border-radius: 28px;
  box-shadow: 0 32px 90px rgba(0, 0, 0, 0.5), 0 0 72px rgba(189, 119, 255, 0.22);
}

.follow-heart-paper {
  color: #2b1932;
  background:
    linear-gradient(135deg, rgba(255, 245, 225, 0.96), rgba(248, 226, 190, 0.9)),
    radial-gradient(circle at 88% 12%, rgba(126, 80, 170, 0.12), transparent 30%);
}

.follow-heart-columns,
.follow-heart-why-grid,
.follow-heart-sticky {
  display: grid;
  grid-template-columns: minmax(0, 0.88fr) minmax(360px, 1.12fr);
  gap: clamp(24px, 5vw, 68px);
}

.follow-heart-orbit {
  min-height: 430px;
  display: grid;
  place-items: center;
}

.follow-heart-orbit button {
  border: 1px solid rgba(246, 200, 107, 0.38);
  border-radius: 999px;
  padding: 12px 18px;
  background: rgba(255, 255, 255, 0.08);
  color: #fff8ec;
}

.follow-heart-showcase {
  min-height: 100vh;
  overflow: hidden;
}

.follow-heart-showcase-rail {
  display: flex;
  gap: 28px;
  width: max-content;
}

.follow-heart-showcase article {
  width: min(72vw, 760px);
}

.follow-heart-showcase button {
  border: 0;
  padding: 0;
  background: transparent;
}

.follow-heart-lightbox {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: grid;
  place-items: center;
  padding: 36px;
  background: rgba(5, 4, 12, 0.86);
}

.follow-heart-lightbox img {
  max-width: min(1100px, 92vw);
  max-height: 78vh;
  object-fit: contain;
}

@media (max-width: 900px) {
  .follow-heart-hero,
  .follow-heart-columns,
  .follow-heart-why-grid,
  .follow-heart-sticky {
    grid-template-columns: 1fr;
  }

  .follow-heart-toc {
    position: static;
    max-width: none;
    padding: 18px 24px;
  }

  .follow-heart-showcase-rail {
    width: auto;
    flex-direction: column;
  }

  .follow-heart-showcase article {
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .follow-heart-case *,
  .follow-heart-case *::before,
  .follow-heart-case *::after {
    animation-duration: 0.001ms !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 4: Run focused tests**

Run: `npm test -- src/FollowHeartCaseStudy.test.tsx --run`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/styles.css src/FollowHeartCaseStudy.test.tsx
git commit -m "style: polish follow heart case study"
```

### Task 5: Full Verification And Preview

**Files:**
- Modify only if verification exposes a concrete defect in files already touched by Tasks 1-4.

**Interfaces:**
- Confirms: TypeScript, tests, production build, and local preview.

- [ ] **Step 1: Run all tests**

Run: `npm test -- --run`

Expected: all Vitest suites pass.

- [ ] **Step 2: Run production build**

Run: `npm run build`

Expected: `tsc -b` and `vite build` exit 0.

- [ ] **Step 3: Start or reuse local dev server**

Run: `npm run dev -- --port 5181`

Expected: Vite prints a local URL such as `http://127.0.0.1:5181/`.

- [ ] **Step 4: Verify the visual route manually**

Open `http://127.0.0.1:5181/`, then:

1. Click `探索项目宇宙`.
2. Click the `随心而行` planet.
3. Confirm the detail view starts with `CASE STUDY 01 · 2026`.
4. Confirm the clean `塔罗 / 小六壬 / 梅花易数` system screenshot appears.
5. Confirm `UI Showcase` images are large enough to read.
6. Confirm the lightbox opens and closes.
7. Confirm the `查看下一个项目：Star PM` button switches to Star PM.

- [ ] **Step 5: Capture one QA screenshot**

Save a QA screenshot to `qa/follow-heart-case-study-v2.png` if browser automation is available. If the browser webview attach timeout repeats, record that visual QA was manual/unverified by automation.

- [ ] **Step 6: Final commit for verification fixes**

If Tasks 1-4 already have commits and Task 5 requires no code edits, do not create an empty commit. If Task 5 fixes a defect, commit only those fixes:

```bash
git add src/FollowHeartCaseStudy.tsx src/styles.css src/App.tsx src/App.test.tsx src/FollowHeartCaseStudy.test.tsx
git commit -m "fix: verify follow heart case study preview"
```

## Self-Review

- Spec coverage: the plan covers all eight sections, hero parallax, Why stacked visuals, paper Problem & Goal, interactive solution orbit, sticky key experience, horizontal showcase, notes, reflection, section navigation, progress/back entry, lightbox, and reduced motion.
- Scope: all implementation tasks are constrained to `follow-heart` and the generic app routing branch for that project.
- Asset mapping: every public visual slot uses a named clean asset path; color-picker-overlay screenshots are excluded.
- Type consistency: `FollowHeartCaseStudyData`, `FollowHeartVisual`, and `FollowHeartCaseStudy` names are stable across data, component, and tests.
