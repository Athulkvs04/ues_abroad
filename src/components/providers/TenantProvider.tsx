"use client";

import React, { createContext, useContext } from "react";
import { TenantConfig, tenantConfig } from "@/config/tenant";

const TenantContext = createContext<TenantConfig>(tenantConfig);

interface TenantProviderProps {
  config?: TenantConfig;
  children: React.ReactNode;
}

/**
 * TenantProvider wraps the application so all Client Components can access
 * branding, contact numbers, feature toggles, and navigation links via useTenant().
 */
export function TenantProvider({ config = tenantConfig, children }: TenantProviderProps) {
  return (
    <TenantContext.Provider value={config}>
      {children}
    </TenantContext.Provider>
  );
}

/**
 * Custom hook to access tenant branding and settings in Client Components.
 */
export function useTenant(): TenantConfig {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error("useTenant must be used within a TenantProvider");
  }
  return context;
}
