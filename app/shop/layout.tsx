import type React from "react"
import { createContext } from "react"
import { getCollections } from "@/lib/hygraph"
import ShopLayoutClient from "./layout-client"
import type { Collection } from "@/lib/hygraph/types"

export const revalidate = 60

interface ShopLayoutProps {
  children: React.ReactNode
}

export default async function ShopLayout({ children }: ShopLayoutProps) {
  const collections = await getCollections()

  return (
    <ShopLayoutClient collections={collections}>
      {children}
    </ShopLayoutClient>
  )
}
