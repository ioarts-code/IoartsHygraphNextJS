import { LogoSvg } from "./header/logo-svg"
import { ShopLinks } from "./shop-links"
import { SidebarLinks } from "./sidebar/product-sidebar-links"
import { getCollections } from "@/lib/hygraph"

const SOCIAL_LINKS = [
  { href: "https://www.deviantart.com/ioartseu/gallery/all", label: "DeviantArt" },
  { href: "https://www.etsy.com/shop/ioartseu", label: "Etsy" },
]

export async function Footer() {
  const collections = await getCollections()

  return (
    <footer className="p-sides">
      <div className="w-full md:h-[532px] p-sides md:p-11 text-background bg-foreground rounded-[12px] flex flex-col justify-between max-md:gap-8">
        <div className="flex flex-col justify-between md:flex-row">
          <LogoSvg className="md:basis-3/4 max-md:w-full max-w-[1200px] h-auto block" />
          <div className="flex gap-2 justify-end max-md:hidden">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-2xl font-bold transition-opacity hover:opacity-80 whitespace-nowrap"
                style={{ fontFamily: "var(--font-sedgwick-ave)" }}
              >
                {link.label}
              </a>
            ))}
          </div>
          <span className="mt-3 italic font-semibold md:hidden">Refined. Minimal. Never boring.</span>
        </div>
        <div className="flex justify-between max-md:contents text-muted-foreground">
          <SidebarLinks className="max-w-[450px] w-full max-md:flex-col gap-4" size="base" invert variant="text" />
          <p className="text-base">{new Date().getFullYear()}© — All rights reserved</p>
        </div>
      </div>
    </footer>
  )
}
