"use client";

import { type MouseEvent } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { Settings } from "lucide-react";

export default function MaintenancePage() {
  const shouldReduceMotion = useReducedMotion();

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const glowX = useMotionValue(720);
  const glowY = useMotionValue(320);

  const smoothGlowX = useSpring(glowX, {
    stiffness: 180,
    damping: 28,
  });
  const smoothGlowY = useSpring(glowY, {
    stiffness: 180,
    damping: 28,
  });

  const rotateX = useSpring(
    useTransform(pointerY, [-220, 220], [6, -6]),
    { stiffness: 140, damping: 22 }
  );
  const rotateY = useSpring(
    useTransform(pointerX, [-220, 220], [-6, 6]),
    { stiffness: 140, damping: 22 }
  );

  const spotlight = useMotionTemplate`radial-gradient(320px circle at ${smoothGlowX}px ${smoothGlowY}px, rgba(255,255,255,0.14), transparent 68%)`;

  const handlePointerMove = (event: MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) {
      return;
    }

    const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - left;
    const y = event.clientY - top;

    glowX.set(x);
    glowY.set(y);
    pointerX.set(x - width / 2);
    pointerY.set(y - height / 2);
  };

  const handlePointerLeave = (event: MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) {
      return;
    }

    const { width, height } = event.currentTarget.getBoundingClientRect();

    glowX.set(width / 2);
    glowY.set(height / 2);
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-zinc-950 text-zinc-50"
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.06),_transparent_34%),linear-gradient(180deg,_rgba(24,24,27,0.96),_rgba(9,9,11,1))]" />
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={shouldReduceMotion ? undefined : { backgroundImage: spotlight }}
      />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-[120px]" />

      <main className="relative z-10 flex min-h-screen items-center justify-center p-6">
        <div className="[perspective:1400px]">
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={
              shouldReduceMotion
                ? undefined
                : {
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                  }
            }
            className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] px-8 py-10 text-center shadow-[0_25px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

            <div className="mb-8 flex justify-center">
              <motion.div
                whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
                className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] shadow-2xl"
              >
                <Settings className="h-8 w-8 animate-[spin_8s_linear_infinite] text-zinc-300" />
              </motion.div>
            </div>

            <h1 className="bg-gradient-to-b from-zinc-50 to-zinc-400 bg-clip-text text-4xl font-semibold tracking-tight text-transparent md:text-6xl">
              Under Maintenance
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-zinc-400 md:text-xl">
              We&apos;re currently working behind the scenes to improve our
              platform. We&apos;ll be back online shortly. Thank you for your
              patience.
            </p>
          </motion.section>
        </div>
      </main>
    </div>
  );
}
