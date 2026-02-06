"use client"

import type React from "react"
import { createContext, useState, useContext } from "react"
import Link from "next/link"
import type { Collection, Product } from "@/lib/hygraph/types"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "A - Z", value: "a-z" },
  { label: "Z - A", value: "z-a" },
]

const SOCIAL_LINKS = [
  { href: "https://www.deviantart.com/ioartseu/gallery/all", label: "DeviantArt" },
  { href: "https://www.etsy.com/shop/ioartseu", label: "Etsy" },
]

interface SortContextType {
  sortBy: string
  setSortBy: (value: string) => void
  products: Product[]
}

const SortContext = createContext<SortContextType | undefined>(undefined)

export function useSortContext() {
  const context = useContext(SortContext)
  if (!context) {
    throw new Error("useSortContext must be used within SortProvider")
  }
  return context
}

function FilterComponent({ collections, className }: { collections: Collection[]; className?: string }) {
  const pathname = usePathname()
  
  return (
    <div className={cn("bg-white dark:bg-card rounded-lg overflow-hidden w-full max-w-xs lg:max-w-sm", className)}>
      <div className="relative h-16 bg-black flex items-center justify-center mb-4">
        <h2 className="text-3xl font-black text-transparent" style={{
          WebkitTextStroke: "2px white",
          textStroke: "2px white",
          letterSpacing: "-0.02em"
        }}>
          Filters
        </h2>
      </div>
      <div className="px-4 pb-4">
        <ul className="flex flex-col gap-2">
          <li>
            <Link 
              href="/shop" 
              prefetch
              className={cn("block px-3 py-2 rounded font-bold text-xs md:text-sm whitespace-nowrap transition-colors",
                pathname === "/shop"
                  ? "bg-black dark:bg-black text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-foreground hover:bg-black/80 hover:text-white"
              )}
            >
              All
            </Link>
          </li>
          {collections.map((item, index) => (
            <li key={`${item.handle}-${index}`}>
              <Link 
                href={`/shop/${item.handle}`} 
                prefetch
                className={cn("block px-3 py-2 rounded font-bold text-xs md:text-sm whitespace-nowrap transition-colors",
                  pathname === `/shop/${item.handle}`
                    ? "bg-black dark:bg-black text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-foreground hover:bg-black/80 hover:text-white"
                )}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function SortComponent({ className }: { className?: string }) {
  const { sortBy, setSortBy } = useSortContext()

  return (
    <div className={cn("bg-white dark:bg-card rounded-lg p-4 w-full max-w-xs lg:max-w-sm", className)}>
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
  products: Product[]
}

export function ShopLayoutClient({ children, collections, products }: ShopLayoutClientProps) {
  const [sortBy, setSortBy] = useState("newest")

  return (
    <SortContext.Provider value={{ sortBy, setSortBy, products }}>
      <div className="p-sides">
        <div className="grid grid-cols-12 gap-sides">
          <aside className="hidden lg:block lg:col-span-2">
            <div className="sticky top-24 space-y-4">
              <FilterComponent collections={collections} />
              <SortComponent />
            </div>
          </aside>
          <div className="col-span-12 lg:col-span-10">
            {children}
          </div>
        </div>
      </div>
    </SortContext.Provider>
  )
}
