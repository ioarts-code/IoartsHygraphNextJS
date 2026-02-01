'use client'

import { PageLayout } from '@/components/layout/page-layout'

export default function CopyrightInfoPage() {
  return (
    <PageLayout>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-2">Copyright & Attribution Information</h1>
        <p className="text-muted-foreground mb-8">Last updated: January 2026</p>

        <div className="prose prose-sm max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3">1. About This Site</h2>
            <p>
              I am an independent fan artist and individual creator, <span className="font-semibold">NOT a company or organization</span>. This site is a personal creative project showcasing fan-inspired vector designs and artwork based on themes I'm passionate about. I operate solely as a private individual creator.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">2. Fan Works & Original Interpretations</h2>
            <p>
              Many of the designs on this site are inspired by themes from video games, music, films, and other media that I am a fan of. When creating vector designs based on these themes, I always aim to develop <span className="font-semibold">my own original interpretation</span> rather than copying existing artwork. This means:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>I create unique vector designs that capture the spirit and aesthetic of themes I admire</li>
              <li>My designs are original artistic expressions inspired by, not reproductions of, existing works</li>
              <li>I put creative effort into reimagining these themes through my own artistic lens</li>
              <li>Each piece represents my personal interpretation and artistic contribution</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">3. Attribution & Ownership</h2>
            <p>
              I acknowledge and respect the original creators and intellectual property holders of the themes and franchises that inspire my work. When my designs are based on specific media or brands, I recognize the original creators and owners:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li><span className="font-semibold">Video Games:</span> Designs inspired by video game themes are fan creations and are not affiliated with or endorsed by the game publishers or developers</li>
              <li><span className="font-semibold">Music:</span> Music-themed designs respect the original artists and composers while offering my creative interpretation</li>
              <li><span className="font-semibold">Films:</span> Film-inspired artwork is fan-created and is not affiliated with film studios, production companies, or copyright holders</li>
              <li><span className="font-semibold">Other Media:</span> All fan-inspired designs credit the original intellectual property owners</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">4. I Am a Fan & Customer</h2>
            <p>
              I want to be clear: <span className="font-semibold">I am a devoted fan and customer of the original products and themes I draw inspiration from</span>. My work celebrates and honors these themes rather than diminishing them. I support the original creators through purchasing their products and sharing my passion for their work. My designs are a tribute to the themes and franchises I love, created by someone who genuinely cares about the original content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">5. Independent Creator Status</h2>
            <p>
              I am not representing myself as, and am not affiliated with, any official company, organization, or brand related to the themes in my work. I operate as an independent artist creating original fan interpretations for personal creative expression and small-scale sales. I do not claim ownership of the intellectual properties that inspire my designs.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">6. Fair Use & Creative Expression</h2>
            <p>
              My designs represent fan art and creative expression based on themes from media I admire. I create original vector interpretations that transform these themes into new artistic works. While I respect all copyrights and trademarks, I believe that fan creators like myself contribute to the cultural appreciation and celebration of the media we love.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">7. Respect for Intellectual Property</h2>
            <p>
              I fully respect the intellectual property rights of all original creators and copyright holders. If you are an intellectual property holder and have concerns about my work, please contact me directly. I am open to dialogue and will work to resolve any issues respectfully and appropriately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">8. Contact & Questions</h2>
            <p>
              If you have questions about my work, attribution practices, or concerns about intellectual property, please reach out using the contact information on this website. I'm committed to operating transparently and respectfully as an independent creator.
            </p>
          </section>
        </div>
      </div>
    </PageLayout>
  )
}
