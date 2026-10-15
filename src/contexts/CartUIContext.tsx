"use client";

import { createContext, useCallback, useMemo, useRef, useState, PropsWithChildren } from "react";

export type CartPhase = "closed" | "open" | "reach" | "pull";

const REACH_MS = 560;
const PULL_MS = 620;

interface CartUIContextProps {
  isOpen: boolean;
  phase: CartPhase;
  open: () => void;
  close: () => void;
}

export const CartUIContext = createContext<CartUIContextProps>({
  isOpen: false,
  phase: "closed",
  open: () => {},
  close: () => {}
});

export default function CartUIProvider({ children }: PropsWithChildren) {
  const [phase, setPhase] = useState<CartPhase>("closed");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const open = useCallback(() => {
    clearTimers();
    setPhase("open");
  }, []);

  const close = useCallback(() => {
    setPhase((current) => {
      if (current !== "open") return current;
      clearTimers();
      timers.current.push(setTimeout(() => setPhase("pull"), REACH_MS));
      timers.current.push(setTimeout(() => setPhase("closed"), REACH_MS + PULL_MS));
      return "reach";
    });
  }, []);

  const value = useMemo(() => ({ isOpen: phase !== "closed", phase, open, close }), [phase, open, close]);

  return <CartUIContext value={value}>{children}</CartUIContext>;
}
