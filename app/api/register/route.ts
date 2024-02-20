import prisma from '@/prisma/client'
import { unstable_noStore } from 'next/cache'
import { NextRequest } from 'next/server'
import bcrypt from 'bcrypt'

//export const revalidate = 3600;  // ISR
export async function POST(request: NextRequest) {
  unstable_noStore()
  const body = await request.json()

  try {
    const user = await prisma.user.findUnique({ where: { email: body.email } })

    if (user) return Response.json({ msg: 'An user with that email already exists' }, { status: 401 })

    const hashedPassword = await bcrypt.hash(body.password, 10)
    // Create the User
    const createdUser = await prisma.user.create({
      data: {
        email: body.email,
        hashedPassword: hashedPassword,
      },
    })
    return Response.json({ email: createdUser.email }, { status: 200 })
  } catch (error) {
    return Response.json({ error: `There\'s been an error: ${(error as Error).message}` }, { status: 501 })
  }
}
