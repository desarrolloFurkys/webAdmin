"use client";

import styled from "styled-components";
import FurkysPlaceholderImage from "@component/furkys/FurkysPlaceholderImage";
import { FURKYS_GUIDE_ARTICLES } from "@data/furkys-guides";

const Wrapper = styled.main`
  max-width: 1240px;
  margin: 0 auto;
  padding: 26px 24px 80px;
`;

const Hero = styled.section`
  position: relative;
  background: #f1e7f9;
  border-radius: 28px;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  align-items: center;
  gap: 24px;
  padding: 0 0 0 48px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    padding: 0 0 0 0;
  }
`;

const HeroCircle = styled.div`
  position: absolute;
  left: -30px;
  bottom: -40px;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: #eadcf5;
  z-index: 0;
`;

const HeroText = styled.div`
  position: relative;
  z-index: 1;
  padding: 48px 24px;

  @media (max-width: 760px) {
    padding: 36px 24px 8px;
  }
`;

const HeroTitle = styled.h1`
  font-family: var(--fk-font-display);
  font-stretch: 125%;
  font-variation-settings: "wdth" 125;
  font-weight: 900;
  font-size: 44px;
  color: ${({ theme }) => theme.colors.secondary.main};
  margin: 0 0 14px;
  letter-spacing: -0.01em;
`;

const HeroDesc = styled.p`
  font-family: var(--fk-font-ui);
  font-size: 15.5px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.gray[700]};
  max-width: 420px;
  margin: 0;
`;

const HeroImage = styled(FurkysPlaceholderImage)`
  position: relative;
  z-index: 1;
  width: 100%;
  height: 260px;

  @media (max-width: 760px) {
    height: 180px;
  }
`;

const CategoryGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 20px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const CategoryCard = styled.div<{ $bg: string }>`
  background: ${({ $bg }) => $bg};
  border-radius: 22px;
  padding: 26px 24px;
  position: relative;
  overflow: hidden;
`;

const CategoryIcon = styled.div<{ $bg: string }>`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${({ $bg }) => $bg};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
`;

const CategoryTitle = styled.h3`
  font-family: var(--fk-font-ui);
  font-weight: 700;
  font-size: 17px;
  color: ${({ theme }) => theme.colors.gray[900]};
  margin: 0 0 8px;
`;

const CategoryDesc = styled.p`
  font-family: var(--fk-font-ui);
  font-size: 13px;
  color: ${({ theme }) => theme.colors.gray[600]};
  line-height: 1.5;
  margin: 0 0 18px;
  max-width: 150px;
`;

const CategoryButton = styled.button<{ $bg: string }>`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: ${({ $bg }) => $bg};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CategoryImage = styled(FurkysPlaceholderImage)`
  position: absolute;
  right: -10px;
  bottom: -10px;
  width: 120px;
  height: 120px;
  border-radius: 16px;
`;

const FeaturedSection = styled.section`
  background: #f1e7f9;
  border-radius: 28px;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  align-items: center;
  gap: 24px;
  margin-top: 20px;
  padding: 0 0 0 44px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    padding: 0;
  }
`;

const FeaturedText = styled.div`
  padding: 40px 24px;

  @media (max-width: 760px) {
    padding: 32px 24px 8px;
  }
`;

const FeaturedTag = styled.span`
  display: inline-block;
  background: ${({ theme }) => theme.colors.secondary.main};
  color: #fff;
  border-radius: 999px;
  padding: 6px 16px;
  font-family: var(--fk-font-ui);
  font-weight: 700;
  font-size: 11.5px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 18px;
`;

const FeaturedTitle = styled.h2`
  font-family: var(--fk-font-display);
  font-stretch: 125%;
  font-variation-settings: "wdth" 125;
  font-weight: 800;
  font-size: 28px;
  color: ${({ theme }) => theme.colors.gray[900]};
  margin: 0 0 14px;
  letter-spacing: -0.01em;
  line-height: 1.15;
  max-width: 420px;
`;

const FeaturedDesc = styled.p`
  font-family: var(--fk-font-ui);
  font-size: 14.5px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.gray[700]};
  max-width: 400px;
  margin: 0 0 22px;
`;

const FeaturedButton = styled.button`
  background: ${({ theme }) => theme.colors.secondary.main};
  color: #fff;
  border: none;
  border-radius: 999px;
  padding: 14px 26px;
  font-family: var(--fk-font-ui);
  font-weight: 600;
  font-size: 14.5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: background 0.18s;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary.dark};
  }
`;

const FeaturedImage = styled(FurkysPlaceholderImage)`
  width: 100%;
  height: 280px;

  @media (max-width: 760px) {
    height: 180px;
  }
`;

const ArticlesSection = styled.section`
  margin-top: 44px;
`;

const ArticlesHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 10px;
`;

const ArticlesTitle = styled.h2`
  font-family: var(--fk-font-display);
  font-stretch: 125%;
  font-variation-settings: "wdth" 125;
  font-weight: 800;
  font-size: 26px;
  color: ${({ theme }) => theme.colors.gray[900]};
  margin: 0;
  letter-spacing: -0.01em;
`;

const ArticlesLink = styled.span`
  font-family: var(--fk-font-ui);
  font-weight: 700;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.secondary.main};
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
`;

const ArticlesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const ArticleCard = styled.div`
  background: #fff;
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: all 0.18s;

  &:hover {
    box-shadow: 0 14px 30px rgba(20, 18, 16, 0.1);
    transform: translateY(-3px);
  }
`;

const ArticleImage = styled(FurkysPlaceholderImage)`
  width: 100%;
  height: 150px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[400]};
`;

const ArticleBody = styled.div`
  padding: 16px;
`;

const ArticleTag = styled.span<{ $bg: string; $color: string }>`
  display: inline-block;
  background: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
  border-radius: 999px;
  padding: 4px 11px;
  font-family: var(--fk-font-ui);
  font-weight: 700;
  font-size: 10.5px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  margin-bottom: 10px;
`;

const ArticleTitle = styled.h3`
  font-family: var(--fk-font-ui);
  font-weight: 700;
  font-size: 15px;
  color: ${({ theme }) => theme.colors.gray[900]};
  margin: 0 0 8px;
  line-height: 1.3;
`;

const ArticleDesc = styled.p`
  font-family: var(--fk-font-ui);
  font-size: 12.5px;
  color: ${({ theme }) => theme.colors.gray[600]};
  line-height: 1.5;
  margin: 0 0 14px;
`;

const ArticleFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ArticleReadTime = styled.span`
  font-family: var(--fk-font-ui);
  font-size: 11.5px;
  color: ${({ theme }) => theme.colors.gray[500]};
`;

const ArticleArrow = styled.span`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #f1e7f9;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CATEGORIES = [
  {
    title: "Arena y limpieza",
    desc: "Olores, polvo, duración, adaptación y mantenimiento del arenero.",
    bg: "#F1E7F9",
    iconBg: "#662681",
    ph: "Foto · bolsa de arena",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
        <path d="M3 16h18M5 16a7 7 0 0114 0M9 6h6l1 4H8z" />
      </svg>
    )
  },
  {
    title: "Catnip y bienestar",
    desc: "Qué es, cómo usarlo y cómo saber si tu gato responde.",
    bg: "#FDEDE3",
    iconBg: "#E8501D",
    ph: "Foto · frasco de catnip",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
        <path d="M12 3c-4.5 0-8 3.5-8 8 0 3 1.5 5.3 3.5 6.7 1-4.5 4-8.3 9-10.4-1-2.5-2.5-4.3-4.5-4.3z" />
      </svg>
    )
  },
  {
    title: "Vida con gatos",
    desc: "Comportamiento, comodidad, juegos y errores frecuentes.",
    bg: "#FBF3DF",
    iconBg: "#D9A62B",
    ph: "Ilustración · gatos jugando",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
        <circle cx="12" cy="13" r="7" />
        <path d="M9 6l-1.5-2.5M15 6l1.5-2.5" />
      </svg>
    )
  }
];

export default function GuiaPage() {
  return (
    <Wrapper>
      <Hero>
        <HeroCircle />
        <HeroText>
          <HeroTitle>Guía Furky&apos;s ✨</HeroTitle>
          <HeroDesc>
            Consejos claros para cuidar mejor a tu gato, mantener su espacio limpio y elegir productos que realmente
            le funcionen.
          </HeroDesc>
        </HeroText>
        <HeroImage label="Foto · gato en arenero" />
      </Hero>

      <CategoryGrid>
        {CATEGORIES.map((category) => (
          <CategoryCard key={category.title} $bg={category.bg}>
            <CategoryIcon $bg={category.iconBg}>{category.icon}</CategoryIcon>
            <CategoryTitle>{category.title}</CategoryTitle>
            <CategoryDesc>{category.desc}</CategoryDesc>
            <CategoryButton $bg={category.iconBg} aria-label={`Ver ${category.title}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </CategoryButton>
            <CategoryImage label={category.ph} />
          </CategoryCard>
        ))}
      </CategoryGrid>

      <FeaturedSection>
        <FeaturedText>
          <FeaturedTag>Guía destacada</FeaturedTag>
          <FeaturedTitle>¿Cómo elegir la arena adecuada para tu gato?</FeaturedTitle>
          <FeaturedDesc>
            Aprende a comparar control de olor, polvo, rendimiento, facilidad de limpieza y aceptación del gato.
          </FeaturedDesc>
          <FeaturedButton>
            Leer la guía
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </FeaturedButton>
        </FeaturedText>
        <FeaturedImage label="Foto · bolsa Furky's con gato lupa" />
      </FeaturedSection>

      <ArticlesSection>
        <ArticlesHeader>
          <ArticlesTitle>Guías esenciales</ArticlesTitle>
          <ArticlesLink>
            Ver todas las guías
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#662681" strokeWidth="2.4">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </ArticlesLink>
        </ArticlesHeader>
        <ArticlesGrid>
          {FURKYS_GUIDE_ARTICLES.map((article) => (
            <ArticleCard key={article.slug}>
              <ArticleImage label={article.ph} />
              <ArticleBody>
                <ArticleTag $bg={article.tagBg} $color={article.tagColor}>
                  {article.tag}
                </ArticleTag>
                <ArticleTitle>{article.title}</ArticleTitle>
                <ArticleDesc>{article.desc}</ArticleDesc>
                <ArticleFooter>
                  <ArticleReadTime>{article.readTime}</ArticleReadTime>
                  <ArticleArrow>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#662681" strokeWidth="2.6">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </ArticleArrow>
                </ArticleFooter>
              </ArticleBody>
            </ArticleCard>
          ))}
        </ArticlesGrid>
      </ArticlesSection>
    </Wrapper>
  );
}
