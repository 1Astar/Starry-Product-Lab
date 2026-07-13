import { useCallback, useEffect, useRef, useState } from "react";
import { createInitialPets, getTargetForZone, nextRestState, pickDialogue } from "./pets";
import type { PetKind, PetRuntime } from "./pets";
import type { WindowId } from "./types";

const getViewport = () => ({
  width: typeof window === "undefined" ? 1280 : window.innerWidth,
  height: typeof window === "undefined" ? 800 : window.innerHeight
});

const isTestDom = () => typeof navigator !== "undefined" && navigator.userAgent.toLowerCase().includes("jsdom");

export function usePetRoaming(enabled: boolean) {
  const [pets, setPets] = useState<PetRuntime[]>(() => createInitialPets(getViewport()));
  const lastFrame = useRef<number | null>(null);
  const inactivityTimer = useRef<number | null>(null);

  const wakeResidents = useCallback(() => {
    if (inactivityTimer.current) window.clearTimeout(inactivityTimer.current);
    setPets((current) => current.map((pet) => ({ ...pet, sleeping: false })));
    inactivityTimer.current = window.setTimeout(() => {
      setPets((current) => current.map((pet) => ({ ...pet, state: "sleep", sleeping: true })));
    }, 18000);
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;
    if (isTestDom()) return undefined;
    window.addEventListener("pointermove", wakeResidents, { passive: true });
    window.addEventListener("keydown", wakeResidents);
    wakeResidents();
    return () => {
      window.removeEventListener("pointermove", wakeResidents);
      window.removeEventListener("keydown", wakeResidents);
      if (inactivityTimer.current) window.clearTimeout(inactivityTimer.current);
    };
  }, [enabled, wakeResidents]);

  useEffect(() => {
    if (!enabled) return undefined;
    if (isTestDom()) return undefined;
    let timer = 0;
    const schedule = () => {
      timer = window.setTimeout(() => {
        const viewport = getViewport();
        setPets((current) =>
          current.map((pet) => {
            if (pet.state === "react") return pet;
            const target = getTargetForZone(pet.zone, viewport);
            return {
              ...pet,
              state: Math.random() < 0.72 ? "walk" : nextRestState(),
              targetX: target.x,
              targetY: target.y,
              facing: target.x >= pet.x ? 1 : -1,
              sleeping: false
            };
          })
        );
        schedule();
      }, 3000 + Math.random() * 5000);
    };
    schedule();
    return () => window.clearTimeout(timer);
  }, [enabled]);

  const moveToContext = useCallback((context: WindowId | null) => {
    if (!context) return;
    const viewport = getViewport();
    const anchors: Partial<Record<PetKind, { x: number; y: number; state: PetRuntime["state"] }>> = {};
    if (context === "inbox") {
      anchors.gpt = { x: viewport.width * 0.33, y: viewport.height * 0.73, state: "react" };
    }
    if (context === "resume" || context === "about") {
      anchors.claude = { x: viewport.width * 0.55, y: viewport.height * 0.74, state: "sit" };
    }
    if (context === "terminal" || context === "projects") {
      anchors.cursor = { x: viewport.width * 0.84, y: viewport.height * 0.74, state: "sit" };
    }
    if (Object.keys(anchors).length === 0) return;
    setPets((current) =>
      current.map((pet) => {
        const anchor = anchors[pet.id];
        if (!anchor) return pet;
        return {
          ...pet,
          state: anchor.state,
          x: anchor.x,
          y: anchor.y,
          targetX: anchor.x,
          targetY: anchor.y,
          facing: anchor.x >= pet.x ? 1 : -1,
          sleeping: false,
          message: context === "inbox" && pet.id === "gpt" ? "先记下来，别让它跑掉。" : pet.message
        };
      })
    );
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;
    if (isTestDom()) return undefined;
    let frame = 0;
    const raf = window.requestAnimationFrame ?? ((callback: FrameRequestCallback) => window.setTimeout(() => callback(Date.now()), 16));
    const cancel = window.cancelAnimationFrame ?? window.clearTimeout;

    const tick = (time: number) => {
      const delta = lastFrame.current ? Math.min(40, time - lastFrame.current) : 16;
      lastFrame.current = time;
      setPets((current) =>
        current.map((pet) => {
          if (pet.state !== "walk") return pet;
          const dx = pet.targetX - pet.x;
          const dy = pet.targetY - pet.y;
          const distance = Math.hypot(dx, dy);
          if (distance < 2) return { ...pet, x: pet.targetX, y: pet.targetY, state: nextRestState() };
          const step = (pet.speed * delta) / 1000;
          return { ...pet, x: pet.x + (dx / distance) * step, y: pet.y + (dy / distance) * step };
        })
      );
      frame = raf(tick);
    };
    frame = raf(tick);
    return () => {
      cancel(frame);
      lastFrame.current = null;
    };
  }, [enabled]);

  const react = useCallback((id: PetKind) => {
    setPets((current) =>
      current.map((pet) =>
        pet.id === id ? { ...pet, state: "react", message: pickDialogue(pet), sleeping: false } : pet
      )
    );
    if (isTestDom()) return;
    window.setTimeout(() => {
      setPets((current) =>
        current.map((pet) => pet.id === id ? { ...pet, state: "idle", message: null } : pet)
      );
    }, 3200);
  }, []);

  const dragPet = useCallback((id: PetKind, x: number, y: number) => {
    setPets((current) =>
      current.map((pet) =>
        pet.id === id
          ? {
              ...pet,
              state: "react",
              x,
              y,
              targetX: x,
              targetY: y,
              sleeping: false
            }
          : pet
      )
    );
  }, []);

  const settlePet = useCallback((id: PetKind) => {
    setPets((current) =>
      current.map((pet) =>
        pet.id === id ? { ...pet, state: "sit", targetX: pet.x, targetY: pet.y, sleeping: false } : pet
      )
    );
  }, []);

  return { pets, react, moveToContext, dragPet, settlePet };
}
