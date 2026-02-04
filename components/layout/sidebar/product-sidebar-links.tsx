"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

const sidebarLinks: { href: string; label: string; external?: boolean }[] = [
  { href: "https://www.deviantart.com/", label: "DeviantArt", external: true },
  { href: "https://www.etsy.com/", label: "Etsy", external: true },
  { href: "/copyright", label: "Copyright" },
  { href: "/privacy-policy", label: "Privacy Policy" },
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
          {item.external ? (
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "block px-3 py-2 transition-colors whitespace-nowrap rounded font-bold",
                size === "sm" ? "text-xs" : "text-sm",
                invert
                  ? "bg-background text-foreground hover:bg-background/80"
                  : "bg-white text-foreground hover:bg-white/80"
              )}
            >
              {item.label}
            </a>
          ) : (
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
          )}
        </li>
      ))}
    </ul>
  )
}
