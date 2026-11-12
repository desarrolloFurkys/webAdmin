import type { NextConfig } from "next";
import { validateSeoEnv } from "./src/lib/validateSeoEnv";

const seoEnvErrors = validateSeoEnv(process.env);
if (seoEnvErrors.length) throw new Error(seoEnvErrors.join("\n"));

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true
  }
};

export default nextConfig;
