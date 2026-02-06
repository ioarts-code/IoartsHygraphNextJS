import { cn } from "@/lib/utils"

export function LogoSvg({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-40 md:w-36 lg:w-32", className)}
    >
      <text
        x="10"
        y="45"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="42"
        fontWeight="900"
        fill="currentColor"
        letterSpacing="-0.04em"
      >
        IOARTS
      </text>
    </svg>
  )
}
