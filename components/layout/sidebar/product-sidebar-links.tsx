"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

interface SidebarLinksProps {
  className?: string
}

const links = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Sale", href: "/terms-of-sale" },
  { label: "Copyright Info", href: "/copyright-info" },
]

export function SidebarLinks({ className }: SidebarLinksProps) {
  return (
    <ul className={cn("flex flex-col gap-1", className)}>
      {links.map((link) => (
        <li key={link.href}>
          <Link 
            href={link.href}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}
