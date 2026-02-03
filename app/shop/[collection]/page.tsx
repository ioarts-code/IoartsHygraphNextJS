import type { Metadata } from "next"
import { getCollection, getCollections, getCollectionProducts } from "@/lib/hygraph"
import { notFound } from "next/navigation"
import { ProductGrid } from "../components/product-grid"
import { LatestProductCard } from "@/components/products/latest-product-card"

export const revalidate = 60

export async function generateStaticParams() {
  try {
    const collections = await getCollections()
    return collections.map((collection) => ({
      collection: collection.handle,
    }))
  } catch (error) {
    console.error("Error generating static params:", error)
    return []
  }
}

export async function generateMetadata(props: {
  params: Promise<{ collection: string }>
}): Promise<Metadata> {
  const { collection } = await props.params
  const collectionData = await getCollection(collection)

  if (!collectionData) return notFound()

  return {
    title: collectionData.title,
    description: collectionData.description,
  }
}

export default async function CollectionPage(props: {
  params: Promise<{ collection: string }>
}) {
  const { collection } = await props.params
  const collectionData = await getCollection(collection)

  if (!collectionData) {
    notFound()
  }

  const products = await getCollectionProducts({
    collection,
    limit: 50,
  })

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">{collectionData.title}</h1>
        {collectionData.description && (
          <p className="text-muted-foreground mt-2">{collectionData.description}</p>
        )}
      </div>

      {products.length > 0 ? (
        <ProductGrid>
          {products.map((product) => (
            <LatestProductCard key={product.id} product={product} />
          ))}
        </ProductGrid>
      ) : (
        <div className="flex items-center justify-center min-h-[40vh]">
          <p className="text-muted-foreground">No products in this collection</p>
        </div>
      )}
    </div>
  )
}
