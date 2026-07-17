export interface AIControllerSection {
  id: "hero" | "why" | "problem-goal" | "solution" | "key-experience" | "ui-showcase" | "iterations" | "reflection";
  label: string;
  title: string;
}

export interface AIControllerVisual {
  title: string;
  caption: string;
  tone: "device" | "cloud" | "control" | "alarm" | "workorder" | "permission" | "service";
}

export interface AIControllerCaseStudyData {
  eyebrow: string;
  title: string;
  subtitle: string;
  intro: string[];
  note: string;
  tags: string[];
  sections: AIControllerSection[];
  why: {
    paragraphs: string[];
    users: string[];
    evolution: AIControllerVisual[];
  };
  problems: string[];
  goals: string[];
  beforeAfter: Array<{ before: string; after: string }>;
  solution: {
    layers: string[];
    modules: Array<{ title: string; text: string }>;
  };
  experiences: Array<{ title: string; text: string }>;
  showcase: AIControllerVisual[];
  notes: Array<{ title: string; text: string }>;
  timeline: Array<{ label: string; text: string }>;
  reflection: {
    paragraphs: string[];
    outcomes: string[];
    next: string[];
    closing: string;
  };
}

export const aiControllerCaseStudy: AIControllerCaseStudyData = {
  eyebrow: "CASE STUDY 04 · 2026",
  title: "AI 控制器 / 智能水泵控制系统",
  subtitle: "让设备从“能运行”变成“看得见、控得住、修得快”的持续服务能力。",
  intro: [
    "AI 控制器是一个面向水泵、泵组和工业设备的智能运维与远程管控项目。",
    "它不只是一个控制硬件，也不是单纯的数据看板，而是把设备接入、状态监测、远程控制、故障诊断、告警工单和售后运维串成一套云-管-端协同系统。",
    "它的核心不是多一个控制入口，而是让设备运行变得可观察、可干预、可追踪、可复盘。"
  ],
  note: "B 端产品的安全感，来自每一次控制都有状态、权限和回执。",
  tags: ["B 端产品", "AI 控制器", "云管端", "远程运维", "故障诊断", "设备控制", "工业物联", "售后服务"],
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
      "做 AI 宠物时，我更多面对的是用户体验、陪伴感和情绪反馈。但 AI 控制器完全不同。",
      "它面对的是更硬的现场问题：设备是否在线，水泵有没有运行，能不能远程启停，告警发生后谁来处理，控制失败有没有回执。",
      "这个项目让我意识到，B 端和软硬件产品的核心不是界面漂亮。它首先要可靠、可控、可追责。",
      "AI 控制器的价值不只是卖一个设备，更重要的是从卖设备转向卖运行能力和持续服务能力。"
    ],
    users: [
      "设备业主：关心设备是否稳定运行",
      "现场人员：关心能不能快速控制",
      "售后运维：关心故障原因和处理记录",
      "经销商：关心设备归属和服务关系",
      "平台方：关心设备数据、告警和运维效率"
    ],
    evolution: [
      { title: "最初", caption: "单台设备控制。", tone: "device" },
      { title: "中期", caption: "远程状态监测 + 控制回执。", tone: "control" },
      { title: "现在", caption: "云-管-端运维平台 + 告警工单 + 售后服务。", tone: "cloud" }
    ]
  },
  problems: ["设备状态不可见", "控制依赖现场人工", "故障处理链路断裂", "权限与归属复杂", "数据没有转成服务能力"],
  goals: ["让设备看得见", "让控制可追踪", "让故障能闭环", "让角色边界清楚", "让数据变成持续服务"],
  beforeAfter: [
    { before: "现场看设备", after: "远程看状态" },
    { before: "人工跑现场", after: "平台远程控制" },
    { before: "电话报故障", after: "告警工单闭环" },
    { before: "设备卖出去", after: "运行服务持续发生" },
    { before: "权限靠口头", after: "角色与绑定规则明确" }
  ],
  solution: {
    layers: ["设备接入", "绑定与归属", "状态采集", "远程控制", "控制回执", "告警诊断", "工单与售后", "运行服务"],
    modules: [
      { title: "设备台账", text: "记录设备身份、归属关系、安装场景、运行状态和服务信息。" },
      { title: "运行监测", text: "展示设备在线、运行、停止、离线、报警、同步时间和关键参数。" },
      { title: "远程控制", text: "提供启停、档位、参数、复位等控制能力，但必须经过权限和状态判断。" },
      { title: "告警中心", text: "把故障码、异常状态和设备报警集中管理，支持进入详情和处理链路。" },
      { title: "工单运维", text: "把告警转成可跟进的售后任务，记录处理进度、责任人、结果和复盘。" },
      { title: "数据服务", text: "基于设备运行数据做节能、维保、故障趋势和服务能力沉淀。" }
    ]
  },
  experiences: [
    { title: "先看设备能不能管，再谈怎么管", text: "进入设备详情时，用户需要先知道在线状态、运行状态、报警、同步时间、是否允许控制和当前角色权限。" },
    { title: "远程控制必须有回执", text: "用户点击启动并不等于设备已经启动。产品必须区分已提交、已下发、执行中、成功、失败和离线不可控。" },
    { title: "告警不是红点，而是处理链路的起点", text: "告警详情要能连接工单，工单要记录新建、受理、处理中、已完成以及处理结果。" },
    { title: "角色关系要先建模清楚", text: "经销商归属不等于主用户绑定，能看到设备不等于能控制设备，能演示设备不等于拥有设备。" },
    { title: "场景不是背景，而决定信息优先级", text: "农业灌溉、工业循环水、市政供水、光伏水泵、养殖供水和售后运维关注的指标不同。" }
  ],
  showcase: [
    { title: "设备总览", caption: "先看哪些设备正常，哪些设备需要处理。", tone: "device" },
    { title: "设备详情", caption: "一台设备的身份、状态和控制条件必须放在一起。", tone: "control" },
    { title: "小程序控制页", caption: "现场人员需要更轻的控制入口。", tone: "control" },
    { title: "控制回执面板", caption: "点击按钮不是结果，设备执行才是结果。", tone: "service" },
    { title: "告警详情", caption: "告警要告诉用户发生了什么，以及下一步能做什么。", tone: "alarm" },
    { title: "工单列表", caption: "售后不是靠记忆跟进，而是靠状态流转。", tone: "workorder" },
    { title: "权限与绑定关系", caption: "设备归属、用户绑定和控制权限不能混在一起。", tone: "permission" },
    { title: "场景化运行看板", caption: "同一套底层设备数据，在不同场景里转成不同的监测重点。", tone: "cloud" }
  ],
  notes: [
    { title: "从“能远程控制”到“能安全控制”", text: "按钮只是最后一步，前面必须先判断设备是否在线、当前是否可控、用户是否有权限、控制后是否有回执。" },
    { title: "从“设备数据”到“售后服务”", text: "数据不是装饰，而是售后运维的证据：故障波动、频繁离线、远程复位和工单结果都要能被追踪。" },
    { title: "从“单设备”到“云-管-端”", text: "云端管理数据和权限，控制器采集执行上报，小程序给现场轻量操作，平台给运维看全局，工单把问题闭环。" }
  ],
  timeline: [
    { label: "概念阶段", text: "从智能控制器产品介绍，扩展到设备远程运维和运行服务" },
    { label: "P0", text: "梳理设备接入、状态监测和基础远程控制" },
    { label: "P1", text: "补充在线、离线、运行、停止、报警等状态定义" },
    { label: "P2", text: "整理小程序功能架构：设备详情、控制、日志、告警、通知" },
    { label: "P3", text: "补充远程控制回执：指令下发、执行成功、执行失败、离线不可控" },
    { label: "P4", text: "明确告警和工单链路：故障详情、远程复位、工单状态流转" },
    { label: "P5", text: "拆分角色权限：经销商归属、主用户绑定、子用户权限、平台运维" },
    { label: "P6", text: "按应用场景重排产品表达：农业、工业、市政、光伏、养殖、售后运维" }
  ],
  reflection: {
    paragraphs: [
      "AI 宠物让我关注用户感受。AI 控制器让我关注系统边界。",
      "在 B 端和软硬件协同产品里，体验不只是页面顺不顺。它还包括状态是否真实、控制是否安全、权限是否清楚、失败是否可解释、告警是否能处理。",
      "从卖设备到卖运行能力，中间差的不是一句营销文案，而是一整套产品链路。"
    ],
    outcomes: [
      "已梳理智能水泵控制器的主应用场景",
      "已形成看得见、控得住、修得快的产品定位",
      "已沉淀云-管-端、远程运维、故障诊断、节能与持续服务的案例方向",
      "已讨论设备归属、主用户绑定、子用户权限和演示 / 控制入口关系",
      "已明确故障复位、清除故障码、自动重启、正常状态上报不能混为一谈"
    ],
    next: ["补完整云-管-端架构图", "整理角色权限矩阵", "补设备控制状态机", "补告警 / 工单 / 复位异常流", "整理小程序端功能架构"],
    closing: "AI 控制器不只是让设备听见一条远程指令。它更重要的是让每台设备的运行状态、每次控制动作、每个故障处理，都能被看见、被追踪、被复盘。"
  }
};
