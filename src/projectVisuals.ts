const publicProjectScreenshots: Record<string, string> = {
  "follow-heart": "/assets/screenshots/follow-heart-demo.png",
  "competitor-workbench": "/assets/screenshots/competitor-workbench-demo.png",
  "ai-companion": "/assets/screenshots/ai-companion-demo.png",
  "star-pm": "/assets/screenshots/star-pm-demo.png"
};

export function getProjectVisuals(projectId: string, coverImage?: string) {
  const screenshot = publicProjectScreenshots[projectId];
  return [screenshot ?? coverImage ?? "/assets/portfolio-reference.png"];
}
