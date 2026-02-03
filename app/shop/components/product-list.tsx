import { getCollectionProducts, getCollections, getProducts } from "@/lib/hygraph"
import type { Product, ProductCollectionSortKey, ProductSortKey } from "@/lib/hygraph/types"
import { ProductListContent } from "./product-list-content"
import { mapSortKeys } from "@/lib/hygraph/utils"
import { Suspense } from "react"
import { ProductGrid } from "./product-grid"
import { ProductCardSkeleton } from "./product-card-skeleton"

interface ProductListProps {
  collection: string
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function ProductList({ collection, searchParams }: ProductListProps) {
  const query = typeof searchParams?.q === "string" ? searchParams.q : undefined
  const sort = typeof searchParams?.sort === "string" ? searchParams.sort : undefined
  const isRootCollection = collection === "joyco-root" || collection === "all" || !collection

  const { sortKey, reverse } = isRootCollection ? mapSortKeys(sort, "product") : mapSortKeys(sort, "collection")

  let products: Product[] = []

  try {
    if (isRootCollection) {
      products = await getProducts({
        sortKey: sortKey as ProductSortKey,
        query,
        reverse,
      })
    } else {
      products = await getCollectionProducts({
        collection,
        query,
        sortKey: sortKey as ProductCollectionSortKey,
        reverse,
      })
    }
  } catch (error) {
    console.error("Error fetching products:", error)
    products = []
  }

  const collections = await getCollections()

  return (
    <Suspense
      fallback={
        <ProductGrid>
          {Array.from({ length: 12 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </ProductGrid>
      }
    >
      <ProductListContent products={products} collections={collections} />
    </Suspense>
  )
}
