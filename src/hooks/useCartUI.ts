import { use } from "react";
import { CartUIContext } from "@context/CartUIContext";

export default function useCartUI() {
  return use(CartUIContext);
}
