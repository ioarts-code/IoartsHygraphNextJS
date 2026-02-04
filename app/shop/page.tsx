"use client"

import { useMemo } from "react"
import type { Product } from "@/lib/hygraph/types"
import Image from "next/image"
import Link from "next/link"
import { FeaturedProductLabel } from "@/components/products/featured-product-label"
import { useSortContext } from "./shop-layout-client"

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="relative">
      <Link href={`/product/${product.handle}`} className="block w-full aspect-square" prefetch>
        <Image
          src={product.featuredImage?.url || "/placeholder.svg"}
          alt={product.featuredImage?.altText || product.title}
          width={1000}
          height={1000}
          loading="eager"
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

export default function ShopPage() {
  const { sortBy, products } = useSortContext()
  const sortedProducts = useMemo(() => sortProducts(products, sortBy), [products, sortBy])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Shop All</h1>
        <p className="text-muted-foreground mt-2 hidden md:block">Explore our complete collection</p>
      </div>

      {sortedProducts && sortedProducts.length > 0 ? (
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
