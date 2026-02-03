import type React from "react"
import { DesktopFilters } from "./components/shop-filters"
import { Suspense } from "react"
import { getCollections } from "@/lib/hygraph"
import { PageLayout } from "@/components/layout/page-layout"
import { MobileFilters } from "./components/mobile-filters"
import { ProductsProvider } from "./providers/products-provider"

// Enable ISR with 1 minute revalidation for the layout
export const revalidate = 60

function DesktopFiltersSkeleton() {
  return (
    <aside className="col-span-3 max-md:hidden grid sticky top-0 grid-cols-3 h-screen min-h-max pl-sides pt-top-spacing">
      <div className="flex flex-col col-span-3 xl:col-span-2 gap-4">
        <div className="h-8 bg-muted rounded animate-pulse" />
      </div>
    </aside>
  )
}

function MobileFiltersSkeleton() {
  return (
    <div className="pt-top-spacing bg-background md:hidden overflow-x-clip">
      <div className="grid grid-cols-3 items-center px-4 py-3">
        <div className="h-6 bg-muted rounded animate-pulse" />
        <div className="h-4 bg-muted rounded animate-pulse" />
        <div className="h-6 bg-muted rounded animate-pulse" />
      </div>
    </div>
  )
}

export default async function ShopLayout({ children }: { children: React.ReactNode }) {
  const collections = await getCollections()

  return (
    <PageLayout>
      <ProductsProvider>
        <div className="flex flex-col md:grid grid-cols-12 md:gap-sides">
          <Suspense fallback={<DesktopFiltersSkeleton />}>
            <DesktopFilters collections={collections} className="col-span-3 max-md:hidden" />
          </Suspense>
          <Suspense fallback={<MobileFiltersSkeleton />}>
            <MobileFilters collections={collections} />
          </Suspense>
          <div className="col-span-9 flex flex-col h-full md:pt-top-spacing">
            <Suspense fallback={null}>{children}</Suspense>
          </div>
        </div>
      </ProductsProvider>
    </PageLayout>
  )
}
