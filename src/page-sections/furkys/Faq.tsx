"use client";

import { useState } from "react";
import styled from "styled-components";
import FurkysPlaceholderImage from "@component/furkys/FurkysPlaceholderImage";

const FAQ_ITEMS = [
  { q: "¿Cuánto tarda el envío?", a: "En Bogotá 1–2 días hábiles con envío gratis. Resto de Colombia 2–4 días hábiles desde $12.900 (gratis desde $80.000)." },
  { q: "¿Qué métodos de pago aceptan?", a: "Pagos seguros con Bold: tarjeta de crédito/débito, PSE, Nequi y más." },
  { q: "¿Puedo devolver un producto?", a: "Sí, tienes 5 días hábiles desde la entrega para solicitar cambios o devoluciones en productos sin abrir." },
  { q: "¿La arena es segura para gatitos?", a: "Sí, nuestra arena es 100% natural y segura para gatos de todas las edades." },
  { q: "¿Tienen puntos de venta físicos?", a: "Por ahora vendemos exclusivamente en línea con envíos a toda Colombia." }
];

const IG_THUMBS = [1, 2, 3, 4];

const Section = styled.section`
  background: #fcf3ee;
  padding: 44px 0 52px;
`;

const Title = styled.h2`
  font-family: var(--fk-font-display);
  font-stretch: 125%;
  font-variation-settings: "wdth" 125;
  font-weight: 900;
  font-size: 32px;
  color: ${({ theme }) => theme.colors.secondary.main};
  margin: 0 0 24px;
  letter-spacing: -0.01em;
  text-align: center;
`;

const Inner = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 24px;
`;

const FaqPanel = styled.div`
  background: ${({ theme }) => theme.colors.primary.main};
  border-radius: 24px;
  overflow: hidden;
`;

const FaqPanelTitle = styled.div`
  padding: 26px 32px 6px;
  text-align: center;
  font-family: var(--fk-font-ui);
  font-weight: 800;
  font-size: 19px;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.02em;
`;

const FaqList = styled.div`
  padding: 14px 32px 26px;
`;

const FaqItem = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.22);
`;

const FaqQuestion = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  background: none;
  border: none;
  padding: 17px 4px;
  cursor: pointer;
  text-align: left;
  color: #fff;
`;

const FaqQuestionText = styled.span`
  font-family: var(--fk-font-ui);
  font-weight: 700;
  font-size: 15px;
`;

const FaqToggleIcon = styled.span<{ $open: boolean }>`
  flex: none;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  transform: rotate(${({ $open }) => ($open ? "45deg" : "0deg")});
  transition: transform 0.18s;
`;

const FaqAnswerWrap = styled.div<{ $open: boolean }>`
  max-height: ${({ $open }) => ($open ? "220px" : "0px")};
  overflow: hidden;
  transition: max-height 0.22s ease;
`;

const FaqAnswer = styled.p`
  margin: 0 4px 18px;
  font-family: var(--fk-font-ui);
  font-size: 14px;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.9);
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
  margin-top: 20px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const InfoCard = styled.div`
  background: ${({ theme }) => theme.colors.secondary.light};
  border: 1px solid #e1cff0;
  border-radius: 18px;
  padding: 24px 22px;
`;

const InfoCardTitle = styled.h3`
  font-family: var(--fk-font-display);
  font-stretch: 125%;
  font-variation-settings: "wdth" 125;
  font-weight: 800;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.secondary.main};
  margin: 0 0 8px;
`;

const InfoCardText = styled.p`
  font-family: var(--fk-font-ui);
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray[700]};
  margin: 0;
  line-height: 1.5;
`;

const HighlightCard = styled.div`
  background: ${({ theme }) => theme.colors.secondary.main};
  border-radius: 18px;
  padding: 24px 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const HighlightText = styled.span`
  font-family: var(--fk-font-ui);
  font-weight: 800;
  font-size: 18px;
  color: #fff;
`;

const InstagramLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 28px 0 20px;
  text-decoration: none;
`;

const InstagramIcon = styled.span`
  width: 32px;
  height: 32px;
  border-radius: 9px;
  border: 2px solid ${({ theme }) => theme.colors.primary.main};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary.main};
`;

const InstagramHandle = styled.span`
  font-family: var(--fk-font-ui);
  font-weight: 800;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.secondary.main};
`;

const IgGrid = styled.div`
  background: ${({ theme }) => theme.colors.secondary.main};
  border-radius: 24px;
  padding: 22px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;

  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const IgThumb = styled(FurkysPlaceholderImage)`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 12px;
`;

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section id="guia-furkys">
      <Title>Preguntas de humanos</Title>
      <Inner>
        <FaqPanel>
          <FaqPanelTitle>Preguntas Frecuentes</FaqPanelTitle>
          <FaqList>
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <FaqItem key={item.q}>
                  <FaqQuestion onClick={() => setOpenIndex(isOpen ? null : index)}>
                    <FaqQuestionText>{item.q}</FaqQuestionText>
                    <FaqToggleIcon $open={isOpen}>+</FaqToggleIcon>
                  </FaqQuestion>
                  <FaqAnswerWrap $open={isOpen}>
                    <FaqAnswer>{item.a}</FaqAnswer>
                  </FaqAnswerWrap>
                </FaqItem>
              );
            })}
          </FaqList>
        </FaqPanel>

        <InfoGrid>
          <InfoCard>
            <InfoCardTitle>Atención humana</InfoCardTitle>
            <InfoCardText>Lunes a sábado, de 9:00 a.m. a 5:00 p.m.</InfoCardText>
          </InfoCard>
          <HighlightCard>
            <HighlightText>Compra 100% segura</HighlightText>
          </HighlightCard>
          <InfoCard>
            <InfoCardTitle>Compra directa</InfoCardTitle>
            <InfoCardText>Productos originales y respaldo de la marca.</InfoCardText>
          </InfoCard>
        </InfoGrid>

        <InstagramLink href="https://www.instagram.com/furkys.co" target="_blank" rel="noopener">
          <InstagramIcon>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4.2" />
              <circle cx="17.6" cy="6.4" r="1.2" fill="currentColor" stroke="none" />
            </svg>
          </InstagramIcon>
          <InstagramHandle>furkys.co</InstagramHandle>
        </InstagramLink>

        <IgGrid>
          {IG_THUMBS.map((id) => (
            <IgThumb key={id} label="Foto · Instagram" dark />
          ))}
        </IgGrid>
      </Inner>
    </Section>
  );
}
