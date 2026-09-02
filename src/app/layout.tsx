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
import { fkFontDisplay, fkFontPrice, fkFontUi } from "theme/furkysFonts";
import NProgressBar from "@component/NProgress";

export const metadata: Metadata = {
  title: "Furky's — Acaricia la felicidad",
  description:
    "Furky's: arena y accesorios para gatos, con envío rápido a toda Colombia.",
  authors: [{ name: "Furky's" }],
  keywords: ["furky's", "arena para gatos", "accesorios para mascotas", "tienda para gatos"]
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="es">
      <body className={`${fkFontUi.variable} ${fkFontDisplay.variable} ${fkFontPrice.variable} ${fkFontUi.className}`}>
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
