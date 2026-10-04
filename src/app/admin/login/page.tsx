"use client";

import React, { useState, Suspense } from "react";
import { signIn, signOut } from "next-auth/react";
import { useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();
  
  // Bulletproof extraction of internal callback path (prevents double-URL or external redirect leaks)
  const rawCallbackUrl = searchParams.get("callbackUrl") || "/admin/dashboard";
  let callbackUrl = "/admin/dashboard";
  try {
    const parsed = new URL(rawCallbackUrl, "http://localhost");
    callbackUrl = parsed.pathname.startsWith("/admin") && parsed.pathname !== "/admin/login"
      ? `${parsed.pathname}${parsed.search}`
      : "/admin/dashboard";
  } catch {
    callbackUrl = "/admin/dashboard";
  }

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
        email: data.email.trim(),
        password: data.password.trim(),
        callbackUrl,
      });

      if (!result || result.error) {
        setAuthError("Invalid email or password. Please try again.");
      } else {
        // Direct clean browser navigation to destination path on current origin
        window.location.href = callbackUrl;
      }
    } catch {
      setAuthError("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="w-full max-w-md relative z-10 animate-fadeIn">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white font-heading font-bold text-2xl shadow-sm mb-4">
            UES
          </div>
          <h1 className="text-3xl font-heading font-bold text-slate-900 tracking-tight">
            Admin Console
          </h1>
          <p className="text-slate-600 text-sm mt-1.5">
            Sign in to manage {tenant.name} student leads, universities, and settings
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {authError && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-start gap-2.5">
                <ShieldAlert className="w-5 h-5 shrink-0 text-rose-600 mt-0.5" />
                <span>{authError}</span>
              </div>
            )}

            <Input
              label="Admin Email"
              type="email"
              placeholder="admin@uesabroad.com"
              leftIcon={<Mail className="w-5 h-5 text-slate-400" />}
              error={errors.email?.message}
              {...register("email")}
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              leftIcon={<Lock className="w-5 h-5 text-slate-400" />}
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
          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500">
              🛠️ <strong className="text-slate-700">Dev Credentials:</strong>{" "}
              <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-800">admin@uesabroad.com</code> / <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-800">admin123</code>
            </p>
            <button
              type="button"
              onClick={async () => {
                await signOut({ redirect: false });
                window.location.href = "/admin/login";
              }}
              className="mt-2.5 text-[11px] text-slate-400 hover:text-slate-600 transition-colors underline cursor-pointer"
            >
              Reset Session / Clear Stored Cookies
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-slate-500 mt-6">
          &copy; {new Date().getFullYear()} {tenant.legalName}. Protected by UES Abroad Security.
        </p>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
          <Spinner size="lg" className="text-emerald-600" />
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
