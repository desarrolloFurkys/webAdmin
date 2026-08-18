"use client";

import { createContext, useMemo, useState, PropsWithChildren } from "react";

interface CartUIContextProps {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const CartUIContext = createContext<CartUIContextProps>({
  isOpen: false,
  open: () => {},
  close: () => {}
});

export default function CartUIProvider({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);
  const value = useMemo(
    () => ({ isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) }),
    [isOpen]
  );

  return <CartUIContext value={value}>{children}</CartUIContext>;
}
