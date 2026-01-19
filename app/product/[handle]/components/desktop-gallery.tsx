"use client"

import { useProductImages, useSelectedVariant } from "@/components/products/variant-selector"
import type { Product } from "@/lib/hygraph/types"
import Image from "next/image"

export const DesktopGallery = ({ product }: { product: Product }) => {
  const selectedVariant = useSelectedVariant(product)
  const images = useProductImages(product, selectedVariant?.selectedOptions)

  return (
    <div className="flex flex-col items-center pt-4 gap-2">
      {images.map((image) => (
        <Image
          style={{
            aspectRatio: `${image.width} / ${image.height}`,
          }}
          key={`${image.url}-${image.selectedOptions?.map((o) => `${o.name},${o.value}`).join("-")}`}
          src={image.url || "/placeholder.svg"}
          alt={image.altText}
          width={image.width}
          height={image.height}
          className="object-contain xl:object-cover w-11/12 mx-auto"
          quality={100}
        />
      ))}
    </div>
  )
}
