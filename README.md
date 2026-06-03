<div align="center">

# 🚀 DevBoard Pro

### *Your Developer Identity, Amplified*

**The full-stack SaaS platform where developers showcase their work, generate AI-powered bios, and share a stunning public profile — all in one place.**

[![Next.js](https://img.shields.io/badge/Next.js_14-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://postgresql.org/)
[![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

[🌐 Live Demo](https://devboard-pro.vercel.app) · [📸 Screenshots](#screenshots) · [⚙️ Setup](#getting-started)

---

</div>

## ✨ What is DevBoard Pro?

DevBoard Pro is a **full-stack developer portfolio platform** where developers can:

- Login with GitHub in one click
- Build a beautiful public profile at `/u/your-username`
- Showcase projects with live links and tech stacks
- Generate a professional bio using **AI (Groq LLaMA)**
- Display live GitHub stats pulled from GitHub API
- Track profile views powered by **Redis**
- Share a dynamic **OG image** when posting on LinkedIn/WhatsApp

> Think of it as **Linktree + GitHub Profile + LinkedIn** — but built entirely by you.

---

## 🎯 Features

| Feature | Description |
|---|---|
| 🔐 **GitHub OAuth** | One-click login via NextAuth.js |
| 🤖 **AI Bio Generator** | Generates professional bio using Groq LLaMA AI |
| 📊 **GitHub Stats** | Live repos, stars, top languages from GitHub API |
| 👁️ **View Counter** | Real-time profile views tracked with Upstash Redis |
| 🌐 **Public Profile** | Shareable link at `/u/[username]` |
| 🖼️ **Dynamic OG Image** | Auto-generated preview cards for social sharing |
| ✨ **Smooth Animations** | Framer Motion page transitions and reveals |
| 🌙 **Dark Theme** | Premium dark UI built with shadcn/ui + Tailwind |

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** — App Router, Server Components
- **TypeScript** — Full type safety
- **Tailwind CSS** — Utility-first styling
- **shadcn/ui** — Beautiful pre-built components
- **Framer Motion** — Smooth animations

### Backend
- **Next.js API Routes** — Serverless functions
- **Prisma ORM** — Type-safe database access
- **NextAuth.js** — GitHub OAuth authentication

### Databases
- **Neon PostgreSQL** — Serverless relational database
- **Upstash Redis** — Real-time view counter

### Integrations
- **Groq API** (LLaMA 3) — AI bio generation
- **GitHub REST API** — Live developer stats
- **Vercel OG** — Dynamic Open Graph images

### Deployment
- **Vercel** — CI/CD + hosting

---

## 📸 Screenshots

> Dashboard — Manage your projects, skills, and bio
> <img width="1919" height="958" alt="Screenshot 2026-06-03 105156" src="https://github.com/user-attachments/assets/eef78e47-302b-4718-b4fe-f8df0276410f" />


> Public Profile — `/u/your-username` — Beautiful shareable page
> <img width="1919" height="971" alt="Screenshot 2026-06-03 105206" src="https://github.com/user-attachments/assets/b9ca8954-a014-43e0-91f0-15f7f1816624" />


> AI Bio Generator — One click to generate a professional bio

---<img width="1918" height="965" alt="Screenshot 2026-06-03 105220" src="https://github.com/user-attachments/assets/0b415849-2e1d-40d5-a9b3-6817caa06fc5" />


## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Git

### 1. Clone the repository
```bash
git clone https://github.com/jayeshbhoge3-jy/devboard-pro.git
cd devboard-pro
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create `.env.local` in the root:
```env
DATABASE_URL=your_neon_postgresql_url

GITHUB_CLIENT_ID=your_github_oauth_client_id
GITHUB_CLIENT_SECRET=your_github_oauth_client_secret
NEXTAUTH_SECRET=your_random_secret
NEXTAUTH_URL=http://localhost:3000

UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token

GROQ_API_KEY=your_groq_api_key
```

### 4. Set up the database
```bash
npx prisma migrate dev
npx prisma generate
```

### 5. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 🔑 External Services Setup

| Service | Purpose | Free Tier |
|---|---|---|
| [Neon](https://neon.tech) | PostgreSQL database | ✅ 0.5GB |
| [Upstash](https://upstash.com) | Redis view counter | ✅ 256MB |
| [Groq](https://console.groq.com) | AI bio generation | ✅ Generous |
| [GitHub OAuth](https://github.com/settings/developers) | Authentication | ✅ Free |
| [Vercel](https://vercel.com) | Deployment | ✅ Hobby plan |

---

## 📁 Project Structure

```
devboard-pro/
├── src/
│   ├── app/
│   │   ├── dashboard/          # Private dashboard
│   │   ├── u/[username]/       # Public profile page
│   │   ├── api/
│   │   │   ├── auth/           # NextAuth routes
│   │   │   ├── og/[username]/  # Dynamic OG image
│   │   │   └── bio/            # AI bio generator
│   │   └── login/              # Login page
│   ├── components/
│   │   └── ui/                 # shadcn components
│   ├── lib/
│   │   ├── prisma.ts           # Prisma client
│   │   ├── auth.ts             # NextAuth config
│   │   └── redis.ts            # Upstash Redis client
│   └── types/
├── prisma/
│   └── schema.prisma           # Database schema
└── public/
```

---

## 🗄️ Database Schema

```prisma
model User {
  id        String    @id @default(cuid())
  name      String?
  username  String    @unique
  email     String    @unique
  bio       String?
  avatar    String?
  github    String?
  projects  Project[]
  skills    Skill[]
  createdAt DateTime  @default(now())
}

model Project {
  id          String   @id @default(cuid())
  title       String
  description String
  techStack   String[]
  githubUrl   String?
  liveUrl     String?
  status      String   @default("completed")
  userId      String
  user        User     @relation(fields: [userId], references: [id])
}

model Skill {
  id     String @id @default(cuid())
  name   String
  level  String
  userId String
  user   User   @relation(fields: [userId], references: [id])
}
```

---

## ☁️ Deploy on Vercel

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → Import project
3. Add all environment variables
4. Set build command: `prisma generate && next build`
5. Deploy!

---

## 👨‍💻 Author

**Jayesh Bhoge**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/Jayesh-bhoge)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/jayeshbhoge3-jy)

---

## ⭐ Show Your Support

If you found this project helpful, please give it a **star** ⭐ — it means a lot!

---

<div align="center">
Built with ❤️ by Jayesh Bhoge
</div>
