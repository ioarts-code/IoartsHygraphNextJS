import { storeCatalog } from "@/lib/hygraph/constants"
import ProductList from "./components/product-list"
import type { Metadata } from "next"
import { Suspense } from "react"
import ResultsControls from "./components/results-controls"
import { ProductGrid } from "./components/product-grid"
import { ProductCardSkeleton } from "./components/product-card-skeleton"

export const metadata: Metadata = {
  title: "Shop All Products",
  description:
    "Browse our complete collection of premium art and design products. Find unique pieces that inspire creativity.",
  openGraph: {
    title: "Shop All Products | ioarts.ink",
    description: "Browse our complete collection of premium art and design products.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop All Products | ioarts.ink",
    description: "Browse our complete collection of premium art and design products.",
  },
}

// Enable ISR with 1 minute revalidation
export const revalidate = 60

export default async function Shop(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParams = await props.searchParams

  return (
    <>
      <Suspense
        fallback={
          <>
            <ResultsControls className="max-md:hidden" collections={[]} products={[]} />
            <ProductGrid>
              {Array.from({ length: 12 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </ProductGrid>
          </>
        }
      >
        <ProductList collection={storeCatalog.rootCategoryId} searchParams={searchParams} />
      </Suspense>
    </>
  )
}
