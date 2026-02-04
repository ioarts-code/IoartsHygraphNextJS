import type React from "react"
import { getCollections, getProducts } from "@/lib/hygraph"
import { ShopLayoutClient } from "./shop-layout-client"

export const revalidate = 60

interface ShopLayoutProps {
  children: React.ReactNode
}

export default async function ShopLayout({ children }: ShopLayoutProps) {
  const [collections, products] = await Promise.all([
    getCollections(),
    getProducts({ limit: 50 })
  ])

  return (
    <ShopLayoutClient collections={collections} products={products}>
      {children}
    </ShopLayoutClient>
  )
}
