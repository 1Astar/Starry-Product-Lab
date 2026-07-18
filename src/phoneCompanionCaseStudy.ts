export interface PhoneCompanionSection {
  id: "hero" | "why" | "problem-goal" | "solution" | "key-experience" | "ui-showcase" | "iterations" | "reflection";
  label: string;
  title: string;
}

export interface PhoneCompanionVisual {
  title: string;
  caption: string;
  kind: "home" | "chat" | "mood" | "music" | "memory" | "boundary";
}

export interface PhoneCompanionCaseStudyData {
  eyebrow: string;
  title: string;
  subtitle: string;
  intro: string[];
  note: string;
  tags: string[];
  sections: PhoneCompanionSection[];
  why: {
    paragraphs: string[];
    users: string[];
    slices: PhoneCompanionVisual[];
  };
  problems: string[];
  goals: string[];
  solution: {
    flow: string[];
    modules: Array<{ title: string; text: string }>;
  };
  experiences: Array<{ title: string; text: string; example?: string }>;
  showcase: PhoneCompanionVisual[];
  notes: Array<{ title: string; text: string }>;
  timeline: Array<{ label: string; text: string }>;
  notDoing: string[];
  reflection: {
    paragraphs: string[];
    outcomes: string[];
    next: string[];
    closing: string;
  };
}

export const phoneCompanionCaseStudy: PhoneCompanionCaseStudyData = {
  eyebrow: "CASE STUDY 02 · IDEA LAB · 2026",
  title: "AI 陪伴小手机",
  subtitle: "让一个 AI 不只会回复消息，而是像住在一台小手机里，有状态、有节奏，也有自己的生活痕迹。",
  intro: [
    "AI 陪伴小手机是一个围绕“持续陪伴感”设计的互动原型。",
    "它不是把聊天框换成可爱的界面，而是尝试把 AI 的情绪、日程、音乐、记忆和主动反馈，组织成一个可以被用户感知的陪伴终端。"
  ],
  note: "陪伴感不是多说几句话，而是让人感觉它也在和你一起生活。",
  tags: ["AI 陪伴", "小屏交互", "情绪系统", "关系感设计", "个人 Idea", "原型探索中"],
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
      "最初我关注的是 AI 陪伴产品里的一个问题：为什么很多 AI 明明能聊天，却很难让人产生“它一直在”的感觉？",
      "聊天框可以回答问题，可以安慰用户，也可以生成很多内容。但如果每次打开它都像重新开始一段对话，用户感受到的仍然是“工具”，而不是“关系”。",
      "我开始意识到，陪伴感不只来自语言能力。它还来自状态、心情、记忆、共享时刻，以及一种不打扰但能被感知的轻轻出现。",
      "于是“小手机”这个想法出现了。它不是一个完整手机系统，而是一个为 AI 陪伴设计的小型生活容器。"
    ],
    users: [
      "想在空闲时有人接住一句话的人",
      "想记录心情，但不想写正式日记的人",
      "想听歌时有人一起听的人",
      "想把生活里的小事件放进一个更温柔界面的人",
      "想要一个不会过度索取注意力、但又不是完全沉默的陪伴对象的人"
    ],
    slices: [
      { title: "状态", caption: "小伙伴今天有点安静，能量只有 62%。", kind: "home" },
      { title: "音乐", caption: "刚刚整理了你昨天听过的歌。", kind: "music" },
      { title: "记忆", caption: "这件事和上次那段聊天有关。", kind: "memory" }
    ]
  },
  problems: [
    "只有对话，没有状态",
    "记忆存在，但不可见",
    "主动陪伴容易变成打扰",
    "情绪表达缺少身体感",
    "功能分散，关系不连续"
  ],
  goals: [
    "让 AI 有可感知的状态",
    "让关系沉淀可见",
    "让主动出现有边界",
    "让小屏成为陪伴容器",
    "让 AI 从回答者变成共同生活的角色"
  ],
  solution: {
    flow: ["用户此刻状态", "AI 小伙伴状态感知", "陪伴入口", "关系沉淀", "下一次回应更有上下文"],
    modules: [
      { title: "小手机首页状态", text: "展示 AI 小伙伴当前心情、能量、正在做什么，以及是否适合聊天。" },
      { title: "对话陪伴", text: "保留自然聊天能力，但不把所有陪伴压力都放在聊天窗口里。" },
      { title: "心情日历", text: "用户和 AI 小伙伴都可以留下当天的心情片段，形成一种轻量的共同记录。" },
      { title: "一起听歌", text: "音乐不是播放器功能，而是共享时刻，AI 小伙伴可以围绕歌词和用户状态回应。" },
      { title: "轻量日程", text: "让 AI 小伙伴拥有一天里的轻量安排，例如休息、想你、整理歌单、准备小纸条。" },
      { title: "记忆碎片", text: "把重要信息、共同经历和用户偏好沉淀成可回看的关系材料。" }
    ]
  },
  experiences: [
    {
      title: "打开时先看到状态，而不是输入框",
      text: "首页第一眼展示 AI 小伙伴的心情、能量、今日节奏、最近共同发生的事和可以继续的轻入口。",
      example: "今天有点安静。刚刚整理了你昨天听过的歌。"
    },
    {
      title: "心情日历不是打卡，而是共同生活记录",
      text: "用户可以记录自己的心情，也能看到 AI 小伙伴的心情变化。记录后给出柔和回应，而不是心理分析报告。",
      example: "不是所有日子都要很亮，今天能过去也算数。"
    },
    {
      title: "一起听歌，让 AI 进入具体时刻",
      text: "歌曲卡片、歌词高亮和 AI 小伙伴的回应结合，让音乐成为关系上下文。",
      example: "要不要先听完这一段，不急着回答我。"
    },
    {
      title: "轻量日程，让陪伴对象有自己的节奏",
      text: "轻量日程让 AI 小伙伴不是空白等待框，而是一个有内部生活节奏的角色。",
      example: "我在这里；我注意到了；你想看的时候可以打开。"
    }
  ],
  showcase: [
    { title: "小手机首页", caption: "先看见它今天是什么状态。", kind: "home" },
    { title: "聊天页", caption: "聊天仍然存在，但不承担全部陪伴。", kind: "chat" },
    { title: "心情日历", caption: "心情不是任务，而是留下生活痕迹。", kind: "mood" },
    { title: "轻量日程", caption: "它也有自己的小小一天。", kind: "home" },
    { title: "一起听歌", caption: "一首歌可以成为一次共同在场。", kind: "music" },
    { title: "记忆碎片", caption: "记住那些会影响关系的事。", kind: "memory" },
    { title: "设置与边界", caption: "陪伴必须允许用户掌握距离。", kind: "boundary" }
  ],
  notes: [
    { title: "从聊天能力转向状态表达", text: "打开产品时，不需要先发消息，也能知道它在那里。" },
    { title: "从功能入口转向生活切片", text: "状态是中心；功能是状态的延伸；每一次互动都回到关系记录里。" },
    { title: "主动陪伴必须克制", text: "它更像：我在这里；我注意到了；你想看的时候可以打开；你不回应也没关系。" }
  ],
  timeline: [
    { label: "概念阶段", text: "AI 陪伴不只是聊天" },
    { label: "P0", text: "确定“小手机”作为陪伴容器" },
    { label: "P1", text: "拆分首页状态、聊天、心情日历、音乐、日程" },
    { label: "P2", text: "加入 AI 小伙伴自身状态与日程概念" },
    { label: "P3", text: "探索音乐上下文与歌词陪伴" },
    { label: "P4", text: "补充记忆碎片与主动边界" },
    { label: "P5", text: "整理为作品集 Idea Lab 案例" }
  ],
  notDoing: ["复杂社交关系", "强任务管理", "心理咨询替代", "高频推送系统", "完整手机 OS", "过度拟人控制"],
  reflection: {
    paragraphs: [
      "AI 陪伴不是让模型变得更会聊天。",
      "真正的挑战是：用户如何在一次次打开、关闭、记录、听歌和沉默之间，仍然感受到关系没有断掉。",
      "小手机这个形态让我意识到：陪伴产品需要的不只是语言能力，还需要状态系统、节奏设计和边界感。"
    ],
    outcomes: [
      "已明确小手机作为 AI 陪伴容器的产品定位",
      "已拆出首页状态、聊天、心情日历、音乐、日程、记忆碎片等核心模块",
      "已形成“状态优先于输入框”的体验方向",
      "已确定主动陪伴需要权限、频率和可忽略机制",
      "已可作为 Idea Lab 中的 AI 陪伴原型案例展示"
    ],
    next: [
      "补齐小手机关键界面稿",
      "整理小手机首页状态文案",
      "设计心情日历与轻量日程的信息结构",
      "完善一起听歌的歌曲卡片与歌词回应规则",
      "补充记忆碎片的分类与展示方式",
      "明确用户可控的陪伴边界设置"
    ],
    closing: "AI 陪伴小手机不想成为一个更吵的聊天框。它只是想证明：有时候，被陪伴的感觉，来自一个安静但持续存在的状态。"
  }
};
