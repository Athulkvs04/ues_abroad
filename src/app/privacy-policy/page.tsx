import { PublicLayout } from "@/components/layout/PublicLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | UES Abroad",
  description: "UES Abroad's Privacy Policy explains how we collect, use, and protect your personal information when you use our platform.",
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "October 2026";
  return (
    <PublicLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="mb-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full mb-4">
            Legal
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3">Privacy Policy</h1>
          <p className="text-slate-500 text-sm">
            Last updated: <strong>{lastUpdated}</strong>
          </p>
          <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-600 leading-relaxed">
            This Privacy Policy describes how <strong>UES Abroad</strong> ("we", "us", or "our") collects, uses, and shares information about you when you use our website, platform, and services. By using our platform, you agree to the collection and use of information as described in this Policy.
          </div>
        </div>

        {/* Body */}
        <div className="prose prose-slate max-w-none space-y-10 text-slate-700">

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">1. Information We Collect</h2>
            <p className="text-sm leading-relaxed mb-3">When you interact with UES Abroad, we may collect the following categories of personal information:</p>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
              <li><strong>Contact Information:</strong> Your full name, email address, and phone number when you submit a consultation request, course enquiry, or accommodation inquiry.</li>
              <li><strong>Academic & Profile Data:</strong> Your academic background (CGPA, current qualification level), target countries, preferred degree levels, and English test scores — submitted voluntarily through our eligibility tools.</li>
              <li><strong>Usage Data:</strong> Pages visited, time spent on the platform, browser type, IP address, and device identifiers collected automatically via cookies and analytics tools.</li>
              <li><strong>Forex Data:</strong> Currency, amounts, and rate lock preferences when you use the Forex Calculator or Rate Lock service.</li>
              <li><strong>Communications:</strong> Any messages, feedback, or support queries you send us via email, WhatsApp, or our contact forms.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">2. How We Use Your Information</h2>
            <p className="text-sm leading-relaxed mb-3">We use the personal information collected for the following purposes:</p>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
              <li>To respond to your consultation requests and provide personalised study abroad guidance.</li>
              <li>To generate course, university, and accommodation recommendations tailored to your profile.</li>
              <li>To connect you with our partnered universities, accommodation providers, and forex service partners (e.g., FairexPay).</li>
              <li>To send you relevant updates about seminars, visa changes, scholarship deadlines, and study abroad news (only with your consent).</li>
              <li>To improve the platform's features, user experience, and content based on aggregate usage analytics.</li>
              <li>To comply with legal obligations, prevent fraud, and maintain platform security.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. Information Sharing</h2>
            <p className="text-sm leading-relaxed mb-3">We do not sell your personal data. We may share your information only in the following circumstances:</p>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
              <li><strong>University Partners:</strong> With your explicit consent, we may share your academic profile with partner universities to facilitate application submissions or eligibility checks.</li>
              <li><strong>Service Providers:</strong> With trusted third-party vendors (e.g., NeonDB for database services, Vercel for hosting, ExchangeRate-API for forex data) who process data solely on our behalf under strict confidentiality agreements.</li>
              <li><strong>Forex Partners:</strong> If you request a rate lock, your contact details may be shared with our RBI-authorized Forex partner to fulfill the service.</li>
              <li><strong>Legal Requirements:</strong> When required by law, court order, or government authority in India or the destination country.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">4. Cookies & Tracking Technologies</h2>
            <p className="text-sm leading-relaxed">
              We use cookies and similar tracking technologies to enhance your experience. Cookies help us remember your preferences, analyze site traffic, and deliver relevant content. You may control cookie preferences through your browser settings or our Cookie Consent banner. Disabling essential cookies may affect site functionality.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">5. Data Retention</h2>
            <p className="text-sm leading-relaxed">
              We retain your personal information for as long as necessary to provide you with our services and fulfill the purposes outlined in this Policy, or as required by applicable law. Lead data submitted through our forms may be retained for a maximum of 3 years from the date of submission, after which it is automatically anonymised or deleted.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">6. Your Rights</h2>
            <p className="text-sm leading-relaxed mb-3">You have the following rights with respect to your personal data:</p>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
              <li><strong>Right to Access:</strong> Request a copy of the personal data we hold about you.</li>
              <li><strong>Right to Rectification:</strong> Request correction of inaccurate or incomplete data.</li>
              <li><strong>Right to Erasure:</strong> Request deletion of your data, subject to legal retention requirements.</li>
              <li><strong>Right to Withdraw Consent:</strong> Opt-out of marketing communications at any time.</li>
              <li><strong>Right to Data Portability:</strong> Request your data in a structured, machine-readable format.</li>
            </ul>
            <p className="text-sm leading-relaxed mt-3">
              To exercise any of these rights, email us at <a href="mailto:support@uesabroad.com" className="text-emerald-600 hover:underline font-medium">support@uesabroad.com</a> with the subject line "Data Privacy Request". We will respond within 14 business days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">7. Data Security</h2>
            <p className="text-sm leading-relaxed">
              We implement industry-standard security measures to protect your personal data from unauthorised access, disclosure, alteration, or destruction. These include SSL/TLS encryption in transit, password hashing (bcryptjs), role-based admin access controls, and routine security audits. However, no method of transmission over the internet or electronic storage is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">8. International Transfers</h2>
            <p className="text-sm leading-relaxed">
              UES Abroad operates from India. If you are accessing our services from outside India, your information may be transferred to and processed in India or the servers of our cloud infrastructure providers (which may be located in the United States, EU, or other regions). We ensure appropriate safeguards are in place for any such transfers in compliance with applicable data protection laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">9. Children's Privacy</h2>
            <p className="text-sm leading-relaxed">
              Our services are intended for individuals who are 18 years of age or older. We do not knowingly collect personal information from children under 18. If you believe we have inadvertently collected such information, please contact us immediately at <a href="mailto:support@uesabroad.com" className="text-emerald-600 hover:underline font-medium">support@uesabroad.com</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">10. Changes to This Policy</h2>
            <p className="text-sm leading-relaxed">
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. When we make material changes, we will update the "Last updated" date at the top of this page. We encourage you to review this Policy periodically. Continued use of the platform after changes constitutes acceptance of the updated Policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">11. Contact Us</h2>
            <p className="text-sm leading-relaxed">
              For any questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact us:
            </p>
            <div className="mt-4 p-5 bg-slate-50 border border-slate-200 rounded-xl text-sm space-y-1">
              <p><strong>UES Abroad</strong></p>
              <p>123 Education Hub, MG Road, Bangalore, Karnataka, India - 560001</p>
              <p>Email: <a href="mailto:support@uesabroad.com" className="text-emerald-600 hover:underline">support@uesabroad.com</a></p>
              <p>Phone: +91 98765 43210</p>
            </div>
          </section>

        </div>
      </div>
    </PublicLayout>
  );
}
