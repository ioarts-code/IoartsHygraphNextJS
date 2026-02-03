import type React from "react"
import { getCollections } from "@/lib/hygraph"
import { PageLayout } from "@/components/layout/page-layout"
import Link from "next/link"
import type { Collection } from "@/lib/hygraph/types"
import { cn } from "@/lib/utils"

export const revalidate = 60

const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Popular", value: "popular" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "A - Z", value: "a-z" },
  { label: "Z - A", value: "z-a" },
]

function ShopLinksComponent({ collections, className }: { collections: Collection[]; className?: string }) {
  return (
    <div className={cn("bg-white dark:bg-card rounded-lg p-4 w-full max-w-xs lg:max-w-sm", className)}>
      <h4 className="text-lg font-extrabold md:text-xl text-foreground mb-4">Filter</h4>
      <ul className="flex flex-col gap-2">
        {collections.map((item, index) => (
          <li key={`${item.handle}-${index}`}>
            <Link 
              href={`/shop/${item.handle}`} 
              prefetch
              className="block px-3 py-2 bg-black dark:bg-black text-white hover:bg-black/80 transition-colors text-xs md:text-sm whitespace-nowrap rounded font-bold"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SortComponent({ className }: { className?: string }) {
  return (
    <div className={cn("bg-white dark:bg-card rounded-lg p-4 w-full max-w-xs lg:max-w-sm", className)}>
      <h4 className="text-lg font-extrabold md:text-xl text-foreground mb-4">Sort</h4>
      <ul className="flex flex-col gap-2">
        {SORT_OPTIONS.map((option) => (
          <li key={option.value}>
            <button 
              className="block px-3 py-2 bg-black dark:bg-black text-white hover:bg-black/80 transition-colors text-xs md:text-sm whitespace-nowrap rounded font-bold w-full text-left"
            >
              {option.label}
            </button>
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
        <aside className="hidden lg:block lg:col-span-3">
          <div className="sticky top-24 space-y-4">
            <ShopLinksComponent collections={collections} />
            <SortComponent />
          </div>
        </aside>
        <div className="col-span-12 lg:col-span-9">
          {children}
        </div>
      </div>
    </PageLayout>
  )
}
