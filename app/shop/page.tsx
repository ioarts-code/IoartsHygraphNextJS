import { getProducts } from "@/lib/hygraph"
import type { Metadata } from "next"
import { ProductGrid } from "./components/product-grid"
import { LatestProductCard } from "@/components/products/latest-product-card"

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse our collection of art and design products",
}

export const revalidate = 60

export default async function ShopPage() {
  const products = await getProducts({ limit: 50 })

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Shop All</h1>
        <p className="text-muted-foreground mt-2">Explore our complete collection</p>
      </div>

      {products.length > 0 ? (
        <ProductGrid>
          {products.map((product) => (
            <LatestProductCard key={product.id} product={product} />
          ))}
        </ProductGrid>
      ) : (
        <div className="flex items-center justify-center min-h-[40vh]">
          <p className="text-muted-foreground">No products available</p>
        </div>
      )}
    </div>
  )
}
