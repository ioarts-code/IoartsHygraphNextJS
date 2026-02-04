"use client"

import type React from "react"
import { createContext, useState, useContext } from "react"
import { PageLayout } from "@/components/layout/page-layout"
import Link from "next/link"
import type { Collection } from "@/lib/hygraph/types"
import { cn } from "@/lib/utils"

const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "A - Z", value: "a-z" },
  { label: "Z - A", value: "z-a" },
]

interface SortContextType {
  sortBy: string
  setSortBy: (value: string) => void
}

const SortContext = createContext<SortContextType | undefined>(undefined)

export function useSortContext() {
  const context = useContext(SortContext)
  if (!context) {
    throw new Error("useSortContext must be used within SortProvider")
  }
  return context
}

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
  const { sortBy, setSortBy } = useSortContext()

  return (
    <div className={cn("bg-white dark:bg-card rounded-lg p-4 w-full max-w-xs lg:max-w-sm", className)}>
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
  )
}

interface ShopLayoutClientProps {
  children: React.ReactNode
  collections: Collection[]
}

export function ShopLayoutClient({ children, collections }: ShopLayoutClientProps) {
  const [sortBy, setSortBy] = useState("newest")

  return (
    <SortContext.Provider value={{ sortBy, setSortBy }}>
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
    </SortContext.Provider>
  )
}
