import type { PropsWithChildren } from "react";
import FurkysChrome from "@component/furkys/FurkysChrome";

export default function SiteLayout({ children }: PropsWithChildren) {
  return <FurkysChrome>{children}</FurkysChrome>;
}
