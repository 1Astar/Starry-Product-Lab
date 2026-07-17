export interface CompetitiveAnalysisSection {
  id: "hero" | "why" | "problem-goal" | "solution" | "key-experience" | "ui-showcase" | "iterations" | "reflection";
  label: string;
  title: string;
}

export interface CompetitiveAnalysisVisual {
  title: string;
  caption: string;
  kind: "import" | "mapping" | "cleaning" | "card" | "ai" | "report" | "prd" | "after-sale";
}

export interface CompetitiveAnalysisCaseStudyData {
  eyebrow: string;
  title: string;
  subtitle: string;
  intro: string[];
  note: string;
  tags: string[];
  sections: CompetitiveAnalysisSection[];
  why: {
    paragraphs: string[];
    users: string[];
    evidence: CompetitiveAnalysisVisual[];
  };
  problems: string[];
  goals: string[];
  solution: {
    flow: string[];
    modules: Array<{ title: string; text: string }>;
  };
  experiences: Array<{ title: string; text: string; emphasis?: string }>;
  showcase: CompetitiveAnalysisVisual[];
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

export const competitiveAnalysisCaseStudy: CompetitiveAnalysisCaseStudyData = {
  eyebrow: "CASE STUDY 03 · PRODUCT TOOL · 2026",
  title: "竞品分析工作台",
  subtitle: "把零散竞品信息，整理成可以比较、追踪、复用的产品判断材料。",
  intro: [
    "竞品分析工作台是一个面向产品经理的研究工具。",
    "它将电商列表、商品链接、社媒种草、用户评价、功能矩阵、退货售后数据和 AI 报告生成，整合成一条从“看竞品”到“做判断”的工作流。",
    "它不只是帮用户填表，更重要的是让每一次分析都能留下结构化证据、字段口径和可复盘结论。"
  ],
  note: "真正有用的竞品分析，不是截图更多，而是判断更稳。",
  tags: ["AI 工具", "竞品分析", "数据整理", "字段映射", "市场判断", "产品研究工作台", "P1 迭代中"],
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
      "做产品分析时，我经常遇到一个问题：竞品资料并不难找，真正难的是把它们变成可以判断的材料。",
      "一开始的竞品分析很容易变成截图很多、链接很多、表格字段不统一，每个产品都写了一段主观描述，最后结论还是靠感觉。",
      "但产品经理真正需要的不是“我看过很多竞品”，而是哪些信息可以横向比较，哪些字段能支撑判断，用户槽点和卖点能否被证据互相验证。",
      "于是这个工具从一个竞品表，逐渐变成一个完整的研究工作台。它希望把“收集资料”变成“形成判断”的过程。"
    ],
    users: [
      "做 AI 陪伴宠物方向调研的产品经理",
      "判断宠物项圈是否值得进入的选品人员",
      "整理 Amazon / 淘宝 / 京东商品数据的运营或研究者",
      "分析用户评价和退货原因的项目负责人",
      "把竞品研究转成需求池的独立创造者"
    ],
    evidence: [
      { title: "商品卡片", caption: "链接、图片、平台、价格和销量先被保留为原始证据。", kind: "card" },
      { title: "字段口径", caption: "价格、销量、功能、评价必须先统一语言。", kind: "mapping" },
      { title: "报告草稿", caption: "结论从字段和来源里长出来，而不是凭空生成。", kind: "report" }
    ]
  },
  problems: [
    "数据来源分散",
    "字段口径不统一",
    "AI 输出不可控",
    "表格能记录，但不能推动判断",
    "结论难复用"
  ],
  goals: [
    "让数据先被整理",
    "让竞品可以横向比较",
    "让 AI 参与补全，但不替代证据",
    "让分析能继续往需求走",
    "让市场判断有框架"
  ],
  solution: {
    flow: ["导入数据", "字段映射", "竞品卡片", "分析模块", "输出结果"],
    modules: [
      { title: "数据整理", text: "导入 Instant Data Scraper、Excel、CSV 或历史表，自动识别字段并支持手动映射。" },
      { title: "竞品卡片", text: "每个竞品沉淀名称、平台、价格、销量、链接、图片、功能矩阵和 AI 字段。" },
      { title: "AI 字段补全", text: "围绕核心功能、材质、综合类型、关键词、用户画像、正负评价、潜在需求点等字段补全。" },
      { title: "调研报告生成", text: "基于竞品和需求分析生成完整报告，并支持新增竞品后的增量更新。" },
      { title: "需求与 PRD", text: "从竞品洞察继续生成需求分析、需求 List、PRD 文档和原型方向建议。" },
      { title: "售后 / 退货分析", text: "上传退货、退款、差评和客服反馈，归因 Top 问题并形成改进建议。" }
    ]
  },
  experiences: [
    {
      title: "导入后先做字段映射",
      text: "用户上传商品列表或历史表后，系统不直接进入分析，而是先显示字段映射区，识别竞品名称、价格、销量、平台、链接、图片、功能、评价和售后问题。",
      emphasis: "先统一字段，再生成结论。"
    },
    {
      title: "竞品卡片不是展示卡，而是研究容器",
      text: "每个竞品卡片包含基础信息、功能矩阵、AI 分析字段、来源记录和状态管理，让一个竞品拥有完整证据链。",
      emphasis: "卡片是证据容器，不是装饰卡片。"
    },
    {
      title: "AI 补全必须服务于结构化字段",
      text: "AI 不直接输出一篇大报告，而是先补齐核心功能、综合类型、用户画像、正负评价、潜在需求点和差异亮点。",
      emphasis: "AI 是整理助手，不是结论制造机。"
    },
    {
      title: "报告生成要能回到证据",
      text: "市场判定、真实需求、竞争类型、购买动机、机会公式、行动建议和功能矩阵都可以回到具体字段与样本来源。",
      emphasis: "每个判断都要能追溯。"
    },
    {
      title: "售后 / 退货分析让问题更接近真实业务",
      text: "工具不只看竞品卖点，也看用户为什么退货、投诉或差评，再输出问题归因、SKU 风险对照和改进建议。",
      emphasis: "用户不满意的地方，往往比卖点更接近机会。"
    }
  ],
  showcase: [
    { title: "数据导入页", caption: "先把散乱资料带进来。", kind: "import" },
    { title: "字段映射页", caption: "让不同来源说同一种语言。", kind: "mapping" },
    { title: "数据整理预览", caption: "先清洗，再进入分析。", kind: "cleaning" },
    { title: "竞品卡片页", caption: "一个竞品，就是一份可追踪档案。", kind: "card" },
    { title: "AI 分析字段页", caption: "让 AI 填字段，而不是直接编结论。", kind: "ai" },
    { title: "调研报告页", caption: "从字段，生成可复盘的市场判断。", kind: "report" },
    { title: "需求分析页", caption: "分析之后，要能继续变成需求。", kind: "prd" },
    { title: "售后 / 退货分析页", caption: "用户不满意的地方，往往比卖点更接近机会。", kind: "after-sale" }
  ],
  notes: [
    { title: "从竞品表开始", text: "最初只是想把竞品信息整理得更快一点，但真正耗时的是字段不统一、资料难复用、结论难落地。" },
    { title: "从“AI 写报告”转向“AI 补字段”", text: "先有统一 Schema，再让 AI 补字段，最后生成报告，让报告从结构化数据自然长出来。" },
    { title: "从竞品分析扩展到售后退货", text: "退货、差评和售后记录往往更接近真实痛点，所以加入退货原因、售后反馈、SKU 风险对照和改进建议。" }
  ],
  timeline: [
    { label: "概念阶段", text: "竞品信息整理表" },
    { label: "P0", text: "支持新增竞品、字段记录、Excel 导出" },
    { label: "P1", text: "加入数据整理、字段映射、历史表导入" },
    { label: "P2", text: "加入 AI 字段补全、产品链接解析、社媒摘录" },
    { label: "P3", text: "加入需求分析、需求 List、PRD 生成" },
    { label: "P4", text: "加入调研报告生成与增量更新" },
    { label: "P5", text: "加入市场机会判断框架" },
    { label: "P6", text: "加入售后 / 退货分析、SKU 对照和统一报告" }
  ],
  notDoing: ["全自动爬取所有平台", "绕过平台风控", "替代人工市场判断", "无证据生成结论", "复杂 BI 系统", "多人协作权限体系", "企业级数据仓库"],
  reflection: {
    paragraphs: [
      "竞品分析工具的价值，不是让报告变得更快。真正有价值的是让判断变得更可追溯。",
      "如果一个结论不能回到字段、来源和样本，它就很难支撑产品决策。如果每次分析都重新开表、重新粘贴、重新写报告，那分析本身就没有沉淀。",
      "AI 在产品分析里最适合的位置，不是直接替人下判断，而是帮助人把资料整理成更稳定的结构。"
    ],
    outcomes: [
      "已形成竞品分析工作台的完整工具雏形",
      "已支持数据整理、字段映射、竞品卡片、AI 补全、报告生成",
      "已在 AI 陪伴宠物、宠物项圈、边桌等方向沉淀过真实分析数据",
      "已扩展到需求分析、PRD 生成、原型方向建议",
      "已加入售后 / 退货分析与市场机会判断框架"
    ],
    next: [
      "整理一套更稳定的竞品 Schema",
      "补充字段可信度与来源标记",
      "优化 AI 字段生成的复核流程",
      "将市场机会判断做成独立模块",
      "补充更多真实案例样本",
      "将报告导出样式升级为作品集可展示版本"
    ],
    closing: "竞品分析工作台不想替产品经理做决定。它只是把混乱资料整理到足够清楚，让真正的判断可以开始发生。"
  }
};
