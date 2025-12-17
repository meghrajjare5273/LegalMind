import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { jwt, username } from 'better-auth/plugins'
import { bearer } from 'better-auth/plugins'
import {prisma} from '@/lib/prisma'

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql', // or 'mysql', 'sqlite'
  }),
  plugins: [
    jwt({
      jwt: {
        // Customize token expiration
        // expiresIn: '15m',
        // Modify payload if needed
        definePayload: async (session) => {
          return {
            userId: session.user.id,
            email: session.user.email            // Add custom claims
          }
        },
      },
    }),
    bearer({
      // Require signed tokens
      requireSignature: true,
    }),
    username()
  ],
  emailAndPassword: {
    enabled: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
      }
    },
    
  trustedOrigins: ['http://localhost:3000', "https://legal-mind.vercel.app"],
})
