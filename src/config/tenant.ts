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
    branches?: {
      city: string;
      state: string;
      address: string;
      pincode?: string;
      isHeadOffice?: boolean;
    }[];
  };
  reviews?: {
    googleRating: number;
    totalReviews: number;
    verifiedPercentage: number;
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
  legalName: "UES Abroad Consultants",
  tagline: "Your Gateway to Global Education & Premier Study Abroad Consultation",
  description:
    "Official overseas education consultancy helping students secure admissions across top global universities in UK, Germany, Ireland, Australia, Canada, and USA.",
  logo: {
    url: "/branding/logo.svg",
    altText: "UES Abroad Logo",
    textFallback: "UES Abroad",
  },
  contact: {
    phone: "+91 84400 21005",
    whatsappNumber: "918440021005",
    whatsappTemplates: {
      general:
        "Hello UES Abroad Team! I am interested in counseling for study abroad opportunities.",
      startMyJourney:
        "Hello UES Abroad Team! I just completed my profile assessment on your website and would like to discuss my university recommendations.",
      accommodation:
        "Hello UES Abroad Team! I am looking for student accommodation assistance abroad as featured on your website.",
      contactPage:
        "Hello UES Abroad Team! I am reaching out to book a 1-on-1 consultation.",
      courseFinder:
        "Hello UES Abroad Team! I found some exciting programs using your Course & University Directory and want to check my eligibility.",
    },
    emailAdmissions: "info@uesabroad.com",
    emailSupport: "info@uesabroad.com",
    address: "1st Floor V Square, Head Post Office Road, Palakkad, Kerala - 678001",
    workingHours: "Mon - Sat: 9:30 AM - 5:30 PM (IST)",
    branches: [
      {
        city: "Palakkad",
        state: "Kerala",
        address: "1st Floor V Square, Head Post Office Road, Palakkad",
        pincode: "678001",
        isHeadOffice: true,
      },
      {
        city: "Calicut (Kozhikode)",
        state: "Kerala",
        address: "3rd Floor, AKK Building, Nadakkavu Cross Rd, Near Cafe Kozhikode",
        pincode: "673011",
      },
      {
        city: "Ottapalam",
        state: "Kerala",
        address: "1st Floor, Asco Plaza, East Ottappalam",
        pincode: "679101",
      },
      {
        city: "Mannarkkad",
        state: "Kerala",
        address: "1st Floor Fathima Complex, Mannarkkad, Palakkad",
        pincode: "678582",
      },
      {
        city: "Bangalore",
        state: "Karnataka",
        address: "3rd Floor, Transpade Towers, Koramangala, Bangalore",
        pincode: "560095",
      },
      {
        city: "Hyderabad",
        state: "Telangana",
        address: "NKR Arcade, 2nd Floor, Jodimetla X Roads, Ghatkesar, Secunderabad",
        pincode: "500088",
      },
    ],
  },
  reviews: {
    googleRating: 4.9,
    totalReviews: 240,
    verifiedPercentage: 99,
  },
  socials: {
    instagram: "https://www.instagram.com/uesabroad",
    linkedin: "https://in.linkedin.com/company/ues-abroad",
    youtube: "https://www.youtube.com/@ues.abroad",
    facebook: "https://www.facebook.com/people/uesabroad/100090493910681/",
    twitter: "https://x.com/uesabroad",
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
