import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import AnimatedHero from "@/components/AnimatedHero"

export default async function Home() {
  const session = await getServerSession(authOptions)
  
  if (session) {
    redirect("/dashboard")
  }

  return (
    <main className="min-h-screen bg-[#030712] text-white">
      <AnimatedHero />
    </main>
  )
}