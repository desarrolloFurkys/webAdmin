"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import FurkysPlaceholderImage from "@component/furkys/FurkysPlaceholderImage";

const SLIDES = [
  { id: 1, kicker: "Control de olores", title: "Arena que absorbe de verdad", desc: "Grumos firmes y control de olores desde el primer uso.", ph: "Foto · arena en el arenero" },
  { id: 2, kicker: "Fácil de limpiar", title: "Menos polvo, más comodidad", desc: "Limpieza rápida sin dejar rastro en tu casa.", ph: "Foto · limpiando el arenero" },
  { id: 3, kicker: "100% natural", title: "Cuidado biodegradable", desc: "Ingredientes naturales, seguros para tu gato y el planeta.", ph: "Foto · bolsa de arena natural" }
];

const Section = styled.section`
  max-width: 1240px;
  margin: 0 auto;
  padding: 42px 24px 8px;
`;

const CarouselFrame = styled.div`
  position: relative;
  border-radius: 40px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.gray[900]};
`;

const Track = styled.div<{ $index: number }>`
  display: flex;
  transition: transform 0.45s ease;
  transform: translateX(${({ $index }) => -$index * 100}%);
`;

const Slide = styled.div`
  flex: 0 0 100%;
  position: relative;
`;

const SlideImage = styled(FurkysPlaceholderImage)`
  width: 100%;
  height: 380px;
`;

const Caption = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 40px 48px 32px;
  background: linear-gradient(to top, rgba(20, 18, 16, 0.94), rgba(20, 18, 16, 0.55) 55%, transparent);

  @media (max-width: 640px) {
    padding: 24px 24px 20px;
  }
`;

const Kicker = styled.span`
  display: inline-block;
  font-family: var(--fk-font-ui);
  font-weight: 600;
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary.main};
  margin-bottom: 9px;
`;

const CaptionTitle = styled.h3`
  font-family: var(--fk-font-display);
  font-stretch: 125%;
  font-variation-settings: "wdth" 125;
  font-weight: 900;
  font-size: 32px;
  text-transform: uppercase;
  color: #fbfaf7;
  margin: 0 0 9px;
  line-height: 0.95;
  letter-spacing: -0.01em;
`;

const CaptionDesc = styled.p`
  font-family: var(--fk-font-ui);
  font-size: 15px;
  color: #d7d0c4;
  max-width: 480px;
  margin: 0;
  line-height: 1.5;
`;

const NavButton = styled.button<{ $side: "left" | "right" }>`
  position: absolute;
  top: 50%;
  ${({ $side }) => ($side === "left" ? "left: 18px;" : "right: 18px;")}
  transform: translateY(-50%);
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.92);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);

  &:hover {
    background: #fff;
  }
`;

const Dots = styled.div`
  position: absolute;
  bottom: 20px;
  right: 48px;
  display: flex;
  gap: 8px;
`;

const Dot = styled.button<{ $active: boolean }>`
  width: ${({ $active }) => ($active ? "26px" : "9px")};
  height: 9px;
  border-radius: 999px;
  background: ${({ $active, theme }) => ($active ? theme.colors.primary.main : "rgba(255,255,255,.5)")};
  border: none;
  cursor: pointer;
  padding: 0;
  transition: width 0.2s;
`;

export default function ArenaCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 5500);
    return () => clearInterval(timer);
  }, []);

  return (
    <Section>
      <CarouselFrame>
        <Track $index={index}>
          {SLIDES.map((slide) => (
            <Slide key={slide.id}>
              <SlideImage label={slide.ph} dark />
              <Caption>
                <Kicker>{slide.kicker}</Kicker>
                <CaptionTitle>{slide.title}</CaptionTitle>
                <CaptionDesc>{slide.desc}</CaptionDesc>
              </Caption>
            </Slide>
          ))}
        </Track>
        <NavButton $side="left" onClick={() => setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length)} aria-label="Anterior">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#141210" strokeWidth="2.4">
            <path d="M15 6l-6 6 6 6" />
          </svg>
        </NavButton>
        <NavButton $side="right" onClick={() => setIndex((i) => (i + 1) % SLIDES.length)} aria-label="Siguiente">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#141210" strokeWidth="2.4">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </NavButton>
        <Dots>
          {SLIDES.map((slide, i) => (
            <Dot key={slide.id} $active={i === index} onClick={() => setIndex(i)} aria-label="Ir a slide" />
          ))}
        </Dots>
      </CarouselFrame>
    </Section>
  );
}
