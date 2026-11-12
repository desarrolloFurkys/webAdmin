import type { MetadataRoute } from "next";
import { SITE_URL } from "@lib/site";

const BLOCKED_PATHS = ["/api/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: BLOCKED_PATHS }],
    sitemap: `${SITE_URL}/sitemap.xml`
  };
}
