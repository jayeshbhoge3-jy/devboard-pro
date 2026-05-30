"use client"

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { FaGithub } from "react-icons/fa"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-4">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-zinc-900 p-8 shadow-2xl border border-zinc-800 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-50">Welcome to DevBoard Pro</h1>
          <p className="text-sm text-zinc-400">Sign in to build your developer portfolio</p>
        </div>
        
        <Button 
          onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
          className="w-full bg-zinc-50 text-zinc-950 hover:bg-zinc-200"
          size="lg"
        >
          <FaGithub className="mr-2 h-5 w-5" />
          Continue with GitHub
        </Button>
      </div>
    </div>
  )
}
