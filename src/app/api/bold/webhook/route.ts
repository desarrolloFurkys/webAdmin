import { NextRequest, NextResponse } from "next/server";

// Bold sends a payment-confirmation webhook once the customer finishes
// checkout on their hosted page. There's no order/payment persistence layer
// yet (no database), so this stub just validates the payload shape, logs it,
// and acknowledges receipt. TODO: verify Bold's webhook signature header and
// persist the order status once a backend/DB is wired up.
export async function POST(request: NextRequest) {
  const payload = await request.json().catch(() => null);

  if (!payload) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  console.log("[bold webhook] received event", payload);

  return NextResponse.json({ received: true });
}
