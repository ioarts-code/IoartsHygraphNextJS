import React from "react"
import { Footer } from './footer';

export const PageLayout = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={`pt-20 md:pt-24 ${className || ''}`}>
      <main>{children}</main>
      <Footer />
    </div>
  );
};
