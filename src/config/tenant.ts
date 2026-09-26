/**
 * Kodvex Education Platform — Centralized Tenant Configuration
 *
 * This file serves as the single source of truth for all branding, navigation,
 * contact info, feature toggles, SEO defaults, and business rules for UES Abroad.
 *
 * While architected to support future education consultancy clients of Kodvex Technologies,
 * this configuration is tailored specifically around UES Abroad's workflows and brand identity.
 */

export interface NavItem {
  label: string;
  href: string;
  isSpecial?: boolean; // Highlighted button in navbar
  badge?: string;
}

export interface FooterSection {
  title: string;
  links: { label: string; href: string }[];
}

export interface TenantConfig {
  id: string;
  name: string;
  legalName: string;
  tagline: string;
  description: string;
  logo: {
    url: string;
    altText: string;
    textFallback: string;
  };
  contact: {
    phone: string;
    whatsappNumber: string; // Clean digits with country code, e.g., "919876543210"
    whatsappTemplates: {
      general: string;
      startMyJourney: string;
      accommodation: string;
      contactPage: string;
      courseFinder: string;
    };
    emailAdmissions: string;
    emailSupport: string;
    address: string;
    workingHours: string;
  };
  socials: {
    instagram: string;
    linkedin: string;
    youtube: string;
    facebook: string;
    twitter: string;
  };
  theme: {
    primaryColor: string; // UES Green: #0A7D45
    accentColor: string;  // UES Light Green: #92D050
    currencySymbol: string;
    currencyCode: string;
  };
  features: {
    enableStartMyJourney: boolean;
    enableSmartCourseFinder: boolean;
    enablePrepCenter: boolean;
    enableAccommodation: boolean;
    enableForex: boolean;
    enableSeminars: boolean;
    enableBlogs: boolean;
    enableResourceVault: boolean;
    enableTestimonials: boolean;
    enableFloatingWhatsApp: boolean;
  };
  navigation: {
    headerNav: NavItem[];
    footerNav: FooterSection[];
  };
  seo: {
    defaultTitle: string;
    titleTemplate: string;
    defaultDescription: string;
    ogImage: string;
    keywords: string[];
  };
}

export const tenantConfig: TenantConfig = {
  id: "ues-abroad",
  name: "UES Abroad",
  legalName: "UES Abroad (A Kodvex Education Platform Client)",
  tagline: "Your Gateway to Global Education & Premier Study Abroad Consultation",
  description:
    "Interactive study abroad consultancy platform helping students discover top international universities, calculate living costs, and secure overseas admissions.",
  logo: {
    url: "/branding/logo.svg",
    altText: "UES Abroad Logo",
    textFallback: "UES Abroad",
  },
  contact: {
    phone: "+91 98765 43210",
    whatsappNumber: "919876543210",
    whatsappTemplates: {
      general:
        "Hello UES Abroad Team! I am interested in counseling for study abroad opportunities.",
      startMyJourney:
        "Hello UES Abroad Team! I just completed my 'Start My Journey' assessment on your website and would like to discuss my university recommendations.",
      accommodation:
        "Hello UES Abroad Team! I am looking for student accommodation assistance abroad as featured on your website.",
      contactPage:
        "Hello UES Abroad Team! I am reaching out from your Contact page to book a 1-on-1 consultation.",
      courseFinder:
        "Hello UES Abroad Team! I found some exciting programs using your Course & University Directory and want to check my eligibility.",
    },
    emailAdmissions: "admissions@uesabroad.com",
    emailSupport: "support@uesabroad.com",
    address: "123 Education Hub, MG Road, Bangalore, Karnataka, India - 560001",
    workingHours: "Mon - Sat: 9:00 AM - 7:00 PM (IST)",
  },
  socials: {
    instagram: "https://instagram.com/uesabroad",
    linkedin: "https://linkedin.com/company/uesabroad",
    youtube: "https://youtube.com/@uesabroad",
    facebook: "https://facebook.com/uesabroad",
    twitter: "https://twitter.com/uesabroad",
  },
  theme: {
    primaryColor: "#0A7D45",
    accentColor: "#92D050",
    currencySymbol: "$",
    currencyCode: "USD",
  },
  features: {
    enableStartMyJourney: true,
    enableSmartCourseFinder: true,
    enablePrepCenter: true,
    enableAccommodation: true,
    enableForex: true,
    enableSeminars: true,
    enableBlogs: true,
    enableResourceVault: true,
    enableTestimonials: true,
    enableFloatingWhatsApp: true,
  },
  navigation: {
    headerNav: [
      { label: "Home", href: "/" },
      { label: "Destinations", href: "/destinations" },
      { label: "Universities", href: "/universities" },
      { label: "Courses", href: "/courses" },
      { label: "Prep Center", href: "/preparation" },
      { label: "Accommodation", href: "/accommodation" },
      { label: "Forex", href: "/forex" },
      { label: "Resources", href: "/resources" },
      { label: "Blogs", href: "/blogs" },
      { label: "Start My Journey", href: "/#start-journey", isSpecial: true },
    ],
    footerNav: [
      {
        title: "Study Destinations",
        links: [
          { label: "Study in USA", href: "/destinations/usa" },
          { label: "Study in UK", href: "/destinations/uk" },
          { label: "Study in Germany", href: "/destinations/germany" },
          { label: "Study in Canada", href: "/destinations/canada" },
          { label: "Study in Australia", href: "/destinations/australia" },
          { label: "Study in Ireland", href: "/destinations/ireland" },
        ],
      },
      {
        title: "Platform & Services",
        links: [
          { label: "Start My Journey", href: "/#start-journey" },
          { label: "University Directory", href: "/universities" },
          { label: "Course Directory", href: "/courses" },
          { label: "Accommodation Assistance", href: "/accommodation" },
          { label: "Forex Currency Services", href: "/forex" },
          { label: "Book 1-on-1 Consultation", href: "/contact" },
        ],
      },
      {
        title: "Preparation & Resources",
        links: [
          { label: "IELTS Preparation", href: "/preparation/ielts" },
          { label: "TOEFL Preparation", href: "/preparation/toefl" },
          { label: "GRE & GMAT", href: "/preparation/gre" },
          { label: "German Language", href: "/preparation/german" },
          { label: "SOP & Visa Guides", href: "/resources" },
          { label: "Upcoming Seminars", href: "/seminars" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About UES Abroad", href: "/about" },
          { label: "Student Testimonials", href: "/#testimonials" },
          { label: "Career Pathways", href: "/#pathways" },
          { label: "Latest Blog Articles", href: "/blogs" },
          { label: "Contact Us", href: "/contact" },
          { label: "Admin Console", href: "/admin/login" },
        ],
      },
    ],
  },
  seo: {
    defaultTitle: "UES Abroad | Premier Study Abroad Consultants & Global University Admissions",
    titleTemplate: "%s | UES Abroad",
    defaultDescription:
      "Explore 90+ top international universities across 9 countries. Calculate living costs, check visa eligibility, and book free counseling with UES Abroad.",
    ogImage: "/branding/og-cover.jpg",
    keywords: [
      "study abroad",
      "overseas education",
      "study in germany",
      "study in usa",
      "study in uk",
      "IELTS preparation",
      "education loan",
      "UES Abroad",
      "study abroad consultants",
    ],
  },
};
