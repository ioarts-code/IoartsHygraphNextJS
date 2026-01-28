import { Suspense } from "react"
import Link from "next/link"
import type { Product } from "@/lib/hygraph/types"
import { VariantSelector } from "../variant-selector"
import { ProductImage } from "./product-image"

export const ProductCard = ({ product, index = 0 }: { product: Product; index?: number }) => {
  const hasNoOptions = product.options.length === 0
  const hasOneOptionWithOneValue = product.options.length === 1 && product.options[0].values.length === 1
  const justHasColorOption = product.options.length === 1 && product.options[0].name.toLowerCase() === "color"

  const renderInCardAddToCart = hasNoOptions || hasOneOptionWithOneValue || justHasColorOption
  const isEven = index % 2 === 0

  return (
    <div className="relative w-full aspect-[3/4] md:aspect-square bg-muted group overflow-hidden">
      <Link
        href={`/product/${product.handle}`}
        className="block size-full relative focus-visible:outline-none"
        aria-label={`View details for ${product.title}`}
        prefetch
      >
        <Suspense fallback={null}>
          <ProductImage product={product} />
        </Suspense>
        {/* Dark overlay - alternating shades for odd/even items, hidden on hover and on mobile */}
        <div 
          className={`absolute inset-0 pointer-events-none transition-opacity duration-300 hidden md:block group-hover:opacity-0 group-focus-visible:opacity-0 ${
            isEven ? "bg-black/20" : "bg-black/35"
          }`}
          aria-hidden="true"
        />
      </Link>

      {/* Interactive Overlay - popup only */}
      <div className="absolute inset-0 p-2 w-full pointer-events-none">
        <div className="flex absolute inset-x-3 bottom-3 justify-center items-center px-4 py-3 rounded-md transition-all duration-300 pointer-events-none bg-popover md:opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 md:translate-y-1/3 group-hover:translate-y-0 group-focus-visible:translate-y-0 group-hover:pointer-events-auto group-focus-visible:pointer-events-auto max-md:pointer-events-auto">
          <div className="text-center">
            <p className="text-base font-semibold">{product.title}</p>
            {renderInCardAddToCart && (
              <Suspense fallback={null}>
                <div className="mt-1">
                  <VariantSelector product={product} />
                </div>
              </Suspense>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
