'use client'

import { PageLayout } from '@/components/layout/page-layout'

export default function PrivacyPolicyPage() {
  return (
    <PageLayout>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-2">Privacy & Cookie Policy</h1>
        <p className="text-muted-foreground mb-8">Last updated: January 2026</p>

        <div className="prose prose-sm max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3">1. Information We Collect</h2>
            <p>
              When you make a purchase, we collect basic information necessary to process your order:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Name and shipping address</li>
              <li>Email address</li>
              <li>Payment information (processed securely by our payment provider)</li>
              <li>Phone number (optional)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">2. How We Use Your Information</h2>
            <p>
              Your information is used solely for the following purposes:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Processing and fulfilling your orders</li>
              <li>Sending order confirmations and shipping updates</li>
              <li>Communicating with you regarding your purchase</li>
              <li>Preventing fraud and ensuring transaction security</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">3. Data Security</h2>
            <p>
              All payment information is processed through secure, encrypted channels. We do not store full credit card details on our servers. Your personal information is protected by industry-standard security measures.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">4. Cookies</h2>
            <p>
              Our website uses minimal cookies for essential functionality:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li><span className="font-semibold">Session cookies:</span> Used to maintain your shopping cart and session state</li>
              <li><span className="font-semibold">Analytics cookies:</span> Help us understand how visitors use our site (optional)</li>
              <li><span className="font-semibold">Preference cookies:</span> Remember your display preferences (theme, language)</li>
            </ul>
            <p className="mt-3">
              You can disable cookies in your browser settings, though this may affect site functionality.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">5. Third-Party Services</h2>
            <p>
              We use third-party service providers for:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Payment processing</li>
              <li>Shipping and delivery</li>
              <li>Analytics and site performance</li>
            </ul>
            <p className="mt-3">
              These providers are contractually obligated to use your information only as necessary to provide their services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">6. Data Retention</h2>
            <p>
              We retain your order information for as long as necessary to fulfill your purchase and comply with applicable laws. After this period, we securely delete your personal information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">7. Your Rights</h2>
            <p>
              You have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Request access to your personal information</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your information (subject to legal requirements)</li>
              <li>Opt-out of non-essential communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">8. Contact Us</h2>
            <p>
              If you have questions about this Privacy & Cookie Policy or your personal information, please contact us using the contact information provided on our website. We will respond to your inquiry within 7 business days.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">9. Policy Updates</h2>
            <p>
              We may update this policy from time to time. Any changes will be posted on this page with an updated date. Your continued use of our site constitutes your acceptance of the updated policy.
            </p>
          </section>
        </div>
      </div>
    </PageLayout>
  )
}
