'use client';

import { motion } from 'motion/react';
import { Settings, Mail, Twitter, Github } from 'lucide-react';

export default function MaintenancePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-zinc-950">
      {/* Background glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-2xl w-full text-center z-10"
      >
        <div className="mb-8 flex justify-center">
          <div className="h-16 w-16 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center shadow-2xl">
            <Settings className="w-8 h-8 text-zinc-400 animate-[spin_4s_linear_infinite]" />
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-b from-zinc-100 to-zinc-500">
          Under Maintenance
        </h1>

        <p className="text-zinc-400 text-lg md:text-xl mb-10 max-w-lg mx-auto leading-relaxed">
          We&apos;re currently working behind the scenes to improve our platform.
          We&apos;ll be back online shortly. Thank you for your patience!
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="mailto:hello@example.com"
            className="flex items-center gap-2 px-6 py-3 bg-zinc-100 text-zinc-900 rounded-full font-medium hover:bg-white transition-colors w-full sm:w-auto justify-center"
          >
            <Mail className="w-4 h-4" />
            Contact Us
          </a>
        </div>

        <div className="mt-16 pt-8 border-t border-zinc-800/50 flex justify-center gap-6">
          <a href="#" className="text-zinc-500 hover:text-zinc-300 transition-colors">
            <span className="sr-only">Twitter</span>
            <Twitter className="w-5 h-5" />
          </a>
          <a href="#" className="text-zinc-500 hover:text-zinc-300 transition-colors">
            <span className="sr-only">GitHub</span>
            <Github className="w-5 h-5" />
          </a>
        </div>
      </motion.div>
    </div>
  );
}
