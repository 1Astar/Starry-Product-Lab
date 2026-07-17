export interface JobRadarSection {
  id: "hero" | "why" | "problem-goal" | "solution" | "key-experience" | "ui-showcase" | "iterations" | "reflection";
  label: string;
  title: string;
}

export interface JobRadarVisual {
  title: string;
  caption: string;
  kind: "entry" | "capture" | "score" | "risk" | "resume" | "greeting" | "fill" | "list";
}

export interface JobRadarCaseStudyData {
  eyebrow: string;
  title: string;
  subtitle: string;
  intro: string[];
  note: string;
  tags: string[];
  sections: JobRadarSection[];
  why: {
    paragraphs: string[];
    users: string[];
    signals: JobRadarVisual[];
  };
  problems: string[];
  goals: string[];
  solution: {
    flow: string[];
    modules: Array<{ title: string; text: string }>;
  };
  experiences: Array<{ title: string; text: string; emphasis?: string }>;
  showcase: JobRadarVisual[];
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

export const jobRadarCaseStudy: JobRadarCaseStudyData = {
  eyebrow: "CASE STUDY 04 · IDEA LAB · 2026",
  title: "Job Radar",
  subtitle: "在投递之前，先判断这个岗位值不值得浪费你的时间。",
  intro: [
    "Job Radar 是一个 AI 辅助求职 Chrome 扩展。",
    "它嵌入 BOSS 直聘与招聘页面，帮助用户采集 JD、识别岗位风险、评估简历匹配度，并生成更自然的打招呼话术。",
    "它不鼓励用户盲目海投。它更像一个贴在岗位页面旁边的判断雷达：先看公司靠不靠谱，再看岗位适不适合，最后才决定要不要投。"
  ],
  note: "不是每个写着 AI 的岗位，都真的值得投。",
  tags: ["Chrome 扩展", "AI 求职助手", "JD 解析", "岗位风险识别", "简历匹配", "打招呼生成", "个人工具"],
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
      "找工作时，真正消耗人的不是投递动作本身。而是每一次打开岗位详情时，都要重新判断这个岗位是真的产品岗，还是运营、销售包装成产品。",
      "标题写 AI，工作内容是不是客服、销售或伪 AI？公司看起来靠不靠谱？我目前的经历能不能匹配？要不要打招呼？这些判断非常琐碎，但又不能省略。",
      "一次错误投递，可能带来很多后续成本：无效沟通、被动面试、低质量 offer，甚至进入一个明显不适合的环境。",
      "所以我想做一个贴近求职现场的工具：先采集岗位，再解析 JD，再对照画像和简历，再识别风险，最后给出投递建议和打招呼文本。"
    ],
    users: [
      "正在密集找工作，希望从普通产品、运营或项目经验转向 AI 产品的人",
      "想进入 IoT 产品、B 端工具或技术型 PM 方向的人",
      "面对大量 JD，但想提高投递质量而不是扩大投递数量的人",
      "需要记录待投、已投、沟通中、面试、拒绝和排雷状态的人"
    ],
    signals: [
      { title: "岗位标题", caption: "AI / 智能不等于真的 AI 产品岗。", kind: "entry" },
      { title: "风险标签", caption: "强销售、强 BD、伪 AI、高加班风险需要显性提示。", kind: "risk" },
      { title: "投递建议", caption: "强投、可聊、谨慎、不投，不混在一个匹配分里。", kind: "score" }
    ]
  },
  problems: [
    "岗位判断发生得太晚",
    "JD 信息难快速拆解",
    "AI 岗位真假混杂",
    "公司风险与岗位匹配分离",
    "打招呼容易模板化",
    "投递记录难沉淀"
  ],
  goals: [
    "让判断发生在岗位页面",
    "建立四维评分",
    "公司质量优先",
    "识别伪 AI 和高风险岗位",
    "生成自然打招呼",
    "沉淀岗位状态"
  ],
  solution: {
    flow: ["打开岗位页面", "采集岗位信息", "AI 解析", "判断模型", "行动输出", "后续动作"],
    modules: [
      { title: "岗位采集", text: "在 BOSS 详情页或岗位列表页采集标题、公司、城市、薪资、经验、标签和 JD 文本。" },
      { title: "JD 解析", text: "识别岗位职责、技术要求、工作模式、隐性风险和角色类型。" },
      { title: "用户画像", text: "维护目标方向、避开方向、简历亮点、不同岗位类型的简历摘要和求职偏好。" },
      { title: "AI 分析", text: "输出岗位匹配、成长价值、风险指数、推荐结论、风险理由、简历缺口和面试准备。" },
      { title: "打招呼生成", text: "按岗位类型生成自然短句，支持不同语气档位，并可一键填入 BOSS 沟通框。" },
      { title: "岗位管理", text: "保存岗位列表，维护待投、已投、沟通中、面试、拒绝、排雷等状态，并支持 JSON 导入导出。" }
    ]
  },
  experiences: [
    { title: "在 BOSS 页面旁边直接分析", text: "用户不需要复制粘贴一堆内容。打开岗位页后，点击扩展侧边栏，从当前页采集、等待 JD 加载、生成分析结果。", emphasis: "工具出现在求职决策现场。" },
    { title: "四维评分不是为了好看，而是帮用户停下来", text: "岗位匹配、成长价值、风险指数和投递建议分开，因为能做和值得做不是一回事。", emphasis: "匹配度高，但公司风险大，也不应该强投。" },
    { title: "公司质量优先于岗位匹配", text: "如果公司存在踩坑标注、风评避雷、注册信息异常、强 KPI 或高风险信号，即使 JD 匹配也不能轻易推荐强投。", emphasis: "求职不是做题，不能只看关键词匹配。" },
    { title: "识别伪 AI 岗位", text: "标题写 AI / 智能，但职责以运营、客服、销售、BD 为主时，系统会标记为伪 AI 或高风险。", emphasis: "避免被包装词吸引。" },
    { title: "打招呼不是模板，是岗位适配表达", text: "先判断岗位类型，再从简历中选真实经历，用轻量自然的话说明为什么想聊。", emphasis: "不生成“尊敬的 HR 您好”。" },
    { title: "岗位状态管理让求职可复盘", text: "保存后的岗位进入待投、已投、沟通中、面试、拒绝、排雷，后续统计常投方向与共性缺口。", emphasis: "求职也可以变成可复盘的策略过程。" }
  ],
  showcase: [
    { title: "插件入口", caption: "判断发生在岗位页面旁边。", kind: "entry" },
    { title: "岗位采集页", caption: "先拿到完整 JD，再开始判断。", kind: "capture" },
    { title: "分析结果页", caption: "能不能做、值不值得做、风险高不高，分开看。", kind: "score" },
    { title: "风险识别页", caption: "把隐性风险写在明面上。", kind: "risk" },
    { title: "简历匹配页", caption: "不是只说匹配，而是指出证据和缺口。", kind: "resume" },
    { title: "打招呼页", caption: "开场白要像真人，不像群发。", kind: "greeting" },
    { title: "一键填入 BOSS", caption: "判断完成后，才进入沟通动作。", kind: "fill" },
    { title: "岗位列表页", caption: "每一次投递，都应该留下状态。", kind: "list" }
  ],
  notes: [
    { title: "从“打招呼生成器”开始", text: "最早的需求只是生成一句更自然的 BOSS 打招呼，但如果岗位本身不值得投，再好的话术也只是提高无效沟通效率。" },
    { title: "从关键词匹配转向公司优先", text: "很多工具先看简历和 JD 的关键词重合，但实际求职里，公司风险往往比岗位匹配更重要。" },
    { title: "从单岗位分析扩展到投递复盘", text: "单次分析只能解决当前岗位。求职是连续过程，需要知道投了什么、哪些方向有回音、哪些岗位反复出现缺口。" }
  ],
  timeline: [
    { label: "概念阶段", text: "BOSS 打招呼辅助" },
    { label: "P0", text: "采集岗位详情，生成岗位适配话术" },
    { label: "P1", text: "加入 JD 解析和四维评分" },
    { label: "P2", text: "加入公司风险卡片和公司知识库" },
    { label: "P3", text: "加入伪 AI、强销售、强 BD 等风险识别" },
    { label: "P4", text: "加入岗位列表与状态管理" },
    { label: "P5", text: "加入简历画像、简历上传和方向推荐" },
    { label: "P6", text: "加入一键填入 BOSS 与官网 Careers 表单辅助" }
  ],
  notDoing: ["自动海投", "自动发送消息", "绕过招聘平台限制", "批量刷接口", "替用户做最终决定", "伪造简历经历", "承诺 offer 结果"],
  reflection: {
    paragraphs: [
      "求职不是简单的信息匹配。它更像一个高频、低确定性、情绪消耗很大的决策过程。",
      "Job Radar 的价值不是替用户投递更多岗位，而是帮用户在投递前停一下。把岗位拆开，把风险标出来，把简历证据对上，再决定是否继续。",
      "AI 工具不一定要做得很大。如果它能嵌入一个真实、高频、痛感明确的场景，并把一个反复发生的小判断做清楚，就已经有产品价值。"
    ],
    outcomes: [
      "已完成 Chrome 扩展方向",
      "已支持 BOSS 岗位采集、JD 解析、四维评分和推荐结论",
      "已支持公司风险、伪 AI、强销售等风险识别",
      "已支持打招呼生成与一键填入 BOSS",
      "已支持岗位列表、状态管理和 JSON 导入导出",
      "已加入用户画像、简历解析和官网 Careers 表单辅助方向"
    ],
    next: [
      "优化批量岗位分析体验",
      "补充公司知识库和踩坑标注",
      "完善投递复盘统计",
      "细化不同岗位类型的简历版本建议",
      "优化打招呼语气档位",
      "增加“为什么不投”的解释可读性",
      "整理插件 Demo 和作品集展示动效"
    ],
    closing: "Job Radar 不想让你投得更多。它想让你在点击投递之前，更清楚自己为什么要投，或者为什么不投。"
  }
};
