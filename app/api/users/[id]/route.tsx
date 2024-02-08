import prisma from '@/prisma/client'
import { unstable_noStore } from 'next/cache'
import { NextRequest } from 'next/server'

//export const revalidate = 3600;  // ISR
export async function GET(request: NextRequest, params: any) {
  unstable_noStore()

  try {
    const user = await prisma.user.findUnique({ where: { id: parseInt(params.params.id) } })
    if (!user) return Response.json({ msg: 'could not find user' }, { status: 404 })
    return Response.json(user)
  } catch (error) {
    return Response.json({ error: `There\'s been an error: ${(error as Error).message}` }, { status: 501 })
  }
}

export async function PUT(request: NextRequest, params: any) {
  unstable_noStore()

  const body = await request.json()
  try {
    console.log('0')
    const user = await prisma.user.findUnique({ where: { id: parseInt(params.params.id) } })
    console.log('1')
    if (!user) return Response.json({ msg: 'could not find user' }, { status: 404 })
    console.log('2')
    const editedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        name: body.name,
        email: body.email,
        registerDate: body.registerDate || user.registerDate,
        isActive: body.isActive ?? user.isActive,
      },
    })
    console.log('3')
    return Response.json(editedUser)
  } catch (error) {
    return Response.json({ error: `There\'s been an error: ${(error as Error).message}` }, { status: 501 })
  }
}

export async function DELETE(request: NextRequest, params: any) {
  unstable_noStore()

  try {
    const user = await prisma.user.findUnique({ where: { id: parseInt(params.params.id) } })

    if (!user) return Response.json({ msg: 'could not find user' }, { status: 404 })

    await prisma.user.delete({ where: { id: user.id } })
    return Response.json({ msg: `User ${user.id} ${user.name} succesfully deleted` }, { status: 200 })
  } catch (error) {
    return Response.json({ error: `There\'s been an error: ${(error as Error).message}` }, { status: 501 })
  }
}
