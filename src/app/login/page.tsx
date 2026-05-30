"use client"

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { FaGithub } from "react-icons/fa"
import { motion } from "framer-motion"
import { Terminal, Code2, Database, Cpu, Layout, Smartphone } from "lucide-react"

// Floating icons config
const floatingIcons = [
  { Icon: Terminal, top: "15%", left: "10%", color: "text-blue-500", delay: 0 },
  { Icon: Code2, top: "25%", right: "15%", color: "text-purple-500", delay: 1 },
  { Icon: Database, bottom: "20%", left: "15%", color: "text-emerald-500", delay: 2 },
  { Icon: Cpu, top: "50%", right: "10%", color: "text-orange-500", delay: 1.5 },
  { Icon: Layout, bottom: "30%", right: "25%", color: "text-pink-500", delay: 0.5 },
  { Icon: Smartphone, top: "60%", left: "5%", color: "text-cyan-500", delay: 2.5 },
]

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#030712] p-4 overflow-hidden">
      
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-[100px] opacity-70 mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-[100px] opacity-60 mix-blend-screen" />
        
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
        className="absolute top-[15%] left-[5%] md:left-[15%] z-0 mix-blend-screen opacity-60"
        animate={{ y: [0, -30, 0], rotate: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      >
        <div className="relative w-40 h-40 md:w-56 md:h-56 drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]">
          <img 
            src="/mascot-blue-v2.png" 
            alt="AI Mascot Blue" 
            className="w-full h-full object-contain"
          />
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-[20%] right-[5%] md:right-[15%] z-0 mix-blend-screen opacity-60"
        animate={{ y: [0, 30, 0], rotate: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 9, ease: "easeInOut", delay: 1 }}
      >
        <div className="relative w-40 h-40 md:w-56 md:h-56 drop-shadow-[0_0_30px_rgba(236,72,153,0.3)]">
          <img 
            src="/mascot-pink-v2.png" 
            alt="AI Mascot Pink" 
            className="w-full h-full object-contain"
          />
        </div>
      </motion.div>

      {/* Glassmorphism Login Card */}
      <motion.div 
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
        className="relative z-10 w-full max-w-md space-y-8 rounded-3xl bg-zinc-900/60 p-10 shadow-2xl border border-zinc-800/50 backdrop-blur-xl text-center"
      >
        <div className="space-y-3">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="mx-auto w-16 h-16 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20"
          >
            <Code2 className="text-white h-8 w-8" />
          </motion.div>
          
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-br from-white to-zinc-400 bg-clip-text text-transparent">
            DevBoard Pro
          </h1>
          <p className="text-zinc-400 text-sm font-medium">
            Sign in to build your developer portfolio
          </p>
        </div>
        
        <div className="pt-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
              className="w-full bg-white text-zinc-950 hover:bg-zinc-200 h-12 text-base font-semibold rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300"
              size="lg"
            >
              <FaGithub className="mr-3 h-5 w-5" />
              Continue with GitHub
            </Button>
          </motion.div>
        </div>
        
        <p className="text-xs text-zinc-500 pt-4">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </motion.div>
    </div>
  )
}
