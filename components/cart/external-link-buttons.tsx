import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { cn } from "@/lib/utils"

export function ExternalLinkButtons({
  className,
  size = "default",
}: { className?: string; size?: "sm" | "default" | "lg" }) {
  const sizeClasses = {
    sm: "h-9 w-9",
    default: "h-12 w-12",
    lg: "h-14 w-14",
  }

  const iconSizes = {
    sm: "w-4 h-4",
    default: "w-6 h-6",
    lg: "w-7 h-7",
  }

  const textSizes = {
    sm: "text-lg",
    default: "text-2xl",
    lg: "text-3xl",
  }

  return (
    <div className={cn("flex gap-2 justify-start mb-7", className)}>
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href="https://www.deviantart.com/ioartseu/gallery/all"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit DeviantArt Gallery"
            className={cn(
              "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 border-2 border-white aspect-square",
              sizeClasses[size],
            )}
          >
            <svg className={iconSizes[size]} viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.5 0H14.18L13.42.98 10.09 6H4.5v6h3.15L4.5 18.75V24h5.32l.76-.98L13.91 18H19.5v-6h-3.15L19.5 5.25V0z" />
            </svg>
          </a>
        </TooltipTrigger>
        <TooltipContent>
          <p>Deviant</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href="https://www.etsy.com/shop/ioartseu"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Shop on Etsy"
            className={cn(
              "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 border-2 border-white aspect-square",
              sizeClasses[size],
            )}
          >
            <span className={cn("font-bold", textSizes[size])}>E</span>
          </a>
        </TooltipTrigger>
        <TooltipContent>
          <p>Etsy</p>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
