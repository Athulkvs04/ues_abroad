import { PublicLayout } from "@/components/layout/PublicLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | UES Abroad",
  description: "Review UES Abroad's Terms of Service governing your use of our study abroad consultancy platform, services, and digital tools.",
};

export default function TermsOfServicePage() {
  const lastUpdated = "October 2026";
  return (
    <PublicLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="mb-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full mb-4">
            Legal
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3">Terms of Service</h1>
          <p className="text-slate-500 text-sm">
            Last updated: <strong>{lastUpdated}</strong>
          </p>
          <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-600 leading-relaxed">
            Please read these Terms of Service carefully before using the UES Abroad platform. By accessing or using our website and services, you agree to be bound by these Terms. If you do not agree to any part of these Terms, you must not use our platform.
          </div>
        </div>

        {/* Body */}
        <div className="prose prose-slate max-w-none space-y-10 text-slate-700">

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">1. Acceptance of Terms</h2>
            <p className="text-sm leading-relaxed">
              These Terms of Service ("Terms") constitute a legally binding agreement between you ("User", "you") and UES Abroad ("we", "us", "our", "Company"). By using any part of our platform — including the website, consultation booking tools, course finder, forex calculator, accommodation listings, or blog articles — you acknowledge that you have read, understood, and agreed to be bound by these Terms and our Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">2. Description of Services</h2>
            <p className="text-sm leading-relaxed mb-3">UES Abroad provides the following services ("Services"):</p>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
              <li>Study abroad counselling and university selection guidance</li>
              <li>University and course discovery tools (Course Finder, University Explorer)</li>
              <li>Profile eligibility assessment and shortlisting</li>
              <li>Statement of Purpose (SOP) and application document assistance</li>
              <li>Visa application guidance and interview preparation</li>
              <li>Student accommodation search and liaison services</li>
              <li>Foreign currency exchange facilitation via RBI-authorized partners</li>
              <li>Pre-departure orientation and post-arrival alumni support</li>
              <li>Educational content, blogs, and study abroad resources</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. Eligibility & Account Responsibility</h2>
            <p className="text-sm leading-relaxed">
              You must be at least 18 years of age to use our platform independently. Minors may use our services only with the explicit consent and participation of a parent or legal guardian. You agree to provide accurate, current, and complete information when submitting enquiry forms, eligibility checks, or consultation requests. You are responsible for maintaining the confidentiality of any account credentials and for all activities conducted under your profile.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">4. Advisory Nature of Services — No Guarantee of Admission</h2>
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl mb-4">
              <p className="text-sm font-semibold text-amber-800">⚠️ Important Notice</p>
            </div>
            <p className="text-sm leading-relaxed mb-3">
              UES Abroad acts as an education consultancy and advisory platform. All university recommendations, eligibility assessments, course suggestions, and visa guidance provided on this platform are for <strong>informational and advisory purposes only</strong>. They do not constitute a guarantee of university admission, visa approval, scholarship, or employment.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
              <li>Admission decisions are made solely and exclusively by the respective universities and academic institutions.</li>
              <li>Visa approvals are the exclusive jurisdiction of the respective country's immigration authorities.</li>
              <li>Scholarship outcomes depend on individual merit, documentation, and awarding body decisions.</li>
              <li>UES Abroad cannot be held liable for any rejection of admission, visa, scholarship, or employment applications.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">5. Forex Services</h2>
            <p className="text-sm leading-relaxed">
              The currency exchange rates displayed on our platform are sourced from third-party financial data providers and are indicative in nature. Actual exchange rates offered by our Forex partners may differ slightly at the time of transaction. UES Abroad facilitates introductions to RBI-authorized Forex partners but is not a bank or financial institution and does not directly hold, transfer, or manage any funds. All Forex transactions are governed by the terms and conditions of the respective financial service provider and applicable RBI/FEMA regulations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">6. Fees & Refund Policy</h2>
            <p className="text-sm leading-relaxed mb-3">
              Service fees for consultation packages, SOP assistance, visa guidance, and other premium services are agreed upon at the time of engagement and stated in a separate Service Agreement document. The following general conditions apply:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
              <li>All fees are in Indian Rupees (INR) unless otherwise stated in writing.</li>
              <li>Initial free consultations involve no payment obligation.</li>
              <li>Paid service fees are non-refundable once work has commenced, except as expressly stated in your individual Service Agreement.</li>
              <li>In the event of failure to deliver agreed services due to our fault, a proportional refund will be evaluated on a case-by-case basis.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">7. User Conduct</h2>
            <p className="text-sm leading-relaxed mb-3">You agree not to:</p>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
              <li>Provide false, misleading, or fraudulent personal or academic information.</li>
              <li>Attempt to circumvent, hack, or disrupt platform security, databases, or API endpoints.</li>
              <li>Use automated bots, scrapers, or tools to extract content, leads, or data from the platform.</li>
              <li>Reproduce, redistribute, or commercially exploit our platform content without written permission.</li>
              <li>Use the platform for any unlawful purpose or in violation of any applicable law or regulation.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">8. Intellectual Property</h2>
            <p className="text-sm leading-relaxed">
              All content on the UES Abroad platform — including logos, text, graphics, blog articles, tools, and software — is the intellectual property of UES Abroad or its licensors and is protected by applicable copyright, trademark, and intellectual property laws. You are granted a limited, non-exclusive, non-transferable license to access and use the platform solely for personal, non-commercial purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">9. Third-Party Links & Services</h2>
            <p className="text-sm leading-relaxed">
              Our platform may contain links to third-party websites, university portals, or service providers. These links are provided for convenience only. UES Abroad does not endorse, control, or assume responsibility for the content, privacy practices, or services of any third-party websites. Your interactions with third parties are governed by their respective terms and policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">10. Limitation of Liability</h2>
            <p className="text-sm leading-relaxed">
              To the fullest extent permitted by applicable law, UES Abroad, its directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, goodwill, or other intangible losses arising from: (a) your use or inability to use the platform; (b) any admission, visa, or scholarship decision made by a third party; (c) errors or inaccuracies in information provided on the platform; or (d) any unauthorized access to or alteration of your information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">11. Governing Law & Dispute Resolution</h2>
            <p className="text-sm leading-relaxed">
              These Terms are governed by and construed in accordance with the laws of India. Any dispute arising out of or in connection with these Terms shall first be attempted to be resolved through good-faith negotiation. If unresolved, disputes shall be subject to the exclusive jurisdiction of the courts of Bangalore, Karnataka, India.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">12. Modifications to Terms</h2>
            <p className="text-sm leading-relaxed">
              We reserve the right to modify these Terms at any time. When changes are made, we will update the "Last updated" date. Material changes will be communicated via the platform or email. Your continued use of the platform after changes constitutes acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">13. Contact</h2>
            <div className="mt-4 p-5 bg-slate-50 border border-slate-200 rounded-xl text-sm space-y-1">
              <p><strong>UES Abroad</strong></p>
              <p>123 Education Hub, MG Road, Bangalore, Karnataka, India - 560001</p>
              <p>Email: <a href="mailto:admissions@uesabroad.com" className="text-emerald-600 hover:underline">admissions@uesabroad.com</a></p>
              <p>Phone: +91 98765 43210</p>
            </div>
          </section>

        </div>
      </div>
    </PublicLayout>
  );
}
