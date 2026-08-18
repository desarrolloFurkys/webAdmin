"use client";

import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";

const Footer = styled.footer`
  background: ${({ theme }) => theme.colors.primary.main};
  color: #fff;
  margin-top: 0;
`;

const Top = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  padding: 40px 24px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SocialRow = styled.div`
  display: flex;
  gap: 22px;
  margin-bottom: 34px;
`;

const SocialLink = styled.a`
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.15s;

  &:hover {
    opacity: 0.7;
  }
`;

const Columns = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 32px;
  padding-bottom: 36px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const ColumnTitle = styled.div`
  font-family: var(--fk-font-ui);
  font-weight: 800;
  font-size: 14px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #fff;
  margin-bottom: 14px;
`;

const LinkList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-family: var(--fk-font-ui);
  font-weight: 700;
  font-size: 13.5px;
  text-transform: uppercase;
  color: #fff;
`;

const FooterNavLink = styled(Link)`
  color: #fff;
  cursor: pointer;
`;

const Bottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.25);
  padding: 16px 24px;
  text-align: center;
  font-family: var(--fk-font-ui);
  font-size: 12.5px;
  color: rgba(255, 255, 255, 0.85);
`;

interface Props {
  footerRef?: React.Ref<HTMLElement>;
}

export default function FurkysFooter({ footerRef }: Props) {
  return (
    <Footer ref={footerRef}>
      <Top>
        <Image
          src="/assets/furkys/furkys-logo-white.png"
          alt="Furky's"
          height={64}
          width={220}
          style={{ height: 64, width: "auto", objectFit: "contain", marginBottom: 22 }}
        />

        <SocialRow>
          <SocialLink href="https://wa.me/573144143278" target="_blank" rel="noopener" aria-label="WhatsApp">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2a10 10 0 00-8.5 15.2L2 22l4.9-1.4A10 10 0 1012 2zm0 18a8 8 0 01-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1112 20zm4.4-5.6c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.7 1-.3.2-.5.1a6.5 6.5 0 01-1.9-1.2 7.2 7.2 0 01-1.4-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.4v-.4c0-.1-.5-1.3-.7-1.7s-.4-.4-.5-.4h-.5a1 1 0 00-.7.3A2.9 2.9 0 006 9.3c0 1.6 1.2 3.2 1.3 3.4s2.3 3.6 5.6 4.7c.8.3 1.4.5 1.8.7.8.2 1.4.2 2 .1.6-.1 1.4-.6 1.6-1.2.2-.5.2-1 .1-1.1z" />
            </svg>
          </SocialLink>
          <SocialLink href="https://www.instagram.com/furkys.co" target="_blank" rel="noopener" aria-label="Instagram">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4.2" />
              <circle cx="17.6" cy="6.4" r="1.2" fill="currentColor" stroke="none" />
            </svg>
          </SocialLink>
          <SocialLink href="#" aria-label="Facebook">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 12a10 10 0 10-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0022 12z" />
            </svg>
          </SocialLink>
          <SocialLink href="#" aria-label="TikTok">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.5 3c.3 2 1.6 3.7 3.5 4v2.7c-1.3 0-2.5-.4-3.5-1.1v5.9a5.6 5.6 0 11-5.6-5.6l.9.1v2.8a2.8 2.8 0 102 2.7V3h2.7z" />
            </svg>
          </SocialLink>
        </SocialRow>

        <Columns>
          <div>
            <ColumnTitle>Explora</ColumnTitle>
            <LinkList>
              <FooterNavLink href="/">Furkyshop</FooterNavLink>
              <FooterNavLink href="/guia">Guía Furky's</FooterNavLink>
              <span id="puntos-de-venta">Puntos de venta</span>
            </LinkList>
          </div>
          <div>
            <ColumnTitle>Ayuda</ColumnTitle>
            <LinkList>
              <span>Política de privacidad</span>
              <span>Política de compras</span>
            </LinkList>
          </div>
          <div>
            <ColumnTitle>Hablemos</ColumnTitle>
            <LinkList>
              <span>WhatsApp: 3144143278</span>
              <span>servicioalcliente@furkys.com</span>
            </LinkList>
          </div>
        </Columns>
      </Top>
      <Bottom>© {new Date().getFullYear()} Furky's · Hecho con cariño en Colombia</Bottom>
    </Footer>
  );
}
