# Starry Product Lab Experience Design

## Goal

Turn the existing desktop-themed portfolio into Liu Xingyu's personal product laboratory OS: an interface where every visible element behaves like part of a system, not a conventional portfolio page inside macOS chrome.

## Brand

- Primary name: `✦ Starry Product Lab`
- Tagline: `把灵感变成可运行的产品`
- Supporting line: `我觉得人与产品之间应该有一种更温柔、更有意义的连接。`
- Moonpie is the Terminal personality and easter-egg identity, not the primary brand.
- Visual character: midnight blue, soft violet light, moonlit paper, glass windows, star-map lines, handwritten annotations, gentle technology, no heavy cyberpunk or SaaS marketing composition.

## Default Experience

The default open window is Welcome, not Projects.

Visible copy:

- `Welcome to Starry Product Lab`
- `Hello，我是刘星雨`
- `AI 产品经理 / 独立产品创造者`
- `我关注 AI 应用、C端体验、IoT 和工具型产品。`
- `我喜欢把一个模糊想法，拆成清晰流程、交互原型和可运行产品。`
- `这里是我的产品宇宙：有正在生长的项目，也有被暂时停靠的灵感。`

Commands:

- `探索项目宇宙`
- `查看简历`
- `打开灵感收件箱`

## System Behavior

- Desktop and Dock icons launch apps.
- A launched icon performs a short bounce.
- The active window opens from the icon's visual direction using `scale: 0.96`, opacity, and a subtle positional offset.
- The desktop behind an open window dims slightly.
- Closing reverses the transition.
- Every app launch appends status lines to the shared Terminal history.
- Clicking empty desktop space closes the current window.

## Project Universe

The Projects window is a star map rather than a card grid.

Three layers:

1. Public works: 随心而行, 竞品分析工作台, AI Companion, Star PM.
2. Work cases: AI 宠物软硬件产品, IoT 远程运维平台, 元井小程序 / 界面案例.
3. Idea experiments: AI 共读搭子, 传统文化游戏化, 项目恢复系统.

Public works are the primary planets, work cases are satellites, and ideas are smaller parked signals. Selecting a project opens its Project File. Selecting an idea opens Idea Inbox.

## Project File

Every project uses the same product-thinking archive:

- `PROJECT FILE {number}`
- Project name
- Type
- Starting point
- Iteration
- Current stage
- My role
- Existing approved action buttons

For 随心而行:

- Starting point: `想做一个隔空抽牌的小实验`
- Iteration: `从占卜工具，迭代为在占问过程中学习牌义与传统文化的自我探索产品`
- Current stage: `P1 结果页优化`
- Role: `产品设计 / 交互 / 独立开发`

Other archive fields map from existing project copy without inventing new experience. Hover reveals why it exists, the user's role, and current status.

## App Personalities

### About

An identity card with positioning, capabilities, a concise product journey, and the product belief about gentler human-product relationships.

### Resume

A document previewer with filename, profile summary, preview, download, and contact controls.

### Idea Inbox

Ideas appear as paper notes, floating archive fragments, and parked inspiration rather than table rows. Each note shows title, one-line idea, status, and related project.

### Terminal

The compact Terminal is always visible on desktop. The full Terminal supports:

- `help`
- `projects`
- `about`
- `resume`
- `ideas`
- `cat moonpie.txt`

`cat moonpie.txt` returns:

`她喜欢把脑子里的小宇宙，做成别人能真正使用的产品。`

Initial system voice:

- `> booting Moonpie Lab...`
- `> loading 4 public works...`
- `> parking 7 wild ideas...`
- `> today focus: 随心而行 P1`
- `> remember: 想法先入库，不准乱开坑.`

App-specific feedback:

- Projects: opening Project Universe, four public works loaded, three privacy-safe work cases.
- Ideas: scanning Idea Inbox, three ideas waiting, one can be converted to a project.
- Resume: loading resume.pdf, profile ready.

### Control Center

Remove the persistent bottom system strip. Add one compact bottom-right Control Center command. Its popover contains:

- 项目索引
- 部署状态
- 灵感记录
- 标签分类
- 桌面快捷键

## Responsive Behavior

Desktop preserves the star map, floating Terminal, icon-origin window motion, and Control Center. Mobile uses a stable card list for projects, stacked paper notes for ideas, normal document sections, and a compact bottom Dock. It does not simulate desktop positioning.

## Verification

- Tests cover default Welcome, app launch feedback, Terminal commands, Control Center, project layers, idea-note fields, and absence of the old bottom strip.
- TypeScript build must pass.
- Browser verification covers desktop and mobile, icon launch, close behavior, Terminal input, project archive opening, and Control Center expansion.
