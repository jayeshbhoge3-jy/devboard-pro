"use server"

import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import Groq from "groq-sdk"

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export async function updateBio(bio: string) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) throw new Error("Unauthorized")

  await prisma.user.update({
    where: { id: session.user.id },
    data: { bio },
  })
  revalidatePath("/dashboard")
}

export async function generateAiBio() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) throw new Error("Unauthorized")

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { skills: true, projects: true },
  })

  if (!user) throw new Error("User not found")

  const prompt = `Write a professional, engaging developer bio for ${user.name || "a developer"} in the first person. 
They have the following skills: ${user.skills.map(s => s.name).join(", ")}.
They have built the following projects: ${user.projects.map(p => p.title).join(", ")}.
Keep it concise, around 3-4 sentences, highlighting their expertise and passion for building. Use a confident but humble tone. Do not use quotes around the bio.`

  const completion = await groq.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "llama-3.1-8b-instant",
  })

  let generatedBio = completion.choices[0]?.message?.content || ""
  generatedBio = generatedBio.trim().replace(/^["']|["']$/g, '')
  
  if (generatedBio) {
    await prisma.user.update({
      where: { id: user.id },
      data: { bio: generatedBio },
    })
    revalidatePath("/dashboard")
  }
  
  return generatedBio
}

export async function addProject(data: { title: string; description: string; techStack: string; githubUrl: string; liveUrl: string; status: string }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) throw new Error("Unauthorized")

  await prisma.project.create({
    data: {
      ...data,
      techStack: data.techStack.split(",").map(t => t.trim()).filter(Boolean),
      userId: session.user.id,
    }
  })
  revalidatePath("/dashboard")
}

export async function addSkill(data: { name: string; level: string }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) throw new Error("Unauthorized")

  await prisma.skill.create({
    data: {
      ...data,
      userId: session.user.id,
    }
  })
  revalidatePath("/dashboard")
}

export async function deleteProject(id: string) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) throw new Error("Unauthorized")

  await prisma.project.delete({ where: { id, userId: session.user.id } })
  revalidatePath("/dashboard")
}

export async function deleteSkill(id: string) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) throw new Error("Unauthorized")

  await prisma.skill.delete({ where: { id, userId: session.user.id } })
  revalidatePath("/dashboard")
}
