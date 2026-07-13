# Starry Product Lab v10 Orbit Navigation

日期：2026-07-10

对应预期 Git 版本：v1.7.0

修改内容：
- 项目宇宙改为星球优先的轨道导航，默认只展示星球、项目名与短状态。
- 项目长说明改为 hover preview，同一时间只展开一张轻量档案卡。
- 点击星球仍进入独立 Project File 详情页。
- 宠物增加拖动互动，并保留点击气泡台词。
- 移除窗口打开动画里的整体 blur，避免项目窗口内容发糊。
- 底部说明弱化为轻量铭牌，让轨道、星空和空间感露出来。

验证：
- `npm test -- --run`
- `npm run build`
- Playwright 截图：`qa/v1.7-orbit-navigation-clear.png`

补充修改：
- 项目星图右上角图例改为类别筛选按钮：全部 / 公开作品 / 工作案例 / 灵感实验。
- 点击类别后只展示该类别星球，点击全部恢复完整星图。
