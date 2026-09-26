import { z } from "zod";

export const siteSettingsSchema = z.object({
  agencyName: z.string().min(2, "Agency name is required"),
  whatsappNumber: z.string().min(10, "Valid WhatsApp number is required"),
  phone: z.string().min(5, "Valid phone number is required"),
  supportEmail: z.string().email("Valid support email is required"),
  address: z.string().min(5, "Address is required"),
  consultationBookingUrl: z.string().min(1, "Booking URL is required"),
  announcementBannerText: z.string().optional().nullable(),
  announcementBannerActive: z.boolean(),
});

export type SiteSettingsInput = z.infer<typeof siteSettingsSchema>;
