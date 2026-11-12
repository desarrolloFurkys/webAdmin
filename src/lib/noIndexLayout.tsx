import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import { NO_INDEX_ROBOTS } from "@lib/seo";

export const metadata: Metadata = { robots: NO_INDEX_ROBOTS };

export default function NoIndexLayout({ children }: PropsWithChildren) {
  return children;
}
