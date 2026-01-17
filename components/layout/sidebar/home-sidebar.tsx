import { ShopLinks } from "../shop-links"
import type { Collection } from "@/lib/hygraph/types"

interface HomeSidebarProps {
  collections: Collection[]
}

export function HomeSidebar({ collections }: HomeSidebarProps) {
  return (
    <aside className="max-md:hidden col-span-4 h-screen sticky top-0 p-sides pt-top-spacing flex flex-col justify-between">
      <div>
        
        <div className="mt-5 text-base leading-tight">
          
          
          <p className="font-extrabold text-3xl pr-8">{"illustrations that make sense. What about digital illustrations for your products? Make every product yours for real."}</p>
        </div>
      </div>
      <ShopLinks collections={collections} />
    </aside>
  )
}
