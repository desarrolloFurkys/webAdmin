"use client";

import { useRef } from "react";
import styled from "styled-components";
import FurkysPlaceholderImage from "@component/furkys/FurkysPlaceholderImage";

const VIDEOS = [
  { id: 1, ph: "Video · unboxing arena Furky's", caption: "Unboxing de nuestra arena premium", views: "12.4K" },
  { id: 2, ph: "Video · gato jugando con catnip", caption: "Catnip: la reacción es instantánea", views: "8.9K" },
  { id: 3, ph: "Video · rutina de limpieza", caption: "Rutina de limpieza en 30 segundos", views: "15.1K" },
  { id: 4, ph: "Video · gato en refugio cueva", caption: "Su nuevo lugar favorito", views: "6.2K" },
  { id: 5, ph: "Video · reseña de cliente", caption: "Lo que dicen nuestros clientes", views: "9.7K" }
];

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
  gap: 16px;
  overflow-x: auto;
  padding: 10px 4px 22px;
  scroll-snap-type: x mandatory;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const VideoCard = styled.div`
  flex: 0 0 220px;
  height: 360px;
  scroll-snap-align: center;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.gray[900]};
  cursor: pointer;
`;

const VideoImage = styled(FurkysPlaceholderImage)`
  position: absolute;
  inset: 0;
`;

const VideoGradient = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(20, 18, 16, 0.88), rgba(20, 18, 16, 0) 46%);
  pointer-events: none;
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

const VideoInfo = styled.div`
  position: absolute;
  bottom: 16px;
  left: 16px;
  right: 16px;
`;

const Caption = styled.div`
  font-family: var(--fk-font-ui);
  font-weight: 600;
  font-size: 14px;
  color: #fff;
  line-height: 1.3;
  margin-bottom: 6px;
`;

const Views = styled.div`
  font-family: var(--fk-font-ui);
  font-size: 12px;
  color: #e8e2d8;
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
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <Section>
      <Inner>
        <Title>
          Su mejor vida se disfruta con <span>Furky's</span>
        </Title>
        <Track ref={trackRef}>
          {VIDEOS.map((video) => (
            <VideoCard key={video.id}>
              <VideoImage label={video.ph} dark />
              <VideoGradient />
              <PlayButton>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#141210">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </PlayButton>
              <VideoInfo>
                <Caption>{video.caption}</Caption>
                <Views>{video.views} reproducciones</Views>
              </VideoInfo>
            </VideoCard>
          ))}
        </Track>
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
