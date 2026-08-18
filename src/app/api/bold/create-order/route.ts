import { NextRequest, NextResponse } from "next/server";
import { createBoldOrder } from "@lib/bold";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { items, shipping } = body as { items: { id: string | number; name: string; qty: number; price: number }[]; shipping: number };

  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "El carrito está vacío." }, { status: 400 });
  }

  try {
    const order = createBoldOrder({ items, shipping: shipping ?? 0 });
    return NextResponse.json(order);
  } catch (error) {
    const message = error instanceof Error ? error.message : "No se pudo crear la orden de pago.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
