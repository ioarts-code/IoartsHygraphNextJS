"use client"

import Link from "next/link"
import type { Collection } from "@/lib/hygraph/types"
import { cn } from "@/lib/utils"

interface ShopLinksProps {
  collections: Collection[]
  label?: string
  className?: string
  align?: "left" | "right"
}

export function ShopLinks({ collections, label, className, align = "left" }: ShopLinksProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label && <p className="text-sm font-semibold mb-1">{label}</p>}
      <ul className={cn("flex flex-wrap gap-2", align === "right" && "justify-end")}>
        {collections.map((item, index) => (
          <li key={`${item.handle}-${index}`}>
            <Link
              href={`/shop/${item.handle}`}
              prefetch
              className="block px-3 py-2 bg-white text-foreground hover:bg-white/80 transition-colors text-xs md:text-sm whitespace-nowrap rounded font-bold"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
