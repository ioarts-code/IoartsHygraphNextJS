import type React from "react"
import { getCollections } from "@/lib/hygraph"
import { ShopLayoutClient } from "./shop-layout-client"

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
