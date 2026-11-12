import type { MetadataRoute } from "next";
import { SITE_URL } from "@lib/site";
import { FURKYS_PRODUCTS } from "@data/furkys-products";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/guia`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    ...FURKYS_PRODUCTS.map((p) => ({
      url: `${SITE_URL}/product/${p.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8
    }))
  ];
}
