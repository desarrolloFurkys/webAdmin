"use client";

import { PropsWithChildren, useEffect, useRef, useState } from "react";
import CartUIProvider from "@context/CartUIContext";
import FurkysHeader from "./FurkysHeader";
import FurkysFooter from "./FurkysFooter";
import FurkysCartDrawer from "./FurkysCartDrawer";
import FurkysWhatsAppButton from "./FurkysWhatsAppButton";

export default function FurkysChrome({ children }: PropsWithChildren) {
  const footerRef = useRef<HTMLElement>(null);
  const [nearFooter, setNearFooter] = useState(false);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => setNearFooter(entry.isIntersecting), {
      rootMargin: "0px 0px -8% 0px"
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <CartUIProvider>
      <FurkysHeader />
      {children}
      <FurkysFooter footerRef={footerRef} />
      <FurkysCartDrawer />
      <FurkysWhatsAppButton hidden={nearFooter} />
    </CartUIProvider>
  );
}
