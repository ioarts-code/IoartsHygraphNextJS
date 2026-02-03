import { getProducts } from "@/lib/hygraph"
import type { Metadata, Product } from "@/lib/hygraph/types"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { FeaturedProductLabel } from "@/components/products/featured-product-label"

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse our collection of art and design products",
}

export const revalidate = 60

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

export default async function ShopPage() {
  const products = await getProducts({ limit: 50 })

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Shop All</h1>
        <p className="text-muted-foreground mt-2 hidden md:block">Explore our complete collection</p>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {products.map((product) => (
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
