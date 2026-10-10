"use server";

import prisma from "@/lib/prisma";
import { tenantConfig } from "@/config/tenant";
import { revalidatePath } from "next/cache";
import { siteSettingsSchema, SiteSettingsInput } from "@/modules/core/validations/site-settings";

/**
 * Fetches the current Site Settings from the database.
 * Falls back to tenantConfig defaults if the database table is unseeded or offline.
 */
export async function getSiteSettingsAction() {
  try {
    const settings = await prisma.siteSettings.findUnique({
      where: { id: "default" },
    });

    if (!settings) {
      return {
        success: true,
        data: {
          agencyName: tenantConfig.name,
          whatsappNumber: tenantConfig.contact.whatsappNumber,
          phone: tenantConfig.contact.phone,
          supportEmail: tenantConfig.contact.emailSupport,
          address: tenantConfig.contact.address,
          consultationBookingUrl: "/contact",
          announcementBannerText: "Fall 2026 Admissions Open! Book your free 1-on-1 counseling session today.",
          announcementBannerActive: true,
        },
      };
    }

    return { success: true, data: settings };
  } catch {
    console.warn("⚠️ Database offline or unseeded. Returning fallback tenantConfig settings.");
    return {
      success: true,
      data: {
        agencyName: tenantConfig.name,
        whatsappNumber: tenantConfig.contact.whatsappNumber,
        phone: tenantConfig.contact.phone,
        supportEmail: tenantConfig.contact.emailSupport,
        address: tenantConfig.contact.address,
        consultationBookingUrl: "/contact",
        announcementBannerText: "Fall 2026 Admissions Open! Book your free 1-on-1 counseling session today.",
        announcementBannerActive: true,
      },
    };
  }
}

/**
 * Updates Site Settings in the database and triggers cache revalidation across all public pages.
 */
export async function updateSiteSettingsAction(input: SiteSettingsInput) {
  try {
    const parsed = siteSettingsSchema.safeParse(input);
    if (!parsed.success) {
      return { success: false, error: "Invalid form input data." };
    }

    const updated = await prisma.siteSettings.upsert({
      where: { id: "default" },
      update: parsed.data,
      create: {
        id: "default",
        ...parsed.data,
      },
    });

    revalidatePath("/", "layout");
    revalidatePath("/admin/settings");

    return { success: true, data: updated };
  } catch (error) {
    console.error("❌ Error updating site settings:", error);
    return { success: false, error: "Failed to update site settings in database." };
  }
}
