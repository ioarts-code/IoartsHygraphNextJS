import type React from "react"
import { getCollections } from "@/lib/hygraph"
import { PageLayout } from "@/components/layout/page-layout"
import Link from "next/link"
import type { Collection } from "@/lib/hygraph/types"
import { cn } from "@/lib/utils"

export const revalidate = 60

function ShopLinksComponent({ collections, className }: { collections: Collection[]; className?: string }) {
  return (
    <div className={cn("text-left", className)}>
      <h4 className="text-lg font-extrabold md:text-xl">Shop</h4>
      <ul className="flex flex-col gap-1.5 leading-5 mt-5">
        {collections.map((item, index) => (
          <li key={`${item.handle}-${index}`}>
            <Link href={`/shop/${item.handle}`} prefetch>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default async function ShopLayout({ children }: { children: React.ReactNode }) {
  const collections = await getCollections()

  return (
    <PageLayout>
      <div className="grid grid-cols-12 gap-sides">
        <aside className="col-span-3 max-md:hidden">
          <ShopLinksComponent collections={collections} className="sticky top-24" />
        </aside>
        <div className="col-span-9 max-md:col-span-12">
          {children}
        </div>
      </div>
    </PageLayout>
  )
}
