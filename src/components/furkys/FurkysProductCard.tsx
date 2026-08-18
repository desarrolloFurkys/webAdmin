"use client";

import Link from "next/link";
import styled from "styled-components";
import { FurkysProduct } from "models/furkys-product.model";
import { formatCOP } from "@data/furkys-products";
import useCart from "@hook/useCart";
import useCartUI from "@hook/useCartUI";
import FurkysPlaceholderImage from "./FurkysPlaceholderImage";

const Card = styled.div`
  flex: 0 0 260px;
  padding-top: 8px;
`;

const Inner = styled.div`
  background: #ffffff;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
  width: 253px;
  transition: box-shadow 0.18s, transform 0.18s;

  &:hover {
    box-shadow: 0 14px 30px rgba(20, 18, 16, 0.1);
    transform: translateY(-3px);
  }
`;

const ImageLink = styled(Link)`
  position: relative;
  display: block;
  width: 253px;
  height: 240px;
  border-radius: 20px 20px 0 0;
  overflow: hidden;
`;

const Tag = styled.span`
  position: absolute;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  background: #ffffff;
  color: ${({ theme }) => theme.colors.primary.main};
  border: 1.5px solid ${({ theme }) => theme.colors.primary.main};
  border-radius: 999px;
  padding: 6px 14px 6px 10px;
  font-family: var(--fk-font-ui);
  font-weight: 700;
  font-size: 12px;
  z-index: 1;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 5px;
  box-shadow: 0 4px 10px rgba(20, 18, 16, 0.1);
`;

const Content = styled.div`
  padding: 18px 16px;
  display: flex;
  flex-direction: column;
  flex: 1;
  text-align: center;
`;

const Name = styled(Link)`
  font-family: var(--fk-font-ui);
  font-weight: 700;
  font-size: 15px;
  line-height: 1.25;
  margin: 0 0 10px;
  min-height: 38px;
  color: ${({ theme }) => theme.colors.gray[900]};
  text-decoration: none;
  display: block;
`;

const RatingRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  margin-bottom: 14px;
  color: ${({ theme }) => theme.colors.primary.main};
  font-size: 13px;
`;

const RatingScore = styled.span`
  font-family: var(--fk-font-ui);
  font-weight: 700;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.gray[900]};
`;

const RatingCount = styled.span`
  font-family: var(--fk-font-ui);
  font-size: 12px;
  color: ${({ theme }) => theme.colors.gray[500]};
`;

const PriceBlock = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  margin-bottom: 14px;
`;

const OldPrice = styled.span`
  font-family: var(--fk-font-ui);
  font-size: 12.5px;
  color: ${({ theme }) => theme.colors.gray[500]};
  text-decoration: line-through;
`;

const Price = styled.span`
  font-family: var(--fk-font-ui);
  font-weight: 700;
  font-size: 28px;
  color: ${({ theme }) => theme.colors.gray[900]};
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.primary.main};
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 13px;
  font-family: var(--fk-font-ui);
  font-weight: 600;
  font-size: 14.5px;
  transition: background 0.15s;

  &:hover {
    background: ${({ theme }) => theme.colors.primary.dark};
  }
`;

interface Props {
  product: FurkysProduct;
}

export default function FurkysProductCard({ product }: Props) {
  const {
    state: { cart },
    dispatch
  } = useCart();
  const { open } = useCartUI();
  const href = `/product/${product.slug}`;

  const handleAdd = () => {
    const existingQty = cart.find((item) => item.id === product.id)?.qty ?? 0;
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: { id: product.id, qty: existingQty + 1, name: product.name, slug: product.slug, price: product.price }
    });
    open();
  };

  return (
    <Card>
      <Inner>
        <ImageLink href={href}>
          <FurkysPlaceholderImage label={product.imgLabel} style={{ position: "absolute", inset: 0 }} />
          {product.tag && (
            <Tag>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l2.9 6.26L22 9.27l-5.5 4.73L18 22l-6-3.6L6 22l1.5-8-5.5-4.73 7.1-1.01z" />
              </svg>
              {product.tag}
            </Tag>
          )}
        </ImageLink>
        <Content>
          <Name href={href}>{product.name}</Name>
          <RatingRow>
            <span>{"★".repeat(Math.round(product.rating))}</span>
            <RatingScore>{product.rating.toFixed(1)}</RatingScore>
            <RatingCount>({product.reviewCount})</RatingCount>
          </RatingRow>
          <PriceBlock>
            {product.oldPrice && <OldPrice>{formatCOP(product.oldPrice)}</OldPrice>}
            <Price>{formatCOP(product.price)}</Price>
          </PriceBlock>
          <AddButton onClick={handleAdd}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            Añadir al carrito
          </AddButton>
        </Content>
      </Inner>
    </Card>
  );
}
