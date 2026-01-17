import { Badge } from "../ui/badge"
import { cn } from "@/lib/utils"
import type { Product } from "@/lib/hygraph/types"
import Link from "next/link"
import { ExternalLinkButtons } from "../cart/external-link-buttons"

export function FeaturedProductLabel({
  product,
  principal = false,
  className,
}: {
  product: Product
  principal?: boolean
  className?: string
}) {
  if (principal) {
    return (
      <div className={cn("flex flex-col gap-y-3 p-4 w-full bg-white md:w-fit md:rounded-md", className)}>
        <div>
          <Badge className="font-black capitalize rounded-full">Best Seller</Badge>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <Link href={`/product/${product.handle}`} className="block mb-2 text-2xl font-semibold">
              {product.title}
            </Link>
            <div className="mb-4">
              {product.tags.length > 0 ? (
                <p className="mb-3 text-sm italic font-medium">{product.tags.join(". ")}</p>
              ) : null}
              <p className="text-sm font-medium line-clamp-3">{product.description}</p>
            </div>
            <ExternalLinkButtons />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "flex justify-between p-2 bg-white min-w-2xs rounded-md max-w-full items-center gap-0 py-0 px-4",
        className,
      )}
    >
      <div className="leading-4 overflow-hidden pr-4 text-left">
        <Link
          href={`/product/${product.handle}`}
          className="inline-block w-full truncate text-base font-semibold opacity-80 mb-0 tracking-wider"
        >
          {product.title}
        </Link>
        
      </div>
      <div className="flex-shrink-0 ml-auto mt-5">
        <ExternalLinkButtons size="default" />
      </div>
    </div>
  )
}
