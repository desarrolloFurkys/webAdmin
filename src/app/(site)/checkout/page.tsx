"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import useCart from "@hook/useCart";
import { formatCOP } from "@data/furkys-products";

const FREE_SHIPPING_THRESHOLD = 80000;
const SHIPPING_COST = 12900;

const Wrapper = styled.main`
  max-width: 1100px;
  margin: 0 auto;
  padding: 32px 24px 80px;
`;

const BackLink = styled(Link)`
  background: none;
  border: none;
  cursor: pointer;
  font-family: var(--fk-font-ui);
  font-weight: 600;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray[600]};
  margin-bottom: 14px;
  display: inline-block;
  text-decoration: none;
  transition: color 0.15s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

const Title = styled.h1`
  font-family: var(--fk-font-display);
  font-stretch: 125%;
  font-variation-settings: "wdth" 125;
  font-weight: 900;
  font-size: 38px;
  text-transform: uppercase;
  margin: 0 0 26px;
  letter-spacing: -0.015em;
  color: ${({ theme }) => theme.colors.gray[900]};
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 28px;
  align-items: start;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const FormCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Card = styled.div`
  background: #fff;
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 4px 18px rgba(20, 18, 16, 0.04);
`;

const CardHead = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 18px;
`;

const StepNumber = styled.span`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.gray[900]};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--fk-font-display);
  font-weight: 900;
  font-size: 14px;
  flex: none;
`;

const CardTitle = styled.h2`
  font-family: var(--fk-font-ui);
  font-weight: 600;
  font-size: 18px;
  margin: 0;
  color: ${({ theme }) => theme.colors.gray[900]};
`;

const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

const Input = styled.input<{ $span2?: boolean }>`
  grid-column: ${({ $span2 }) => ($span2 ? "span 2" : "auto")};
  border: 1.5px solid ${({ theme }) => theme.colors.gray[400]};
  border-radius: 12px;
  padding: 13px 14px;
  font-size: 14px;
  font-family: var(--fk-font-ui);
  color: ${({ theme }) => theme.colors.gray[900]};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.gray[900]};
  }
`;

const PayHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
`;

const BoldChip = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  background: ${({ theme }) => theme.colors.gray[900]};
  border-radius: 8px;
  padding: 6px 11px;
`;

const BoldChipText = styled.span`
  font-family: var(--fk-font-display);
  font-stretch: 125%;
  font-variation-settings: "wdth" 125;
  font-weight: 900;
  font-size: 15px;
  color: #fff;
  letter-spacing: 0.02em;
`;

const BoldChipDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #13e2a0;
`;

const SecureLine = styled.p`
  font-family: var(--fk-font-ui);
  font-size: 12.5px;
  color: ${({ theme }) => theme.colors.gray[500]};
  margin: 0 0 16px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const PayPanel = styled.div`
  border: 1.5px solid ${({ theme }) => theme.colors.gray[400]};
  border-radius: 16px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  background: ${({ theme }) => theme.colors.gray[100]};
`;

const PayLogo = styled.div`
  width: 62px;
  height: 62px;
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.gray[900]};
  display: flex;
  align-items: center;
  justify-content: center;
  flex: none;
`;

const PayLogoText = styled.span`
  font-family: var(--fk-font-display);
  font-stretch: 125%;
  font-variation-settings: "wdth" 125;
  font-weight: 900;
  font-size: 22px;
  color: #fff;
  letter-spacing: 0.02em;
`;

const PayCopyTitle = styled.div`
  font-family: var(--fk-font-ui);
  font-weight: 600;
  font-size: 15px;
  color: ${({ theme }) => theme.colors.gray[900]};
  margin-bottom: 3px;
`;

const PayCopyText = styled.div`
  font-family: var(--fk-font-ui);
  font-size: 13px;
  color: ${({ theme }) => theme.colors.gray[600]};
  line-height: 1.5;
`;

const SummaryCol = styled.div`
  background: #fff;
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
  border-radius: 22px;
  padding: 24px;
  position: sticky;
  top: 120px;
  box-shadow: 0 6px 22px rgba(20, 18, 16, 0.06);
`;

const SummaryTitle = styled.h2`
  font-family: var(--fk-font-display);
  font-stretch: 125%;
  font-variation-settings: "wdth" 125;
  font-weight: 800;
  font-size: 20px;
  text-transform: uppercase;
  margin: 0 0 16px;
  color: ${({ theme }) => theme.colors.gray[900]};
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
  max-height: 230px;
  overflow: auto;
`;

const ItemRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const ItemThumb = styled.div`
  width: 52px;
  height: 52px;
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.gray[200]};
  flex: none;
`;

const ItemInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const ItemName = styled.div`
  font-family: var(--fk-font-ui);
  font-weight: 600;
  font-size: 13.5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.colors.gray[900]};
`;

const ItemQty = styled.div`
  font-family: var(--fk-font-ui);
  font-size: 12px;
  color: ${({ theme }) => theme.colors.gray[500]};
`;

const ItemLine = styled.span`
  font-family: var(--fk-font-ui);
  font-weight: 600;
  font-size: 13.5px;
  color: ${({ theme }) => theme.colors.gray[900]};
`;

const Totals = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.gray[400]};
  padding-top: 14px;
`;

const TotalsRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: var(--fk-font-ui);
  font-size: 14px;
  padding: 5px 0;
  color: ${({ theme }) => theme.colors.gray[700]};
`;

const GrandTotal = styled.div`
  border-top: 1.5px solid ${({ theme }) => theme.colors.gray[900]};
  margin-top: 10px;
  padding-top: 12px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const GrandTotalLabel = styled.span`
  font-family: var(--fk-font-ui);
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.gray[900]};
`;

const GrandTotalValue = styled.span`
  font-family: var(--fk-font-price);
  font-weight: 800;
  font-size: 26px;
  color: ${({ theme }) => theme.colors.gray[900]};
`;

const PayButton = styled.button`
  width: 100%;
  margin-top: 18px;
  background: ${({ theme }) => theme.colors.gray[900]};
  color: #fff;
  border: none;
  border-radius: 14px;
  padding: 17px;
  font-family: var(--fk-font-ui);
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  transition: background 0.18s;

  &:hover:not(:disabled) {
    background: #2a2420;
  }
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const BoldWordmark = styled.span`
  font-family: var(--fk-font-display);
  font-stretch: 125%;
  font-variation-settings: "wdth" 125;
  font-weight: 900;
  font-size: 17px;
`;

const ProtectedLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 13px;
  color: ${({ theme }) => theme.colors.gray[500]};
  font-family: var(--fk-font-ui);
  font-size: 11.5px;
`;

const ErrorNote = styled.div`
  margin-top: 12px;
  background: ${({ theme }) => theme.colors.error.light};
  color: ${({ theme }) => theme.colors.error.main};
  border-radius: 10px;
  padding: 10px 12px;
  font-family: var(--fk-font-ui);
  font-size: 12.5px;
  line-height: 1.5;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 0;
  font-family: var(--fk-font-ui);
  color: ${({ theme }) => theme.colors.gray[600]};
`;

export default function CheckoutPage() {
  const {
    state: { cart }
  } = useCart();
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.qty, 0), [cart]);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;

  const handlePay = async () => {
    setError(null);
    setPaying(true);
    try {
      const response = await fetch("/api/bold/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart.map((item) => ({ id: item.id, name: item.name, qty: item.qty, price: item.price })),
          shipping
        })
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "No se pudo iniciar el pago con Bold.");
      }

      window.location.href = data.checkoutUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo iniciar el pago con Bold.");
      setPaying(false);
    }
  };

  if (cart.length === 0) {
    return (
      <Wrapper>
        <BackLink href="/">← Volver a la tienda</BackLink>
        <Title>Finalizar compra</Title>
        <EmptyState>Tu carrito está vacío. Agrega productos antes de continuar.</EmptyState>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <BackLink href="/">← Volver al carrito</BackLink>
      <Title>Finalizar compra</Title>
      <Layout>
        <FormCol>
          <Card>
            <CardHead>
              <StepNumber>1</StepNumber>
              <CardTitle>Datos de envío</CardTitle>
            </CardHead>
            <FieldGrid>
              <Input placeholder="Nombre" />
              <Input placeholder="Apellido" />
              <Input placeholder="Correo electrónico" $span2 type="email" />
              <Input placeholder="Celular" />
              <Input placeholder="Ciudad" />
              <Input placeholder="Dirección" $span2 />
            </FieldGrid>
          </Card>

          <Card>
            <PayHead>
              <CardHead style={{ marginBottom: 0 }}>
                <StepNumber>2</StepNumber>
                <CardTitle>Pago</CardTitle>
              </CardHead>
              <BoldChip>
                <BoldChipText>Bold</BoldChipText>
                <BoldChipDot />
              </BoldChip>
            </PayHead>
            <SecureLine>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <rect x="5" y="11" width="14" height="9" rx="2" />
                <path d="M8 11V8a4 4 0 018 0v3" />
              </svg>
              Pago seguro procesado por Bold · cifrado de extremo a extremo
            </SecureLine>
            <PayPanel>
              <PayLogo>
                <PayLogoText>Bold</PayLogoText>
              </PayLogo>
              <div>
                <PayCopyTitle>Pagas con Bold</PayCopyTitle>
                <PayCopyText>
                  Al confirmar te llevamos a Bold para pagar con tarjeta, PSE, Nequi y más, de forma 100% segura.
                </PayCopyText>
              </div>
            </PayPanel>
          </Card>
        </FormCol>

        <SummaryCol>
          <SummaryTitle>Tu pedido</SummaryTitle>
          <ItemList>
            {cart.map((item) => (
              <ItemRow key={item.id}>
                <ItemThumb />
                <ItemInfo>
                  <ItemName>{item.name}</ItemName>
                  <ItemQty>x{item.qty}</ItemQty>
                </ItemInfo>
                <ItemLine>{formatCOP(item.price * item.qty)}</ItemLine>
              </ItemRow>
            ))}
          </ItemList>
          <Totals>
            <TotalsRow>
              <span>Subtotal</span>
              <span>{formatCOP(subtotal)}</span>
            </TotalsRow>
            <TotalsRow>
              <span>Envío</span>
              <span>{shipping === 0 ? "Gratis" : formatCOP(shipping)}</span>
            </TotalsRow>
          </Totals>
          <GrandTotal>
            <GrandTotalLabel>Total</GrandTotalLabel>
            <GrandTotalValue>{formatCOP(total)}</GrandTotalValue>
          </GrandTotal>
          <PayButton onClick={handlePay} disabled={paying}>
            {paying ? (
              "Procesando pago…"
            ) : (
              <>
                Pagar {formatCOP(total)} con <BoldWordmark>Bold</BoldWordmark>
              </>
            )}
          </PayButton>
          {error && <ErrorNote>{error}</ErrorNote>}
          <ProtectedLine>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="5" y="11" width="14" height="9" rx="2" />
              <path d="M8 11V8a4 4 0 018 0v3" />
            </svg>
            Transacción protegida por Bold
          </ProtectedLine>
        </SummaryCol>
      </Layout>
    </Wrapper>
  );
}
