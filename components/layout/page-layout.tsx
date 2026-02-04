import React, { Suspense } from "react"
import { Footer } from './footer'

export const PageLayout = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <>
      <main className={className}>{children}</main>
      <Suspense fallback={<div />}>
        <Footer />
      </Suspense>
    </>
  )
}
