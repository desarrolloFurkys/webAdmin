"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styled, { keyframes } from "styled-components";
import useCart from "@hook/useCart";
import useCartUI from "@hook/useCartUI";

const marquee = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`;

const MARQUEE_ITEMS = [
  "Envío gratis desde $80.000",
  "Paga con Bold: tarjeta, PSE, Nequi y más",
  "100% Natural y Biodegradable",
  "Acaricia la felicidad 🐾"
];

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 60;
  background: #662681;
`;

const Marquee = styled.div`
  background: #e8501d;
  overflow: hidden;
  white-space: nowrap;
  padding: 9px 0;
`;

const MarqueeTrack = styled.div`
  display: flex;
  width: max-content;
  align-items: center;
  gap: 28px;
  animation: ${marquee} 32s linear infinite;
  will-change: transform;
`;

const MarqueeItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 28px;
  color: #fbfaf7;
  font-family: var(--fk-font-ui);
  font-weight: 600;
  font-size: 12.5px;
  letter-spacing: 0.06em;
`;

const Row = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  padding: 14px 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: space-between;
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
`;

const Nav = styled.nav`
  display: flex;
  gap: 26px;
  margin-left: 8px;
  flex-shrink: 0;

  @media (max-width: 767px) {
    display: none;
  }
`;

const NavLink = styled(Link)<{ $active?: boolean }>`
  color: #ffffff;
  font-family: var(--fk-font-ui);
  font-weight: 700;
  font-size: 14.5px;
  text-decoration: none;
  white-space: nowrap;
  border-bottom: ${({ $active }) => ($active ? "2px solid #e8501d" : "2px solid transparent")};
  padding-bottom: 2px;
`;

const CartButton = styled.button`
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

const CartIcon = styled.span`
  width: 44px;
  height: 44px;
  border-radius: 10px;
  border: 1.5px solid rgba(255, 255, 255, 0.35);
  background: rgba(255, 255, 255, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CartCount = styled.span`
  position: absolute;
  top: -6px;
  right: -8px;
  background: #e8501d;
  color: #fff;
  border-radius: 999px;
  min-width: 19px;
  height: 19px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  padding: 0 4px;
  font-family: var(--fk-font-ui);
`;

export default function FurkysHeader() {
  const {
    state: { cart }
  } = useCart();
  const { open } = useCartUI();
  const cartCount = cart.reduce((total, item) => total + item.qty, 0);
  const pathname = usePathname();

  return (
    <Header>
      <Marquee>
        <MarqueeTrack>
          {Array.from({ length: 8 }, () => MARQUEE_ITEMS).flat().map((text, index) => (
            <MarqueeItem key={index}>
              <span>{text}</span>
              <span aria-hidden="true">🐾</span>
            </MarqueeItem>
          ))}
        </MarqueeTrack>
      </Marquee>

      <Row>
        <LogoLink href="/">
          <Image
            src="/assets/furkys/furkys-logo-white.png"
            alt="Furky's · Acaricia la felicidad"
            height={64}
            width={220}
            style={{ height: 52, width: "auto", objectFit: "contain", display: "block" }}
            priority
          />
        </LogoLink>

        <Nav>
          <NavLink href="/" $active={pathname === "/"}>
            FurkyShop
          </NavLink>
          <NavLink href="/guia" $active={pathname === "/guia" || pathname.startsWith("/guia/")}>
            Guía Furky's
          </NavLink>
          <NavLink href="/#puntos-de-venta">Puntos de Venta</NavLink>
        </Nav>

        <CartButton onClick={open} aria-label="Carrito">
          <CartIcon>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </CartIcon>
          {cartCount > 0 && <CartCount>{cartCount}</CartCount>}
        </CartButton>
      </Row>
    </Header>
  );
}
