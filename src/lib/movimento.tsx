import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

/** Preferência de movimento: segue o sistema e pode ser trocada pelo botão da navegação. */
type Movimento = { reduzido: boolean; alternar: () => void };

const ContextoMovimento = createContext<Movimento>({ reduzido: false, alternar: () => {} });
const CHAVE = "portfolio-movimento";

function preferenciaInicial(): boolean {
  try {
    const salvo = localStorage.getItem(CHAVE);
    if (salvo === "reduzido") return true;
    if (salvo === "completo") return false;
  } catch {
    /* navegador sem armazenamento: usa a preferência do sistema */
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function ProvedorMovimento({ children }: { children: ReactNode }) {
  const [reduzido, setReduzido] = useState(preferenciaInicial);

  useEffect(() => {
    document.documentElement.dataset.movimento = reduzido ? "reduzido" : "completo";
  }, [reduzido]);

  const alternar = useCallback(() => {
    setReduzido((atual) => {
      const novo = !atual;
      try {
        localStorage.setItem(CHAVE, novo ? "reduzido" : "completo");
      } catch {
        /* sem armazenamento: vale só para esta visita */
      }
      return novo;
    });
  }, []);

  return <ContextoMovimento.Provider value={{ reduzido, alternar }}>{children}</ContextoMovimento.Provider>;
}

export const useMovimento = () => useContext(ContextoMovimento);
