import { z } from "zod";

const serverEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  DATABASE_URL: z
    .string()
    .url()
    .default("postgresql://postgres:postgres@localhost:5432/ues_abroad"),
  NEXTAUTH_SECRET: z
    .string()
    .min(1)
    .default("super-secret-development-key-change-in-production-123456789"),
  NEXTAUTH_URL: z.string().url().default("http://localhost:3000"),
  CLOUDINARY_CLOUD_NAME: z.string().default("demo-cloud"),
  CLOUDINARY_API_KEY: z.string().default("123456789"),
  CLOUDINARY_API_SECRET: z.string().default("demo-secret"),
  RESEND_API_KEY: z.string().default("re_123456789"),
});

const clientEnvSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: z.string().default("demo-cloud"),
});

/**
 * Validates environment variables at runtime and build time.
 * Throws a formatted error if required variables are missing or invalid.
 */
function validateEnv() {
  const serverParse = serverEnvSchema.safeParse(process.env);
  const clientParse = clientEnvSchema.safeParse({
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  });

  if (!serverParse.success) {
    console.error(
      "❌ Invalid server environment variables:",
      JSON.stringify(serverParse.error.format(), null, 2)
    );
    throw new Error("Invalid server environment variables");
  }

  if (!clientParse.success) {
    console.error(
      "❌ Invalid client environment variables:",
      JSON.stringify(clientParse.error.format(), null, 2)
    );
    throw new Error("Invalid client environment variables");
  }

  return {
    ...serverParse.data,
    ...clientParse.data,
  };
}

export const env = validateEnv();
