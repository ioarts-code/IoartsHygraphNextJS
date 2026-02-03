"use client"

import { useState } from "react"
import type { Product } from "@/lib/hygraph/types"
import { cn } from "@/lib/utils"

const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "A - Z", value: "a-z" },
  { label: "Z - A", value: "z-a" },
]

function sortProducts(products: Product[], sortBy: string): Product[] {
  const sorted = [...products]
  
  switch (sortBy) {
    case "a-z":
      return sorted.sort((a, b) => a.title.localeCompare(b.title))
    case "z-a":
      return sorted.sort((a, b) => b.title.localeCompare(a.title))
    case "newest":
    default:
      return sorted
  }
}

interface SortUIProps {
  initialProducts: Product[]
}

export function SortUI({ initialProducts }: SortUIProps) {
  const [sortBy, setSortBy] = useState("newest")
  const sortedProducts = sortProducts(initialProducts, sortBy)

  return (
    <div className="lg:hidden bg-white dark:bg-card rounded-lg p-4 w-fit">
      <h4 className="text-lg font-extrabold md:text-xl text-foreground mb-4">Sort</h4>
      <ul className="flex flex-col gap-2">
        {SORT_OPTIONS.map((option) => (
          <li key={option.value}>
            <button 
              onClick={() => setSortBy(option.value)}
              className={cn("block px-3 py-2 rounded font-bold w-full text-left transition-colors text-xs md:text-sm whitespace-nowrap", 
                sortBy === option.value 
                  ? "bg-black dark:bg-black text-white" 
                  : "bg-gray-200 dark:bg-gray-700 text-foreground hover:bg-black/80 hover:text-white"
              )}
            >
              {option.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
