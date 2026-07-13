import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";
import type { Idea, Project } from "./types";

interface GalaxyNode {
  id: string;
  label: string;
  meta: string;
  status: string;
  note: string;
  kind: "public" | "case" | "idea";
  x: number;
  y: number;
  size: number;
  project?: Project;
}

type GalaxyFilter = "all" | GalaxyNode["kind"];

const planetPalette: Record<string, { base: string; glow: string; ring: string }> = {
  "follow-heart": { base: "#d5a5ff", glow: "#f2d7ff", ring: "#f8c46b" },
  "competitor-workbench": { base: "#8dbaff", glow: "#c3ddff", ring: "#bda6ff" },
  "ai-companion": { base: "#6ed7d3", glow: "#d6fff8", ring: "#f0c7ff" },
  "star-pm": { base: "#f3a65d", glow: "#ffd19a", ring: "#f5d18f" },
  "ai-pet-hardware": { base: "#d588c2", glow: "#ffd4f1", ring: "#f4badd" },
  "iot-ops": { base: "#7fd591", glow: "#ccffd8", ring: "#c7e8a1" },
  "yuanjing-miniapp": { base: "#8bc7f4", glow: "#d4ecff", ring: "#9bb8ee" },
  idea: { base: "#f0d38a", glow: "#fff1b9", ring: "#ffe2a0" }
};

function hex(color: string) {
  return new THREE.Color(color);
}

function hashSeed(value: string) {
  return value.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

function createPlanetTexture(node: GalaxyNode, palette: { base: string; glow: string; ring: string }) {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  const seed = hashSeed(node.id);
  const gradient = ctx.createLinearGradient(0, 0, 256, 128);
  gradient.addColorStop(0, palette.glow);
  gradient.addColorStop(0.45, palette.base);
  gradient.addColorStop(1, "#101225");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 256, 128);
  for (let i = 0; i < 28; i += 1) {
    const x = (seed * (i + 3) * 17) % 256;
    const y = (seed * (i + 5) * 11) % 128;
    const r = 8 + ((seed + i * 13) % 26);
    ctx.beginPath();
    ctx.fillStyle = i % 3 === 0 ? "rgba(255,255,255,.18)" : "rgba(12,10,35,.18)";
    ctx.ellipse(x, y, r, Math.max(4, r * 0.32), ((seed + i) % 180) * Math.PI / 180, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = "rgba(255,245,210,.22)";
  ctx.fillRect(0, 22 + (seed % 36), 256, 2);
  ctx.fillRect(0, 78 + (seed % 20), 256, 1);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createPlanet(node: GalaxyNode) {
  const palette = planetPalette[node.id] ?? planetPalette.idea;
  const texture = createPlanetTexture(node, palette);
  const group = new THREE.Group();
  group.name = node.id;
  group.position.set(node.x, node.y, 0);

  const geometry = new THREE.SphereGeometry(node.size, 48, 32);
  const material = new THREE.MeshStandardMaterial({
    color: hex(palette.base),
    map: texture ?? undefined,
    roughness: node.id === "iot-ops" ? 0.52 : 0.66,
    metalness: node.kind === "case" ? 0.1 : 0.04,
    emissive: hex(palette.base),
    emissiveIntensity: node.kind === "idea" ? 0.18 : 0.1
  });
  const sphere = new THREE.Mesh(geometry, material);
  sphere.castShadow = true;
  group.add(sphere);

  const shade = new THREE.Mesh(
    new THREE.SphereGeometry(node.size * 1.01, 48, 24),
    new THREE.MeshBasicMaterial({
      color: "#050615",
      transparent: true,
      opacity: 0.22,
      side: THREE.BackSide
    })
  );
  shade.position.set(node.size * 0.2, -node.size * 0.08, -node.size * 0.06);
  group.add(shade);

  const rim = new THREE.Mesh(
    new THREE.SphereGeometry(node.size * 1.08, 48, 24),
    new THREE.MeshBasicMaterial({
      color: hex(palette.glow),
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending
    })
  );
  group.add(rim);

  const highlight = new THREE.Mesh(
    new THREE.SphereGeometry(node.size * 0.22, 24, 16),
    new THREE.MeshBasicMaterial({
      color: "#fff3ca",
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending
    })
  );
  highlight.position.set(-node.size * 0.28, node.size * 0.34, node.size * 0.55);
  group.add(highlight);

  const ringGeometry = new THREE.TorusGeometry(node.size * 1.38, Math.max(0.012, node.size * 0.035), 10, 96);
  const ring = new THREE.Mesh(
    ringGeometry,
    new THREE.MeshBasicMaterial({
      color: hex(palette.ring),
      transparent: true,
      opacity: 0.58
    })
  );
  ring.rotation.set(1.2, 0.1, -0.45);
  group.add(ring);

  if (node.kind !== "idea") {
    const moon = new THREE.Mesh(
      new THREE.SphereGeometry(node.size * 0.16, 20, 12),
      new THREE.MeshStandardMaterial({ color: "#f6e6bc", roughness: 0.55, emissive: "#6a4e8e", emissiveIntensity: 0.08 })
    );
    moon.position.set(node.size * 1.55, node.size * 0.42, node.size * 0.12);
    group.add(moon);
  }

  return group;
}

export function ProjectGalaxy3D({
  projects,
  ideas,
  activeFilter = "all",
  onOpenProject,
  onOpenIdeas
}: {
  projects: Project[];
  ideas: Idea[];
  activeFilter?: GalaxyFilter;
  onOpenProject: (project: Project) => void;
  onOpenIdeas: () => void;
}) {
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const sceneObjects = useRef<Record<string, THREE.Group>>({});
  const openingNodeRef = useRef<string | null>(null);
  const [webglReady, setWebglReady] = useState(false);
  const [launchingNode, setLaunchingNode] = useState<string | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const nodes = useMemo<GalaxyNode[]>(() => {
    const byId = new Map(projects.map((project) => [project.id, project]));
    const projectNodes: GalaxyNode[] = [
      { id: "follow-heart", label: "随心而行", meta: "主星项目", status: "P1 优化中", note: byId.get("follow-heart")?.humanNote ?? "", kind: "public", x: 0, y: 0, size: 0.95, project: byId.get("follow-heart") },
      { id: "competitor-workbench", label: "竞品分析", meta: "公开作品", status: "进行中", note: byId.get("competitor-workbench")?.humanNote ?? "", kind: "public", x: -2.35, y: 0.12, size: 0.39, project: byId.get("competitor-workbench") },
      { id: "ai-companion", label: "AI Companion", meta: "公开作品", status: "长期迭代", note: byId.get("ai-companion")?.humanNote ?? "", kind: "public", x: 0.05, y: 1.62, size: 0.42, project: byId.get("ai-companion") },
      { id: "star-pm", label: "Star PM", meta: "公开作品", status: "概念验证", note: byId.get("star-pm")?.humanNote ?? "", kind: "public", x: 2.28, y: 0.05, size: 0.4, project: byId.get("star-pm") },
      { id: "ai-pet-hardware", label: "AI 宠物", meta: "工作案例", status: "脱敏案例", note: byId.get("ai-pet-hardware")?.humanNote ?? "", kind: "case", x: -1.12, y: -1.46, size: 0.27, project: byId.get("ai-pet-hardware") },
      { id: "iot-ops", label: "IoT", meta: "工作案例", status: "流程案例", note: byId.get("iot-ops")?.humanNote ?? "", kind: "case", x: 1.08, y: -1.48, size: 0.27, project: byId.get("iot-ops") },
      { id: "yuanjing-miniapp", label: "元井", meta: "工作案例", status: "公开入口", note: byId.get("yuanjing-miniapp")?.humanNote ?? "", kind: "case", x: 2.65, y: -1.12, size: 0.22, project: byId.get("yuanjing-miniapp") },
      ...ideas.map((idea, index) => ({
        id: `idea-${index}`,
        label: idea.title,
        meta: "灵感实验",
        status: idea.status,
        note: "被关起来的小怪物们，先别急着长大。",
        kind: "idea" as const,
        x: -2.65 + index * 2.62,
        y: 1.95 + (index === 1 ? -0.16 : 0.08),
        size: 0.18
      }))
    ];
    return projectNodes.filter((node) => node.kind === "idea" || node.project);
  }, [ideas, projects]);

  const visibleNodes = useMemo(
    () => nodes.filter((node) => activeFilter === "all" || node.kind === activeFilter),
    [activeFilter, nodes]
  );
  const hoveredNode = visibleNodes.find((node) => node.id === hoveredNodeId && node.project);

  useEffect(() => {
    setHoveredNodeId(null);
  }, [activeFilter]);

  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return undefined;
    if (typeof navigator !== "undefined" && navigator.userAgent.toLowerCase().includes("jsdom")) {
      setWebglReady(false);
      return undefined;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 0.05, 7.8);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      setWebglReady(false);
      return undefined;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.innerHTML = "";
    container.appendChild(renderer.domElement);
    setWebglReady(true);

    const ambient = new THREE.AmbientLight("#a6b4ff", 0.62);
    const key = new THREE.DirectionalLight("#fff1d1", 2.4);
    key.position.set(-2.4, 3.2, 5);
    const rim = new THREE.PointLight("#b98aff", 2.2, 8);
    rim.position.set(2.4, -1.8, 2.2);
    scene.add(ambient, key, rim);

    const orbitMaterial = new THREE.LineBasicMaterial({ color: "#9b80d1", transparent: true, opacity: 0.18 });
    [1.35, 2.45, 3.25].forEach((radius, index) => {
      const curve = new THREE.EllipseCurve(0, 0, radius * 1.25, radius * 0.62, 0, Math.PI * 2);
      const points = curve.getPoints(140).map((point: THREE.Vector2) => new THREE.Vector3(point.x, point.y - 0.15 + index * 0.02, -0.22));
      const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), orbitMaterial);
      line.rotation.z = -0.12;
      scene.add(line);
    });

    const stars = new THREE.Points(
      new THREE.BufferGeometry().setAttribute(
        "position",
        new THREE.Float32BufferAttribute(
          Array.from({ length: 360 }, () => [(Math.random() - 0.5) * 8, (Math.random() - 0.5) * 5, -1 - Math.random() * 2]).flat(),
          3
        )
      ),
      new THREE.PointsMaterial({ color: "#fff1ca", size: 0.015, transparent: true, opacity: 0.65 })
    );
    scene.add(stars);

    const objects: THREE.Group[] = [];
    sceneObjects.current = {};
    visibleNodes.forEach((node) => {
      const planet = createPlanet(node);
      sceneObjects.current[node.id] = planet;
      objects.push(planet);
      scene.add(planet);
    });

    const resize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", resize);

    let frame = 0;
    const animate = () => {
      frame = window.requestAnimationFrame(animate);
      const t = performance.now() * 0.001;
      objects.forEach((object, index) => {
        object.rotation.y += 0.0025 + index * 0.00025;
        object.rotation.x = Math.sin(t * 0.7 + index) * 0.025;
        object.position.z = Math.sin(t * 0.65 + index) * 0.06;
      });
      stars.rotation.z += 0.00035;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      renderer.dispose();
      scene.clear();
    };
  }, [visibleNodes]);

  const openNode = (node: GalaxyNode) => {
    if (openingNodeRef.current) return;
    openingNodeRef.current = node.id;
    if (!node.project) {
      onOpenIdeas();
      window.setTimeout(() => {
        openingNodeRef.current = null;
      }, 260);
      return;
    }
    setLaunchingNode(node.id);
    window.setTimeout(() => {
      onOpenProject(node.project as Project);
      setLaunchingNode(null);
      openingNodeRef.current = null;
    }, 260);
  };

  return (
    <div className="galaxy-3d">
      <div className="sr-only">
        <h3>公开作品</h3>
        <h3>工作案例</h3>
        <h3>灵感实验</h3>
      </div>
      <div ref={canvasRef} className={webglReady ? "galaxy-canvas ready" : "galaxy-canvas"} aria-hidden="true" />
      <div className="galaxy-core-glow" aria-hidden="true" />
      {launchingNode ? <motion.span className={`project-comet comet-${launchingNode}`} initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: [0, 1, 0], scale: [0.4, 1.25, 0.2], x: [0, 42, 96], y: [0, -24, -62] }} transition={{ duration: 0.34 }} /> : null}
      {visibleNodes.map((node) => (
        <button
          key={node.id}
          type="button"
          className={`galaxy-label ${node.kind} label-${node.id}`}
          data-galaxy-node={node.id}
          aria-label={node.project ? `打开项目档案 ${node.label}` : `打开灵感收件箱 ${node.label}`}
          onMouseEnter={() => setHoveredNodeId(node.id)}
          onMouseLeave={() => setHoveredNodeId((current) => current === node.id ? null : current)}
          onFocus={() => setHoveredNodeId(node.id)}
          onBlur={() => setHoveredNodeId((current) => current === node.id ? null : current)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") openNode(node);
          }}
          onPointerDown={() => openNode(node)}
          onClick={() => openNode(node)}
        >
          <span><i />{node.label}</span>
          <small>{node.meta}</small>
          <b>{node.status}</b>
        </button>
      ))}
      {hoveredNode?.project ? (
        <motion.aside
          className={`galaxy-preview preview-${hoveredNode.id}`}
          role="region"
          aria-label={`${hoveredNode.label} 悬浮档案`}
          initial={{ opacity: 0, y: 10, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.96 }}
        >
          <small>PROJECT ORBIT</small>
          <h3>{hoveredNode.project.name}</h3>
          <p>{hoveredNode.project.type}</p>
          <b>{hoveredNode.project.status}</b>
          <em>{hoveredNode.project.value}</em>
          <button type="button" onClick={() => openNode(hoveredNode)}>
            查看项目 {hoveredNode.project.name}
          </button>
        </motion.aside>
      ) : null}
      <p className="galaxy-caption">把想法落到真实世界里的实验记录。</p>
    </div>
  );
}
