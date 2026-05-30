"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, Star, Code2, Link as LinkIcon, FolderGit2 } from "lucide-react"
import { FaGithub } from "react-icons/fa"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
}

export default function ProfileView({ user, views, githubStats }: { user: any, views: number, githubStats: any }) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 py-16 px-4 sm:px-6 lg:px-8">
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-4xl mx-auto space-y-12"
      >
        {/* Header Section */}
        <motion.div variants={item} className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <Avatar className="w-32 h-32 border-4 border-zinc-800 shadow-2xl">
            <AvatarImage src={user.avatar || ""} />
            <AvatarFallback className="text-4xl bg-zinc-900 text-zinc-400">
              {user.name?.charAt(0) || user.username?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="text-center md:text-left flex-1 space-y-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                {user.name || user.username}
              </h1>
              <p className="text-xl text-zinc-400 mt-2">@{user.username}</p>
            </div>
            {user.bio && (
              <p className="text-zinc-300 leading-relaxed max-w-2xl">{user.bio}</p>
            )}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-zinc-400">
              <div className="flex items-center gap-1.5 bg-zinc-900/50 px-3 py-1.5 rounded-full border border-zinc-800">
                <Eye className="w-4 h-4 text-blue-400" />
                <span>{views.toLocaleString()} views</span>
              </div>
              {user.github && (
                <a href={user.github} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 bg-zinc-900/50 hover:bg-zinc-800 px-3 py-1.5 rounded-full border border-zinc-800 transition-colors">
                  <FaGithub className="w-4 h-4" />
                  <span>GitHub Profile</span>
                </a>
              )}
            </div>
          </div>
        </motion.div>

        {/* GitHub Stats */}
        {githubStats && (
          <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-2">
                <FolderGit2 className="w-8 h-8 text-blue-400" />
                <p className="text-2xl font-bold">{githubStats.publicRepos}</p>
                <p className="text-xs text-zinc-400 uppercase tracking-wider">Public Repos</p>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-2">
                <Star className="w-8 h-8 text-yellow-400" />
                <p className="text-2xl font-bold">{githubStats.stars}</p>
                <p className="text-xs text-zinc-400 uppercase tracking-wider">Total Stars</p>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm col-span-2 md:col-span-1">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-2">
                <Code2 className="w-8 h-8 text-emerald-400" />
                <p className="text-2xl font-bold truncate w-full">{githubStats.topLanguage}</p>
                <p className="text-xs text-zinc-400 uppercase tracking-wider">Top Language</p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Skills */}
        {user.skills.length > 0 && (
          <motion.div variants={item} className="space-y-4">
            <h2 className="text-2xl font-semibold border-b border-zinc-800 pb-2">Technical Arsenal</h2>
            <div className="flex flex-wrap gap-3 pt-2">
              {user.skills.map((skill: any) => (
                <motion.div key={skill.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-700/50 rounded-full pl-4 pr-3 py-2 shadow-lg">
                    <span className="font-medium text-zinc-200">{skill.name}</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400">{skill.level}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Projects */}
        {user.projects.length > 0 && (
          <motion.div variants={item} className="space-y-4">
            <h2 className="text-2xl font-semibold border-b border-zinc-800 pb-2">Featured Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {user.projects.map((project: any) => (
                <motion.div key={project.id} whileHover={{ y: -5 }} className="h-full">
                  <Card className="bg-zinc-900 border-zinc-800 h-full flex flex-col hover:border-zinc-700 transition-colors shadow-lg">
                    <CardHeader>
                      <div className="flex justify-between items-start gap-4">
                        <CardTitle className="text-xl text-zinc-100">{project.title}</CardTitle>
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
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col justify-between space-y-4">
                      <p className="text-zinc-400 leading-relaxed text-sm">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 pt-4">
                        {project.techStack.map((tech: string) => (
                          <Badge key={tech} variant="secondary" className="bg-zinc-950/50 border-zinc-800 text-zinc-300">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
