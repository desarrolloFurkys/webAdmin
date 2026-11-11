import { notFound } from "next/navigation";
import FurkysProductDetail from "@component/furkys/FurkysProductDetail";
import { getFurkysProductBySlug } from "@data/furkys-products";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetails({ params }: Props) {
  const { slug } = await params;
  const product = getFurkysProductBySlug(slug);

  if (!product) notFound();

  return <FurkysProductDetail product={product} />;
}
