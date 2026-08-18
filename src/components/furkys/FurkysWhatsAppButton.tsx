"use client";

import styled from "styled-components";

const Fab = styled.a<{ $hidden: boolean }>`
  position: fixed;
  bottom: 26px;
  right: 26px;
  z-index: 50;
  display: flex;
  align-items: center;
  gap: 10px;
  background: #25d366;
  color: #fff;
  text-decoration: none;
  border-radius: 999px;
  padding: 14px 18px;
  box-shadow: 0 10px 26px rgba(37, 211, 102, 0.38);
  font-family: var(--fk-font-ui);
  font-weight: 600;
  font-size: 15px;
  opacity: ${({ $hidden }) => ($hidden ? 0 : 1)};
  transform: ${({ $hidden }) => ($hidden ? "translateY(12px) scale(0.9)" : "translateY(0) scale(1)")};
  pointer-events: ${({ $hidden }) => ($hidden ? "none" : "auto")};
  transition: all 0.38s cubic-bezier(0.34, 1.4, 0.64, 1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 36px rgba(37, 211, 102, 0.5);
  }
`;

interface Props {
  hidden: boolean;
}

export default function FurkysWhatsAppButton({ hidden }: Props) {
  return (
    <Fab
      href="https://wa.me/573000000000?text=Hola%20Furky%27s%2C%20quiero%20informaci%C3%B3n%20sobre%20la%20arena%20para%20gatos"
      target="_blank"
      rel="noopener"
      aria-label="Contáctanos por WhatsApp"
      $hidden={hidden}
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff" style={{ flex: "none" }}>
        <path d="M12 2a10 10 0 00-8.5 15.2L2 22l4.9-1.4A10 10 0 1012 2zm0 18a8 8 0 01-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1112 20zm4.4-5.6c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.7 1-.3.2-.5.1a6.5 6.5 0 01-1.9-1.2 7.2 7.2 0 01-1.4-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.4v-.4c0-.1-.5-1.3-.7-1.7s-.4-.4-.5-.4h-.5a1 1 0 00-.7.3A2.9 2.9 0 006 9.3c0 1.6 1.2 3.2 1.3 3.4s2.3 3.6 5.6 4.7c.8.3 1.4.5 1.8.7.8.2 1.4.2 2 .1.6-.1 1.4-.6 1.6-1.2.2-.5.2-1 .1-1.1z" />
      </svg>
      <span style={{ whiteSpace: "nowrap" }}>Escríbenos</span>
    </Fab>
  );
}
