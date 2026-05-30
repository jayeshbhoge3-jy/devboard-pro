import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import ProfileView from "./ProfileView"
import { redis } from "@/lib/redis"
import { Metadata } from "next"

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }): Promise<Metadata> {
  const { username } = await params;
  const user = await prisma.user.findUnique({ where: { username } })
  if (!user) return { title: "User Not Found" }
  
  return {
    title: `${user.name || user.username} - DevBoard Pro`,
    description: user.bio || `Check out ${user.username}'s developer portfolio.`,
    openGraph: {
      images: [`/api/og/${user.username}`],
    }
  }
}

async function getGithubStats(username: string) {
  try {
    const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, { 
      next: { revalidate: 3600 },
      headers: process.env.GITHUB_CLIENT_ID ? {
        Authorization: `Basic ${Buffer.from(`${process.env.GITHUB_CLIENT_ID}:${process.env.GITHUB_CLIENT_SECRET}`).toString('base64')}`
      } : {}
    })
    if (!reposRes.ok) return null
    const repos = await reposRes.json()
    
    const stars = repos.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0)
    const languages = repos.map((r: any) => r.language).filter(Boolean)
    const topLanguage = languages.length ? languages.sort((a: any, b: any) =>
          languages.filter((v: any) => v === a).length
        - languages.filter((v: any) => v === b).length
    ).pop() : "N/A"

    return {
      publicRepos: repos.length,
      stars,
      topLanguage: topLanguage || "N/A"
    }
  } catch (e) {
    return null
  }
}

export default async function PublicProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const user = await prisma.user.findUnique({
    where: { username },
    include: { skills: true, projects: true }
  })

  if (!user) {
    notFound()
  }

  let views = user.views
  try {
    views = await redis.incr(`profile:views:${user.username}`)
    // update db occasionally if you want, but for now we'll just display it
  } catch (e) {
    console.error("Redis error:", e)
  }
  
  const githubStats = await getGithubStats(user.username ?? "")

  return <ProfileView user={user} views={views} githubStats={githubStats} />
}
