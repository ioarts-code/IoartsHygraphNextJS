import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import { CartProvider } from "@/components/cart/cart-context"
import { DebugGrid } from "@/components/debug-grid"
import { getCollections } from "@/lib/hygraph"
import { Header } from "../components/layout/header"
import dynamic from "next/dynamic"
import { V0Provider } from "../lib/context"
import { cn } from "../lib/utils"
import { HygraphSetupBanner } from "@/components/hygraph-setup-banner"
import { TooltipProvider } from "@/components/ui/tooltip"

const V0Setup = dynamic(() => import("@/components/v0-setup"))

const isV0 = process.env["VERCEL_URL"]?.includes("vusercontent.net") ?? false

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.ioarts.ink"

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "ioarts.ink - Premium Art & Design Store",
    template: "%s | ioarts.ink",
  },
  description:
    "Discover unique art pieces, premium design products, and creative collections at ioarts.ink. Your destination for curated artistic excellence.",
  keywords: ["art", "design", "premium products", "creative", "ioarts", "online store"],
  authors: [{ name: "ioarts.ink" }],
  creator: "ioarts.ink",
  publisher: "ioarts.ink",
  generator: "v0.app",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    title: "ioarts.ink - Premium Art & Design Store",
    description: "Discover unique art pieces, premium design products, and creative collections at ioarts.ink.",
    siteName: "ioarts.ink",
  },
  twitter: {
    card: "summary_large_image",
    title: "ioarts.ink - Premium Art & Design Store",
    description: "Discover unique art pieces, premium design products, and creative collections at ioarts.ink.",
    creator: "@ioarts",
  },
  alternates: {
    canonical: baseUrl,
  },
  verification: {
    google: "UDDRY9P42GqBtI73NpSvB4xWe7lUmGgAiTrsbEK7n-M",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const collections = await getCollections()
  const isHygraphConfigured = !!(process.env.HYGRAPH_ENDPOINT || process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT)
  const isDevelopment = process.env.NODE_ENV === "development"

  return (
    <html lang="en">
      <body
        className={cn(geistSans.variable, geistMono.variable, "antialiased min-h-screen", { "is-v0": isV0 })}
        suppressHydrationWarning
      >
        <V0Provider isV0={isV0}>
          <CartProvider>
            <TooltipProvider>
              <NuqsAdapter>
                <main data-vaul-drawer-wrapper="true" className="pt-20 md:pt-24">
                  {!isHygraphConfigured && <HygraphSetupBanner />}
                  <Header collections={collections} />
                  {children}
                </main>
                {isDevelopment && <DebugGrid />}
                <Toaster closeButton position="bottom-right" />
              </NuqsAdapter>
            </TooltipProvider>
          </CartProvider>
          {isV0 && <V0Setup />}
        </V0Provider>
      </body>
    </html>
  )
}
