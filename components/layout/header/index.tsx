"use client"

import MobileMenu from "./mobile-menu"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LogoSvg } from "./logo-svg"
import type { NavItem } from "@/lib/types"
import type { Collection } from "@/lib/hygraph/types"

export const navItems: NavItem[] = [
  {
    label: "home",
    href: "/",
  },
  {
    label: "shop all",
    href: "/shop",
  },
  {
    label: "Dev",
    href: "https://www.ioarts.se",
  },
]

interface HeaderProps {
  collections: Collection[]
}

export function Header({ collections }: HeaderProps) {
  const pathname = usePathname()

  return (
    <header className="grid fixed top-0 left-0 z-50 grid-cols-3 items-center w-full p-sides md:grid-cols-12 md:gap-sides bg-foreground text-background mt-0 px-5 py-2">
      <div className="block flex-none md:hidden">
        <MobileMenu collections={collections} />
      </div>

      <Link href="/" className="md:col-span-4 xl:col-span-3 md:ml-6" prefetch>
        <LogoSvg className="w-auto h-6 max-md:place-self-center md:w-full md:h-auto max-w-96" />
      </Link>

      <nav className="flex gap-2 items-center md:col-span-8 xl:col-span-9 justify-end pe-2">
        <ul className="flex items-center gap-4 p-1 px-3 rounded-sm backdrop-blur-md max-md:hidden bg-black">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "text-base transition-all duration-200 uppercase font-black relative",
                  pathname === item.href
                    ? "text-background"
                    : "text-background/50 hover:text-background hover:scale-110",
                )}
                prefetch
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
