"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import { FURKYS_PRODUCTS, formatCOP } from "@data/furkys-products";
import FurkysPlaceholderImage from "@component/furkys/FurkysPlaceholderImage";

const VIDEOS = [
  { id: 1, ph: "Video · unboxing arena Furky's", src: undefined as string | undefined },
  { id: 2, ph: "Video · gato jugando con catnip", src: undefined as string | undefined },
  { id: 3, ph: "Video · rutina de limpieza", src: undefined as string | undefined },
  { id: 4, ph: "Video · gato en refugio cueva", src: undefined as string | undefined },
  { id: 5, ph: "Video · reseña de cliente", src: undefined as string | undefined }
];

const AUTOPLAY_MS = 6000;

const Section = styled.section`
  background: #fcf3ee;
  max-width: 100%;
  margin: 0;
  padding: 56px 0 0;
`;

const Inner = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 24px;
`;

const Title = styled.h2`
  font-family: var(--fk-font-display);
  font-stretch: 125%;
  font-variation-settings: "wdth" 125;
  font-weight: 800;
  font-size: 32px;
  text-transform: uppercase;
  margin: 0 0 28px;
  letter-spacing: -0.01em;
  text-align: center;
  color: ${({ theme }) => theme.colors.secondary.main};

  span {
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

const Track = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 24px 4px 22px;
`;

const VideoCard = styled.div<{ $active: boolean }>`
  flex: 0 0 230px;
  height: 400px;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.gray[900]};
  cursor: pointer;
  transform: scale(${({ $active }) => ($active ? 1.14 : 0.92)});
  z-index: ${({ $active }) => ($active ? 2 : 1)};
  box-shadow: ${({ $active }) => ($active ? "0 24px 50px rgba(20, 18, 16, 0.35)" : "none")};
  transition: transform 0.35s ease, box-shadow 0.35s ease;

  @media (max-width: 900px) {
    display: ${({ $active }) => ($active ? "block" : "none")};
    flex: 0 0 230px;
    transform: scale(1);
  }
`;

const VideoImage = styled(FurkysPlaceholderImage)`
  position: absolute;
  inset: 0;
`;

const VideoEl = styled.video`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const VideoGradient = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(20, 18, 16, 0.88), rgba(20, 18, 16, 0) 46%);
  pointer-events: none;
`;

const InactiveOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(20, 18, 16, 0.45);
`;

const PlayButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.3);
`;

const ProgressTrack = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: rgba(255, 255, 255, 0.25);
`;

const ProgressBar = styled.div<{ $active: boolean }>`
  height: 100%;
  background: ${({ theme }) => theme.colors.primary.main};
  width: ${({ $active }) => ($active ? "100%" : "0%")};
  transition: width ${AUTOPLAY_MS}ms linear;
`;

const Arrows = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding-bottom: 8px;
`;

const ArrowButton = styled.button`
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

const MiniCard = styled.div`
  max-width: 320px;
  margin: 0 auto 32px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 26px rgba(20, 18, 16, 0.1);
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const MiniThumb = styled.img`
  width: 48px;
  height: 48px;
  object-fit: contain;
  border-radius: 10px;
  background: #f4efe6;
  flex: none;
`;

const MiniThumbPlaceholder = styled(FurkysPlaceholderImage)`
  width: 48px;
  height: 48px;
  border-radius: 10px;
  flex: none;
`;

const MiniInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const MiniName = styled.span`
  font-family: var(--fk-font-ui);
  font-weight: 700;
  font-size: 13.5px;
  color: ${({ theme }) => theme.colors.gray[900]};
`;

const MiniPrice = styled.span`
  font-family: var(--fk-font-ui);
  font-weight: 700;
  font-size: 15px;
  color: ${({ theme }) => theme.colors.primary.main};
`;

const Footnote = styled.div`
  background: #f4efe6;
  padding: 16px 24px;
  text-align: center;
`;

const FootnoteText = styled.span`
  font-family: var(--fk-font-ui);
  font-weight: 600;
  font-size: 14.5px;
  color: ${({ theme }) => theme.colors.gray[900]};

  span.purple {
    color: ${({ theme }) => theme.colors.secondary.main};
  }
  span.orange {
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

export default function SocialVideos() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((current) => (current + 1) % VIDEOS.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [active]);

  const go = (dir: 1 | -1) => {
    setActive((current) => (current + dir + VIDEOS.length) % VIDEOS.length);
  };

  const product = FURKYS_PRODUCTS[active % FURKYS_PRODUCTS.length];

  return (
    <Section>
      <Inner>
        <Title>
          Su mejor vida se disfruta con <span>Furky's</span>
        </Title>
        <Track>
          {VIDEOS.map((video, index) => {
            const isActive = index === active;
            return (
              <VideoCard key={video.id} $active={isActive} onClick={() => setActive(index)}>
                {isActive && video.src ? (
                  <VideoEl src={video.src} autoPlay muted playsInline loop />
                ) : (
                  <VideoImage label={video.ph} dark />
                )}
                {isActive ? (
                  <>
                    <VideoGradient />
                    <ProgressTrack>
                      <ProgressBar key={active} $active />
                    </ProgressTrack>
                  </>
                ) : (
                  <>
                    <InactiveOverlay />
                    <PlayButton>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#141210">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </PlayButton>
                  </>
                )}
              </VideoCard>
            );
          })}
        </Track>
        <Arrows>
          <ArrowButton onClick={() => go(-1)} aria-label="Anterior">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#141210" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </ArrowButton>
          <ArrowButton onClick={() => go(1)} aria-label="Siguiente">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#141210" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </ArrowButton>
        </Arrows>

        {product && (
          <MiniCard>
            {product.images?.[0] ? (
              <MiniThumb src={product.images[0]} alt={product.name} />
            ) : (
              <MiniThumbPlaceholder label={product.imgLabel} />
            )}
            <MiniInfo>
              <MiniName>{product.name}</MiniName>
              <MiniPrice>{formatCOP(product.price)}</MiniPrice>
            </MiniInfo>
          </MiniCard>
        )}
      </Inner>
      <Footnote>
        <FootnoteText>
          Productos que cuidan de <span className="purple">ellos</span> y del{" "}
          <span className="orange">planeta</span> 🌍
        </FootnoteText>
      </Footnote>
    </Section>
  );
}
