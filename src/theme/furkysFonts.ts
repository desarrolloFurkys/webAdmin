import localFont from "next/font/local";
import { Montserrat_Alternates } from "next/font/google";

// Furky's brand type families, exposed as CSS vars (--fk-font-display/ui/price).
export const fkFontDisplay = localFont({
  src: "../assets/fonts/furkys/Neufreit-ExtraBold.otf",
  weight: "100 900",
  variable: "--fk-font-display",
  display: "swap"
});

export const fkFontUi = localFont({
  src: "../assets/fonts/furkys/MontserratAlternates-Bold.otf",
  weight: "100 900",
  variable: "--fk-font-ui",
  display: "swap"
});

export const fkFontPrice = localFont({
  src: "../assets/fonts/furkys/GillSansUltraBold.otf",
  weight: "900",
  variable: "--fk-font-price",
  display: "swap"
});

// fkFontUi only ships the Bold weight locally — regular-weight body copy
// (e.g. the footer's link list) loads Montserrat Alternates 400 from Google Fonts.
export const fkFontUiRegular = Montserrat_Alternates({
  subsets: ["latin"],
  weight: "400",
  variable: "--fk-font-ui-regular",
  display: "swap"
});
