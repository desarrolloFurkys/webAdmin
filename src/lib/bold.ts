import { createHash, randomUUID } from "crypto";

export const BOLD_CURRENCY = "COP";

export interface BoldOrderInput {
  items: { id: string | number; name: string; qty: number; price: number }[];
  shipping: number;
}

export interface BoldOrder {
  orderId: string;
  amount: number;
  currency: string;
  apiKey: string;
  integritySignature: string;
  checkoutUrl: string;
}

// Bold's "Botón de Pagos" redirect checkout expects an integrity signature the
// merchant computes server-side (never expose BOLD_SECRET_KEY to the client):
// sha256(`${orderId}${amount}${currency}${secretKey}`), hex-encoded.
// See https://bold.co — verify against the current Bold docs before going live.
function buildIntegritySignature(orderId: string, amount: number, currency: string, secretKey: string): string {
  return createHash("sha256").update(`${orderId}${amount}${currency}${secretKey}`).digest("hex");
}

export function createBoldOrder({ items, shipping }: BoldOrderInput): BoldOrder {
  const apiKey = process.env.BOLD_API_KEY;
  const secretKey = process.env.BOLD_SECRET_KEY;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  if (!apiKey || !secretKey) {
    throw new Error(
      "Bold credentials are not configured. Set BOLD_API_KEY and BOLD_SECRET_KEY (see .env.example) before accepting real payments."
    );
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const amount = Math.round(subtotal + shipping);
  const orderId = `FK-${Date.now()}-${randomUUID().slice(0, 8)}`;
  const integritySignature = buildIntegritySignature(orderId, amount, BOLD_CURRENCY, secretKey);

  const redirectionUrl = `${siteUrl}/order-confirmation?order=${orderId}&total=${amount}`;
  const url = new URL("https://checkout.bold.co/payment");
  url.searchParams.set("api_key", apiKey);
  url.searchParams.set("order_id", orderId);
  url.searchParams.set("amount", String(amount));
  url.searchParams.set("currency", BOLD_CURRENCY);
  url.searchParams.set("integrity_signature", integritySignature);
  url.searchParams.set("description", "Compra en Furky's");
  url.searchParams.set("redirection_url", redirectionUrl);

  return {
    orderId,
    amount,
    currency: BOLD_CURRENCY,
    apiKey,
    integritySignature,
    checkoutUrl: url.toString()
  };
}
