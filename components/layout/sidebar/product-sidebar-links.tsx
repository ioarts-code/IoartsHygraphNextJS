"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

const sidebarLinks: { href: string; label: string; external?: boolean }[] = [
  { href: "/contact", label: "Contact" },
  { href: "/terms-of-sale", label: "Terms of Sale" },
  { href: "/privacy-policy", label: "Privacy Policy" },
]

interface SidebarLinksProps {
  className?: string
  size?: "sm" | "base"
  invert?: boolean
  variant?: "button" | "text"
}

export function SidebarLinks({ className, size = "sm", invert = false, variant = "button" }: SidebarLinksProps) {
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {sidebarLinks.map((item) => {
        const baseClass = variant === "text" 
          ? "hover:opacity-80 transition-opacity"
          : "block px-3 py-2 transition-colors whitespace-nowrap rounded font-bold"
        
        const sizeClass = variant === "text"
          ? size === "sm" ? "text-xs" : "text-base"
          : size === "sm" ? "text-xs" : "text-sm"
        
        const colorClass = variant === "text"
          ? invert ? "text-background" : "text-foreground/50"
          : invert ? "bg-background text-foreground hover:bg-background/80" : "bg-white text-foreground hover:bg-white/80"

        return (
          <li key={item.href}>
            {item.external ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(baseClass, sizeClass, colorClass)}
              >
                {item.label}
              </a>
            ) : (
              <Link
                href={item.href}
                prefetch
                className={cn(baseClass, sizeClass, colorClass)}
              >
                {item.label}
              </Link>
            )}
          </li>
        )
      })}
    </ul>
  )
}
