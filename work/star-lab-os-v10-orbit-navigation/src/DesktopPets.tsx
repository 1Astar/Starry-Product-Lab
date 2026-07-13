import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { usePetRoaming } from "./usePetRoaming";
import type { PetKind, PetRuntime } from "./pets";
import type { WindowId } from "./types";

function getPetFrame(pet: PetRuntime) {
  if (!pet.frames) return null;
  if (pet.state === "walk") return pet.facing === -1 ? pet.frames.walkLeft : pet.frames.walkRight;
  return pet.frames[pet.state] ?? pet.frames.idle ?? null;
}

function getFeaturedPet(activeApp?: WindowId | null): PetKind {
  if (activeApp === "inbox") return "gpt";
  if (activeApp === "resume" || activeApp === "about") return "claude";
  if (activeApp === "terminal" || activeApp === "projects") return "cursor";
  return "gpt";
}

export function DesktopPets({ enabled, activeApp }: { enabled: boolean; activeApp?: WindowId | null }) {
  const { pets, react, moveToContext, dragPet, settlePet } = usePetRoaming(enabled);
  const draggingPet = useRef<PetKind | null>(null);
  const featuredPet = getFeaturedPet(activeApp);

  useEffect(() => {
    moveToContext(activeApp ?? null);
  }, [activeApp, moveToContext]);

  if (!enabled) return null;

  return (
    <section className="desktop-pets" aria-label="桌面小居民">
      {pets.map((pet) => (
        <motion.button
          className={`desktop-pet pet-${pet.id} state-${pet.state} ${pet.frames ? "uses-frame-assets" : ""} ${pet.id === featuredPet ? "is-featured" : "is-background"}`}
          key={pet.id}
          type="button"
          aria-label={pet.name}
          style={{ left: pet.x, top: pet.y }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
          exit={{ opacity: 0, scale: 0.8 }}
          onPointerDown={(event) => {
            draggingPet.current = pet.id;
            event.currentTarget.setPointerCapture?.(event.pointerId);
            react(pet.id);
          }}
          onPointerMove={(event) => {
            if (draggingPet.current !== pet.id) return;
            dragPet(pet.id, event.clientX, event.clientY);
          }}
          onPointerUp={(event) => {
            if (draggingPet.current !== pet.id) return;
            draggingPet.current = null;
            event.currentTarget.releasePointerCapture?.(event.pointerId);
            settlePet(pet.id);
          }}
          onPointerCancel={(event) => {
            if (draggingPet.current !== pet.id) return;
            draggingPet.current = null;
            event.currentTarget.releasePointerCapture?.(event.pointerId);
            settlePet(pet.id);
          }}
          onClick={() => react(pet.id)}
        >
          {getPetFrame(pet) ? (
            <img className="pet-frame" src={getPetFrame(pet) ?? ""} alt="" draggable={false} />
          ) : (
            <span
              className="pet-sprite"
              style={{
                backgroundImage: `url(${pet.sprite})`,
                transform: `scaleX(${pet.facing})`
              }}
            />
          )}
          {pet.sleeping ? <span className="pet-sleep">Zzz</span> : null}
          <AnimatePresence>
            {pet.message ? (
              <motion.span
                className="pet-bubble"
                role="status"
                initial={{ opacity: 0, y: 5, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4 }}
              >
                {pet.message}
              </motion.span>
            ) : null}
          </AnimatePresence>
        </motion.button>
      ))}
    </section>
  );
}
