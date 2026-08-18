"use client";

import { useRef } from "react";
import styled from "styled-components";
import { FURKYS_PRODUCTS } from "@data/furkys-products";
import FurkysProductCard from "@component/furkys/FurkysProductCard";

const Wrap = styled.section`
  max-width: 1240px;
  margin: 0 auto;
  padding: 28px 24px 8px;
`;

const Header = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
`;

const Title = styled.h2`
  font-family: var(--fk-font-display);
  font-stretch: 125%;
  font-variation-settings: "wdth" 125;
  font-weight: 900;
  font-size: 32px;
  color: ${({ theme }) => theme.colors.secondary.main};
  margin: 0;
  letter-spacing: -0.01em;
  text-align: center;
`;

const ScrollButtons = styled.div`
  position: absolute;
  right: 0;
  display: flex;
  gap: 10px;

  @media (max-width: 640px) {
    display: none;
  }
`;

const ScrollButton = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #ffffff;
  border: 1.5px solid ${({ theme }) => theme.colors.gray[400]};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.15s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.gray[900]};
  }
`;

const Track = styled.div`
  display: flex;
  gap: 18px;
  overflow-x: auto;
  padding-bottom: 8px;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default function ProductCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * 560, behavior: "smooth" });
  };

  return (
    <Wrap id="productos">
      <Header>
        <Title>Los favoritos de tu michi</Title>
        <ScrollButtons>
          <ScrollButton onClick={() => scroll(-1)} aria-label="Anterior">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#141210" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </ScrollButton>
          <ScrollButton onClick={() => scroll(1)} aria-label="Siguiente">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#141210" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </ScrollButton>
        </ScrollButtons>
      </Header>
      <Track ref={trackRef}>
        {FURKYS_PRODUCTS.map((product) => (
          <FurkysProductCard key={product.id} product={product} />
        ))}
      </Track>
    </Wrap>
  );
}
