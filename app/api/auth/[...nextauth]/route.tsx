import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from '@/prisma/client'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'

const adapter = PrismaAdapter(prisma)

export const authOptions: NextAuthOptions = {
  adapter: adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'User Account',
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (credentials?.username && credentials?.password) {
          // Any object returned will be saved in `user` property of the JWT
          const user = await prisma.user.findUnique({ where: { email: credentials.username } })

          if (!user) return null
          //Comparing credentials
          const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword || '')

          return passwordMatch ? user : null
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          // An Error will sent the user to the error page with the error message as a query parameter.
          return null
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
