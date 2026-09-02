import FurkysOrderConfirmation from "@component/furkys/FurkysOrderConfirmation";

interface Props {
  searchParams: Promise<{ order?: string; total?: string }>;
}

export default async function OrderConfirmationPage({ searchParams }: Props) {
  const params = await searchParams;
  const orderNo = params.order ?? "—";
  const total = params.total ? Number(params.total) : 0;

  return <FurkysOrderConfirmation orderNo={orderNo} total={total} />;
}
