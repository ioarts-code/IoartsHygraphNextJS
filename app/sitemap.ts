import { getProducts, getCollections } from "@/lib/hygraph"
import type { MetadataRoute } from "next"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.ioarts.ink"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    // Fetch all products and collections for dynamic routes
    const [products, collections] = await Promise.all([getProducts({ limit: 1000 }), getCollections()])

    // Static routes
    const routes: MetadataRoute.Sitemap = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1,
      },
      {
        url: `${baseUrl}/shop`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.9,
      },
    ]

    // Collection routes
    const collectionRoutes: MetadataRoute.Sitemap = collections.map((collection) => ({
      url: `${baseUrl}/shop/${collection.handle}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }))

    // Product routes
    const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
      url: `${baseUrl}/product/${product.handle}`,
      lastModified: product.updatedAt ? new Date(product.updatedAt) : new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    }))

    return [...routes, ...collectionRoutes, ...productRoutes]
  } catch (error) {
    console.error("Error generating sitemap:", error)
    // Return basic sitemap if there's an error
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1,
      },
    ]
  }
}
