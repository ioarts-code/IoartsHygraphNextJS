"use client"

import Link from "next/link"
import type { Collection } from "@/lib/hygraph/types"
import { cn } from "@/lib/utils"

interface ShopLinksProps {
  collections: Collection[]
  className?: string
  align?: "left" | "right"
}

export function ShopLinks({ collections, className, align = "left" }: ShopLinksProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {collections.map((collection) => (
        <Link
          key={collection.id}
          href={`/shop/${collection.handle}`}
          className="text-base transition-colors hover:opacity-70 uppercase font-semibold"
        >
          {collection.title}
        </Link>
      ))}
    </div>
  )
}
