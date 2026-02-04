import React from "react"
import { Footer } from './footer'

export const PageLayout = async ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <>
      {children}
      <Footer />
    </>
  )
}
