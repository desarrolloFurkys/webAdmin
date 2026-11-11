"use client";

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

const Track = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));
  gap: 18px;
`;

export default function ProductCarousel() {
  return (
    <Wrap id="productos">
      <Header>
        <Title>Los favoritos de tu michi</Title>
      </Header>
      <Track>
        {FURKYS_PRODUCTS.map((product) => (
          <FurkysProductCard key={product.id} product={product} />
        ))}
      </Track>
    </Wrap>
  );
}
