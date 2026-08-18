"use client";

import Link from "next/link";
import styled from "styled-components";
import { FURKYS_PRODUCTS, formatCOP } from "@data/furkys-products";
import FurkysPlaceholderImage from "@component/furkys/FurkysPlaceholderImage";

const MOODS = [
  { id: 1, name: "Curioso", phrase: "Explorando cada rincón de la casa.", product: FURKYS_PRODUCTS[6], col: "1", row: "1 / span 2", ph: "Foto · gato curioso" },
  { id: 2, name: "Consentido", phrase: "Solo lo mejor para él.", product: FURKYS_PRODUCTS[3], col: "2", row: "1", ph: "Foto · gato consentido" },
  { id: 3, name: "Relajado", phrase: "Su refugio favorito para descansar.", product: FURKYS_PRODUCTS[7], col: "2", row: "2", ph: "Foto · gato relajado" },
  { id: 4, name: "Jugetón", phrase: "Listo para la próxima aventura.", product: FURKYS_PRODUCTS[8], col: "1 / span 2", row: "3", ph: "Foto · gato jugando" }
];

const Section = styled.section`
  max-width: 1240px;
  margin: 0 auto;
  padding: 52px 24px 8px;
`;

const HeaderWrap = styled.div`
  text-align: center;
  margin-bottom: 22px;
`;

const Kicker = styled.span`
  display: block;
  font-family: var(--fk-font-ui);
  font-weight: 600;
  font-size: 13px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary.main};
`;

const Title = styled.h2`
  font-family: var(--fk-font-display);
  font-stretch: 125%;
  font-variation-settings: "wdth" 125;
  font-weight: 900;
  font-size: 32px;
  color: ${({ theme }) => theme.colors.secondary.main};
  margin: 6px 0 6px;
  letter-spacing: -0.01em;
`;

const Subtitle = styled.p`
  font-family: var(--fk-font-ui);
  font-size: 14.5px;
  color: ${({ theme }) => theme.colors.gray[600]};
  margin: 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  grid-template-rows: 200px 200px 220px;
  gap: 2px;
  background: #fff;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    grid-template-rows: none;
  }
`;

const Tile = styled(Link)<{ $col: string; $row: string }>`
  position: relative;
  overflow: hidden;
  cursor: pointer;
  display: block;
  grid-column: ${({ $col }) => $col};
  grid-row: ${({ $row }) => $row};

  @media (max-width: 640px) {
    grid-column: auto;
    grid-row: auto;
    height: 220px;
  }
`;

const TileImage = styled(FurkysPlaceholderImage)`
  position: absolute;
  inset: 0;
`;

const TileOverlay = styled.div`
  position: absolute;
  bottom: 20px;
  left: 22px;
  right: 22px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const MoodName = styled.h3`
  font-family: var(--fk-font-display);
  font-stretch: 125%;
  font-variation-settings: "wdth" 125;
  font-weight: 900;
  font-size: 22px;
  text-transform: uppercase;
  color: #fff;
  margin: 0;
  line-height: 1;
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.55);
`;

const MoodPhrase = styled.p`
  font-family: var(--fk-font-ui);
  font-weight: 600;
  font-size: 13.5px;
  color: #fff;
  margin: 0;
  max-width: 320px;
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.55);
`;

const MoodPrice = styled.span`
  font-family: var(--fk-font-ui);
  font-weight: 700;
  font-size: 18px;
  color: #fff;
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.55);
  margin-top: 8px;
  display: inline-block;
`;

export default function MoodsGrid() {
  return (
    <Section>
      <HeaderWrap>
        <Kicker>Encuentra su mood</Kicker>
        <Title>¿Qué mood tiene tu michi hoy?</Title>
        <Subtitle>Un producto para cada una de sus personalidades.</Subtitle>
      </HeaderWrap>
      <Grid>
        {MOODS.map((mood) => (
          <Tile key={mood.id} href={`/product/${mood.product.slug}`} $col={mood.col} $row={mood.row}>
            <TileImage label={mood.ph} dark />
            <TileOverlay>
              <MoodName>{mood.name}</MoodName>
              <MoodPhrase>{mood.phrase}</MoodPhrase>
              <MoodPrice>{formatCOP(mood.product.price)}</MoodPrice>
            </TileOverlay>
          </Tile>
        ))}
      </Grid>
    </Section>
  );
}
