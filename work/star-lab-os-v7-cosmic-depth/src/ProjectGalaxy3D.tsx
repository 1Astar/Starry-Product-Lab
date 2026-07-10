import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";
import { Sparkles } from "lucide-react";
import type { Idea, Project } from "./types";

interface GalaxyNode {
  id: string;
  label: string;
  meta: string;
  status: string;
  kind: "public" | "case" | "idea";
  x: number;
  y: number;
  size: number;
  project?: Project;
}

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

function createPlanet(node: GalaxyNode) {
  const palette = planetPalette[node.id] ?? planetPalette.idea;
  const group = new THREE.Group();
  group.name = node.id;
  group.position.set(node.x, node.y, 0);

  const geometry = new THREE.SphereGeometry(node.size, 48, 32);
  const material = new THREE.MeshStandardMaterial({
    color: hex(palette.base),
    roughness: 0.68,
    metalness: 0.05,
    emissive: hex(palette.base),
    emissiveIntensity: node.kind === "idea" ? 0.16 : 0.09
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
  onOpenProject,
  onOpenIdeas
}: {
  projects: Project[];
  ideas: Idea[];
  onOpenProject: (project: Project) => void;
  onOpenIdeas: () => void;
}) {
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const sceneObjects = useRef<Record<string, THREE.Group>>({});
  const [webglReady, setWebglReady] = useState(false);

  const nodes = useMemo<GalaxyNode[]>(() => {
    const byId = new Map(projects.map((project) => [project.id, project]));
    const projectNodes: GalaxyNode[] = [
      { id: "follow-heart", label: "随心而行", meta: "核心主星", status: "P1 结果页优化", kind: "public", x: 0, y: 0.1, size: 0.72, project: byId.get("follow-heart") },
      { id: "competitor-workbench", label: "竞品分析工作台", meta: "洞察与分析", status: "进行中", kind: "public", x: -2.35, y: 0.55, size: 0.42, project: byId.get("competitor-workbench") },
      { id: "ai-companion", label: "AI Companion", meta: "陪伴与成长", status: "长期迭代", kind: "public", x: 0.15, y: 1.45, size: 0.48, project: byId.get("ai-companion") },
      { id: "star-pm", label: "Star PM", meta: "规划与执行", status: "概念验证", kind: "public", x: 2.2, y: -0.45, size: 0.43, project: byId.get("star-pm") },
      { id: "ai-pet-hardware", label: "AI 宠物", meta: "工作案例卫星", status: "脱敏案例", kind: "case", x: -2.55, y: -1.15, size: 0.34, project: byId.get("ai-pet-hardware") },
      { id: "iot-ops", label: "IoT 远程运维平台", meta: "连接与控制", status: "脱敏案例", kind: "case", x: 0.05, y: -1.78, size: 0.34, project: byId.get("iot-ops") },
      { id: "yuanjing-miniapp", label: "元井小程序", meta: "触达与服务", status: "公开入口", kind: "case", x: 2.35, y: -1.55, size: 0.33, project: byId.get("yuanjing-miniapp") },
      ...ideas.map((idea, index) => ({
        id: `idea-${index}`,
        label: idea.title,
        meta: "灵感实验",
        status: idea.status,
        kind: "idea" as const,
        x: -2.75 + index * 2.72,
        y: 2.02,
        size: 0.2
      }))
    ];
    return projectNodes.filter((node) => node.kind === "idea" || node.project);
  }, [ideas, projects]);

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
    nodes.forEach((node) => {
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
  }, [nodes]);

  return (
    <div className="galaxy-3d">
      <div className="sr-only">
        <h3>公开作品</h3>
        <h3>工作案例</h3>
        <h3>灵感实验</h3>
      </div>
      <div ref={canvasRef} className={webglReady ? "galaxy-canvas ready" : "galaxy-canvas"} aria-hidden="true" />
      <div className="galaxy-core-glow" aria-hidden="true" />
      {nodes.map((node) => (
        <motion.button
          key={node.id}
          type="button"
          className={`galaxy-label ${node.kind} label-${node.id}`}
          aria-label={node.project ? `打开项目档案 ${node.label}` : `打开灵感收件箱 ${node.label}`}
          whileHover={{ y: -5, rotate: node.kind === "idea" ? -1 : 1, scale: 1.03 }}
          onClick={() => node.project ? onOpenProject(node.project) : onOpenIdeas()}
        >
          <span><i />{node.label}</span>
          <small>{node.meta}</small>
          <b>{node.status}</b>
          {node.kind === "idea" ? <Sparkles size={12} /> : null}
        </motion.button>
      ))}
      <p className="galaxy-caption">每一个项目，都是一颗有引力的星。点击星球打开项目档案。</p>
    </div>
  );
}
