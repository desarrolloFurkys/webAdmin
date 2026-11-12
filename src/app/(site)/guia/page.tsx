import type { Metadata } from "next";
import GuiaContent from "./GuiaContent";

export const metadata: Metadata = {
  title: "Guía para dueños de gatos",
  description:
    "Consejos sobre arena, limpieza del arenero, control de olores y cuidado de tu gato, por Furky's.",
  alternates: { canonical: "/guia" }
};

export default function GuiaPage() {
  return <GuiaContent />;
}
