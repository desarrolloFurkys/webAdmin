import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
// THEME PROVIDER
import StyledComponentsRegistry from "@lib/registry";
// CONTEXT PROVIDER
import CartProvider from "@context/CartContext";
// THIRD PARTY CSS FILE
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { ThemeProvider } from "theme";
import { fkFontDisplay, fkFontPrice, fkFontUi, fkFontUiRegular } from "theme/furkysFonts";
import NProgressBar from "@component/NProgress";
import { SITE_NAME, SITE_URL } from "@lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Furky's — Arena y accesorios para gatos en Colombia",
    template: "%s | Furky's"
  },
  description:
    "Furky's: arena ecológica de maíz y accesorios para gatos, con envío rápido a toda Colombia.",
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  keywords: ["furky's", "arena para gatos", "arena de maíz", "accesorios para mascotas", "tienda para gatos"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_CO",
    siteName: SITE_NAME,
    url: "/",
    title: "Furky's — Arena y accesorios para gatos en Colombia",
    description:
      "Arena ecológica de maíz y accesorios para gatos, con envío rápido a toda Colombia.",
    images: [{ url: "/assets/furkys/products/arena-3-5kg-frente.png", alt: "Arena para gatos Furky's" }]
  },
  twitter: { card: "summary_large_image" }
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="es">
      <body
        className={`${fkFontUi.variable} ${fkFontDisplay.variable} ${fkFontPrice.variable} ${fkFontUiRegular.variable} ${fkFontUi.className}`}
      >
        <StyledComponentsRegistry>
          <CartProvider>
            <ThemeProvider>
              {children}
              <NProgressBar />
            </ThemeProvider>
          </CartProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
