"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import type { Product } from "@/lib/hygraph/types"
import { Badge } from "@/components/ui/badge"

interface MobileGallerySliderProps {
  product: Product
}

export function MobileGallerySlider({ product }: MobileGallerySliderProps) {
  // Display all product images
  const images = product.images || (product.featuredImage ? [product.featuredImage] : [])

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: false,
    loop: false,
  })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const onInit = useCallback(() => {
    // Initialize carousel
  }, [])

  const onSelect = useCallback((emblaApi: any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onInit()
    onSelect(emblaApi)
    emblaApi.on("reInit", onInit)
    emblaApi.on("select", onSelect)
  }, [emblaApi, onInit, onSelect])

  const totalImages = images.length

  if (totalImages === 0) return null

  return (
    <div className="relative w-full h-full pt-4 pb-2">
      {/* Embla Carousel */}
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {images.map((image, index) => (
            <div
              key={`${image.url}-${index}`}
              className="flex-shrink-0 w-full h-full relative flex items-center justify-center"
            >
              <Image
                src={image.url || "/placeholder.svg"}
                alt={image.altText || "Product image"}
                width={1000}
                height={1000}
                className="w-full h-auto max-h-full object-contain mx-auto"
                quality={100}
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Counter Badge - styled like Latest drop badge */}
      {totalImages > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
          <Badge variant="outline-secondary">
            {selectedIndex + 1}/{totalImages}
          </Badge>
        </div>
      )}
    </div>
  )
}
