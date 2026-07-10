import type { Idea, ModuleNote, Project } from "./types";

export const projects: Project[] = [
  {
    id: "competitor-workbench",
    name: "竞品分析工作台",
    type: "AI 工具 / 产品分析",
    value: "把零散竞品信息整理成可比较、可追踪、可复用的产品判断材料。",
    role: "产品结构设计、信息架构、原型与前端实现",
    status: "进行中",
    demoUrl: "https://competitive-analysis-workbench-demo.vercel.app/",
    updatedAt: "2026.07",
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
    id: "follow-heart",
    name: "随心而行",
    type: "C 端体验 / 传统文化",
    value: "用轻量互动把传统文化体验变成更容易进入的自我探索工具。",
    role: "产品概念、交互原型、页面实现",
    status: "MVP 展示版",
    demoUrl: "https://mystic-lab-sigma.vercel.app/",
    updatedAt: "2026.07",
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
    id: "ai-companion",
    name: "AI Companion",
    type: "AI 陪伴 / 情绪系统",
    value: "探索 AI 宠物如何通过状态、情绪和动作反馈建立陪伴感。",
    role: "产品机制、情绪模型、内容规则",
    status: "长期迭代",
    demoUrl: "https://chris-phone.vercel.app/",
    updatedAt: "2026.07",
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
    type: "个人知识系统 / PM 工具",
    value: "把想法、项目、简历和产品复盘串成一个能持续更新的个人产品系统。",
    role: "系统设计、前端实现、内容架构",
    status: "概念验证",
    demoUrl: "https://star-project-manage.vercel.app/",
    updatedAt: "2026.07",
    summary: "一个面向个人产品创造者的项目恢复和展示系统。",
    why: "个人项目越多，越需要一个能快速恢复上下文的系统，而不是散落在聊天和文件夹里。",
    problem: "项目灵感、进度、链接和复盘分散，重新接手时成本很高。",
    solution: "用桌面 OS 隐喻组织项目、灵感、简历和终端状态，让个人作品集也能像产品一样运行。",
    features: ["项目宇宙", "灵感收件箱", "简历窗口", "终端状态"],
    contribution: ["定义信息结构", "设计桌面隐喻", "实现作品集第一版", "规划后续内容入口"],
    progress: "正在搭建第一版静态作品集。",
    next: ["接入真实项目链接", "补充简历 PDF", "加入轻量命令交互"]
  }
];

export const ideas: Idea[] = [
  {
    title: "AI 共读搭子",
    note: "让阅读过程有一个能接话、提问和整理重点的陪伴者。",
    status: "概念"
  },
  {
    title: "传统文化游戏化学习",
    note: "用轻任务和可收集内容降低传统文化学习门槛。",
    status: "观察中"
  },
  {
    title: "手势塔罗 / 随心而行",
    note: "把手势、象征和即时反馈结合成轻量探索体验。",
    status: "已有原型"
  },
  {
    title: "项目恢复系统",
    note: "让中断的项目能通过状态、链接和下一步快速恢复。",
    status: "适合产品化"
  },
  {
    title: "AI 宠物情绪模型",
    note: "把情绪、能量、动作和异常状态拆成可持续维护的规则。",
    status: "长期迭代"
  }
];

export const terminalLines = [
  "> booting Star Lab...",
  "> loading project universe...",
  "> syncing GitHub updates...",
  "> ready."
];

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
