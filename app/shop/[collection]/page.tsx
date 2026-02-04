import type { Metadata } from "next"
import { getCollection, getCollections, getCollectionProducts } from "@/lib/hygraph"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { FeaturedProductLabel } from "@/components/products/featured-product-label"

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

function ProductCard({ product }: { product: any }) {
  return (
    <div className="relative">
      <Link href={`/product/${product.handle}`} className="block w-full aspect-square" prefetch>
        <Image
          src={product.featuredImage?.url || "/placeholder.svg"}
          alt={product.featuredImage?.altText || product.title}
          width={1000}
          height={1000}
          className="object-contain xl:object-cover size-full -translate-y-8"
        />
      </Link>
      <div className="absolute flex p-sides inset-0 items-end pointer-events-none justify-end">
        <FeaturedProductLabel className="pointer-events-auto" product={product} />
      </div>
    </div>
  )
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
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-[40vh]">
          <p className="text-muted-foreground">No products in this collection</p>
        </div>
      )}
    </div>
  )
}
