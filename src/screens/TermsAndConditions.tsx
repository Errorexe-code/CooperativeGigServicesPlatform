import { BackHeader } from '@/components/BackHeader';

const sections = [
  {
    title: '1. Introduction',
    body: `Welcome to Sahayog ("Platform"), a community cooperative gig services marketplace connecting skilled local workers with households and individuals. By accessing or using Sahayog, you agree to be bound by these Terms and Conditions ("Terms"). Please read them carefully before using the Platform.\n\nThese Terms constitute a legally binding agreement between you ("User") and Sahayog Cooperative Society ("Sahayog", "we", "our", or "us"), registered under the Cooperative Societies Act.`,
  },
  {
    title: '2. Eligibility',
    body: `You must be at least 18 years of age to use this Platform. By using Sahayog, you represent and warrant that you have the legal capacity to enter into a binding contract. Users registering as Workers must provide accurate information and hold relevant skills or certifications where legally required.`,
  },
  {
    title: '3. Services Offered',
    body: `Sahayog facilitates connections between Customers and Workers for household and community services including, but not limited to:\n\n• Electrical work (licensed electricians)\n• Plumbing and pipe fitting\n• Cooking and catering\n• Private tutoring and academic coaching\n• Carpentry and woodwork\n• Cleaning and home maintenance\n\nSahayog is a platform intermediary and does not directly employ Workers. All services are rendered independently by verified cooperative members.`,
  },
  {
    title: '4. Community Vouching System',
    body: `Sahayog uses a community-vouching trust model in place of formal KYC verification. Under this system:\n\n• A Worker's profile becomes publicly visible only after a minimum of 3 community vouches from verified users.\n• Vouching users take on moral responsibility for the Worker's conduct.\n• False or fraudulent vouches may result in suspension of the vouching user's account.\n• Sahayog reserves the right to remove vouches or suspend accounts upon receiving credible complaints.\n\nThe vouching system is supplementary to, and does not replace, due diligence on the part of Customers.`,
  },
  {
    title: '5. Cooperative Earnings Split',
    body: `All service payments processed through the Platform are distributed transparently as follows:\n\n• Worker Share: 81% of the total service fee is paid directly to the Worker.\n• Platform Fee: 10% is retained by Sahayog to cover operational costs, technology, and customer support.\n• Cooperative Fund: 9% is contributed to the Sahayog Cooperative Fund, used for member welfare, skill training programmes, emergency financial assistance, and cooperative infrastructure development.\n\nThis split is fixed and applies to all bookings made through the Platform. Workers acknowledge and consent to this distribution model upon registration.`,
  },
  {
    title: '6. Booking and Payment',
    body: `Customers may browse, select, and book Workers through the Platform. All payments are processed digitally. Cash payments are not facilitated by Sahayog.\n\n• Bookings are confirmed upon Worker acceptance.\n• Customers may cancel a booking up to 2 hours before the scheduled service time without charge.\n• Late cancellations (under 2 hours) may attract a cancellation fee of up to 20% of the service amount.\n• Payment is released to the Worker only after the Customer confirms service completion.`,
  },
  {
    title: '7. QR Verification',
    body: `Each registered Worker is issued a unique QR code tied to their cooperative membership and active bookings. Customers are encouraged to verify Worker identity by scanning this QR code before allowing service commencement. Sahayog is not liable for losses arising from failure to verify Worker identity using the in-app QR system.`,
  },
  {
    title: '8. User Obligations',
    body: `All Users agree to:\n\n• Provide accurate, current, and complete information during registration.\n• Treat other Users with respect and dignity.\n• Not engage in discriminatory, abusive, or fraudulent conduct.\n• Not attempt to circumvent the Platform by arranging payments outside Sahayog after initial contact through the app.\n• Report any suspicious activity, safety concerns, or platform abuse to Sahayog support promptly.`,
  },
  {
    title: '9. Limitation of Liability',
    body: `Sahayog acts solely as an intermediary platform. To the fullest extent permitted by law, Sahayog shall not be liable for:\n\n• The quality, safety, legality, or outcome of any service rendered by a Worker.\n• Any physical, financial, or other harm arising from a service booking.\n• Interruptions to service due to technical issues, network outages, or force majeure events.\n\nWorkers are independent contractors and are solely responsible for their work, conduct, and compliance with applicable laws.`,
  },
  {
    title: '10. Privacy & Data',
    body: `Sahayog collects and processes personal data (name, phone number, location, booking history) in accordance with our Privacy Policy and applicable Indian data protection laws. Your data is used solely to facilitate services, improve the Platform, and operate the cooperative. We do not sell your personal data to third parties.\n\nLocation data is used only during active sessions to match Workers and Customers and is not stored beyond the duration of a booking.`,
  },
  {
    title: '11. Dispute Resolution',
    body: `In the event of a dispute between a Customer and a Worker, Users are encouraged to first attempt resolution through the in-app support channel. Unresolved disputes may be escalated to the Sahayog Cooperative Dispute Committee, whose decision shall be binding on both parties.\n\nFor disputes involving Sahayog directly, the matter shall be subject to arbitration under the Arbitration and Conciliation Act, 1996, with the seat of arbitration in Bangalore, Karnataka.`,
  },
  {
    title: '12. Governing Law',
    body: `These Terms shall be governed by and construed in accordance with the laws of India. Any legal proceedings arising out of these Terms shall be subject to the exclusive jurisdiction of the courts in Bangalore, Karnataka.`,
  },
  {
    title: '13. Amendments',
    body: `Sahayog reserves the right to amend these Terms at any time. Users will be notified of material changes via in-app notification or registered phone number. Continued use of the Platform after notification of changes constitutes acceptance of the revised Terms.`,
  },
  {
    title: '14. Contact Us',
    body: `For questions, concerns, or support related to these Terms, please contact:\n\nSahayog Cooperative Society\nNo. 14, 3rd Cross, Koramangala 4th Block\nBangalore – 560034, Karnataka\nEmail: support@sahayog.coop\nPhone: +91 80 4567 8900`,
  },
];

export function TermsAndConditions() {
  return (
    <div className="flex flex-col min-h-screen bg-cream">
      <BackHeader title="Terms & Conditions" subtitle="Last updated: 1 September 2024" />

      <main className="flex-1 overflow-y-auto px-4 pt-4 pb-10 scrollbar-hide">
        {/* Intro badge */}
        <div className="flex items-start gap-3 p-4 bg-brand-light rounded-2xl border border-brand/10 mb-5">
          <span className="text-2xl flex-shrink-0">📋</span>
          <p className="text-sm text-green-800 leading-relaxed">
            These Terms govern your use of the Sahayog cooperative gig platform. By using the app, you agree to these
            terms. Please read carefully.
          </p>
        </div>

        <div className="space-y-4">
          {sections.map((s) => (
            <Section key={s.title} title={s.title} body={s.body} />
          ))}
        </div>

        <div className="mt-6 p-4 bg-stone-100 rounded-2xl text-center">
          <p className="text-xs text-stone-500 leading-relaxed">
            By using Sahayog, you acknowledge that you have read, understood, and agree to be bound by these Terms and
            Conditions.
          </p>
          <p className="text-xs text-stone-400 mt-2">© 2024 Sahayog Cooperative Society. All rights reserved.</p>
        </div>
      </main>
    </div>
  );
}

function Section({ title, body }: { title: string; body: string }) {
  return (
    <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden">
      <div className="px-4 py-3 border-b border-stone-50">
        <h3 className="font-semibold text-stone-900 text-sm">{title}</h3>
      </div>
      <div className="px-4 py-3">
        {body.split('\n\n').map((para, i) => (
          <p key={i} className={`text-sm text-stone-600 leading-relaxed ${i > 0 ? 'mt-3' : ''}`}>
            {para.split('\n').map((line, j) => (
              <span key={j}>
                {line}
                {j < para.split('\n').length - 1 && <br />}
              </span>
            ))}
          </p>
        ))}
      </div>
    </div>
  );
}
