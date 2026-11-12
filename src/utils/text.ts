const ELLIPSIS = "…";

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;

  const cut = text.slice(0, maxLength - ELLIPSIS.length);
  const lastSpace = cut.lastIndexOf(" ");
  const atWordBoundary = lastSpace > 0 ? cut.slice(0, lastSpace) : cut;

  return `${atWordBoundary.replace(/[.,;:\s]+$/, "")}${ELLIPSIS}`;
}
