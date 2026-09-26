"use client";

import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { 
  Settings, 
  Save, 
  CheckCircle2, 
  AlertCircle, 
  MessageSquare, 
  Phone, 
  Mail, 
  MapPin, 
  Link as LinkIcon, 
  Megaphone 
} from "lucide-react";
import { 
  getSiteSettingsAction, 
  updateSiteSettingsAction 
} from "@/modules/core/actions/site-settings";
import { 
  siteSettingsSchema,
  SiteSettingsInput 
} from "@/modules/core/validations/site-settings";

export default function AdminSettingsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<SiteSettingsInput>({
    resolver: zodResolver(siteSettingsSchema),
    defaultValues: {
      agencyName: "UES Abroad",
      whatsappNumber: "919876543210",
      phone: "+91 98765 43210",
      supportEmail: "support@uesabroad.com",
      address: "123 Education Hub, MG Road, Bangalore, India",
      consultationBookingUrl: "/contact",
      announcementBannerText: "🎉 Fall 2026 Admissions Open! Book your free 1-on-1 counseling session today.",
      announcementBannerActive: true,
    },
  });

  const bannerActive = useWatch({ control, name: "announcementBannerActive" });

  useEffect(() => {
    async function loadSettings() {
      setIsLoading(true);
      const res = await getSiteSettingsAction();
      if (res.success && res.data) {
        setValue("agencyName", res.data.agencyName);
        setValue("whatsappNumber", res.data.whatsappNumber);
        setValue("phone", res.data.phone);
        setValue("supportEmail", res.data.supportEmail);
        setValue("address", res.data.address);
        setValue("consultationBookingUrl", res.data.consultationBookingUrl);
        setValue("announcementBannerText", res.data.announcementBannerText || "");
        setValue("announcementBannerActive", res.data.announcementBannerActive);
      }
      setIsLoading(false);
    }
    loadSettings();
  }, [setValue]);

  const onSubmit = async (data: SiteSettingsInput) => {
    setSuccessMessage(null);
    setErrorMessage(null);

    const res = await updateSiteSettingsAction(data);
    if (res.success) {
      setSuccessMessage("✅ Site settings updated and published live successfully!");
      setTimeout(() => setSuccessMessage(null), 5000);
    } else {
      setErrorMessage(res.error || "Failed to update site settings.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-400">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span>Loading current site settings...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white flex items-center gap-3">
            <Settings className="w-8 h-8 text-primary-light" />
            <span>White-Label Site Settings</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Manage UES Abroad brand contact numbers, WhatsApp CTAs, and announcement banners in real-time.
          </p>
        </div>
        <Badge variant="accent" size="md">
          Live CMS Sync Active
        </Badge>
      </div>

      {/* Notifications */}
      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-sm flex items-center gap-3 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400 text-sm flex items-center gap-3 animate-fadeIn">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Settings Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Section 1: Contact & Branding */}
        <Card glass padding="lg" className="border-slate-800 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-lg font-heading font-semibold text-white">
              🏢 Brand Identity & Contact Lines
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              These details appear across the public header, footer, contact page, and email notifications.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input
              label="Agency Brand Name"
              placeholder="UES Abroad"
              error={errors.agencyName?.message}
              {...register("agencyName")}
            />

            <Input
              label="WhatsApp Number (with Country Code)"
              placeholder="919876543210"
              leftIcon={<MessageSquare className="w-4 h-4 text-emerald-400" />}
              error={errors.whatsappNumber?.message}
              helperText="Digits only without '+' symbol (e.g. 919876543210)"
              {...register("whatsappNumber")}
            />

            <Input
              label="Public Phone Number"
              placeholder="+91 98765 43210"
              leftIcon={<Phone className="w-4 h-4 text-sky-400" />}
              error={errors.phone?.message}
              {...register("phone")}
            />

            <Input
              label="Support / Inquiries Email"
              type="email"
              placeholder="support@uesabroad.com"
              leftIcon={<Mail className="w-4 h-4 text-amber-400" />}
              error={errors.supportEmail?.message}
              {...register("supportEmail")}
            />
          </div>

          <Input
            label="Headquarters Address"
            placeholder="123 Education Hub, MG Road, Bangalore, India"
            leftIcon={<MapPin className="w-4 h-4 text-rose-400" />}
            error={errors.address?.message}
            {...register("address")}
          />

          <Input
            label="Consultation Booking URL"
            placeholder="/contact"
            leftIcon={<LinkIcon className="w-4 h-4 text-purple-400" />}
            error={errors.consultationBookingUrl?.message}
            helperText="Internal route (e.g. /contact) or external Calendly/HubSpot link"
            {...register("consultationBookingUrl")}
          />
        </Card>

        {/* Section 2: Announcement Banner */}
        <Card glass padding="lg" className="border-slate-800 space-y-6">
          <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-heading font-semibold text-white flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-accent" />
                <span>Site-Wide Announcement Banner</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Displays a prominent promotional bar at the very top of all public pages when activated.
              </p>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={bannerActive}
                onChange={(e) => setValue("announcementBannerActive", e.target.checked, { shouldDirty: true })}
              />
              <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              <span className="ml-3 text-sm font-medium text-slate-300 select-none">
                {bannerActive ? "Active" : "Disabled"}
              </span>
            </label>
          </div>

          <Input
            label="Banner Announcement Text"
            placeholder="🎉 Fall 2026 Admissions Open! Book your free 1-on-1 counseling session today."
            error={errors.announcementBannerText?.message}
            disabled={!bannerActive}
            {...register("announcementBannerText")}
          />
        </Card>

        {/* Save Actions */}
        <div className="flex items-center justify-end gap-4 pt-2">
          <Button
            type="button"
            variant="ghost"
            onClick={() => window.location.reload()}
            disabled={!isDirty || isSubmitting}
          >
            Discard Changes
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isSubmitting}
            leftIcon={<Save className="w-5 h-5" />}
          >
            Publish Settings Live
          </Button>
        </div>
      </form>
    </div>
  );
}
