import { useLayoutEffect, type DependencyList, type RefObject } from "react";
import { gsap } from "./rolagem";

/**
 * Roda animações GSAP dentro de um "contexto" ligado ao componente.
 * Ao desmontar (ou mudar as dependências), tudo é desfeito com revert().
 */
export function useGsap(
  escopo: RefObject<HTMLElement | null>,
  criar: (ctx: gsap.Context) => void | (() => void),
  deps: DependencyList,
) {
  useLayoutEffect(() => {
    if (!escopo.current) return;
    let limpezaExtra: void | (() => void);
    const ctx = gsap.context((self) => {
      limpezaExtra = criar(self);
    }, escopo.current);
    return () => {
      if (typeof limpezaExtra === "function") limpezaExtra();
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
