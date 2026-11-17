import { useEffect, useRef, useState } from "react";
import { carregarAssets } from "../lib/carregamento";
import { useMovimento } from "../lib/movimento";
import { gsap } from "../lib/rolagem";
import estilos from "./Preloader.module.css";

/**
 * Tela de abertura: marca grande e contador com o progresso real das fontes e imagens.
 * Os assets valem até 90%; o restante termina junto com a animação de saída.
 */
export default function Preloader({ aoConcluir }: { aoConcluir: () => void }) {
  const raiz = useRef<HTMLDivElement>(null);
  const contador = useRef<HTMLSpanElement>(null);
  const barra = useRef<HTMLSpanElement>(null);
  const { reduzido } = useMovimento();
  const [visivel, setVisivel] = useState(true);

  useEffect(() => {
    let cancelado = false;
    const estado = { p: 0 };
    const desenhar = () => {
      if (contador.current) contador.current.textContent = String(Math.round(estado.p * 100)).padStart(2, "0");
      if (barra.current) barra.current.style.transform = `scaleX(${estado.p})`;
    };

    carregarAssets((p) => {
      if (!cancelado) gsap.to(estado, { p: p * 0.9, duration: 0.4, ease: "power1.out", onUpdate: desenhar, overwrite: true });
    }).then(() => {
      if (cancelado) return;
      const saida = gsap.timeline({
        onComplete: () => {
          if (cancelado) return;
          setVisivel(false);
          aoConcluir();
        },
      });
      if (reduzido) {
        saida.to(estado, { p: 1, duration: 0.2, onUpdate: desenhar }).to(raiz.current, { opacity: 0, duration: 0.3 });
      } else {
        saida
          .to(estado, { p: 1, duration: 0.45, ease: "power1.out", onUpdate: desenhar, overwrite: true })
          .to("[data-marca-loader]", { opacity: 0, yPercent: -12, duration: 0.5, ease: "power2.in" }, ">-0.05")
          .to("[data-info-loader]", { opacity: 0, duration: 0.3 }, "<")
          .to(raiz.current, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.7, ease: "power3.inOut" }, ">-0.15");
      }
    });

    return () => {
      cancelado = true;
      gsap.killTweensOf(estado);
    };
    // roda só uma vez, na abertura
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visivel) return null;

  return (
    <div ref={raiz} className={estilos.loader} role="status" aria-live="polite" aria-label="Carregando o portfólio">
      <p className={estilos.marca} data-marca-loader aria-hidden="true">
        Bruno
        <br />
        Silva
      </p>
      <div className={estilos.info} data-info-loader>
        <span className={estilos.legenda}>Carregando portfólio</span>
        <span className={estilos.numero}>
          <span ref={contador}>00</span>%
        </span>
      </div>
      <span className={estilos.trilho} aria-hidden="true">
        <span ref={barra} className={estilos.progresso} />
      </span>
    </div>
  );
}
