import { useRef } from "react";
import { experiencias } from "../data/portfolio";
import { useMovimento } from "../lib/movimento";
import { revelarSecao } from "../lib/revelar";
import { gsap } from "../lib/rolagem";
import { useGsap } from "../lib/useGsap";
import TituloSecao from "./TituloSecao";
import estilos from "./Experiencia.module.css";

export default function Experiencia() {
  const raiz = useRef<HTMLElement>(null);
  const { reduzido } = useMovimento();

  useGsap(
    raiz,
    () => {
      revelarSecao(raiz.current!, reduzido);
      if (reduzido) return;
      // a linha do tempo "se desenha" conforme a rolagem
      gsap.fromTo(
        "[data-linha]",
        { scaleY: 0 },
        { scaleY: 1, ease: "none", scrollTrigger: { trigger: "[data-linha-tempo]", start: "top 70%", end: "bottom 60%", scrub: true } },
      );
      gsap.utils.toArray<HTMLElement>("[data-item]").forEach((item) => {
        gsap.from(item, { autoAlpha: 0, x: 40, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: item, start: "top 80%", once: true } });
      });
    },
    [reduzido],
  );

  return (
    <section ref={raiz} id="experiencia" className={estilos.experiencia} aria-labelledby="titulo-experiencia">
      <div className={`container ${estilos.layout}`}>
        <div className={estilos.lateral}>
          <TituloSecao id="titulo-experiencia" numero="03" titulo="Experiência profissional" subtitulo="Minha caminhada até aqui, no trabalho e nos estudos." />
        </div>

        <div className={estilos.linhaTempo} data-linha-tempo>
          <span className={estilos.trilho} aria-hidden="true">
            <span className={estilos.linha} data-linha />
          </span>
          <ol className={estilos.lista}>
          {experiencias.map((exp) => (
            <li key={`${exp.empresa}-${exp.periodo}`} className={estilos.item} data-item>
              <span className={estilos.marco} aria-hidden="true" />
              <p className={estilos.periodo}>{exp.periodo}</p>
              <h3 className={estilos.cargo}>{exp.cargo}</h3>
              <p className={estilos.empresa}>
                {exp.empresa} <span>· {exp.local}</span>
              </p>
              <ul className={estilos.realizacoes}>
                {exp.realizacoes.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </li>
          ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
