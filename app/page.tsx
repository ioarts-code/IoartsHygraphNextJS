import { PageLayout } from "@/components/layout/page-layout"
import { Badge } from "@/components/ui/badge"
import { getCollections, getProducts } from "@/lib/hygraph"
import { getLabelPosition } from "@/lib/hygraph/utils"
import type { Product } from "@/lib/hygraph/types"
import { isHygraphConfigured } from "@/lib/hygraph/client"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Copyright } from "lucide-react"
import { FeaturedProductLabel } from "@/components/products/featured-product-label"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Home",
  description:
    "Discover our latest collection of premium art and design products. Shop unique pieces curated for creative excellence.",
  openGraph: {
    title: "ioarts.ink - Premium Art & Design Store",
    description: "Discover our latest collection of premium art and design products.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ioarts.ink - Premium Art & Design Store",
    description: "Discover our latest collection of premium art and design products.",
  },
}

function ShopLinks({ collections }: { collections: any[] }) {
  return (
    <div className="text-left">
      <h4 className="text-lg font-extrabold md:text-xl">Shop</h4>
      <ul className="flex flex-col gap-1.5 leading-5 mt-5">
        {collections.map((item, index) => (
          <li key={`${item.handle}-${index}`}>
            <Link href={`/shop/${item.handle}`} prefetch>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function FeaturedProductCard({
  product,
  className,
}: {
  product: Product
  className?: string
}) {
  return (
    <div className={cn("flex flex-col relative md:min-h-fold", className)}>
      <Link href={`/product/${product.handle}`} className="size-full flex-1 flex flex-col" prefetch>
        <Image
          priority
          src={product.featuredImage?.url || "/placeholder.svg"}
          alt={product.featuredImage?.altText || product.title}
          width={1000}
          height={100}
          quality={100}
          className="object-contain xl:object-cover size-full flex-1 max-md:aspect-square mt-[calc(var(--header-height,3.5rem)+20px)] md:mt-2.5"
        />
      </Link>
      <div className="absolute bottom-0 left-0 grid w-full grid-cols-4 gap-6 pointer-events-none max-md:contents p-sides">
        <FeaturedProductLabel className="col-span-3 col-start-2 pointer-events-auto 2xl:col-start-3 2xl:col-span-2 shrink-0" product={product} principal />
      </div>
    </div>
  )
}

function ProductCard({
  product,
  labelPosition = "bottom-right",
  className,
}: {
  product: Product
  labelPosition?: string
  className?: string
}) {
  return (
    <div className={cn("relative", className)}>
      <Link href={`/product/${product.handle}`} className="block w-full aspect-square" prefetch>
        <Image
          src={product.featuredImage?.url || "/placeholder.svg"}
          alt={product.featuredImage?.altText || product.title}
          width={1000}
          height={100}
          className="object-contain xl:object-cover size-full"
        />
      </Link>
      <div
        className={cn(
          "absolute flex p-sides inset-0 items-end pointer-events-none justify-end",
          labelPosition === "top-left" && "md:justify-start md:items-start",
          labelPosition === "top-right" && "md:justify-end md:items-start",
          labelPosition === "bottom-left" && "md:justify-start md:items-end",
          labelPosition === "bottom-right" && "md:justify-end md:items-end",
        )}
      >
        <FeaturedProductLabel className="pointer-events-auto" product={product} />
      </div>
    </div>
  )
}

export default async function Home() {
  let collections: any[] = []
  let featuredProducts: Product[] = []

  try {
    collections = await getCollections()
  } catch (error) {
    console.error("Error fetching collections:", error)
    collections = []
  }

  try {
    const allProducts = await getProducts({})
    featuredProducts = allProducts.slice(0, 9)
  } catch (error) {
    console.error("Error fetching products:", error)
    featuredProducts = []
  }

  const bestSellerHandle = "metroid-motif"
  const bestSellerIndex = featuredProducts.findIndex(
    (p) => p.handle === bestSellerHandle || p.title.toLowerCase().includes("metroid motif")
  )

  let bestSellerProduct: Product | undefined
  let restProducts: Product[]

  if (bestSellerIndex !== -1) {
    bestSellerProduct = featuredProducts[bestSellerIndex]
    restProducts = featuredProducts.filter((_, index) => index !== bestSellerIndex)
  } else {
    [bestSellerProduct, ...restProducts] = featuredProducts
  }

  if (!isHygraphConfigured()) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-[60vh] px-4">
          <div className="max-w-2xl text-center space-y-4">
            <h1 className="text-3xl font-bold">Hygraph Setup Required</h1>
            <p className="text-muted-foreground text-lg">
              This template has been migrated from Shopify to Hygraph. To get started, you need to configure your Hygraph project.
            </p>
            <div className="bg-muted p-6 rounded-lg text-left space-y-3">
              <h2 className="font-semibold text-lg">Setup Steps:</h2>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>
                  Click <strong>Vars</strong> in the left sidebar
                </li>
                <li>
                  Add environment variable: <code className="bg-background px-2 py-1 rounded">NEXT_PUBLIC_HYGRAPH_ENDPOINT</code>
                </li>
                <li>
                  Set the value to your Hygraph GraphQL API endpoint
                  <br />
                  <span className="text-xs text-muted-foreground">
                    (e.g., https://api-us-east-1.hygraph.com/v2/your-project-id/master)
                  </span>
                </li>
                <li>Get your endpoint from Hygraph → Project Settings → API Access</li>
              </ol>
            </div>
            <p className="text-sm text-muted-foreground">
              Need help? Check the <code>MIGRATION_GUIDE.md</code> file for detailed instructions.
            </p>
          </div>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      <div className="contents md:grid md:grid-cols-12 md:gap-sides">
        <aside className="max-md:hidden col-span-4 h-screen sticky top-0 p-sides pt-top-spacing flex flex-col justify-between">
          <div>
            <div className="mt-5 text-base leading-tight">
              <p className="font-extrabold text-3xl pr-8">
                {"illustrations that make sense. What about digital illustrations for your products? Make every product yours for real."}
              </p>
              <p className="text-base text-muted-foreground mt-3 max-w-xs">
                <span className="inline-flex items-center gap-1">Some products on this site are copyrighted <Copyright className="w-3 h-3" /></span> and not for sale.
              </p>
            </div>
          </div>
          <ShopLinks collections={collections} />
        </aside>
        <div className="flex relative flex-col grid-cols-2 col-span-8 w-full md:grid">
          <div className="fixed top-0 left-0 z-10 w-full pointer-events-none base-grid py-sides">
            <div className="col-span-8 col-start-5">
              <div className="hidden px-6 lg:block">
                <Badge variant="outline-secondary">latest drop</Badge>
              </div>
            </div>
          </div>
          {featuredProducts.length > 0 && bestSellerProduct ? (
            <>
              <FeaturedProductCard className="col-span-2" product={bestSellerProduct} />
              {restProducts.map((product: any, index: number) => (
                <ProductCard
                  className="col-span-1"
                  key={product.id}
                  product={product}
                  labelPosition={getLabelPosition(index)}
                />
              ))}
            </>
          ) : (
            <div className="col-span-2 flex items-center justify-center min-h-[40vh]">
              <p className="text-muted-foreground">
                No products available. Please add products to your Hygraph project.
              </p>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  )
}
