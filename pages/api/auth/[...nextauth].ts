import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

import { dbUsers } from '../../../database';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Credentials({
      name: 'Custom Login',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'email@google.com',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Password',
        },
      },
      async authorize(credentials) {
        const cred = await dbUsers.checkUserEmailPassword(
          credentials!.email,
          credentials!.password
        );
        return cred;
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_CLIENT_ID || '',
    //   clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register',
  },
  jwt: {},
  session: {
    maxAge: 2592000,
    strategy: 'jwt',
    updateAge: 86400,
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;

        switch (account.type) {
          case 'credentials':
            token.user = user;
            break;
          case 'oauth':
            token.user = await dbUsers.oAuthToDbUser(
              user?.email || '',
              user?.name || ''
            );
            break;
        }
      }

      return token;
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken;
      session.user = token.user as any;

      return session;
    },
  },
});

// http://localhost:3000/auth/login?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Flogin%3Fp%3D%2F&error=CredentialsSignin
