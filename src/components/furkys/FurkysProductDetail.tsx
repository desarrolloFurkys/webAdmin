"use client";

import { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { FurkysProduct } from "models/furkys-product.model";
import { FURKYS_ADDON, formatCOP } from "@data/furkys-products";
import useCart from "@hook/useCart";
import useCartUI from "@hook/useCartUI";
import FurkysPlaceholderImage from "./FurkysPlaceholderImage";

const ACCORDION_ITEMS = [
  {
    title: "Envíos y tiempos de entrega",
    body: "Bogotá: 1–2 días hábiles con envío gratis. Resto de Colombia: 2–4 días hábiles desde $12.900 (gratis desde $80.000)."
  },
  {
    title: "Cambios y devoluciones",
    body: "Tienes 5 días hábiles desde la entrega para solicitar cambios o devoluciones en productos sin abrir."
  },
  {
    title: "Métodos de pago",
    body: "Pagos seguros con Bold: tarjeta de crédito/débito, PSE, Nequi y más."
  }
];

const REVIEWS = [
  { initial: "M", name: "María G.", handle: "@mariag", avBg: "#E8501D", text: "Excelente calidad, mi gato quedó feliz. Llegó muy rápido." },
  { initial: "J", name: "Julián R.", handle: "@julianr", avBg: "#662681", text: "Justo lo que buscaba, se nota que es un producto pensado para gatos." },
  { initial: "C", name: "Camila P.", handle: "@camilap", avBg: "#1F8A5B", text: "Muy buena relación calidad-precio, lo recomiendo totalmente." }
];

const Wrapper = styled.main`
  max-width: 1240px;
  margin: 0 auto;
  padding: 26px 24px 130px;
`;

const Breadcrumb = styled.div`
  font-family: var(--fk-font-ui);
  font-size: 13.5px;
  color: ${({ theme }) => theme.colors.gray[500]};
  margin-bottom: 22px;

  a {
    color: inherit;
    text-decoration: none;
    transition: color 0.15s;
  }
  a:hover {
    color: ${({ theme }) => theme.colors.primary.main};
  }
  span.current {
    color: ${({ theme }) => theme.colors.gray[900]};
  }
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 76px 1fr 1fr;
  gap: 20px;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const ThumbRail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: sticky;
  top: 120px;

  @media (max-width: 900px) {
    position: static;
    flex-direction: row;
    order: 2;
  }
`;

const Thumb = styled(FurkysPlaceholderImage)<{ $active?: boolean }>`
  width: 100%;
  height: 70px;
  border: 2px solid ${({ $active, theme }) => ($active ? theme.colors.primary.main : theme.colors.gray[400])};
  border-radius: 12px;
  cursor: pointer;
  flex: none;
`;

const MainImageWrap = styled.div`
  position: sticky;
  top: 120px;

  @media (max-width: 900px) {
    position: static;
    order: 1;
  }
`;

const MainImageInner = styled.div`
  position: relative;
`;

const TagBadge = styled.span`
  position: absolute;
  top: 16px;
  left: 16px;
  background: ${({ theme }) => theme.colors.primary.main};
  color: #fff;
  border-radius: 999px;
  padding: 6px 14px;
  font-family: var(--fk-font-ui);
  font-weight: 700;
  font-size: 12px;
  z-index: 1;
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

const MainImage = styled(FurkysPlaceholderImage)`
  width: 100%;
  height: 520px;
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
  border-radius: 24px;

  @media (max-width: 900px) {
    height: 340px;
  }
`;

const InfoCol = styled.div`
  @media (max-width: 900px) {
    order: 3;
  }
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: ${({ theme }) => theme.colors.success.light};
  color: ${({ theme }) => theme.colors.success.main};
  border-radius: 999px;
  padding: 6px 13px;
  font-family: var(--fk-font-ui);
  font-weight: 600;
  font-size: 12.5px;
  margin-bottom: 14px;

  &::before {
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.success.main};
  }
`;

const Name = styled.h1`
  font-family: var(--fk-font-display);
  font-stretch: 125%;
  font-variation-settings: "wdth" 125;
  font-weight: 800;
  font-size: 33px;
  line-height: 0.98;
  text-transform: uppercase;
  margin: 0 0 6px;
  letter-spacing: -0.01em;
  color: ${({ theme }) => theme.colors.gray[900]};
`;

const Tagline = styled.p`
  font-family: var(--fk-font-ui);
  font-size: 14.5px;
  color: ${({ theme }) => theme.colors.gray[600]};
  margin: 0 0 13px;
`;

const RatingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 9px;
  color: ${({ theme }) => theme.colors.primary.main};
  font-size: 15px;
`;

const RatingScore = styled.span`
  font-family: var(--fk-font-ui);
  font-weight: 700;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray[900]};
`;

const RatingCount = styled.span`
  font-family: var(--fk-font-ui);
  font-size: 13px;
  color: ${({ theme }) => theme.colors.gray[500]};
`;

const SoldRow = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 20px;
  font-family: var(--fk-font-ui);
  font-weight: 600;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.primary.main};

  &::before {
    content: "";
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary.main};
  }
`;

const PriceRow = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 12px;
  margin: 4px 0 18px;
`;

const CurrentPrice = styled.span`
  font-family: var(--fk-font-price);
  font-weight: 800;
  font-size: 38px;
  color: ${({ theme }) => theme.colors.gray[900]};
  line-height: 1;
`;

const OldPrice = styled.span`
  font-family: var(--fk-font-ui);
  font-size: 18px;
  color: ${({ theme }) => theme.colors.gray[500]};
  text-decoration: line-through;
  margin-bottom: 6px;
`;

const Desc = styled.p`
  font-family: var(--fk-font-ui);
  font-size: 15px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.gray[700]};
  margin: 14px 0 22px;
`;

const SectionLabel = styled.span`
  display: block;
  font-family: var(--fk-font-ui);
  font-weight: 600;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: ${({ theme }) => theme.colors.gray[600]};
  margin-bottom: 10px;
`;

const VariantBlock = styled.div`
  margin-bottom: 22px;
`;

const VariantRow = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const VariantButton = styled.button<{ $active: boolean }>`
  border: 1.5px solid ${({ $active, theme }) => ($active ? theme.colors.gray[900] : theme.colors.gray[400])};
  border-radius: 12px;
  padding: 11px 18px;
  cursor: pointer;
  font-family: var(--fk-font-ui);
  font-weight: 600;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1px;
  background: ${({ $active, theme }) => ($active ? theme.colors.gray[900] : "#fff")};
  color: ${({ $active, theme }) => ($active ? "#fff" : theme.colors.gray[900])};
  transition: all 0.15s;

  span.variant-price {
    font-size: 11.5px;
    font-weight: 500;
    opacity: 0.78;
  }
`;

const AddonBlock = styled.div`
  margin-bottom: 22px;
`;

const AddonRow = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
  align-items: center;
`;

const AddonButton = styled.button<{ $active: boolean }>`
  border: 1.5px solid ${({ $active, theme }) => ($active ? theme.colors.gray[900] : theme.colors.gray[400])};
  background: ${({ $active, theme }) => ($active ? theme.colors.gray[900] : "#fff")};
  color: ${({ $active, theme }) => ($active ? "#fff" : theme.colors.gray[900])};
  border-radius: 12px;
  padding: 10px 18px;
  font-family: var(--fk-font-ui);
  font-weight: 600;
  font-size: 13.5px;
  cursor: pointer;
`;

const AddonPreview = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  background: ${({ theme }) => theme.colors.gray[100]};
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
  border-radius: 12px;
  padding: 10px 12px;
`;

const AddonThumb = styled(FurkysPlaceholderImage)`
  width: 44px;
  height: 44px;
  border-radius: 10px;
  flex: none;
`;

const AddonText = styled.div`
  font-family: var(--fk-font-ui);
  font-size: 12px;
  color: ${({ theme }) => theme.colors.gray[700]};
`;

const DeliveryBox = styled.div`
  background: ${({ theme }) => theme.colors.gray[100]};
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
  border-radius: 14px;
  padding: 14px 16px;
  margin-bottom: 22px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const DeliveryTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--fk-font-ui);
  font-weight: 600;
  font-size: 13.5px;
  color: ${({ theme }) => theme.colors.gray[900]};
`;

const DeliveryText = styled.div`
  font-family: var(--fk-font-ui);
  font-size: 12.5px;
  color: ${({ theme }) => theme.colors.gray[600]};
  line-height: 1.5;
`;

const Accordion = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.gray[400]};
`;

const AccordionRow = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[400]};
`;

const AccordionButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: none;
  border: none;
  padding: 16px 0;
  cursor: pointer;
  font-family: var(--fk-font-ui);
  font-weight: 600;
  font-size: 14.5px;
  color: ${({ theme }) => theme.colors.gray[900]};
  text-align: left;
  gap: 10px;
`;

const AccordionIcon = styled.span<{ $open: boolean }>`
  display: flex;
  flex: none;
  transform: rotate(${({ $open }) => ($open ? "180deg" : "0deg")});
  transition: transform 0.2s;
`;

const AccordionBody = styled.p`
  font-family: var(--fk-font-ui);
  font-size: 13.5px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.gray[700]};
  margin: 0 0 16px;
`;

const RelatedSection = styled.section`
  padding: 56px 0 8px;
`;

const SectionTitle = styled.h2`
  font-family: var(--fk-font-display);
  font-stretch: 125%;
  font-variation-settings: "wdth" 125;
  font-weight: 800;
  font-size: 28px;
  text-transform: uppercase;
  margin: 0 0 20px;
  letter-spacing: -0.01em;
  color: ${({ theme }) => theme.colors.gray[900]};
`;

const RelatedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const RelatedCard = styled.div`
  background: #fff;
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all 0.18s;

  &:hover {
    box-shadow: 0 14px 30px rgba(20, 18, 16, 0.1);
    transform: translateY(-3px);
  }
`;

const RelatedImageLink = styled(Link)`
  display: block;
`;

const RelatedImage = styled(FurkysPlaceholderImage)`
  width: 100%;
  height: 160px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[400]};
`;

const RelatedBody = styled.div`
  padding: 14px;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const RelatedBrand = styled.span`
  font-family: var(--fk-font-ui);
  font-weight: 600;
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gray[500]};
`;

const RelatedName = styled(Link)`
  font-family: var(--fk-font-ui);
  font-weight: 600;
  font-size: 14px;
  margin: 3px 0 10px;
  min-height: 34px;
  line-height: 1.2;
  color: ${({ theme }) => theme.colors.gray[900]};
  text-decoration: none;
  display: block;
`;

const RelatedFooter = styled.div`
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const RelatedPrice = styled.span`
  font-family: var(--fk-font-ui);
  font-weight: 700;
  font-size: 19px;
  color: ${({ theme }) => theme.colors.gray[900]};
`;

const RelatedAddButton = styled.button`
  background: ${({ theme }) => theme.colors.gray[900]};
  color: #fff;
  border: none;
  border-radius: 10px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.18s;

  &:hover {
    background: ${({ theme }) => theme.colors.primary.main};
    transform: scale(1.06);
  }
`;

const ReviewsSection = styled.section`
  padding: 32px 0 8px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray[400]};
`;

const ReviewsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 22px;
  flex-wrap: wrap;
  gap: 10px;
`;

const ReviewsSummary = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ReviewsScore = styled.span`
  font-family: var(--fk-font-price);
  font-weight: 900;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.gray[900]};
`;

const ReviewsStars = styled.span`
  color: ${({ theme }) => theme.colors.primary.main};
  font-size: 16px;
  letter-spacing: 2px;
`;

const ReviewsCount = styled.span`
  font-family: var(--fk-font-ui);
  font-size: 13px;
  color: ${({ theme }) => theme.colors.gray[500]};
`;

const ReviewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const ReviewCard = styled.div`
  background: #fff;
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
  border-radius: 18px;
  padding: 18px;
`;

const ReviewHead = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

const ReviewAvatar = styled.span<{ $bg: string }>`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: ${({ $bg }) => $bg};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--fk-font-ui);
  font-weight: 700;
  font-size: 14px;
  flex: none;
`;

const ReviewName = styled.div`
  font-family: var(--fk-font-ui);
  font-weight: 600;
  font-size: 13.5px;
  color: ${({ theme }) => theme.colors.gray[900]};
`;

const ReviewHandle = styled.div`
  font-family: var(--fk-font-ui);
  font-size: 11.5px;
  color: ${({ theme }) => theme.colors.gray[500]};
`;

const ReviewStars = styled.div`
  color: #f5a623;
  font-size: 14px;
  letter-spacing: 2px;
  margin-bottom: 8px;
`;

const ReviewText = styled.p`
  font-family: var(--fk-font-ui);
  font-size: 13.5px;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.gray[700]};
  margin: 0;
`;

const StickyBar = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 55;
  background: #fff;
  border-top: 1px solid ${({ theme }) => theme.colors.gray[400]};
  box-shadow: 0 -8px 24px rgba(20, 18, 16, 0.08);
`;

const StickyInner = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  padding: 14px 24px;
  display: flex;
  align-items: center;
  gap: 18px;
  flex-wrap: wrap;
`;

const StickyPrice = styled.div`
  flex: none;
  font-family: var(--fk-font-ui);
  font-weight: 800;
  font-size: 23px;
  color: ${({ theme }) => theme.colors.gray[900]};
  line-height: 1;
`;

const QtyStepper = styled.div`
  display: flex;
  align-items: center;
  border: 1.5px solid ${({ theme }) => theme.colors.gray[400]};
  border-radius: 12px;
  overflow: hidden;
  flex: none;
`;

const QtyButton = styled.button`
  background: #fff;
  border: none;
  width: 40px;
  height: 44px;
  font-size: 19px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.gray[900]};
  transition: background 0.15s;

  &:hover {
    background: ${({ theme }) => theme.colors.gray[100]};
  }
`;

const QtyValue = styled.span`
  width: 40px;
  text-align: center;
  font-family: var(--fk-font-ui);
  font-weight: 600;
  font-size: 15px;
`;

const AddToCartButton = styled.button`
  flex: 1;
  min-width: 180px;
  max-width: 280px;
  background: #fff;
  color: ${({ theme }) => theme.colors.gray[900]};
  border: 1.5px solid ${({ theme }) => theme.colors.gray[900]};
  border-radius: 14px;
  padding: 13px;
  font-family: var(--fk-font-ui);
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background 0.15s;

  &:hover {
    background: ${({ theme }) => theme.colors.gray[100]};
  }
`;

const BuyNowButton = styled(Link)`
  flex: 1;
  min-width: 180px;
  max-width: 280px;
  background: ${({ theme }) => theme.colors.gray[900]};
  color: #fff;
  border: none;
  border-radius: 14px;
  padding: 13px;
  font-family: var(--fk-font-ui);
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  transition: background 0.18s;

  &:hover {
    background: #2a2420;
  }
`;

const SecureNote = styled.div`
  flex: none;
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${({ theme }) => theme.colors.gray[500]};
  font-family: var(--fk-font-ui);
  font-size: 11.5px;
`;

interface Props {
  product: FurkysProduct;
  related: FurkysProduct[];
}

export default function FurkysProductDetail({ product, related }: Props) {
  const [activeThumb, setActiveThumb] = useState(0);
  const [activeVariant, setActiveVariant] = useState(0);
  const [addonOn, setAddonOn] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const [qty, setQty] = useState(1);
  const {
    state: { cart },
    dispatch
  } = useCart();
  const { open } = useCartUI();

  const thumbs = [product.imgLabel, product.imgLabel2, product.imgLabel, product.imgLabel2];
  const unitPrice = product.variants.length ? product.variants[activeVariant].price : product.price;

  const addToCart = (qtyToAdd: number) => {
    const existingQty = cart.find((item) => item.id === product.id)?.qty ?? 0;
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: { id: product.id, qty: existingQty + qtyToAdd, name: product.name, slug: product.slug, price: unitPrice }
    });

    if (addonOn) {
      const existingAddonQty = cart.find((item) => item.id === FURKYS_ADDON.id)?.qty ?? 0;
      dispatch({
        type: "CHANGE_CART_AMOUNT",
        payload: {
          id: FURKYS_ADDON.id,
          qty: existingAddonQty + 1,
          name: FURKYS_ADDON.name,
          slug: FURKYS_ADDON.slug,
          price: FURKYS_ADDON.price
        }
      });
    }
  };

  const handleAddToCart = () => {
    addToCart(qty);
    open();
  };

  const handleRelatedAdd = (relatedProduct: FurkysProduct) => {
    const existingQty = cart.find((item) => item.id === relatedProduct.id)?.qty ?? 0;
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: {
        id: relatedProduct.id,
        qty: existingQty + 1,
        name: relatedProduct.name,
        slug: relatedProduct.slug,
        price: relatedProduct.price
      }
    });
    open();
  };

  return (
    <Wrapper>
      <Breadcrumb>
        <Link href="/">Inicio</Link> &nbsp;/&nbsp; <span>{product.cat}</span> &nbsp;/&nbsp;{" "}
        <span className="current">{product.name}</span>
      </Breadcrumb>

      <Layout>
        <ThumbRail>
          {thumbs.map((label, index) => (
            <Thumb key={`${label}-${index}`} label={label} $active={activeThumb === index} onClick={() => setActiveThumb(index)} />
          ))}
        </ThumbRail>

        <MainImageWrap>
          <MainImageInner>
            {product.tag && <TagBadge>{product.tag}</TagBadge>}
            <MainImage label={thumbs[activeThumb]} />
          </MainImageInner>
        </MainImageWrap>

        <InfoCol>
          <Badge>{product.badge}</Badge>
          <Name>{product.name}</Name>
          <Tagline>{product.tagline}</Tagline>
          <RatingRow>
            <span>{"★".repeat(Math.round(product.rating))}</span>
            <RatingScore>{product.rating.toFixed(1)}</RatingScore>
            <RatingCount>({product.reviewCount} reseñas)</RatingCount>
          </RatingRow>
          <SoldRow>{product.sold} vendidos en las últimas 12 horas</SoldRow>

          <PriceRow>
            <CurrentPrice>{formatCOP(unitPrice)}</CurrentPrice>
            {product.oldPrice && <OldPrice>{formatCOP(product.oldPrice)}</OldPrice>}
          </PriceRow>

          <Desc>{product.desc}</Desc>

          {product.variants.length > 0 && (
            <VariantBlock>
              <SectionLabel>Presentación</SectionLabel>
              <VariantRow>
                {product.variants.map((variant, index) => (
                  <VariantButton key={variant.label} $active={activeVariant === index} onClick={() => setActiveVariant(index)}>
                    <span>{variant.label}</span>
                    <span className="variant-price">{formatCOP(variant.price)}</span>
                  </VariantButton>
                ))}
              </VariantRow>
            </VariantBlock>
          )}

          <AddonBlock>
            <SectionLabel>¿Agregar un juguete de regalo?</SectionLabel>
            <AddonRow>
              <AddonButton $active={addonOn} onClick={() => setAddonOn(true)}>
                Sí, +{formatCOP(FURKYS_ADDON.price)}
              </AddonButton>
              <AddonButton $active={!addonOn} onClick={() => setAddonOn(false)}>
                No, gracias
              </AddonButton>
            </AddonRow>
            {addonOn && (
              <AddonPreview>
                <AddonThumb label="Foto · juguete de plumas" />
                <AddonText>Mini Juguete de Plumas — se añadirá al carrito junto con tu compra.</AddonText>
              </AddonPreview>
            )}
          </AddonBlock>

          <DeliveryBox>
            <DeliveryTitle>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "#E8501D" }}>
                <path d="M3 7h11v8H3z" />
                <path d="M14 10h4l3 3v2h-7z" />
                <circle cx="7" cy="18" r="1.8" />
                <circle cx="17" cy="18" r="1.8" />
              </svg>
              Entrega estimada
            </DeliveryTitle>
            <DeliveryText>
              Bogotá: 1–2 días hábiles · envío gratis.
              <br />
              Resto de Colombia: 2–4 días hábiles · desde $12.900 (gratis desde $80.000).
            </DeliveryText>
          </DeliveryBox>

          <Accordion>
            {ACCORDION_ITEMS.map((item, index) => {
              const isOpen = openAccordion === index;
              return (
                <AccordionRow key={item.title}>
                  <AccordionButton onClick={() => setOpenAccordion(isOpen ? null : index)}>
                    {item.title}
                    <AccordionIcon $open={isOpen}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </AccordionIcon>
                  </AccordionButton>
                  {isOpen && <AccordionBody>{item.body}</AccordionBody>}
                </AccordionRow>
              );
            })}
          </Accordion>
        </InfoCol>
      </Layout>

      <RelatedSection>
        <SectionTitle>También te puede interesar</SectionTitle>
        <RelatedGrid>
          {related.map((relatedProduct) => (
            <RelatedCard key={relatedProduct.id}>
              <RelatedImageLink href={`/product/${relatedProduct.slug}`}>
                <RelatedImage label={relatedProduct.imgLabel} />
              </RelatedImageLink>
              <RelatedBody>
                <RelatedBrand>{relatedProduct.brand}</RelatedBrand>
                <RelatedName href={`/product/${relatedProduct.slug}`}>{relatedProduct.name}</RelatedName>
                <RelatedFooter>
                  <RelatedPrice>{formatCOP(relatedProduct.price)}</RelatedPrice>
                  <RelatedAddButton onClick={() => handleRelatedAdd(relatedProduct)} aria-label="Añadir al carrito">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </RelatedAddButton>
                </RelatedFooter>
              </RelatedBody>
            </RelatedCard>
          ))}
        </RelatedGrid>
      </RelatedSection>

      <ReviewsSection>
        <ReviewsHeader>
          <SectionTitle style={{ margin: 0 }}>Opiniones y calificaciones</SectionTitle>
          <ReviewsSummary>
            <ReviewsScore>{product.rating.toFixed(1)}</ReviewsScore>
            <ReviewsStars>★★★★★</ReviewsStars>
            <ReviewsCount>({product.reviewCount} reseñas)</ReviewsCount>
          </ReviewsSummary>
        </ReviewsHeader>
        <ReviewsGrid>
          {REVIEWS.map((review) => (
            <ReviewCard key={review.handle}>
              <ReviewHead>
                <ReviewAvatar $bg={review.avBg}>{review.initial}</ReviewAvatar>
                <div>
                  <ReviewName>{review.name}</ReviewName>
                  <ReviewHandle>{review.handle}</ReviewHandle>
                </div>
              </ReviewHead>
              <ReviewStars>★★★★★</ReviewStars>
              <ReviewText>{review.text}</ReviewText>
            </ReviewCard>
          ))}
        </ReviewsGrid>
      </ReviewsSection>

      <StickyBar>
        <StickyInner>
          <StickyPrice>{formatCOP(unitPrice)}</StickyPrice>
          <QtyStepper>
            <QtyButton onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Disminuir cantidad">
              −
            </QtyButton>
            <QtyValue>{qty}</QtyValue>
            <QtyButton onClick={() => setQty((q) => q + 1)} aria-label="Aumentar cantidad">
              +
            </QtyButton>
          </QtyStepper>
          <AddToCartButton onClick={handleAddToCart}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            Añadir al carrito
          </AddToCartButton>
          <BuyNowButton
            href="/checkout"
            onClick={() => {
              addToCart(qty);
            }}
          >
            Comprar ahora
          </BuyNowButton>
          <SecureNote>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="5" y="11" width="14" height="9" rx="2" />
              <path d="M8 11V8a4 4 0 018 0v3" />
            </svg>
            Compra segura y protegida
          </SecureNote>
        </StickyInner>
      </StickyBar>
    </Wrapper>
  );
}
