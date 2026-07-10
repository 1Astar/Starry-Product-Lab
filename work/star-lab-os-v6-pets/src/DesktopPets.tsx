import { AnimatePresence, motion } from "framer-motion";
import { usePetRoaming } from "./usePetRoaming";

export function DesktopPets({ enabled }: { enabled: boolean }) {
  const { pets, react } = usePetRoaming(enabled);

  if (!enabled) return null;

  return (
    <section className="desktop-pets" aria-label="桌面小居民">
      {pets.map((pet) => (
        <motion.button
          className={`desktop-pet pet-${pet.id} state-${pet.state}`}
          key={pet.id}
          type="button"
          aria-label={pet.name}
          style={{ left: pet.x, top: pet.y }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => react(pet.id)}
        >
          <span
            className="pet-sprite"
            style={{
              backgroundImage: `url(${pet.sprite})`,
              transform: `scaleX(${pet.facing})`
            }}
          />
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
