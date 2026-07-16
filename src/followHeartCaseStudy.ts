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
    users: [
      "在关系、工作或生活中感到困惑的人",
      "想获得一个新观察角度的人",
      "喜欢神秘文化但面对复杂牌义无从下手的人",
      "不希望被生硬教育，却愿意在体验中慢慢理解的人"
    ],
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
