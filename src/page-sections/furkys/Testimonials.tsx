"use client";

import { useRef } from "react";
import styled from "styled-components";
import FurkysPlaceholderImage from "@component/furkys/FurkysPlaceholderImage";

const TESTIMONIALS = [
  { id: 1, ph: "Foto · gato con dueña feliz", quote: "Mi gato dejó de rechazar el arenero desde que usamos Furky's.", name: "Camila R." },
  { id: 2, ph: "Foto · gato jugando con catnip", quote: "El catnip los vuelve locos, ¡y en el mejor sentido!", name: "Andrés M." },
  { id: 3, ph: "Foto · gato en refugio cueva", quote: "Envío rapidísimo y el refugio quedó perfecto para mi gata.", name: "Laura P." },
  { id: 4, ph: "Foto · gato comiendo en plato elevado", quote: "El plato elevado le ayudó muchísimo con la digestión.", name: "Diego S." }
];

const Section = styled.section`
  background: #fcf3ee;
  padding: 44px 0 52px;
`;

const Inner = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 24px;
`;

const HeaderRow = styled.div`
  position: relative;
  margin-bottom: 6px;
`;

const HeaderCenter = styled.div`
  text-align: center;
  padding: 0 0;
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
`;

const Subtitle = styled.p`
  font-family: var(--fk-font-ui);
  font-weight: 700;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.primary.main};
  margin: 4px 0 0;
`;

const RatingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 22px 0 20px;
`;

const Score = styled.span`
  font-family: var(--fk-font-price);
  font-weight: 900;
  font-size: 28px;
  color: ${({ theme }) => theme.colors.gray[900]};
`;

const Stars = styled.span`
  color: ${({ theme }) => theme.colors.primary.main};
  font-size: 18px;
  letter-spacing: 2px;
`;

const ReviewCount = styled.span`
  font-family: var(--fk-font-ui);
  font-size: 13px;
  color: ${({ theme }) => theme.colors.gray[600]};
`;

const CarouselWrap = styled.div`
  position: relative;
`;

const Track = styled.div`
  display: flex;
  gap: 18px;
  overflow-x: auto;
  padding-bottom: 4px;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Slide = styled.div`
  flex: 0 0 280px;
  border-radius: 22px;
  overflow: hidden;
  position: relative;
  height: 380px;
`;

const SlideImage = styled(FurkysPlaceholderImage)`
  position: absolute;
  inset: 0;
`;

const SlideOverlay = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 22px 20px 20px;
  background: linear-gradient(to top, rgba(20, 18, 16, 0.85), rgba(20, 18, 16, 0.2) 65%, transparent);
`;

const SlideStars = styled.div`
  color: #f5a623;
  font-size: 16px;
  letter-spacing: 2px;
  margin-bottom: 10px;
`;

const Quote = styled.p`
  font-family: var(--fk-font-ui);
  font-weight: 600;
  font-size: 15px;
  color: #fff;
  line-height: 1.4;
  margin: 0 0 12px;
  text-align: center;
`;

const Name = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-family: var(--fk-font-ui);
  font-weight: 700;
  font-size: 14.5px;
  color: #fff;
`;

const NavButton = styled.button<{ $side: "left" | "right" }>`
  position: absolute;
  top: 50%;
  ${({ $side }) => ($side === "left" ? "left: -8px;" : "right: -8px;")}
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.gray[900]};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${({ theme }) => theme.colors.primary.main};
  }
`;

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => trackRef.current?.scrollBy({ left: dir * 300, behavior: "smooth" });

  return (
    <Section>
      <Inner>
        <HeaderRow>
          <HeaderCenter>
            <Title>Aprobado por michis exigentes</Title>
            <Subtitle>(y confirmado por sus humanos)</Subtitle>
          </HeaderCenter>
        </HeaderRow>
        <RatingRow>
          <Score>4.9</Score>
          <Stars>★★★★★</Stars>
          <ReviewCount>312 reseñas verificadas</ReviewCount>
        </RatingRow>
        <CarouselWrap>
          <Track ref={trackRef}>
            {TESTIMONIALS.map((t) => (
              <Slide key={t.id}>
                <SlideImage label={t.ph} dark />
                <SlideOverlay>
                  <SlideStars>★★★★★</SlideStars>
                  <Quote>{t.quote}</Quote>
                  <Name>
                    {t.name}
                    <span
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: "50%",
                        background: "#22C55E",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 10,
                        color: "#fff"
                      }}
                    >
                      ✓
                    </span>
                  </Name>
                </SlideOverlay>
              </Slide>
            ))}
          </Track>
          <NavButton $side="left" onClick={() => scroll(-1)} aria-label="Anterior">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4">
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </NavButton>
          <NavButton $side="right" onClick={() => scroll(1)} aria-label="Siguiente">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </NavButton>
        </CarouselWrap>
      </Inner>
    </Section>
  );
}
