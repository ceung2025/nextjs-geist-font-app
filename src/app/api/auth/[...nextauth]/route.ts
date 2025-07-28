import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import AzureADProvider from "next-auth/providers/azure-ad";
import { signToken } from "@/lib/auth";

const handler = NextAuth({
  providers: [
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET ? [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      })
    ] : []),
    ...(process.env.MICROSOFT_CLIENT_ID && process.env.MICROSOFT_CLIENT_SECRET ? [
      AzureADProvider({
        clientId: process.env.MICROSOFT_CLIENT_ID,
        clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
        tenantId: process.env.MICROSOFT_TENANT_ID || "common",
      })
    ] : []),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      return true; // Allow all for now
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        try {
          const customToken = signToken({ 
            email: user.email,
            name: user.name,
            provider: account.provider 
          });
          token.customToken = customToken;
        } catch (error) {
          console.error("Error creating custom token:", error);
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token.customToken) {
        (session as any).customToken = token.customToken;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 1 hour
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  secret: process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET,
  debug: true,
});

export { handler as GET, handler as POST };
