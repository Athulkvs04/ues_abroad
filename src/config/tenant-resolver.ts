import { tenantConfig, TenantConfig } from "./tenant";

/**
 * Resolves the tenant configuration for React Server Components.
 * In Sprint 1/V1, this fetches from the static tenantConfig and will merge with
 * dynamic Prisma SiteSettings overrides once the CMS database table is queried.
 */
export async function getResolvedTenantConfig(): Promise<TenantConfig> {
  // In future modules (Module 1.5/2.x), we will query:
  // const dbSettings = await prisma.siteSettings.findFirst();
  // and merge dbSettings into tenantConfig.
  
  return tenantConfig;
}

/**
 * Synchronous helper for metadata generation and static configurations.
 */
export function getStaticTenantConfig(): TenantConfig {
  return tenantConfig;
}
