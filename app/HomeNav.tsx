'use client'
import { useSession } from 'next-auth/react'
import { unstable_noStore } from 'next/cache'
import Link from 'next/link'
import React from 'react'

const HomeNav = ({}) => {
  unstable_noStore()
  const { status, data: session } = useSession()
  return (
    <div>
      {status === 'authenticated' ? (
        <div>
          <div>{session.user?.name}</div>
          <button className="btn">
            <Link href="/api/auth/signout">Sign out</Link>
          </button>
        </div>
      ) : (
        <Link href="/api/auth/signin">Sign in</Link>
      )}
    </div>
  )
}

export default HomeNav
