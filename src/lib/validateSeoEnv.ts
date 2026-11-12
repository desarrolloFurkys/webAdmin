const LOCAL_HOSTS = ["localhost", "127.0.0.1"];

function isPublicHttpsUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !LOCAL_HOSTS.includes(url.hostname);
  } catch {
    return false;
  }
}

export function validateSeoEnv(env: NodeJS.ProcessEnv): string[] {
  const allowsIndexing = env.NEXT_PUBLIC_ALLOW_INDEXING === "true";
  const siteUrl = env.NEXT_PUBLIC_SITE_URL ?? "";

  if (allowsIndexing && !isPublicHttpsUrl(siteUrl)) {
    return ["NEXT_PUBLIC_ALLOW_INDEXING=true requiere NEXT_PUBLIC_SITE_URL con un dominio público https://"];
  }
  return [];
}
