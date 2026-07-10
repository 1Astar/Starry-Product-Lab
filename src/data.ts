import type { Idea, ModuleNote, Project } from "./types";

export const displayStatement =
  "部分公司项目已进行脱敏处理，仅展示本人参与的产品设计思路、交互流程与页面结构，不包含真实业务数据、内部文档、源代码或未公开信息。";

export const projects: Project[] = [
  {
    id: "follow-heart",
    name: "随心而行",
    category: "公开作品",
    type: "C 端体验 / 传统文化",
    value: "用轻量互动把传统文化体验变成更容易进入的自我探索工具。",
    role: "产品设计 / 交互 / 独立开发",
    archive: {
      start: "想做一个隔空抽牌的小实验",
      iteration: "从占卜工具，迭代为在占问过程中学习牌义与传统文化的自我探索产品",
      current: "P1 结果页优化"
    },
    status: "MVP 展示版",
    actions: [
      { label: "体验 Demo", kind: "external", url: "https://mystic-lab-sigma.vercel.app/" },
      { label: "查看设计过程", kind: "detail" }
    ],
    updatedAt: "2026.07",
    coverImage: "/assets/projects/follow-heart-poster.svg",
    humanNote: "今日主线：把一次抽牌，变成一次更温柔的自我提问。",
    summary: "一个把手势、抽牌和文化意象结合起来的轻量体验项目。",
    why: "我希望传统文化不只是被阅读，而是能在一个温柔的互动场景里被感知。",
    problem: "许多传统文化内容门槛高、表达重，年轻用户很难形成持续兴趣。",
    solution: "用手势选择、意象反馈和短文本解释，让用户通过一次很轻的行动进入内容。",
    features: ["手势抽牌", "结果页", "文化意象解释", "分享式视觉表达"],
    contribution: ["梳理核心体验路径", "设计结果页信息层级", "完成前端原型", "持续优化动效节奏"],
    progress: "已有可展示版本，正在优化结果页质感。",
    next: ["补充更多文化意象", "优化移动端体验", "整理项目复盘"]
  },
  {
    id: "competitor-workbench",
    name: "竞品分析工作台",
    category: "公开作品",
    type: "AI 工具 / 产品分析",
    value: "把零散竞品信息整理成可比较、可追踪、可复用的产品判断材料。",
    role: "产品结构设计、信息架构、原型与前端实现",
    archive: {
      start: "竞品信息散落在截图和文档里，难以持续比较",
      iteration: "从一次性分析，迭代为可归档、可追踪的产品判断工作台",
      current: "展示结构完成，正在补充案例样本"
    },
    status: "进行中",
    actions: [
      {
        label: "体验脱敏 Demo",
        kind: "external",
        url: "https://competitive-analysis-workbench-demo.vercel.app/"
      },
      { label: "查看案例", kind: "detail" }
    ],
    updatedAt: "2026.07",
    coverImage: "/assets/projects/competitor-workbench-poster.svg",
    humanNote: "把散落的截图和判断，收进一个能复盘的观察舱。",
    summary: "面向产品经理的竞品研究工作台。",
    why: "竞品分析常常停留在截图和主观描述里，很难持续沉淀成决策材料。",
    problem: "信息来源分散、维度不统一、结论难复用，导致每次分析都像从零开始。",
    solution: "用统一字段组织竞品、功能、页面和判断结论，让分析过程变成可复盘的工作流。",
    features: ["竞品卡片", "分析维度归档", "结论摘要", "更新状态记录"],
    contribution: ["定义核心字段", "拆解分析流程", "搭建静态展示版", "规划后续数据结构"],
    progress: "已完成第一版展示结构，正在补充案例样本。",
    next: ["增加项目筛选", "补充真实分析样例", "整理导出模板"]
  },
  {
    id: "ai-companion",
    name: "AI Companion",
    category: "公开作品",
    type: "AI 陪伴 / 情绪系统",
    value: "探索 AI 宠物如何通过状态、情绪和动作反馈建立陪伴感。",
    role: "产品机制、情绪模型、内容规则",
    archive: {
      start: "想验证 AI 陪伴是否能超越单纯聊天",
      iteration: "从对话体验，迭代为情绪、动作、声音与设备状态共同组成的陪伴系统",
      current: "持续调整情绪与表达规则"
    },
    status: "长期迭代",
    actions: [
      { label: "体验 Demo", kind: "external", url: "https://chris-phone.vercel.app/" },
      { label: "查看设计过程", kind: "detail" }
    ],
    updatedAt: "2026.07",
    coverImage: "/assets/projects/ai-companion-poster.svg",
    humanNote: "它不是只会聊天，而是会用状态、动作和小脾气回应你。",
    summary: "围绕 AI 宠物陪伴体验设计的情绪与行为系统。",
    why: "AI 陪伴产品不能只回答问题，它需要能被用户感受到状态、关系和性格。",
    problem: "普通聊天式陪伴容易缺少身体感和持续关系，硬件宠物又需要明确状态规则。",
    solution: "把情绪、能量、动作、语音和异常状态拆成可维护的规则系统。",
    features: ["情绪状态", "动作建议", "语音表达", "异常状态边界"],
    contribution: ["设计状态分类", "整理表达规则", "拆解硬件联动边界", "编写内容表格"],
    progress: "已形成多版内容与规则文档，持续调整表达风格。",
    next: ["细化动作生成规则", "补充用户场景", "整理对外展示案例"]
  },
  {
    id: "star-pm",
    name: "Star PM",
    category: "公开作品",
    type: "个人知识系统 / PM 工具",
    value: "把想法、项目、简历和产品复盘串成一个能持续更新的个人产品系统。",
    role: "系统设计、前端实现、内容架构",
    archive: {
      start: "个人项目散落在聊天、文件夹和部署链接里",
      iteration: "从项目清单，迭代为可以快速恢复上下文的个人产品系统",
      current: "第一版静态展示系统搭建中"
    },
    status: "概念验证",
    actions: [
      { label: "体验 Demo", kind: "external", url: "https://star-project-manage.vercel.app/" },
      { label: "查看设计过程", kind: "detail" }
    ],
    updatedAt: "2026.07",
    coverImage: "/assets/projects/star-pm-poster.svg",
    humanNote: "给野生灵感修一条轨道，别让项目醒来时找不到家。",
    summary: "一个面向个人产品创造者的项目恢复和展示系统。",
    why: "个人项目越多，越需要一个能快速恢复上下文的系统，而不是散落在聊天和文件夹里。",
    problem: "项目灵感、进度、链接和复盘分散，重新接手时成本很高。",
    solution: "用桌面 OS 隐喻组织项目、灵感、简历和终端状态，让个人作品集也能像产品一样运行。",
    features: ["项目宇宙", "灵感收件箱", "简历窗口", "终端状态"],
    contribution: ["定义信息结构", "设计桌面隐喻", "实现作品集第一版", "规划后续内容入口"],
    progress: "正在搭建第一版静态作品集。",
    next: ["接入真实项目链接", "补充简历 PDF", "加入轻量命令交互"]
  },
  {
    id: "ai-pet-hardware",
    name: "AI 宠物软硬件产品",
    category: "工作案例",
    type: "AI 陪伴 / IoT 软硬件",
    value: "从设备控制走向情绪陪伴，拆解 App、小程序与硬件状态反馈之间的关系。",
    role: "产品机制、交互流程、状态反馈、跨端协同",
    archive: {
      start: "硬件控制功能完整，但陪伴感没有被用户真正感知",
      iteration: "从设备控制，迭代为状态、声音、动作与界面共同反馈的陪伴体验",
      current: "脱敏案例框架已完成"
    },
    status: "脱敏案例",
    actions: [
      { label: "查看脱敏案例", kind: "detail" },
      { label: "面试可演示", kind: "detail" }
    ],
    updatedAt: "2026.07",
    coverImage: "/assets/projects/ai-pet-hardware-poster.svg",
    humanNote: "工作案例已脱敏，只留下我怎么把控制感变成陪伴感。",
    summary: "AI 宠物陪伴产品：从功能控制到情绪陪伴体验。",
    why: "我希望证明 AI 陪伴不只是聊天，而是由状态、动作、声音、界面和设备反馈共同组成的体验。",
    problem: "如果只把硬件当作远程控制对象，用户很难感受到它有状态、有关系、有可持续陪伴感。",
    solution: "用脱敏方式展示 App 旧版/新版对比、宠物状态反馈机制、情绪矩阵和多端控制关系。",
    features: ["App 旧版 / 新版对比", "宠物状态反馈机制", "情绪矩阵", "声音 / 行为 / 界面反馈拆解"],
    contribution: ["梳理 App + 小程序 + 设备控制关系", "拆分情绪与异常状态边界", "整理陪伴体验表达层级", "沉淀对外可讲的案例结构"],
    progress: "已脱敏整理为案例框架，仅展示产品设计思路与交互流程。",
    next: ["补充页面对比截图位", "加入关系图缩略图", "整理面试讲述版本"]
  },
  {
    id: "iot-ops",
    name: "IoT 远程运维平台",
    category: "工作案例",
    type: "IoT / 小程序 / Web 后台",
    value: "把技术控制能力转译为用户可理解的远程运维、告警和工单流程。",
    role: "流程梳理、权限边界、异常流设计、后台协同",
    archive: {
      start: "告警、故障、权限与工单分散在不同入口",
      iteration: "从技术控制链路，迭代为用户可理解的远程运维流程",
      current: "脱敏流程案例整理完成"
    },
    status: "脱敏案例",
    actions: [
      { label: "查看流程案例", kind: "detail" },
      { label: "面试可演示", kind: "detail" }
    ],
    updatedAt: "2026.07",
    coverImage: "/assets/projects/iot-ops-poster.svg",
    humanNote: "把后台、告警和设备状态，翻译成用户看得懂的下一步。",
    summary: "IoT 设备远程运维平台：把技术控制能力变成用户可理解的操作流程。",
    why: "IoT 产品的难点不只是能不能控制设备，而是用户、后台和设备状态能否在同一条流程里被理解。",
    problem: "告警、故障、权限和工单容易散在不同入口，用户不知道下一步该做什么，后台也难追踪责任边界。",
    solution: "用脱敏流程图展示设备-用户-后台权限关系、告警/故障/工单链路，以及小程序与后台职责划分。",
    features: ["设备-用户-后台权限图", "告警 / 故障 / 工单流程", "小程序与后台职责划分", "旧流程问题 vs 新流程优化"],
    contribution: ["梳理远程运维主流程", "定义异常流和处理入口", "拆分前后台职责", "把技术动作翻译成用户可理解的操作"],
    progress: "已整理成可讲述的流程案例，不展示真实业务数据和内部文档。",
    next: ["补充权限图展示位", "完善异常流说明", "整理面试演示路径"]
  },
  {
    id: "yuanjing-miniapp",
    name: "元井小程序/界面案例",
    category: "工作案例",
    type: "小程序 / 界面案例",
    value: "以公开界面展示页面结构、功能流程、交互优化和内容呈现，不暴露内部资料。",
    role: "页面结构、功能流程、交互优化、内容呈现",
    archive: {
      start: "公开界面难以说明本人实际参与的产品工作",
      iteration: "从单纯截图，迭代为带参与范围与展示边界的界面案例",
      current: "等待补充公开入口与二维码"
    },
    status: "公开入口",
    actions: [
      { label: "查看公开入口", kind: "detail" },
      { label: "查看设计说明", kind: "detail" }
    ],
    updatedAt: "2026.07",
    humanNote: "暂时停靠：只展示公开入口和参与边界，不展示内部细节。",
    summary: "以公开入口和脱敏说明展示小程序界面案例。",
    why: "公开产品案例需要让人看到参与部分，同时避免把内部资料、未公开策略或原始文档放出来。",
    problem: "如果只放截图，访客难判断我负责的部分；如果放太细，又可能暴露不适合公开的信息。",
    solution: "只展示公开体验入口、页面结构、功能流程、交互优化和内容呈现，并加展示声明与水印。",
    features: ["公开体验入口", "页面结构说明", "功能流程说明", "展示声明与版权标记"],
    contribution: ["梳理对外展示边界", "提炼本人参与部分", "组织页面结构说明", "规划水印与展示声明"],
    progress: "已作为界面案例占位，等待补充公开入口或二维码。",
    next: ["确认公开入口", "补充二维码或截图位", "加入 © 刘星雨 Starry Product Lab 水印"]
  }
];

export const ideas: Idea[] = [
  {
    title: "AI 共读搭子",
    note: "让阅读过程有一个能接话、提问和整理重点的陪伴者。",
    status: "概念",
    relatedProject: "AI Companion"
  },
  {
    title: "传统文化游戏化",
    note: "用轻任务和可收集内容降低传统文化学习门槛。",
    status: "观察中",
    relatedProject: "随心而行"
  },
  {
    title: "项目恢复系统",
    note: "让中断的项目能通过状态、链接和下一步快速恢复。",
    status: "适合产品化",
    relatedProject: "Star PM"
  }
];

export const terminalLines = [
  "> booting Star Lab...",
  "> loading project universe...",
  "> syncing GitHub updates...",
  "> ready."
];

export const bootLines = [
  "> booting Moonpie Lab...",
  "> loading 4 public works...",
  "> parking 7 wild ideas...",
  "> today focus: 随心而行 P1",
  "> remember: 想法先入库，不准乱开坑."
];

export const appFeedback: Partial<Record<import("./types").WindowId, string[]>> = {
  projects: [
    "> opening Project Universe...",
    "> 4 public works loaded",
    "> 3 work cases are privacy-safe"
  ],
  inbox: [
    "> scanning Idea Inbox...",
    "> 3 ideas waiting",
    "> 1 idea can be converted to project"
  ],
  resume: [
    "> loading resume.pdf...",
    "> profile ready"
  ],
  about: [
    "> loading identity profile...",
    "> product philosophy connected"
  ],
  terminal: [
    "> terminal expanded",
    '> type "help" to explore'
  ]
};

export const moduleNotes: ModuleNote[] = [
  {
    id: "project-detail",
    title: "项目详情页",
    kicker: "把项目从卡片展开成决策记录",
    description: "用于展示项目为什么做、解决什么问题、当前进度和下一步计划。第一版保留结构位，后续再逐个项目补深度内容。",
    bullets: ["项目一句话", "问题 / 方案 / 进度", "关键页面截图位"]
  },
  {
    id: "idea-inbox",
    title: "灵感收件箱",
    kicker: "半公开展示产品脑，不暴露敏感细节",
    description: "只展示精选灵感标题、简短说明和状态，让访客知道这里有持续思考，但不会把完整方案直接摊开。",
    bullets: ["灵感标题", "一句话索引", "状态标签"]
  },
  {
    id: "key-vault",
    title: "密钥索引保险箱",
    kicker: "概念展示，不保存真实密钥",
    description: "这个模块只表达“项目资产索引”的概念：哪些项目依赖哪些服务、哪些凭据需要管理。不会展示真实 API Key 或密码。",
    bullets: ["服务名称", "关联项目", "遮罩式密钥索引"]
  },
  {
    id: "system-functions",
    title: "系统功能",
    kicker: "让作品集像一个会运行的个人系统",
    description: "把 Git 同步、部署监控、演进记录、标签分类和快捷键统一放在系统功能条里，强调作品集不是静态简历。",
    bullets: ["Demo 入口", "部署状态", "项目恢复线索"]
  }
];
