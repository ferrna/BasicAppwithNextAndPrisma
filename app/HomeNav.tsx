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
          <div className="avatar online">
            <div className="w-24 mask mask-hexagon">
              <img src={session.user?.image || ''} />
            </div>
          </div>{' '}
          <br />
          <button className="btn btn-secondary mr-3">
            <Link href="/table">Table</Link>
          </button>
          <button className="btn btn-secondary mr-3">
            <Link href="/api/auth/signout">Sign out</Link>
          </button>
        </div>
      ) : (
        <button className="btn btn-secondary mr-3">
          <Link href="/api/auth/signin">Sign in</Link>
        </button>
      )}
    </div>
  )
}

export default HomeNav
