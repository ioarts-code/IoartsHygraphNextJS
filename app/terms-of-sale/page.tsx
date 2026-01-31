import { PageLayout } from "@/components/layout/page-layout"

export const metadata = {
  title: "Terms of Sale",
  description: "Our terms of sale and policies for purchases",
}

export default function TermsOfSalePage() {
  return (
    <PageLayout>
      <div className="max-w-3xl mx-auto py-12 px-4 md:px-6">
        <h1 className="text-4xl font-bold mb-8">Terms of Sale</h1>
        
        <div className="space-y-8 text-foreground/90 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold mb-3">1. General Terms</h2>
            <p>
              Welcome to our online store. These terms of sale govern your purchase of products from our website. By placing an order, you agree to be bound by these terms and conditions. We reserve the right to modify these terms at any time, and such modifications shall be effective immediately upon posting.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">2. Product Information</h2>
            <p>
              We strive to provide accurate descriptions and images of our products. However, we do not warrant that product descriptions, pricing, or other content on our website is accurate, complete, or error-free. We reserve the right to correct any errors and to revoke any offer made on our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">3. Pricing and Availability</h2>
            <p>
              All prices are subject to change without notice. We reserve the right to limit quantities and to discontinue any product at any time. Products are subject to availability. If a product is unavailable, we will notify you and provide options for a refund or alternative product.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">4. Order Acceptance</h2>
            <p>
              We reserve the right to refuse or cancel any order. An order confirmation email does not constitute acceptance of your order. Your order is accepted only when we ship the product to you. We reserve the right to cancel orders that contain inaccurate or fraudulent information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">5. Payment</h2>
            <p>
              Payment must be received in full before shipment unless otherwise agreed in writing. We accept all major credit cards and other payment methods as indicated at checkout. All transactions are processed securely. By providing payment information, you represent that you are authorized to use the payment method and that the information is accurate and complete.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">6. Shipping and Delivery</h2>
            <p>
              We ship orders to addresses within the continental United States and select international locations. Shipping costs will be calculated and displayed before you complete your purchase. Delivery times are estimates and are not guaranteed. We are not responsible for delays caused by shipping carriers or customs. Risk of loss passes to you upon delivery to the shipping carrier.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">7. Returns and Refunds</h2>
            <p>
              We offer returns within 30 days of purchase for most items in original, unused condition with original packaging. Some items may have different return policies. To initiate a return, please contact us with your order number. Refunds will be issued in the same manner as the original payment within 7-10 business days of receiving the returned item. Shipping costs are non-refundable unless the return is due to our error.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">8. Defective Products</h2>
            <p>
              If you receive a defective product, please contact us immediately with photos and documentation. We will repair or replace the product at no cost to you. This warranty does not cover damage caused by misuse, accidents, or normal wear and tear.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">9. Limitation of Liability</h2>
            <p>
              In no event shall we be liable for any indirect, incidental, special, or consequential damages arising out of your use of our website or products, even if we have been advised of the possibility of such damages. Our total liability to you shall not exceed the purchase price of the product in question.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">10. Governing Law</h2>
            <p>
              These terms of sale shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions. You agree to submit to the exclusive jurisdiction of the courts located in our principal place of business.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">11. Contact Information</h2>
            <p>
              If you have any questions about these terms of sale, please contact us at the phone number or address listed in our contact information. We are committed to resolving any issues or disputes in a timely and professional manner.
            </p>
          </section>
        </div>
      </div>
    </PageLayout>
  )
}
