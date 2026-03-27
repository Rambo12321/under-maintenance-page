"use client";

import { type MouseEvent, useEffect, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  AnimatePresence,
} from "motion/react";
import {
  Settings,
  Mail,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Copy,
  Check,
} from "lucide-react";

interface Particle {
  id: number;
  size: number;
  left: string;
  duration: number;
  delay: number;
}

export default function MaintenancePage() {
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [isHoveringGear, setIsHoveringGear] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const handleCopyEmail = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiedEmail(email);
      setTimeout(() => setCopiedEmail(null), 2000);
    } catch (err) {
      console.error("Failed to copy email", err);
    }
  };

  useEffect(() => {
    setMounted(true);

    // Generate random particles only on the client to avoid hydration mismatch
    const newParticles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      left: `${Math.random() * 100}%`,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const spotlight = useMotionTemplate`
    radial-gradient(
      600px circle at ${mouseX}px ${mouseY}px,
      rgba(255, 255, 255, 0.04),
      transparent 80%
    )
  `;

  const handleMouseMove = ({ currentTarget, clientX, clientY }: MouseEvent) => {
    if (shouldReduceMotion) return;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <div
      className="relative h-dvh w-full bg-[#050505] text-stone-200 selection:bg-stone-800 selection:text-stone-100 flex flex-col overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Ambient Background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(24,24,27,1)_0%,_rgba(5,5,5,1)_100%)]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      {/* Drifting Particles */}
      {mounted && !shouldReduceMotion && (
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute bottom-[-5%] rounded-full bg-white/20"
              style={{ width: p.size, height: p.size, left: p.left }}
              animate={{
                y: ["0vh", "-110vh"],
                opacity: [0, 0.6, 0],
                x: ["0px", "20px", "-20px", "0px"],
              }}
              transition={{
                y: {
                  duration: p.duration,
                  delay: p.delay,
                  repeat: Infinity,
                  ease: "linear",
                },
                opacity: {
                  duration: p.duration,
                  delay: p.delay,
                  repeat: Infinity,
                  ease: "linear",
                },
                x: {
                  duration: p.duration * 0.5,
                  delay: p.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            />
          ))}
        </div>
      )}

      {/* Interactive Spotlight */}
      {mounted && !shouldReduceMotion && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-0 opacity-50 transition-opacity duration-300"
          style={{ background: spotlight }}
        />
      )}

      {/* Header */}
      <header className="relative z-10 w-full p-4 md:p-6 flex flex-col items-center justify-center shrink-0 gap-4">
        <div className="relative w-48 h-16 md:w-64 md:h-20">
          <Image
            src="/logo.png"
            alt="Career Plus Placement"
            fill
            className="object-contain drop-shadow-lg"
            priority
          />
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md">
          <span className="text-[10px] font-medium uppercase tracking-widest text-stone-300">
            Career Placement Plus | System Update
          </span>
        </div>
      </header>

      {/* Main Content - Centered */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center w-full max-w-5xl mx-auto px-6 min-h-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-6 md:mb-8"
        >
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light leading-[1.1] tracking-tight text-white mb-4">
            Upgrading the{" "}
            <span className="italic text-stone-400">Experience.</span>
          </h1>
          <p className="text-stone-400 text-xs sm:text-sm max-w-lg mx-auto font-light leading-relaxed">
            We are currently refining our platform to serve our distinguished
            clients and exceptional candidates better.
          </p>
        </motion.div>

        {/* Interactive Gears */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center cursor-pointer group mt-2 md:mt-4"
          onMouseEnter={() => setIsHoveringGear(true)}
          onMouseLeave={() => setIsHoveringGear(false)}
        >
          {/* Dashed interactive ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className={`absolute inset-0 rounded-full border border-dashed transition-colors duration-500 ${isHoveringGear ? "border-white/20" : "border-white/5"}`}
          />

          {/* Glow behind gears */}
          <div
            className={`absolute inset-0 bg-stone-400/10 rounded-full blur-3xl transition-all duration-700 ${isHoveringGear ? "scale-150 opacity-100" : "scale-100 opacity-50"}`}
          />

          {/* Big Gear */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: isHoveringGear ? 4 : 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute"
          >
            <Settings
              className="w-24 h-24 md:w-32 md:h-32 text-stone-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
              strokeWidth={1}
            />
          </motion.div>

          {/* Small Gear */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{
              duration: isHoveringGear ? 2 : 10,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-4 right-4 md:top-6 md:right-6"
          >
            <Settings
              className="w-10 h-10 md:w-16 md:h-16 text-stone-500"
              strokeWidth={1.5}
            />
          </motion.div>

          {/* Intuitive Hover Prompt with Arrows */}
          <AnimatePresence>
            {!isHoveringGear && (
              <>
                {/* Left Arrow */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10, scale: 0.9 }}
                  className="absolute -left-12 md:-left-28 top-1/2 -translate-y-1/2 flex items-center gap-2"
                >
                  <span className="hidden md:block text-[10px] uppercase tracking-widest text-stone-400 font-medium whitespace-nowrap">
                    Hover Here
                  </span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-stone-300" />
                  </motion.div>
                </motion.div>

                {/* Right Arrow */}
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10, scale: 0.9 }}
                  className="absolute -right-12 md:-right-28 top-1/2 -translate-y-1/2 flex items-center gap-2"
                >
                  <motion.div
                    animate={{ x: [0, -5, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.2,
                    }}
                  >
                    <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 text-stone-300" />
                  </motion.div>
                  <span className="hidden md:block text-[10px] uppercase tracking-widest text-stone-400 font-medium whitespace-nowrap">
                    Hover Here
                  </span>
                </motion.div>

                {/* Bottom Badge */}
              </>
            )}
          </AnimatePresence>

          {/* Hover Info Popup */}
          <AnimatePresence>
            {isHoveringGear && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                  scale: 0.95,
                  filter: "blur(4px)",
                }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 10, scale: 0.95, filter: "blur(4px)" }}
                transition={{ duration: 0.3 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 md:w-80 p-5 md:p-6 rounded-2xl bg-black/80 border border-white/10 backdrop-blur-xl text-center z-50 shadow-2xl pointer-events-none"
              >
                <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-stone-300 mx-auto mb-2 md:mb-3" />
                <h3 className="text-stone-100 font-medium mb-1.5 md:mb-2 tracking-wide text-xs md:text-sm uppercase">
                  Behind the Scenes
                </h3>
                <p className="text-stone-400 text-[10px] md:text-xs leading-relaxed">
                  Rebuilding our infrastructure from the ground up. Integrating
                  advanced AI matching and streamlining our portals for a
                  seamless, next-generation hiring experience.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>

      {/* Footer / Contacts */}
      <footer className="relative z-10 w-full p-4 md:p-6 shrink-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="max-w-3xl mx-auto w-full"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/10"></div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-stone-500 font-medium">
              Get in touch
            </p>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/10"></div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <button
              onClick={() => handleCopyEmail("hr@careerplus-jobs.com")}
              className="group flex items-center justify-between p-4 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300 text-left w-full"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-widest text-stone-500">
                    For Candidates
                  </p>
                  <p className="text-sm text-stone-300 group-hover:text-white transition-colors">
                    hr@careerplus-jobs.com
                  </p>
                </div>
              </div>
              {copiedEmail === "hr@careerplus-jobs.com" ? (
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] uppercase tracking-widest text-green-400 font-medium">
                    Copied
                  </span>
                  <Check className="w-4 h-4 text-green-400" />
                </div>
              ) : (
                <Copy className="w-4 h-4 text-stone-600 group-hover:text-stone-300 transition-colors" />
              )}
            </button>

            <button
              onClick={() => handleCopyEmail("info@careerplus-jobs.com")}
              className="group flex items-center justify-between p-4 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300 text-left w-full"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-amber-500/10 text-amber-400 group-hover:bg-amber-500/20 transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-widest text-stone-500">
                    For Clients
                  </p>
                  <p className="text-sm text-stone-300 group-hover:text-white transition-colors">
                    info@careerplus-jobs.com
                  </p>
                </div>
              </div>
              {copiedEmail === "info@careerplus-jobs.com" ? (
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] uppercase tracking-widest text-green-400 font-medium">
                    Copied
                  </span>
                  <Check className="w-4 h-4 text-green-400" />
                </div>
              ) : (
                <Copy className="w-4 h-4 text-stone-600 group-hover:text-stone-300 transition-colors" />
              )}
            </button>
          </div>
        </motion.div>
      </footer>
    </div>
  );
}
