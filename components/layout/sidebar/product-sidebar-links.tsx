"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

interface SidebarLinksProps {
  className?: string
  size?: "base" | "sm"
  invert?: boolean
}

const links = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Sale", href: "/terms-of-sale" },
  { label: "Copyright Info", href: "/copyright-info" },
]

export function SidebarLinks({ className, size = "sm", invert = false }: SidebarLinksProps) {
  return (
    <nav className={cn("flex gap-4", className)}>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "transition-colors hover:opacity-70 uppercase font-semibold",
            size === "base" ? "text-base" : "text-sm",
            invert ? "text-foreground" : "text-background"
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  )
}
