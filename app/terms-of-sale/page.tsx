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
            <h2 className="text-2xl font-semibold mb-3">1. About the Seller</h2>
            <p>
              I am a private seller operating independently. These terms of sale govern your purchase of artwork and products from my online store. By placing an order, you acknowledge and agree to these terms and conditions. Please review them carefully before making a purchase.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">2. Product Information and Images</h2>
            <p>
              I provide detailed descriptions and high-quality images of all products for sale. Each item is carefully curated and hand-selected. While I strive for accuracy in all product information, lighting conditions and individual device displays may affect how colors and details appear online. I recommend reviewing all images and descriptions thoroughly before purchasing.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">3. Pricing and Inventory</h2>
            <p>
              All prices are listed in USD and are subject to change without notice. Since I am a private seller with limited inventory, products are available on a first-come, first-served basis. Once an item is sold, it cannot be replenished in the same exact form. If a product becomes unavailable after you place an order, I will contact you immediately to discuss options.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">4. Order Placement and Confirmation</h2>
            <p>
              Once you place an order, you will receive a confirmation email. This confirms that I have received your order and have begun processing it. I reserve the right to cancel any order that contains inaccurate, incomplete, or fraudulent information. All orders are final once processed and shipped.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">5. Payment Terms</h2>
            <p>
              Payment in full is required before shipment. I accept major credit cards and other secure payment methods as displayed at checkout. All payments are processed through secure channels. By providing payment information, you confirm that you are authorized to use that payment method and that all information provided is accurate.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">6. Shipping and Delivery</h2>
            <p>
              I ship orders domestically and to select international locations. Shipping costs are calculated and displayed before checkout and are separate from the product price. Estimated delivery times are provided as a courtesy but are not guaranteed. Once shipped, responsibility for the package transfers to the shipping carrier. I recommend selecting insurance and signature confirmation for high-value items.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">7. No Returns Policy</h2>
            <p>
              <span className="font-semibold">As a private seller, I do not accept returns.</span> I take great care in accurately describing and photographing all items, and I encourage you to ask questions before purchasing. Once a sale is completed and the item is shipped, the transaction is final. All sales are as-is. I recommend examining product photos and descriptions carefully and contacting me with any questions prior to purchase.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">8. Cancellations</h2>
            <p>
              While returns are not accepted, I may consider cancellation requests under specific circumstances, such as payment or shipping errors on my part. Cancellation requests must be submitted within 24 hours of purchase, before the item has been shipped. Any approved cancellations will result in a full refund minus any applicable fees. Once an item has been shipped, cancellation is not possible, and you will need to refuse delivery or arrange return shipping at your own expense.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">9. Damaged or Lost Items</h2>
            <p>
              If your item arrives damaged or lost, please contact me immediately with photographic evidence and your order number. I will work with you and the shipping carrier to investigate and resolve the issue, which may include filing a claim or arranging a replacement if available. It is your responsibility to file a claim with the carrier if the damage occurred during transit.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">10. Limitation of Liability</h2>
            <p>
              I am not responsible for any indirect, incidental, or consequential damages resulting from your purchase or use of any product. My total liability shall not exceed the amount paid for the product. By purchasing from me, you assume all risks associated with the transaction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">11. Modifications to These Terms</h2>
            <p>
              I reserve the right to modify these terms of sale at any time. Changes will be effective immediately upon posting to this page. Your continued use of this store following any modifications constitutes your acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">12. Contact</h2>
            <p>
              If you have any questions about these terms of sale or your purchase, please reach out to me using the contact information provided on this website. I am happy to discuss any concerns or clarifications before you purchase.
            </p>
          </section>
        </div>
      </div>
    </PageLayout>
  )
}
