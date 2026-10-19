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

        // Default admin credential fallback (enables access even before remote NeonDB is provisioned)
        const defaultAdminEmail = (process.env.ADMIN_EMAIL || "admin@uesabroad.com").trim().toLowerCase();
        const defaultAdminPassword = (process.env.ADMIN_PASSWORD || "admin123").trim();

        if (process.env.NODE_ENV === "production" && (!process.env.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD === "admin123")) {
          console.warn("[SECURITY ALERT] Default ADMIN_PASSWORD is in use in production. Please set a secure custom ADMIN_PASSWORD in your deployment environment variables.");
        }

        if (email.trim().toLowerCase() === defaultAdminEmail && password.trim() === defaultAdminPassword) {
          return {
            id: "super-admin-id",
            name: "Super Admin",
            email: defaultAdminEmail,
            role: "SUPER_ADMIN" as Role,
          };
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email: email.trim().toLowerCase() },
          });

          if (!user || !user.passwordHash) return null;

          const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
          if (!isPasswordValid) return null;

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          console.error("Auth DB Error:", error);
          return null;
        }
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
