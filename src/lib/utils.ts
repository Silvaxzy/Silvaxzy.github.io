import type { Variants } from "framer-motion";

/** Adiciona o basePath em caminhos de arquivos da pasta public. */
export function asset(caminho: string) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${caminho}`;
}

export const EASE = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export const stagger = (intervalo = 0.1): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: intervalo } },
});

export const slideIn = (lado: "esquerda" | "direita"): Variants => ({
  hidden: { opacity: 0, x: lado === "esquerda" ? -48 : 48 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
});
