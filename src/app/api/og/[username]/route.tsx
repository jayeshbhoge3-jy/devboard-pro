import { ImageResponse } from '@vercel/og'
import { prisma } from '@/lib/prisma'

export const runtime = 'edge'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await params

    const user = await prisma.user.findUnique({
      where: { username },
      include: { skills: true, projects: true }
    })

    if (!user) {
      return new Response('Not found', { status: 404 })
    }

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#09090b',
            backgroundImage: 'radial-gradient(circle at 25px 25px, #27272a 2%, transparent 0%), radial-gradient(circle at 75px 75px, #27272a 2%, transparent 0%)',
            backgroundSize: '100px 100px',
            fontFamily: 'Inter, sans-serif',
            color: 'white',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#18181b',
              padding: '60px 80px',
              borderRadius: '24px',
              border: '2px solid #27272a',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              maxWidth: '900px',
            }}
          >
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name ?? user.username ?? ""}
                style={{
                  width: '160px',
                  height: '160px',
                  borderRadius: '50%',
                  border: '4px solid #3f3f46',
                  marginBottom: '32px',
                }}
              />
            ) : (
              <div
                style={{
                  width: '160px',
                  height: '160px',
                  borderRadius: '50%',
                  backgroundColor: '#27272a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '64px',
                  border: '4px solid #3f3f46',
                  marginBottom: '32px',
                }}
              >
                {(user.name ?? user.username ?? "").charAt(0).toUpperCase()}
              </div>
            )}
            
            <h1
              style={{
                fontSize: '64px',
                fontWeight: 'bold',
                margin: 0,
                backgroundImage: 'linear-gradient(to right, #ffffff, #a1a1aa)',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              {user.name || user.username}
            </h1>
            
            <p style={{ fontSize: '32px', color: '#a1a1aa', marginTop: '16px', marginBottom: '32px' }}>
              @{user.username}
            </p>
            
            {user.bio && (
              <p
                style={{
                  fontSize: '24px',
                  color: '#d4d4d8',
                  textAlign: 'center',
                  maxWidth: '700px',
                  lineHeight: 1.5,
                  margin: 0,
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {user.bio}
              </p>
            )}

            <div style={{ display: 'flex', gap: '24px', marginTop: '48px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontSize: '36px', fontWeight: 'bold', color: '#60a5fa' }}>{user.projects.length}</span>
                <span style={{ fontSize: '18px', color: '#a1a1aa', marginTop: '8px' }}>Projects</span>
              </div>
              <div style={{ width: '2px', backgroundColor: '#27272a' }}></div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontSize: '36px', fontWeight: 'bold', color: '#a78bfa' }}>{user.skills.length}</span>
                <span style={{ fontSize: '18px', color: '#a1a1aa', marginTop: '8px' }}>Skills</span>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
