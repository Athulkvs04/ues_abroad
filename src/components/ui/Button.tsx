"use client";

import React from "react";
import { clsx } from "clsx";
import { Spinner } from "./Spinner";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "accent" | "ghost" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-bg active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none select-none";

    const variants = {
      primary:
        "bg-primary text-white hover:bg-primary-dark shadow-md hover:shadow-premium focus:ring-primary/50",
      accent:
        "bg-accent text-slate-900 font-semibold hover:bg-accent-dark shadow-md hover:shadow-glow focus:ring-accent/50",
      ghost:
        "bg-transparent text-slate-300 hover:text-white hover:bg-white/5 focus:ring-white/20",
      outline:
        "bg-transparent border border-slate-700 text-slate-200 hover:border-primary hover:text-white hover:bg-primary/10 focus:ring-primary/40",
      danger:
        "bg-red-600 text-white hover:bg-red-700 shadow-md hover:shadow-red-500/30 focus:ring-red-500",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm gap-1.5",
      md: "px-6 py-3 text-base gap-2",
      lg: "px-8 py-4 text-lg gap-2.5",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={clsx(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <>
            <Spinner size={size === "lg" ? "md" : "sm"} className="mr-2 text-current" />
            <span>Loading...</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
