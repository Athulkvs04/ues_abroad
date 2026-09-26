import React from "react";
import { clsx } from "clsx";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  glass?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

export function Card({
  children,
  hoverEffect = false,
  glass = true,
  padding = "md",
  className,
  ...props
}: CardProps) {
  const baseStyles = "rounded-2xl transition-all duration-300 overflow-hidden";
  
  const surfaceStyles = glass
    ? "bg-white/70 dark:bg-dark-card/70 backdrop-blur-md border border-slate-200/60 dark:border-dark-border/60 shadow-glass"
    : "bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border shadow-md";

  const hoverStyles = hoverEffect
    ? "hover:border-primary/50 dark:hover:border-primary/50 hover:shadow-premium hover:-translate-y-1 cursor-pointer"
    : "";

  const paddingStyles = {
    none: "",
    sm: "p-4 sm:p-5",
    md: "p-6 sm:p-8",
    lg: "p-8 sm:p-10",
  };

  return (
    <div
      className={clsx(baseStyles, surfaceStyles, hoverStyles, paddingStyles[padding], className)}
      {...props}
    >
      {children}
    </div>
  );
}
