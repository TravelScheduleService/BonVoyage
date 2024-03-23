import NextAuth, { AuthOptions, Profile, getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';
import { adapter } from './_adapter';
import { login, signUp } from '@/api/auth/authApi';
import { AxiosError } from 'axios';

export const authOptions: AuthOptions = {
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, user }) {
      if (user) {
        session.token = user.token;
      }
      return session;
    },
    async signIn({ account, profile, user }) {
      if (account?.provider == 'google') {
        const { name } = profile as Profile;
        const email = profile?.email ?? (user.email as string);
        try {
          await signUp({
            email,
            nickname: name as string,
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
          const axiosError = e as AxiosError<ErrorResponse>;
          console.error(axiosError.response?.data.message ?? e);
        }
      }
      return true;
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
  ],
};
export default NextAuth(authOptions);
