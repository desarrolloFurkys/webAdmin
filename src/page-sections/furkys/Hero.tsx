"use client";

import styled, { keyframes } from "styled-components";
import FurkysPlaceholderImage from "@component/furkys/FurkysPlaceholderImage";

const float = keyframes`
  0%, 100% { transform: translateY(0) rotate(-4deg); }
  50% { transform: translateY(-9px) rotate(-4deg); }
`;

const Wrap = styled.section`
  max-width: 1240px;
  margin: 0 auto;
  padding: 36px 24px 14px;
`;

const Panel = styled.div`
  position: relative;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.gray[900]};
  border-radius: 28px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  min-height: 480px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    min-height: auto;
  }
`;

const Copy = styled.div`
  padding: 56px 52px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 900px) {
    padding: 40px 28px;
  }
`;

const Kicker = styled.span`
  font-family: var(--fk-font-ui);
  font-weight: 600;
  font-size: 13px;
  letter-spacing: 0.16em;
  color: ${({ theme }) => theme.colors.primary.main};
  text-transform: uppercase;
  margin-bottom: 16px;
`;

const Title = styled.h1`
  font-family: var(--fk-font-display);
  font-stretch: 125%;
  font-variation-settings: "wdth" 125;
  font-weight: 900;
  text-transform: uppercase;
  color: #fbfaf7;
  font-size: 52px;
  line-height: 0.92;
  letter-spacing: -0.015em;
  margin: 0 0 18px;

  @media (max-width: 640px) {
    font-size: 36px;
  }
`;

const Subtitle = styled.p`
  font-family: var(--fk-font-ui);
  font-weight: 400;
  font-size: 16.5px;
  line-height: 1.55;
  color: #b7b0a4;
  max-width: 430px;
  margin: 0 0 26px;
`;

const CtaRow = styled.div`
  display: flex;
  gap: 13px;
  flex-wrap: wrap;
`;

const PrimaryCta = styled.a`
  background: ${({ theme }) => theme.colors.primary.main};
  color: #fff;
  border: none;
  border-radius: 999px;
  padding: 15px 30px;
  font-family: var(--fk-font-ui);
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.18s;

  &:hover {
    background: ${({ theme }) => theme.colors.primary.dark};
    box-shadow: 0 12px 26px rgba(232, 80, 29, 0.34);
    transform: translateY(-2px);
  }
`;

const SecondaryCta = styled.a`
  background: transparent;
  color: #fbfaf7;
  border: 1.5px solid rgba(255, 255, 255, 0.3);
  border-radius: 999px;
  padding: 15px 30px;
  font-family: var(--fk-font-ui);
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.18s;

  &:hover {
    background: #fbfaf7;
    color: #141210;
  }
`;

const TrustRow = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 34px;
  flex-wrap: wrap;
`;

const TrustItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #9c9488;
  font-family: var(--fk-font-ui);
  font-size: 13.5px;
  font-weight: 500;
`;

const Dot = styled.span<{ $color: string }>`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
`;

const ImageArea = styled.div`
  position: relative;
  padding: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeroImage = styled(FurkysPlaceholderImage)`
  width: 100%;
  height: 420px;
  border-radius: 22px;
`;

const DiscountBadge = styled.div`
  position: absolute;
  top: 50px;
  right: 48px;
  background: ${({ theme }) => theme.colors.secondary.main};
  color: #fff;
  border-radius: 999px;
  width: 96px;
  height: 96px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: var(--fk-font-display);
  font-stretch: 125%;
  font-variation-settings: "wdth" 125;
  font-weight: 900;
  line-height: 0.9;
  animation: ${float} 4s ease-in-out infinite;
  box-shadow: 0 14px 30px rgba(102, 38, 129, 0.4);

  span:first-child {
    font-size: 12px;
    font-family: var(--fk-font-ui);
    font-weight: 600;
  }
  span:last-child {
    font-size: 28px;
  }
`;

export default function Hero() {
  return (
    <Wrap>
      <Panel>
        <Grid>
          <Copy>
            <Kicker>Lo más vendido · Colombia</Kicker>
            <Title>Consiente a tu mejor amigo</Title>
            <Subtitle>
              Arena y accesorios para tu gato, con la calidad de Furky's y envío rápido a toda Colombia.
            </Subtitle>
            <CtaRow>
              <PrimaryCta href="#productos">Comprar arena</PrimaryCta>
              <SecondaryCta href="#productos">Ver catálogo</SecondaryCta>
            </CtaRow>
            <TrustRow>
              <TrustItem>
                <Dot $color="#E8501D" />
                Envío 24–48h
              </TrustItem>
              <TrustItem>
                <Dot $color="#662681" />
                Pago seguro Bold
              </TrustItem>
              <TrustItem>
                <Dot $color="#E8501D" />
                +12.000 clientes
              </TrustItem>
            </TrustRow>
          </Copy>
          <ImageArea>
            <HeroImage label="Foto · bolsa de arena Furky's" dark />
            <DiscountBadge>
              <span>HASTA</span>
              <span>-30%</span>
            </DiscountBadge>
          </ImageArea>
        </Grid>
      </Panel>
    </Wrap>
  );
}
