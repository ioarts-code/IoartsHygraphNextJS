"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { navItems } from "./index"
import { SidebarLinks } from "@/components/layout/sidebar/product-sidebar-links"
import type { Collection } from "@/lib/hygraph/types"
import { useBodyScrollLock } from "@/lib/hooks/use-body-scroll-lock"

interface MobileMenuProps {
  collections: Collection[]
}

function MobileShopLinks({ collections }: { collections: Collection[] }) {
  return (
    <div className="text-left">
      <h4 className="text-sm font-extrabold md:text-base mb-3">Categories</h4>
      <ul className="flex flex-col gap-1.5 leading-5">
        {collections.map((item, index) => (
          <li key={`${item.handle}-${index}`}>
            <Link href={`/shop/${item.handle}`} prefetch className="text-sm">
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function MobileMenu({ collections }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const openMobileMenu = () => setIsOpen(true)
  const closeMobileMenu = () => setIsOpen(false)

  // Lock body scroll when menu is open
  useBodyScrollLock(isOpen)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false)
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [isOpen])

  // Close menu when route changes
  useEffect(() => {
    closeMobileMenu()
  }, [pathname])

  return (
    <>
      <Button
        onClick={openMobileMenu}
        aria-label="Open mobile menu"
        variant="secondary"
        size="sm"
        className="uppercase md:hidden bg-white text-foreground hover:bg-white/90"
      >
        Menu
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-0 z-50 bg-foreground/30"
              onClick={closeMobileMenu}
              aria-hidden="true"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed top-0 bottom-0 left-0 flex w-full md:w-[400px] p-modal-sides z-50"
            >
              <div className="flex flex-col p-3 w-full rounded bg-foreground text-background md:p-4">
                <div className="flex justify-between items-baseline pl-2 mb-10">
                  <p className="text-2xl font-semibold">Menu</p>
                  <Button
                    size="sm"
                    variant="ghost"
                    aria-label="Close cart"
                    onClick={closeMobileMenu}
                    className="bg-white text-foreground hover:bg-white/90"
                  >
                    Close
                  </Button>
                </div>

                <nav className="flex flex-wrap gap-2 mb-10">
                  {navItems.map((item) => (
                    <Button
                      key={item.href}
                      size="sm"
                      variant="secondary"
                      onClick={closeMobileMenu}
                      className="w-auto justify-center uppercase bg-white text-foreground hover:bg-white/90"
                      asChild
                    >
                      <Link href={item.href} prefetch>
                        {item.label}
                      </Link>
                    </Button>
                  ))}
                </nav>

                <MobileShopLinks collections={collections} />

                <div className="mt-5 mb-6 text-sm leading-tight text-muted-foreground">
                  <p className="italic">Refined. Minimal. Never boring.</p>
                  <div className="mt-5">
                    <p>Furniture that speaks softly, but stands out loud.</p>
                    <p>Clean lines, crafted with wit.</p>
                    <p>Elegance with a wink — style first</p>
                  </div>
                </div>
                <SidebarLinks className="gap-2 w-full" size="sm" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
