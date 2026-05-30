import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function Home() {
  const session = await getServerSession(authOptions)
  
  if (session) {
    redirect("/dashboard")
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
          DevBoard Pro
        </h1>
        <p className="text-zinc-400 text-xl mb-8">
          Your developer identity, amplified. Showcase your work, generate AI-powered bios, and share your profile with the world.
        </p>
        <Link href="/login" className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-zinc-200 transition">
          Get Started →
        </Link>
      </div>
    </main>
  )
}