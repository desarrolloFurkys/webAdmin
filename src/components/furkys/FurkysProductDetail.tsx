"use client";

import { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { FurkysProduct } from "models/furkys-product.model";
import { FURKYS_PRODUCTS, formatCOP } from "@data/furkys-products";
import useCart from "@hook/useCart";
import useCartUI from "@hook/useCartUI";
import FurkysPlaceholderImage from "./FurkysPlaceholderImage";

const ACCORDION_ITEMS = [
  {
    title: "Envíos y tiempos de entrega",
    body: "Bogotá: 1–2 días hábiles con envío gratis. Resto de Colombia: 2–4 días hábiles desde 12.900 (gratis desde 80.000)."
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

const Wrapper = styled.main`
  max-width: 1240px;
  margin: 0 auto;
  padding: 26px 24px 80px;
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

const Thumb = styled.button<{ $active?: boolean }>`
  width: 76px;
  height: 76px;
  padding: 0;
  border: 2px solid ${({ $active, theme }) => ($active ? "#E8501D" : theme.colors.gray[400])};
  border-radius: 12px;
  cursor: pointer;
  flex: none;
  overflow: hidden;
  background: #f4efe6;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
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

const MainImageFrame = styled.div`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 24px;
  background: #f4efe6;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const MainImagePhoto = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
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
  font-size: 34px;
  line-height: 0.98;
  text-transform: uppercase;
  margin: 0 0 6px;
  letter-spacing: -0.01em;
  color: ${({ theme }) => theme.colors.secondary.main};
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
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.primary.main};
  font-size: 20px;
`;

const RatingScore = styled.span`
  font-family: var(--fk-font-ui);
  font-weight: 700;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.gray[900]};
`;

const RatingCount = styled.span`
  font-family: var(--fk-font-ui);
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray[500]};
`;

const PriceRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin: 4px 0 18px;
`;

const CurrentPrice = styled.span`
  font-family: var(--fk-font-price);
  font-weight: 800;
  font-size: 40px;
  color: ${({ theme }) => theme.colors.gray[900]};
  line-height: 1;
`;

const PricePerKg = styled.span`
  font-family: var(--fk-font-ui);
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray[500]};
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

const VariantButton = styled(Link)<{ $active: boolean }>`
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
  text-decoration: none;
  background: ${({ $active, theme }) => ($active ? theme.colors.gray[900] : "#fff")};
  color: ${({ $active, theme }) => ($active ? "#fff" : theme.colors.gray[900])};
  transition: all 0.15s;

  span.variant-price {
    font-size: 11.5px;
    font-weight: 500;
    opacity: 0.78;
  }
`;

const QtyAddRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
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
  height: 46px;
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
  background: ${({ theme }) => theme.colors.primary.main};
  color: #fff;
  border: none;
  border-radius: 12px;
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
    background: ${({ theme }) => theme.colors.primary.dark};
  }
`;

const BuyNowButton = styled(Link)`
  display: block;
  width: 100%;
  background: ${({ theme }) => theme.colors.gray[900]};
  color: #fff;
  border: none;
  border-radius: 14px;
  padding: 15px;
  font-family: var(--fk-font-ui);
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  margin-bottom: 22px;
  transition: background 0.18s;

  &:hover {
    background: #2a2420;
  }
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

const DetailsGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(420px, 1fr));
  gap: 20px;
  padding: 56px 0 8px;
`;

const IntroCard = styled.div`
  background: #fcf3ee;
  border-radius: 20px;
  padding: 28px;
`;

const UsageCard = styled.div`
  background: #fff;
  border: 1px solid #eae5dc;
  border-radius: 20px;
  padding: 28px;
`;

const CardTitle = styled.h2`
  font-family: var(--fk-font-display);
  font-stretch: 125%;
  font-variation-settings: "wdth" 125;
  font-weight: 800;
  font-size: 22px;
  text-transform: uppercase;
  margin: 0 0 14px;
  letter-spacing: -0.01em;
  color: ${({ theme }) => theme.colors.gray[900]};
`;

const CardIntro = styled.p`
  font-family: var(--fk-font-ui);
  font-size: 14.5px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.gray[700]};
  margin: 0 0 18px;
`;

const BulletList = styled.ul`
  list-style: none;
  margin: 0 0 18px;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const BulletItem = styled.li`
  display: flex;
  gap: 10px;
  font-family: var(--fk-font-ui);
  font-size: 14px;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.gray[700]};

  svg {
    flex: none;
    margin-top: 3px;
    color: ${({ theme }) => theme.colors.primary.main};
  }

  b {
    color: ${({ theme }) => theme.colors.gray[900]};
  }
`;

const CardClosing = styled.p`
  font-family: var(--fk-font-ui);
  font-size: 14px;
  font-style: italic;
  color: ${({ theme }) => theme.colors.gray[600]};
  margin: 0;
`;

const StepTitle = styled.h3`
  font-family: var(--fk-font-ui);
  font-weight: 700;
  font-size: 15px;
  color: ${({ theme }) => theme.colors.gray[900]};
  margin: 0 0 14px;
`;

const StepList = styled.ol`
  list-style: none;
  margin: 0 0 18px;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
  counter-reset: step;
`;

const StepItem = styled.li`
  display: flex;
  gap: 12px;
  font-family: var(--fk-font-ui);
  font-size: 14px;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.gray[700]};

  &::before {
    counter-increment: step;
    content: counter(step);
    flex: none;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.secondary.main};
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 700;
  }
`;

const TipBox = styled.div`
  margin-bottom: 14px;
`;

const TipQuestion = styled.p`
  font-family: var(--fk-font-ui);
  font-weight: 700;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.primary.main};
  margin: 0 0 4px;
`;

const TipAnswer = styled.p`
  font-family: var(--fk-font-ui);
  font-size: 13.5px;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.gray[700]};
  margin: 0;
`;

const CareNote = styled.p`
  font-family: var(--fk-font-ui);
  font-size: 13px;
  color: ${({ theme }) => theme.colors.gray[600]};
  margin: 0;

  b {
    color: ${({ theme }) => theme.colors.gray[900]};
  }
`;

interface Props {
  product: FurkysProduct;
}

export default function FurkysProductDetail({ product }: Props) {
  const [qty, setQty] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const [activeThumb, setActiveThumb] = useState(0);
  const {
    state: { cart },
    dispatch
  } = useCart();
  const { open } = useCartUI();

  const variantLabel = product.variantLabel ?? product.cat;
  const placeholders = [`Foto · Frente ${variantLabel}`, `Foto · Atrás ${variantLabel}`, `Rendimiento ${variantLabel}`];
  const images = product.images?.length ? product.images : [];
  const thumbCount = images.length || placeholders.length;

  const presentations = product.subcat
    ? FURKYS_PRODUCTS.filter((p) => p.subcat === product.subcat)
    : [product];

  const addToCart = (qtyToAdd: number) => {
    const existingQty = cart.find((item) => item.id === product.id)?.qty ?? 0;
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: { id: product.id, qty: existingQty + qtyToAdd, name: product.name, slug: product.slug, price: product.price }
    });
  };

  const handleAddToCart = () => {
    addToCart(qty);
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
          {Array.from({ length: thumbCount }, (_, index) => (
            <Thumb key={index} $active={activeThumb === index} onClick={() => setActiveThumb(index)}>
              {images[index] ? (
                <img src={images[index]} alt={product.name} />
              ) : (
                <FurkysPlaceholderImage label={placeholders[index]} style={{ width: "100%", height: "100%" }} />
              )}
            </Thumb>
          ))}
        </ThumbRail>

        <MainImageWrap>
          <MainImageInner>
            {product.tag && <TagBadge>{product.tag}</TagBadge>}
            <MainImageFrame>
              {images[activeThumb] ? (
                <MainImagePhoto src={images[activeThumb]} alt={product.name} />
              ) : (
                <FurkysPlaceholderImage label={placeholders[activeThumb] ?? placeholders[0]} style={{ width: "100%", height: "100%" }} />
              )}
            </MainImageFrame>
          </MainImageInner>
        </MainImageWrap>

        <InfoCol>
          <Badge>{product.subcat ?? product.cat}</Badge>
          <Name>{product.name}</Name>
          <Tagline>{product.tagline}</Tagline>
          <RatingRow>
            <span>{"★".repeat(Math.round(product.rating))}</span>
            <RatingScore>{product.rating.toFixed(1)}</RatingScore>
            <RatingCount>({product.reviewCount} reseñas)</RatingCount>
          </RatingRow>

          <PriceRow>
            <CurrentPrice>{formatCOP(product.price)}</CurrentPrice>
            {product.pricePerKg && <PricePerKg>{formatCOP(product.pricePerKg)} / kg</PricePerKg>}
          </PriceRow>

          <Desc>{product.desc}</Desc>

          {presentations.length > 1 && (
            <VariantBlock>
              <SectionLabel>Presentación</SectionLabel>
              <VariantRow>
                {presentations.map((presentation) => (
                  <VariantButton
                    key={presentation.slug}
                    href={`/product/${presentation.slug}`}
                    $active={presentation.slug === product.slug}
                  >
                    <span>{presentation.variantLabel}</span>
                    <span className="variant-price">{formatCOP(presentation.price)}</span>
                  </VariantButton>
                ))}
              </VariantRow>
            </VariantBlock>
          )}

          <QtyAddRow>
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
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              Añadir al carrito
            </AddToCartButton>
          </QtyAddRow>

          <BuyNowButton
            href="/checkout"
            onClick={() => {
              addToCart(qty);
            }}
          >
            Comprar ahora
          </BuyNowButton>

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
              Resto de Colombia: 2–4 días hábiles · desde 12.900 (gratis desde 80.000).
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

      {product.details && (
        <DetailsGrid>
          <IntroCard>
            <CardTitle>{product.details.title}</CardTitle>
            <CardIntro>{product.details.intro}</CardIntro>
            <BulletList>
              {product.details.bullets.map((bullet) => (
                <BulletItem key={bullet.k}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span>
                    <b>{bullet.k}:</b> {bullet.v}
                  </span>
                </BulletItem>
              ))}
            </BulletList>
            <CardClosing>{product.details.closing}</CardClosing>
          </IntroCard>

          <UsageCard>
            <StepTitle>Modo de uso</StepTitle>
            <StepList>
              {product.details.steps.map((step) => (
                <StepItem key={step}>{step}</StepItem>
              ))}
            </StepList>
            <TipBox>
              <TipQuestion>{product.details.tipQ}</TipQuestion>
              <TipAnswer>{product.details.tipA}</TipAnswer>
            </TipBox>
            <CareNote>
              <b>Conservación:</b> {product.details.care}
            </CareNote>
          </UsageCard>
        </DetailsGrid>
      )}
    </Wrapper>
  );
}
