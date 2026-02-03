"use client"

import type { Product } from "@/lib/hygraph/types"
import Image from "next/image"

export const DesktopGallery = ({ product }: { product: Product }) => {
  // Display all product images
  const images = product.images || (product.featuredImage ? [product.featuredImage] : [])

  return (
    <div className="flex flex-col items-center pt-4 gap-2">
      {images.map((image) => (
        <Image
          key={image.url}
          src={image.url || "/placeholder.svg"}
          alt={image.altText || product.title}
          width={1000}
          height={1000}
          className="object-contain xl:object-cover w-11/12 mx-auto"
          quality={100}
        />
      ))}
    </div>
  )
}
