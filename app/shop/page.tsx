"use client"

import { useState } from "react"
import type { Product } from "@/lib/hygraph/types"
import Image from "next/image"
import Link from "next/link"
import { FeaturedProductLabel } from "@/components/products/featured-product-label"
import { cn } from "@/lib/utils"

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="relative">
      <Link href={`/product/${product.handle}`} className="block w-full aspect-square" prefetch>
        <Image
          src={product.featuredImage?.url || "/placeholder.svg"}
          alt={product.featuredImage?.altText || product.title}
          width={1000}
          height={1000}
          className="object-contain xl:object-cover size-full -translate-y-8"
        />
      </Link>
      <div className="absolute flex p-sides inset-0 items-end pointer-events-none justify-end">
        <FeaturedProductLabel className="pointer-events-auto" product={product} />
      </div>
    </div>
  )
}

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

const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "A - Z", value: "a-z" },
  { label: "Z - A", value: "z-a" },
]

interface ShopPageProps {
  initialProducts: Product[]
}

export default function ShopPage({ initialProducts }: ShopPageProps) {
  const [sortBy, setSortBy] = useState("newest")
  const sortedProducts = sortProducts(initialProducts, sortBy)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Shop All</h1>
        <p className="text-muted-foreground mt-2 hidden md:block">Explore our complete collection</p>
      </div>

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

      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-[40vh]">
          <p className="text-muted-foreground">No products available</p>
        </div>
      )}
    </div>
  )
}
