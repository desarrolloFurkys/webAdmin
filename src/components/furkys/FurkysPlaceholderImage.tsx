"use client";

import styled from "styled-components";

const Wrapper = styled.div<{ $dark?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 12px;
  background: ${({ $dark, theme }) => ($dark ? "#2A2520" : theme.colors.gray[200])};
  color: ${({ $dark, theme }) => ($dark ? "#D7D0C4" : theme.colors.gray[500])};
  font-family: var(--fk-font-ui);
  font-weight: 600;
  font-size: 12.5px;
  line-height: 1.4;
`;

interface Props {
  label: string;
  dark?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

// Stand-in for product/lifestyle photography that hasn't been supplied yet —
// mirrors the design prototype's own <image-slot placeholder="…"> convention.
export default function FurkysPlaceholderImage({ label, dark, className, style, onClick }: Props) {
  return (
    <Wrapper $dark={dark} className={className} style={style} onClick={onClick}>
      {label}
    </Wrapper>
  );
}
