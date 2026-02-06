import { MetadataRoute } from 'next'
import { getCollections, getProducts } from '@/lib/hygraph'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ioarts.ink'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    // Fetch collections and products
    const [collections, products] = await Promise.all([
      getCollections(),
      getProducts({ limit: 100 })
    ])

    // Base routes (always included)
    const baseRoutes: MetadataRoute.Sitemap = [
      {
        url: `${baseUrl}/`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1.0,
      },
      {
        url: `${baseUrl}/shop`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      },
    ]

    // Collection routes
    const collectionRoutes: MetadataRoute.Sitemap = collections.map((collection) => ({
      url: `${baseUrl}/shop/${collection.handle}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

    // Product routes
    const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
      url: `${baseUrl}/product/${product.handle}`,
      lastModified: product.updatedAt ? new Date(product.updatedAt) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

    // Combine all routes
    return [...baseRoutes, ...collectionRoutes, ...productRoutes]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    
    // Return minimal sitemap if data fetching fails
    return [
      {
        url: `${baseUrl}/`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1.0,
      },
    ]
  }
}
