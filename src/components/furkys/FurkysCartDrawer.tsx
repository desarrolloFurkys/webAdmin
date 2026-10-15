"use client";

import Link from "next/link";
import styled from "styled-components";
import useCart from "@hook/useCart";
import useCartUI from "@hook/useCartUI";
import type { CartPhase } from "@context/CartUIContext";
import { formatCOP } from "@data/furkys-products";
import FurkysPlaceholderImage from "./FurkysPlaceholderImage";

const FREE_SHIPPING_THRESHOLD = 80000;
const SHIPPING_COST = 12900;

const Overlay = styled.div<{ $phase: CartPhase }>`
  position: fixed;
  inset: 0;
  z-index: 200;
  pointer-events: ${({ $phase }) => ($phase === "open" ? "auto" : "none")};
`;

const Backdrop = styled.div<{ $phase: CartPhase }>`
  position: absolute;
  inset: 0;
  background: rgba(20, 18, 16, 0.45);
  opacity: ${({ $phase }) => ($phase === "open" || $phase === "reach" ? 1 : 0)};
  transition: ${({ $phase }) => ($phase === "pull" ? "opacity 0.6s ease 0.1s" : "opacity 0.32s ease")};
`;

const Panel = styled.div<{ $phase: CartPhase }>`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 440px;
  max-width: 92vw;
  background: #ffffff;
  box-shadow: -10px 0 34px rgba(20, 18, 16, 0.16);
  transform: ${({ $phase }) =>
    $phase === "open" || $phase === "reach" ? "translateX(0)" : "translateX(calc(100% + 120px))"};
  transition: ${({ $phase }) =>
    $phase === "pull"
      ? "transform 0.62s cubic-bezier(0.55, 0, 0.75, 0.15)"
      : "transform 0.38s cubic-bezier(0.4, 0, 0.2, 1)"};
  display: flex;
  flex-direction: column;
`;

const Paw = styled.div<{ $phase: CartPhase }>`
  position: absolute;
  top: 34%;
  left: -80px;
  width: 532px;
  height: 180px;
  z-index: 5;
  pointer-events: none;
  transform-origin: 100% 50%;
  filter: drop-shadow(0 12px 18px rgba(20, 18, 16, 0.28));
  opacity: ${({ $phase }) => ($phase === "reach" || $phase === "pull" ? 1 : 0)};
  transform: ${({ $phase }) =>
    $phase === "reach"
      ? "translateX(0) rotate(0deg)"
      : $phase === "pull"
        ? "translateX(-6px) rotate(-2deg)"
        : "translateX(620px) rotate(0deg)"};
  transition: ${({ $phase }) =>
    $phase === "reach"
      ? "transform 0.5s cubic-bezier(0.2, 0.9, 0.3, 1.1)"
      : $phase === "pull"
        ? "transform 0.2s ease"
        : "none"};

  img {
    width: 100%;
    height: 100%;
    display: block;
    transform: scaleX(-1);
  }

  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
`;

const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[400]};
  flex: none;
`;

const Title = styled.h1`
  font-family: var(--fk-font-display);
  font-stretch: 125%;
  font-variation-settings: "wdth" 125;
  font-weight: 900;
  font-size: 26px;
  text-transform: uppercase;
  margin: 0;
  letter-spacing: -0.01em;
  color: ${({ theme }) => theme.colors.gray[900]};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.gray[700]};

  &:hover {
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

const Body = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 20px 24px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 48px 12px;
`;

const EmptyTitle = styled.div`
  font-family: var(--fk-font-display);
  font-stretch: 125%;
  font-variation-settings: "wdth" 125;
  font-weight: 800;
  font-size: 20px;
  text-transform: uppercase;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.gray[900]};
`;

const EmptyText = styled.p`
  font-family: var(--fk-font-ui);
  color: ${({ theme }) => theme.colors.gray[600]};
  margin: 0 0 22px;
  font-size: 14px;
`;

const ExploreButton = styled.button`
  background: ${({ theme }) => theme.colors.primary.main};
  color: #fff;
  border: none;
  border-radius: 999px;
  padding: 13px 26px;
  font-family: var(--fk-font-ui);
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ItemCard = styled.div`
  background: #ffffff;
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
  border-radius: 16px;
  padding: 12px;
  display: flex;
  gap: 12px;
  align-items: center;
`;

const ItemThumb = styled(FurkysPlaceholderImage)`
  width: 72px;
  height: 72px;
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
  border-radius: 12px;
  flex: none;
`;

const ItemDetails = styled.div`
  flex: 1;
  min-width: 0;
`;

const ItemName = styled.h3`
  font-family: var(--fk-font-ui);
  font-weight: 600;
  font-size: 14px;
  margin: 2px 0 3px;
  color: ${({ theme }) => theme.colors.gray[900]};
`;

const QtyRow = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const QtyControls = styled.div`
  display: flex;
  align-items: center;
  border: 1.5px solid ${({ theme }) => theme.colors.gray[400]};
  border-radius: 9px;
  overflow: hidden;
`;

const QtyButton = styled.button`
  background: #ffffff;
  border: none;
  width: 28px;
  height: 30px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.gray[100]};
  }
`;

const QtyValue = styled.span`
  width: 28px;
  text-align: center;
  font-family: var(--fk-font-ui);
  font-weight: 600;
  font-size: 13px;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-family: var(--fk-font-ui);
  font-size: 12px;
  color: ${({ theme }) => theme.colors.gray[500]};
  display: flex;
  align-items: center;
  gap: 4px;

  &:hover {
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

const ItemPrices = styled.div`
  text-align: right;
  flex: none;
`;

const ItemLineTotal = styled.div`
  font-family: var(--fk-font-ui);
  font-weight: 700;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.gray[900]};
`;

const Footer = styled.div`
  flex: none;
  border-top: 1px solid ${({ theme }) => theme.colors.gray[400]};
  padding: 20px 24px;
  box-shadow: 0 -6px 18px rgba(20, 18, 16, 0.04);
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: var(--fk-font-ui);
  font-size: 13.5px;
  padding: 5px 0;
  color: ${({ theme }) => theme.colors.gray[700]};
`;

const TotalRow = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.gray[400]};
  margin-top: 8px;
  padding-top: 12px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const TotalLabel = styled.span`
  font-family: var(--fk-font-ui);
  font-weight: 600;
  font-size: 15.5px;
  color: ${({ theme }) => theme.colors.gray[900]};
`;

const TotalValue = styled.span`
  font-family: var(--fk-font-ui);
  font-weight: 800;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.gray[900]};
`;

const FreeBarWrap = styled.div`
  margin: 14px 0 2px;
`;

const FreeBarTrack = styled.div`
  height: 7px;
  border-radius: 999px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.gray[300]};
`;

const FreeBarFill = styled.div<{ $pct: number }>`
  height: 100%;
  width: ${({ $pct }) => $pct}%;
  background: ${({ theme }) => theme.colors.primary.main};
  transition: width 0.4s;
`;

const FreeBarMsg = styled.div`
  font-family: var(--fk-font-ui);
  font-size: 11.5px;
  color: ${({ theme }) => theme.colors.gray[600]};
  margin-top: 7px;
`;

const CheckoutButton = styled(Link)`
  width: 100%;
  margin-top: 16px;
  background: ${({ theme }) => theme.colors.gray[900]};
  color: #fff;
  border: none;
  border-radius: 14px;
  padding: 15px;
  font-family: var(--fk-font-ui);
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-decoration: none;
  transition: background 0.18s;

  &:hover {
    background: #2a2420;
  }
`;

const BoldWordmark = styled.span`
  font-family: var(--fk-font-display);
  font-stretch: 125%;
  font-variation-settings: "wdth" 125;
  font-weight: 900;
  font-size: 17px;
  letter-spacing: 0.02em;
`;

const SecureNote = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 12px;
  color: ${({ theme }) => theme.colors.gray[500]};
  font-family: var(--fk-font-ui);
  font-size: 11px;
`;

export default function FurkysCartDrawer() {
  const {
    state: { cart },
    dispatch
  } = useCart();
  const { isOpen, phase, close } = useCartUI();

  const subtotal = cart.reduce((total, item) => total + item.price * item.qty, 0);
  const shipping = cart.length === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;
  const freeBarPct = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const changeQty = (item: (typeof cart)[number], qty: number) => {
    dispatch({ type: "CHANGE_CART_AMOUNT", payload: { ...item, qty } });
  };

  return (
    <Overlay $phase={phase} aria-hidden={!isOpen}>
      <Backdrop $phase={phase} onClick={close} />
      <Panel $phase={phase}>
        <Paw $phase={phase} aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/furkys/cat-paw.png" alt="" />
        </Paw>
        <PanelHeader>
          <Title>Tu carrito</Title>
          <CloseButton onClick={close} aria-label="Cerrar carrito">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </CloseButton>
        </PanelHeader>

        <Body>
          {cart.length === 0 ? (
            <EmptyState>
              <EmptyTitle>Tu carrito está vacío</EmptyTitle>
              <EmptyText>Agrega productos para que tu mascota sea feliz.</EmptyText>
              <ExploreButton onClick={close}>Explorar productos</ExploreButton>
            </EmptyState>
          ) : (
            <ItemList>
              {cart.map((item) => (
                <ItemCard key={item.id}>
                  <ItemThumb label={item.name} />
                  <ItemDetails>
                    <ItemName>{item.name}</ItemName>
                    <QtyRow>
                      <QtyControls>
                        <QtyButton onClick={() => changeQty(item, item.qty - 1)} aria-label="Quitar uno">
                          −
                        </QtyButton>
                        <QtyValue>{item.qty}</QtyValue>
                        <QtyButton onClick={() => changeQty(item, item.qty + 1)} aria-label="Agregar uno">
                          +
                        </QtyButton>
                      </QtyControls>
                      <RemoveButton onClick={() => changeQty(item, 0)}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13" />
                        </svg>
                        Quitar
                      </RemoveButton>
                    </QtyRow>
                  </ItemDetails>
                  <ItemPrices>
                    <ItemLineTotal>{formatCOP(item.price * item.qty)}</ItemLineTotal>
                  </ItemPrices>
                </ItemCard>
              ))}
            </ItemList>
          )}
        </Body>

        {cart.length > 0 && (
          <Footer>
            <SummaryRow>
              <span>Subtotal</span>
              <span>{formatCOP(subtotal)}</span>
            </SummaryRow>
            <SummaryRow>
              <span>Envío</span>
              <span style={{ color: shipping === 0 ? "#1F8A5B" : undefined, fontWeight: 600 }}>
                {shipping === 0 ? "Gratis" : formatCOP(shipping)}
              </span>
            </SummaryRow>
            <TotalRow>
              <TotalLabel>Total</TotalLabel>
              <TotalValue>{formatCOP(total)}</TotalValue>
            </TotalRow>

            {shipping > 0 && (
              <FreeBarWrap>
                <FreeBarTrack>
                  <FreeBarFill $pct={freeBarPct} />
                </FreeBarTrack>
                <FreeBarMsg>Te faltan {formatCOP(remaining)} para envío gratis</FreeBarMsg>
              </FreeBarWrap>
            )}

            <CheckoutButton href="/checkout" onClick={close}>
              Pagar con
              <BoldWordmark>Bold</BoldWordmark>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#13E2A0" }} />
            </CheckoutButton>
            <SecureNote>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="5" y="11" width="14" height="9" rx="2" />
                <path d="M8 11V8a4 4 0 018 0v3" />
              </svg>
              Pago cifrado · Tarjeta, PSE, Nequi y más
            </SecureNote>
          </Footer>
        )}
      </Panel>
    </Overlay>
  );
}
