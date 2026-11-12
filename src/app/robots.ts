import type { MetadataRoute } from "next";
import { ALLOW_INDEXING, SITE_URL } from "@lib/site";

const BLOCKED_PATHS = ["/api/"];

const blockEverything: MetadataRoute.Robots = {
  rules: [{ userAgent: "*", disallow: "/" }]
};

const allowPublicSite: MetadataRoute.Robots = {
  rules: [{ userAgent: "*", allow: "/", disallow: BLOCKED_PATHS }],
  sitemap: `${SITE_URL}/sitemap.xml`
};

export default function robots(): MetadataRoute.Robots {
  return ALLOW_INDEXING ? allowPublicSite : blockEverything;
}
