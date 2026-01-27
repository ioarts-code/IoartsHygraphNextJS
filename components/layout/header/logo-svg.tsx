import { cn } from "@/lib/utils"

export function LogoSvg({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-32 md:w-28 lg:w-24", className)}
    >
      <text className="text-5xl"
        x="10"
        y="40"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="32"
        fontWeight="700"
        fill="currentColor"
        letterSpacing="-0.02em"
      >
        IOARTS
      </text>
    </svg>
  )
}
