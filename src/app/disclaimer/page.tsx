import { PublicLayout } from "@/components/layout/PublicLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer | UES Abroad",
  description: "UES Abroad's service disclaimer regarding the advisory nature of our study abroad consultancy, results, and third-party services.",
};

export default function DisclaimerPage() {
  const lastUpdated = "October 2026";
  return (
    <PublicLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="mb-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full mb-4">
            Legal Notice
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3">Disclaimer</h1>
          <p className="text-slate-500 text-sm">
            Last updated: <strong>{lastUpdated}</strong>
          </p>
        </div>

        <div className="space-y-10 text-slate-700">

          {/* Warning Banner */}
          <div className="p-6 bg-amber-50 border-l-4 border-amber-400 rounded-r-xl">
            <p className="text-sm font-semibold text-amber-800 mb-1">Please Read Carefully</p>
            <p className="text-sm text-amber-700 leading-relaxed">
              UES Abroad is an education advisory and consultancy service. All information, recommendations, and guidance provided on this platform are for informational purposes only and do not constitute professional legal, financial, or immigration advice.
            </p>
          </div>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">No Guarantee of Admission</h2>
            <p className="text-sm leading-relaxed">
              UES Abroad does not guarantee admission into any university, college, or educational institution. Admission decisions are made entirely and exclusively by the respective academic institutions based on their own eligibility criteria, available seats, and internal evaluation processes. Our role is to assist and guide your application — the final decision rests solely with the institution.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">No Guarantee of Visa Approval</h2>
            <p className="text-sm leading-relaxed">
              Visa and immigration decisions are made exclusively by the sovereign immigration authorities of the respective destination countries (e.g., UK Home Office, US USCIS, German Ausländerbehörde). UES Abroad provides preparation support and guidance but has no control over, and accepts no responsibility for, any visa refusal, delay, or revocation. Past student success rates referenced on this platform reflect historical data and are not a guarantee of future outcomes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">Accuracy of Information</h2>
            <p className="text-sm leading-relaxed">
              While we strive to ensure all information on the UES Abroad platform is accurate and up-to-date, university admission requirements, tuition fees, scholarship criteria, visa regulations, and living costs are subject to frequent change without notice. We recommend independently verifying all critical information directly with the respective university's official admissions office or the destination country's official immigration portal before making decisions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">Third-Party Services</h2>
            <p className="text-sm leading-relaxed">
              UES Abroad may recommend or facilitate connections with third-party services including, but not limited to, accommodation providers, Forex/currency exchange partners, test preparation centres, and insurance providers. These recommendations are provided in good faith as value-added services. UES Abroad is not responsible for the quality, reliability, availability, or outcomes of any third-party service provider's offerings. Your engagement with any third party is at your own discretion and risk.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">Forex & Financial Information</h2>
            <p className="text-sm leading-relaxed">
              Currency exchange rates, savings comparisons, and cost estimates displayed on our Forex Calculator are indicative only and sourced from open financial data APIs. These rates fluctuate continuously and may differ from rates available at the time of actual transaction. UES Abroad is not a bank, money transmitter, or financial institution. All Forex transactions are handled by independently regulated RBI-authorized partners, and UES Abroad makes no representations as to the commercial terms or outcomes of such transactions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">Blog & Educational Content</h2>
            <p className="text-sm leading-relaxed">
              Blog articles, guides, and resource content published on UES Abroad are intended for general educational and informational purposes only. They do not constitute professional legal, immigration, or financial advice. We recommend consulting qualified legal or immigration professionals for advice specific to your individual circumstances.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">Results May Vary</h2>
            <p className="text-sm leading-relaxed">
              Testimonials, success stories, and statistics referenced on this platform reflect the real experiences of past clients but are not representative of every student's outcome. Individual results will vary based on academic profile, chosen destination, programme competitiveness, personal circumstances, and factors outside our control.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">Contact for Concerns</h2>
            <p className="text-sm leading-relaxed mb-4">
              If you have any concerns about the accuracy of information on this platform or require clarification on any advisory guidance received, please contact us directly:
            </p>
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl text-sm space-y-1">
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
