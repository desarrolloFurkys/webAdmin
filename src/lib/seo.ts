import type { Metadata } from "next";

export const NO_INDEX_ROBOTS: NonNullable<Metadata["robots"]> = { index: false, follow: false };
