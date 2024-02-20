import { getServerSession } from 'next-auth'
import HomeNav from './HomeNav'
import { authOptions } from './api/auth/[...nextauth]/route'

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1>
          Bienvenido
          {session && (
            <span>
              <b>{session.user?.name}</b>
            </span>
          )}
        </h1>
        <HomeNav />
      </div>
    </main>
  )
}
