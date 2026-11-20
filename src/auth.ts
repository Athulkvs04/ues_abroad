import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { Role } from "@prisma/client";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// In production environments (like Vercel), strip localhost overrides that may have been copied from .env.example
if (process.env.NODE_ENV === "production" || process.env.VERCEL) {
  if (process.env.NEXTAUTH_URL?.includes("localhost")) {
    delete process.env.NEXTAUTH_URL;
  }
  if (process.env.AUTH_URL?.includes("localhost")) {
    delete process.env.AUTH_URL;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        try {
          const user = await prisma.user.findUnique({
            where: { email: email.trim().toLowerCase() },
          });

          if (user && user.passwordHash) {
            const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
            if (isPasswordValid) {
              return {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
              };
            }
          }
        } catch (error) {
          console.error("Auth DB Error:", error);
        }

        // Bootstrap fallback: ONLY if explicitly set in environment variables
        if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
          const envAdminEmail = process.env.ADMIN_EMAIL.trim().toLowerCase();
          const envAdminPassword = process.env.ADMIN_PASSWORD.trim();

          if (email.trim().toLowerCase() === envAdminEmail && password.trim() === envAdminPassword) {
            return {
              id: "super-admin-id",
              name: "Super Admin",
              email: envAdminEmail,
              role: "SUPER_ADMIN" as Role,
            };
          }
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as Role;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      const base = baseUrl || process.env.NEXTAUTH_URL || "http://localhost:3000";
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${base}${url}`;
      try {
        if (new URL(url).origin === new URL(base).origin) return url;
      } catch {
        // Fallback to dashboard
      }
      return `${base}/admin/dashboard`;
    },
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || "super-secret-development-key-change-in-production-123456789",
});
