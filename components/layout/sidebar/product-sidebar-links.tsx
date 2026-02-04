"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

const sidebarLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
]

interface SidebarLinksProps {
  className?: string
  size?: "sm" | "base"
  invert?: boolean
}

export function SidebarLinks({ className, size = "sm", invert = false }: SidebarLinksProps) {
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {sidebarLinks.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            prefetch
            className={cn(
              "block px-3 py-2 transition-colors whitespace-nowrap rounded font-bold",
              size === "sm" ? "text-xs" : "text-sm",
              invert
                ? "bg-background text-foreground hover:bg-background/80"
                : "bg-white text-foreground hover:bg-white/80"
            )}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}
