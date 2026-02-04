import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { getCollection, getProduct, getProducts } from "@/lib/hygraph"
import { HIDDEN_PRODUCT_TAG } from "@/lib/constants"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import Link from "next/link"
import { storeCatalog } from "@/lib/hygraph/constants"
import { Suspense } from "react"
import { PageLayout } from "@/components/layout/page-layout"
import { MobileGallerySlider } from "./components/mobile-gallery-slider"
import { DesktopGallery } from "./components/desktop-gallery"
import { ExternalLinkButtons } from "@/components/cart/external-link-buttons"

// Generate static params for all products at build time
export async function generateStaticParams() {
  try {
    const products = await getProducts({ limit: 100 }) // Get first 100 products

    return products.map((product) => ({
      handle: product.handle,
    }))
  } catch (error) {
    console.error("Error generating static params for products:", error)
    return []
  }
}

// Enable ISR with 1 minute revalidation
export const revalidate = 60

export async function generateMetadata(props: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const params = await props.params
  const product = await getProduct(params.handle)

  if (!product) return notFound()

  const { url, width, height, altText: alt } = product.featuredImage || {}
  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG)

  const title = product.seo.title || product.title
  const description = product.seo.description || product.description

  return {
    title,
    description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable,
      },
    },
    openGraph: url
      ? {
          title: `${title} | ioarts.ink`,
          description,
          type: "website",
          images: [
            {
              url,
              width,
              height,
              alt,
            },
          ],
        }
      : {
          title: `${title} | ioarts.ink`,
          description,
          type: "website",
        },
    twitter: url
      ? {
          card: "summary_large_image",
          title: `${title} | ioarts.ink`,
          description,
          images: [url],
        }
      : {
          card: "summary",
          title: `${title} | ioarts.ink`,
          description,
        },
  }
}

export default async function ProductPage(props: { params: Promise<{ handle: string }> }) {
  const params = await props.params
  const product = await getProduct(params.handle)

  if (!product) return notFound()

  const collection = product.categoryId ? await getCollection(product.categoryId) : null

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.featuredImage.url,
    offers: {
      "@type": "AggregateOffer",
      availability: product.availableForSale ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      priceCurrency: product.currencyCode,
      highPrice: product.priceRange.maxVariantPrice.amount,
      lowPrice: product.priceRange.minVariantPrice.amount,
    },
  }

  const [rootParentCategory] = collection?.parentCategoryTree.filter(
    (c: any) => c.id !== storeCatalog.rootCategoryId,
  ) ?? [undefined]

  const hasVariants = product.variants.length > 1
  const hasEvenOptions = product.options.length % 2 === 0

  return (
    <PageLayout className="bg-muted">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />

      <div className="flex flex-col md:grid md:grid-cols-12 md:gap-sides min-h-max pt-8">
        {/* Mobile Gallery Slider */}
        <div className="md:hidden col-span-full h-[55vh] min-h-[350px]">
          <Suspense fallback={null}>
            <MobileGallerySlider product={product} />
          </Suspense>
        </div>

        <div className="flex flex-col col-span-5 2xl:col-span-4 max-md:col-span-full min-h-max max-md:p-sides max-md:pt-2 md:pl-sides md:pt-top-spacing md:sticky md:top-8 md:self-start">
          <div className="col-span-full">
            <Breadcrumb className="col-span-full mb-4 md:mb-8">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/shop" prefetch>
                      Shop
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {rootParentCategory && (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link href={`/shop/${rootParentCategory.id}`} prefetch>
                          {rootParentCategory.name}
                        </Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  </>
                )}
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{product.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex flex-col w-full max-w-full px-3 py-2 rounded-md pt-5 gap-1.5 bg-transparent">
              <h1 className="text-6xl md:text-7xl lg:text-8xl 2xl:text-9xl font-semibold text-balance max-md:mb-1">
                {product.title}
              </h1>
              {collection && (
                <p className="text-xs text-foreground/70 max-md:mb-4 col-span-full md:col-span-1 md:-mt-8">
                  {collection.title}
                </p>
              )}
              <div className="prose prose-sm max-w-none space-y-4 my-3.5">
                {/* Product description HTML */}
                <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
              </div>
              <ExternalLinkButtons size="lg" className="col-span-full" />
            </div>
          </div>

          <div className="col-span-full md:col-span-7 md:col-start-6"></div>

          {collection && (
            <p className="text-xs 2xl:text-sm text-foreground/70 leading-tight mb-4 max-md:hidden mt-4">
              {collection.title}
            </p>
          )}
        </div>

        {/* Desktop Gallery */}
        <div className="hidden overflow-y-auto relative col-span-7 col-start-6 w-full md:block">
          <Suspense fallback={null}>
            <DesktopGallery product={product} />
          </Suspense>
        </div>
      </div>
    </PageLayout>
  )
}
