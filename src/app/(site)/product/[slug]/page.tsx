import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FurkysProductDetail from "@component/furkys/FurkysProductDetail";
import { META_DESCRIPTION_MAX_LENGTH } from "@lib/site";
import { truncate } from "@utils/text";
import { FURKYS_PRODUCTS, getFurkysProductBySlug } from "@data/furkys-products";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return FURKYS_PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getFurkysProductBySlug(slug);
  if (!product) return {};

  const description = truncate(product.desc, META_DESCRIPTION_MAX_LENGTH);
  const images = product.images?.length ? [{ url: product.images[0], alt: product.name }] : undefined;

  return {
    title: product.name,
    description,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: {
      type: "website",
      locale: "es_CO",
      title: product.name,
      description,
      url: `/product/${product.slug}`,
      images
    },
    twitter: { card: "summary_large_image" }
  };
}

export default async function ProductDetails({ params }: Props) {
  const { slug } = await params;
  const product = getFurkysProductBySlug(slug);

  if (!product) notFound();

  return <FurkysProductDetail product={product} />;
}
