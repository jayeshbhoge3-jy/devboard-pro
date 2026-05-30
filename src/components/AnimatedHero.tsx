"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

export default function AnimatedHero() {
  return (
    <div className="relative min-h-screen w-full bg-[#030712] overflow-hidden flex flex-col items-center justify-center">
      
      {/* Dynamic glowing background similar to GitHub Copilot */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-900/30 rounded-full blur-[120px] opacity-70 mix-blend-screen" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[500px] bg-purple-900/20 rounded-full blur-[150px] opacity-60 mix-blend-screen" />
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{
            backgroundImage: `radial-gradient(circle at center, white 1px, transparent 1px)`,
            backgroundSize: `40px 40px`
          }} 
        />
      </div>

      {/* Floating Mascots */}
      <motion.div
        className="absolute top-[20%] left-[15%] z-10 hidden md:block"
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      >
        <div className="relative w-32 h-32 md:w-48 md:h-48 drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">
          <Image 
            src="/mascot-blue.png" 
            alt="AI Mascot Blue" 
            fill 
            className="object-contain"
            priority
          />
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-[25%] right-[15%] z-10 hidden md:block"
        animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
      >
        <div className="relative w-32 h-32 md:w-48 md:h-48 drop-shadow-[0_0_30px_rgba(236,72,153,0.5)]">
          <Image 
            src="/mascot-pink.png" 
            alt="AI Mascot Pink" 
            fill 
            className="object-contain"
            priority
          />
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-20 text-center max-w-4xl px-4 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md"
        >
          <span className="flex h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,1)] animate-pulse"></span>
          <span className="text-sm font-medium text-zinc-300">The future of developer portfolios</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-200 to-zinc-500 drop-shadow-sm"
        >
          Your developer identity, <br className="hidden md:block" /> amplified.
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Tools and trends evolve, but your code endures. Bring all your projects, skills, and GitHub stats together on one stunning platform.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link 
            href="/login" 
            className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-black transition-all duration-200 bg-white border border-transparent rounded-full hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
          >
            Get Started Free
            <svg className="w-5 h-5 ml-2 -mr-1 transition-transform group-hover:translate-x-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
          <a 
            href="https://github.com" 
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white transition-all duration-200 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 backdrop-blur-md"
          >
            View GitHub
          </a>
        </motion.div>
      </div>

    </div>
  )
}
