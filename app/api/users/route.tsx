import prisma from '@/prisma/client'
import { unstable_noStore } from 'next/cache'
import { NextRequest } from 'next/server'

//export const revalidate = 3600;  // ISR
export async function GET(request: NextRequest) {
  unstable_noStore()

  try {
    //@ts-ignore
    const users = await prisma.user.findMany()
    return Response.json(users)
  } catch (error) {
    return Response.json({ error: `There\'s been an error: ${(error as Error).message}` })
  }
}

export async function POST(request: NextRequest) {
  unstable_noStore()

  const body = await request.json()
  try {
    const user = await prisma.user.findUnique({ where: { email: body.email } })

    if (user) return Response.json({ msg: 'An user with that email already exists' }, { status: 401 })

    const createdUser = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        emailVerified: body.emailVerified ?? false,
        image: body.image || null,
      },
    })
    return Response.json(createdUser, { status: 200 })
  } catch (error) {
    return Response.json({ error: `There\'s been an error: ${(error as Error).message}` }, { status: 501 })
  }
}
