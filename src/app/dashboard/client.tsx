"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { updateBio, generateAiBio, addProject, addSkill, deleteProject, deleteSkill } from "@/app/actions"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2, Wand2, Link as LinkIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { FaGithub } from "react-icons/fa"

export default function DashboardClient({ user }: { user: any }) {
  const [bio, setBio] = useState(user.bio || "")
  const [isGeneratingBio, setIsGeneratingBio] = useState(false)
  const [isSavingBio, setIsSavingBio] = useState(false)

  const handleSaveBio = async () => {
    setIsSavingBio(true)
    await updateBio(bio)
    setIsSavingBio(false)
  }

  const handleGenerateBio = async () => {
    setIsGeneratingBio(true)
    try {
      const generated = await generateAiBio()
      if (generated) setBio(generated)
    } finally {
      setIsGeneratingBio(false)
    }
  }

  return (
    <Tabs defaultValue="profile" className="space-y-6">
      <TabsList className="bg-zinc-900 border border-zinc-800">
        <TabsTrigger value="profile" className="data-[state=active]:bg-zinc-800">Profile</TabsTrigger>
        <TabsTrigger value="projects" className="data-[state=active]:bg-zinc-800">Projects</TabsTrigger>
        <TabsTrigger value="skills" className="data-[state=active]:bg-zinc-800">Skills</TabsTrigger>
      </TabsList>

      <TabsContent value="profile" className="space-y-6">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle>Your Bio</CardTitle>
            <CardDescription>Tell the world who you are and what you build.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2 justify-end">
              <Button 
                variant="outline" 
                onClick={handleGenerateBio} 
                disabled={isGeneratingBio}
                className="bg-zinc-950 border-zinc-700 hover:bg-zinc-800"
              >
                <Wand2 className="mr-2 h-4 w-4 text-purple-400" />
                {isGeneratingBio ? "Generating..." : "AI Generate Bio"}
              </Button>
            </div>
            <Textarea 
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="I am a full-stack developer passionate about..."
              className="min-h-[150px] bg-zinc-950 border-zinc-800 focus-visible:ring-blue-500"
            />
            <Button onClick={handleSaveBio} disabled={isSavingBio} className="bg-blue-600 hover:bg-blue-700 text-white">
              {isSavingBio ? "Saving..." : "Save Bio"}
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="projects" className="space-y-6">
        <ProjectForm />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {user.projects.map((project: any) => (
            <Card key={project.id} className="bg-zinc-900 border-zinc-800 flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <CardDescription className="mt-1">{project.description}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white transition-colors">
                        <FaGithub className="w-5 h-5" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-blue-400 transition-colors">
                        <LinkIcon className="w-5 h-5" />
                      </a>
                    )}
                    <Button variant="ghost" size="icon" onClick={() => deleteProject(project.id)} className="text-red-400 hover:text-red-300 hover:bg-red-950/30 -mt-2 -mr-2">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="mt-auto">
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech: string) => (
                    <Badge key={tech} variant="secondary" className="bg-zinc-800 hover:bg-zinc-700">{tech}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="skills" className="space-y-6">
        <SkillForm />
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-3">
              {user.skills.map((skill: any) => (
                <div key={skill.id} className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 rounded-full pl-4 pr-1 py-1">
                  <span className="text-sm font-medium">{skill.name}</span>
                  <span className="text-xs text-zinc-500 px-2 border-l border-zinc-800">{skill.level}</span>
                  <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full hover:bg-red-950/30 text-red-400" onClick={() => deleteSkill(skill.id)}>
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

function ProjectForm() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "", description: "", techStack: "", githubUrl: "", liveUrl: "", status: "completed"
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await addProject(formData)
    setFormData({ title: "", description: "", techStack: "", githubUrl: "", liveUrl: "", status: "completed" })
    setLoading(false)
  }

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle>Add New Project</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="bg-zinc-950 border-zinc-800" />
            </div>
            <div className="space-y-2">
              <Label>Tech Stack (comma separated)</Label>
              <Input required value={formData.techStack} onChange={e => setFormData({...formData, techStack: e.target.value})} className="bg-zinc-950 border-zinc-800" placeholder="Next.js, Tailwind, Prisma" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="bg-zinc-950 border-zinc-800" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>GitHub URL</Label>
              <Input value={formData.githubUrl} onChange={e => setFormData({...formData, githubUrl: e.target.value})} className="bg-zinc-950 border-zinc-800" />
            </div>
            <div className="space-y-2">
              <Label>Live URL</Label>
              <Input value={formData.liveUrl} onChange={e => setFormData({...formData, liveUrl: e.target.value})} className="bg-zinc-950 border-zinc-800" />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={formData.status} onValueChange={v => setFormData({...formData, status: v})}>
                <SelectTrigger className="bg-zinc-950 border-zinc-800">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="planned">Planned</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button type="submit" disabled={loading} className="w-full bg-zinc-50 text-zinc-950 hover:bg-zinc-200">
            {loading ? "Adding..." : "Add Project"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

function SkillForm() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({ name: "", level: "Intermediate" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await addSkill(formData)
    setFormData({ name: "", level: "Intermediate" })
    setLoading(false)
  }

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle>Add Skill</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex items-end gap-4">
          <div className="flex-1 space-y-2">
            <Label>Skill Name</Label>
            <Input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="bg-zinc-950 border-zinc-800" placeholder="e.g. React" />
          </div>
          <div className="w-[200px] space-y-2">
            <Label>Level</Label>
            <Select value={formData.level} onValueChange={v => setFormData({...formData, level: v})}>
              <SelectTrigger className="bg-zinc-950 border-zinc-800">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
                <SelectItem value="Expert">Expert</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" disabled={loading} className="bg-zinc-50 text-zinc-950 hover:bg-zinc-200">
            {loading ? "Adding..." : "Add"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
