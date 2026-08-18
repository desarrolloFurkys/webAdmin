"use client";

import Link from "next/link";
import styled from "styled-components";
import { formatCOP } from "@data/furkys-products";

const Wrapper = styled.main`
  max-width: 680px;
  margin: 0 auto;
  padding: 60px 24px;
`;

const Card = styled.div`
  background: #fff;
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
  border-radius: 28px;
  padding: 48px;
  text-align: center;
  box-shadow: 0 18px 44px rgba(20, 18, 16, 0.1);
`;

const CheckCircle = styled.div`
  width: 84px;
  height: 84px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary.main};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 22px;
  box-shadow: 0 14px 30px rgba(232, 80, 29, 0.4);
`;

const Heading = styled.h1`
  font-family: var(--fk-font-display);
  font-stretch: 125%;
  font-variation-settings: "wdth" 125;
  font-weight: 900;
  font-size: 38px;
  text-transform: uppercase;
  margin: 0 0 10px;
  letter-spacing: -0.015em;
  color: ${({ theme }) => theme.colors.gray[900]};
`;

const Subtext = styled.p`
  font-family: var(--fk-font-ui);
  font-size: 16px;
  color: ${({ theme }) => theme.colors.gray[700]};
  margin: 0 0 6px;

  b {
    color: ${({ theme }) => theme.colors.gray[900]};
  }
`;

const OrderChip = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: ${({ theme }) => theme.colors.gray[100]};
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
  border-radius: 999px;
  padding: 8px 18px;
  margin: 16px 0 26px;
  font-family: var(--fk-font-ui);
  font-weight: 600;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray[900]};

  span {
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

const DetailsBox = styled.div`
  background: ${({ theme }) => theme.colors.gray[100]};
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
  border-radius: 16px;
  padding: 18px 22px;
  text-align: left;
  margin-bottom: 26px;
`;

const DetailsRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: var(--fk-font-ui);
  font-size: 14px;
  padding: 4px 0;
  color: ${({ theme }) => theme.colors.gray[700]};

  span.value {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.gray[900]};
  }
  span.total {
    font-weight: 700;
    font-size: 18px;
  }
`;

const ContinueButton = styled(Link)`
  display: inline-block;
  background: ${({ theme }) => theme.colors.primary.main};
  color: #fff;
  border: none;
  border-radius: 999px;
  padding: 15px 34px;
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

interface Props {
  orderNo: string;
  total: number;
}

export default function FurkysOrderConfirmation({ orderNo, total }: Props) {
  return (
    <Wrapper>
      <Card>
        <CheckCircle>
          <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </CheckCircle>
        <Heading>¡Gracias por tu compra!</Heading>
        <Subtext>
          Tu pago fue aprobado por <b>Bold</b>. Te enviamos la confirmación a tu correo.
        </Subtext>
        <OrderChip>
          Pedido <span>{orderNo}</span>
        </OrderChip>
        <DetailsBox>
          <DetailsRow>
            <span>Total pagado</span>
            <span className="value total">{formatCOP(total)}</span>
          </DetailsRow>
          <DetailsRow>
            <span>Entrega estimada</span>
            <span className="value">2–3 días hábiles</span>
          </DetailsRow>
          <DetailsRow>
            <span>Método</span>
            <span className="value">Bold · Tarjeta</span>
          </DetailsRow>
        </DetailsBox>
        <ContinueButton href="/">Seguir comprando</ContinueButton>
      </Card>
    </Wrapper>
  );
}
