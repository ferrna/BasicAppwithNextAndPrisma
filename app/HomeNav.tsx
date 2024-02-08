'use client'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const HomeNav = ({}) => {
  const { status, data: session } = useSession()
  return (
    <div>
      {status === 'authenticated' ? (
        <div>{session.user?.name}</div>
      ) : (
        <Link href="/api/auth/signin">Sign in</Link>
      )}
    </div>
  )
}

export default HomeNav
