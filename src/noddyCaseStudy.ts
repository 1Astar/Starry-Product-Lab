export interface NoddyCaseSection {
  id: "hero" | "why" | "problem-goal" | "solution" | "key-experience" | "ui-showcase" | "iterations" | "reflection";
  label: string;
  title: string;
}

export interface NoddyVisual {
  title: string;
  caption: string;
  kind: "app" | "device" | "system" | "rule";
}

export interface NoddyCaseStudyData {
  eyebrow: string;
  title: string;
  subtitle: string;
  intro: string[];
  note: string;
  tags: string[];
  sections: NoddyCaseSection[];
  why: {
    paragraphs: string[];
    users: string[];
    evolution: NoddyVisual[];
  };
  problems: string[];
  goals: string[];
  beforeAfter: Array<{ before: string; after: string }>;
  solution: {
    flow: string[];
    modules: Array<{ title: string; text: string }>;
  };
  experiences: Array<{ title: string; text: string }>;
  showcase: NoddyVisual[];
  notes: Array<{ title: string; text: string }>;
  timeline: Array<{ label: string; text: string }>;
  reflection: {
    paragraphs: string[];
    outcomes: string[];
    next: string[];
    closing: string;
  };
}

export const noddyCaseStudy: NoddyCaseStudyData = {
  eyebrow: "CASE STUDY 02 · 2026",
  title: "AI 宠物 / Noddy",
  subtitle: "让一个硬件不只是会动、会说话，而是能被用户感到“它在回应我、记得我、正在慢慢长大”。",
  intro: [
    "Noddy 是一个融合实体智宠、情绪系统、App 记录、声音动作表达与长期关系养成的 AI 陪伴产品。",
    "它不是单一硬件，也不是聊天 App，而是把用户的触摸、靠近、陪伴、呼唤和日常互动，转化成一个可感知、会成长、有性格差异的陪伴对象。"
  ],
  note: "真正的陪伴感，不是它一直说话，而是它在合适的时候回应你。",
  tags: ["AI 陪伴", "情绪系统", "软硬件协同", "App 体验", "声音动作规则", "长期关系设计", "C 端产品"],
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
      "最初看 AI 宠物时，很容易把它理解成“一个会说话、会动的玩具”。",
      "但继续拆下去会发现，用户真正想要的并不是更多功能。他在意的是：它现在是什么状态？它有没有听见我？它会不会因为我经常陪它，而变得不一样？",
      "所以这个项目的重点，不是把 AI 塞进宠物硬件里，而是把“陪伴感”拆成一套能被产品、硬件、固件、内容和 App 共同执行的系统。"
    ],
    users: [
      "喜欢宠物但暂时不能养宠物的人",
      "喜欢可爱硬件、情绪陪伴和轻互动体验的年轻用户",
      "想要桌面、床头或生活里有一个“有点回应”的小存在的人"
    ],
    evolution: [
      { title: "最初", caption: "会动的 AI 宠物硬件。", kind: "device" },
      { title: "中期", caption: "情绪、动作、声音、App 分层。", kind: "system" },
      { title: "现在", caption: "实体智宠 + 情绪系统 + 长期关系体验。", kind: "app" }
    ]
  },
  problems: ["陪伴容易变成聊天", "硬件动作容易显得生硬", "情绪表达容易模板化", "App 和设备容易各说各的", "异常状态容易破坏陪伴感"],
  goals: ["让 Noddy 像一个陪伴对象", "让情绪成为状态入口", "让动作、声音和 App 说同一种话", "让性格慢慢形成", "让异常状态也不出戏"],
  beforeAfter: [
    { before: "会说话的硬件", after: "有状态的陪伴对象" },
    { before: "固定动作反馈", after: "情绪驱动的声音动作表达" },
    { before: "一次性互动", after: "可积累的陪伴关系" },
    { before: "功能提醒", after: "有边界的陪伴提示" }
  ],
  solution: {
    flow: [
      "用户靠近 / 触摸 / 呼唤 / 陪伴",
      "设备与 App 判断当前状态",
      "进入互动理解",
      "生成回应",
      "记录陪伴现场"
    ],
    modules: [
      { title: "设备状态层", text: "判断连接、电量、休眠、勿扰、时间同步等基础条件，决定 Noddy 当前能不能回应。" },
      { title: "情绪状态层", text: "把当下互动和设备状态转成用户能理解的状态，例如平静、开心、困了、想陪伴。" },
      { title: "性格调制层", text: "让不同 Noddy 在同样情绪下也能有不同表达方式，形成我的 Noddy 和你的 Noddy 的差异。" },
      { title: "声音动作表达层", text: "将抽象情绪转成动作幅度、节奏、语气、声音和停顿，而不是只触发固定素材。" },
      { title: "App 陪伴界面", text: "展示当前状态、陪伴天数、成长阶段、互动入口、连接状态和轻量提示。" },
      { title: "成长与日记系统", text: "记录陪伴时刻、首次互动、阶段变化、性格形成，让关系有时间感。" }
    ]
  },
  experiences: [
    { title: "它首先是一个陪伴对象，而不是一台会说话的设备", text: "首页核心不是功能菜单，而是当前状态、陪伴天数、成长阶段、亲密度、设备连接和轻量互动入口。" },
    { title: "情绪不是装饰，而是用户理解状态的入口", text: "情绪系统解决的是“它现在怎么了”：设备层说明限制，情绪层表达状态，关系层解释长期倾向，行动层告诉用户下一步。" },
    { title: "性格不是一次互动决定的", text: "性格更像长期趋势，要区分短期情绪、长期倾向、观察区、稳定性格和阶段成长。" },
    { title: "没有回应，也要有解释", text: "未连接、低电量、休眠、勿扰、时间未同步都不是错误码，而是陪伴关系里的边界说明。" }
  ],
  showcase: [
    { title: "陪伴首页", caption: "第一眼看到的不是功能，而是 Noddy 现在怎么样。", kind: "app" },
    { title: "设备连接与状态提示", caption: "硬件状态必须被温柔但清楚地解释。", kind: "device" },
    { title: "互动日记", caption: "每一次互动，都变成一段可以回看的相处记录。", kind: "app" },
    { title: "性格状态", caption: "性格不是标签，而是长期相处方式留下的趋势。", kind: "system" },
    { title: "成长技能 / 能力地图", caption: "能力不是教学任务，而是一起相处后慢慢点亮的经验。", kind: "app" },
    { title: "安静陪伴", caption: "陪伴不一定要说话，有时候安静待着就够了。", kind: "device" },
    { title: "情绪声音轴 / 动作规则", caption: "把“像活的”翻译成团队能执行的声音和动作规则。", kind: "rule" }
  ],
  notes: [
    { title: "从“会动的玩具”到“有回应的对象”", text: "真正需要被设计的是：它为什么这样动，它在什么状态下不应该动，用户怎么知道它不是坏了，而是在休息。" },
    { title: "从情绪文案到情绪系统", text: "情绪必须同时影响 App 状态、设备动作、声音语气、提醒边界、互动记录和性格趋势。" },
    { title: "从“成长任务”到“陪伴关系”", text: "用户不是来完成训练表的。用户是来和 Noddy 待一会儿。" }
  ],
  timeline: [
    { label: "概念阶段", text: "AI 情绪陪伴智宠：实体硬件 + 情绪算法 + App" },
    { label: "P0", text: "确定产品不是聊天 App，也不是单一硬件，而是长期陪伴体验" },
    { label: "P1", text: "建立首页陪伴状态：情绪、成长阶段、陪伴天数、电量和连接状态" },
    { label: "P2", text: "梳理互动日记：记录用户行为、Noddy 反馈和情绪变化" },
    { label: "P3", text: "设计性格系统：长期互动影响性格倾向，短期波动不直接改变结论" },
    { label: "P4", text: "补充异常状态：未连接、低电量、休眠、勿扰、时间未同步" },
    { label: "P5", text: "整理声音与动作规则：让情绪、性格和设备反馈能够被研发执行" }
  ],
  reflection: {
    paragraphs: [
      "陪伴感不是一直出现，也不是一直说话。",
      "真正有效的陪伴感来自：用户知道它现在在不在，知道它为什么回应或不回应，每一次互动都有一点反馈，状态变化有解释，长期相处会留下痕迹。",
      "AI 宠物的难点，不是生成更多内容，而是让内容、动作、声音、设备状态和 App 记录共同指向同一个角色。"
    ],
    outcomes: [
      "已明确 Noddy 的产品定位：实体智宠 + 情绪系统 + App + 内容服务",
      "已梳理首页情绪、成长、陪伴状态的展示逻辑",
      "已整理互动日记、性格状态、成长技能等关键 App 模块",
      "已明确正常状态与异常状态的表达边界",
      "已形成情绪、性格、声音、动作之间的规则映射方向"
    ],
    next: [
      "整理完整情绪状态表",
      "补齐声音与动作表达规则",
      "完善低电量、休眠、勿扰等异常状态文案",
      "把性格系统从展示逻辑细化为可执行规则",
      "补充设备与 App 联动流程图"
    ],
    closing: "Noddy 不只是一个会说话的小设备。它更像一个慢慢认识你的陪伴对象：有时候回应你，有时候安静待着，但它始终让你知道，它现在为什么这样。"
  }
};
