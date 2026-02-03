'use client';

import Link from "next/link"
import type { Collection } from "@/lib/hygraph/types"
import { cn } from "@/lib/utils"

interface ShopLinksProps {
  collections: Collection[]
  align?: "left" | "right"
  label?: string
  className?: string
}

export function ShopLinks({ collections, label = "Shop", align = "left", className }: ShopLinksProps) {
  const handleCategoryClick = (handle: string, title: string) => {
    console.log("[v0] Shop category link clicked", { handle, title, timestamp: new Date().toISOString() })
  }

  return (
    <div className={cn(align === "right" ? "text-right" : "text-left", className)}>
      <h4 className="text-lg font-extrabold md:text-xl">{label}</h4>

      <ul className="flex flex-col gap-1.5 leading-5 mt-5">
        {collections.map((item, index) => (
          <li key={`${item.handle}-${index}`}>
            <Link href={`/shop/${item.handle}`} prefetch onClick={() => handleCategoryClick(item.handle, item.title)}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
