"use client";

import React, { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Lock, Mail, ShieldAlert, ArrowRight } from "lucide-react";
import { useTenant } from "@/components/providers/TenantProvider";
import { Spinner } from "@/components/ui/Spinner";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin/dashboard";
  const tenant = useTenant();

  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "admin@uesabroad.com",
      password: "admin123",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setAuthError(null);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        setAuthError("Invalid email or password. Please try again.");
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch {
      setAuthError("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10 animate-fadeIn">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-dark text-white font-heading font-bold text-2xl shadow-premium mb-4">
            UES
          </div>
          <h1 className="text-3xl font-heading font-bold text-white tracking-tight">
            Admin Console
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Sign in to manage {tenant.name} leads, universities, and settings
          </p>
        </div>

        {/* Login Card */}
        <Card glass padding="lg" className="border-slate-800/80 shadow-glass-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {authError && (
              <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400 text-sm flex items-start gap-2.5">
                <ShieldAlert className="w-5 h-5 shrink-0 text-rose-500 mt-0.5" />
                <span>{authError}</span>
              </div>
            )}

            <Input
              label="Admin Email"
              type="email"
              placeholder="admin@uesabroad.com"
              leftIcon={<Mail className="w-5 h-5" />}
              error={errors.email?.message}
              {...register("email")}
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              leftIcon={<Lock className="w-5 h-5" />}
              error={errors.password?.message}
              {...register("password")}
            />

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                isLoading={isSubmitting}
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                Sign In to Console
              </Button>
            </div>
          </form>

          {/* Development Notice */}
          <div className="mt-6 pt-5 border-t border-slate-800 text-center">
            <p className="text-xs text-slate-500">
              🛠️ <strong className="text-slate-400">Dev Credentials:</strong>{" "}
              <code>admin@uesabroad.com</code> / <code>admin123</code>
            </p>
          </div>
        </Card>

        <p className="text-center text-xs text-slate-600 mt-6">
          &copy; {new Date().getFullYear()} {tenant.legalName}. Protected by Kodvex Security.
        </p>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4">
          <Spinner size="lg" className="text-primary" />
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
