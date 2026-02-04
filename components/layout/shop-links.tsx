"use client"

import Link from "next/link"
import type { Collection } from "@/lib/hygraph/types"
import { cn } from "@/lib/utils"

interface ShopLinksProps {
  label?: string
  collections: Collection[]
  className?: string
}

export function ShopLinks({ label = "Shop", collections, className }: ShopLinksProps) {
  return (
    <div className={cn("mb-6", className)}>
      <h3 className="text-sm font-semibold uppercase mb-3">{label}</h3>
      <ul className="flex flex-col gap-2">
        {collections.map((collection) => (
          <li key={collection.handle}>
            <Link 
              href={`/shop/${collection.handle}`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {collection.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
