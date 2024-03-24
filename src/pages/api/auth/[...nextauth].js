import { login, signUp } from '@/api/auth/authApi';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
  callbacks: {
    async jwt({ token, session, user }) {
      if (token.accessToken) {
        if (session) {
          session.accessToken = token.accessToken;
        }
      } else if (user) {
        const { accessToken } = user;
        token.accessToken = accessToken;
      }
      return token;
    },
    async session({ session, token, user }) {
      if (token) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
    async signIn({ account, profile, user }) {
      if (account?.provider == 'google') {
        const { name } = profile;
        const email = profile?.email ?? user.email;
        try {
          await signUp({
            email,
            nickname: name,
            password: account.providerAccountId,
          });
          const res = await login({
            email,
            password: account.providerAccountId,
          });
          user.accessToken = res.accessToken;
          user.email = email;
          user.id = res.user.id.toString();
          user.name = name;
          if (profile) {
            profile.accessToken = res.accessToken;
          }
        } catch (e) {
          const axiosError = e;
          console.error(axiosError.response?.data.message ?? e);
        }
      }
      return true;
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
});
