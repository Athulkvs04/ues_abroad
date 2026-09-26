import React from "react";
import { clsx } from "clsx";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "accent" | "success" | "warning" | "danger" | "info" | "neutral";
  size?: "sm" | "md";
  icon?: React.ReactNode;
}

export function Badge({
  children,
  variant = "primary",
  size = "md",
  icon,
  className,
  ...props
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-full shrink-0 select-none";

  const variants = {
    primary: "bg-primary/15 text-primary-light border border-primary/30 dark:text-emerald-400",
    accent: "bg-accent/15 text-accent-dark border border-accent/30 dark:text-accent",
    success: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30",
    warning: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30",
    danger: "bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30",
    info: "bg-sky-500/15 text-sky-600 dark:text-sky-400 border border-sky-500/30",
    neutral: "bg-slate-500/15 text-slate-600 dark:text-slate-300 border border-slate-500/30",
  };

  const sizes = {
    sm: "px-2.5 py-0.5 text-xs gap-1",
    md: "px-3 py-1 text-sm gap-1.5",
  };

  return (
    <span className={clsx(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}
