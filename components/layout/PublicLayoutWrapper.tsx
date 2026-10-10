"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DeyeHelpWidget } from "@/components/ui/DeyeHelpWidget";
import { MobileActionDock } from "@/components/layout/MobileActionDock";

export function PublicLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    // In admin console: render ONLY children, isolating admin completely from public layout
    return <main className="flex-grow">{children}</main>;
  }

  return (
    <>
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
      <DeyeHelpWidget />
      <MobileActionDock />
    </>
  );
}
