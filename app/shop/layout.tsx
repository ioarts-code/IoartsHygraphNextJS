import type React from "react"
import { getCollections } from "@/lib/hygraph"
import { PageLayout } from "@/components/layout/page-layout"
import { ShopLinks } from "@/components/layout/shop-links"

export const revalidate = 60

export default async function ShopLayout({ children }: { children: React.ReactNode }) {
  const collections = await getCollections()

  return (
    <PageLayout>
      <div className="grid grid-cols-12 gap-sides">
        <aside className="col-span-3 max-md:hidden">
          <ShopLinks collections={collections} className="sticky top-24" />
        </aside>
        <div className="col-span-9 max-md:col-span-12">
          {children}
        </div>
      </div>
    </PageLayout>
  )
}
