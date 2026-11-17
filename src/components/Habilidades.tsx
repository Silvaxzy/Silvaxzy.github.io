import { useRef } from "react";
import { habilidades, habilidadesDestaque } from "../data/portfolio";
import { useMovimento } from "../lib/movimento";
import { revelarSecao } from "../lib/revelar";
import { gsap } from "../lib/rolagem";
import { useGsap } from "../lib/useGsap";
import TituloSecao from "./TituloSecao";
import estilos from "./Habilidades.module.css";

const RAIO = 54;
const CIRCUNFERENCIA = 2 * Math.PI * RAIO;

export default function Habilidades() {
  const raiz = useRef<HTMLElement>(null);
  const { reduzido } = useMovimento();

  useGsap(
    raiz,
    () => {
      revelarSecao(raiz.current!, reduzido);
      const aneis = gsap.utils.toArray<SVGCircleElement>("[data-anel]");
      const numeros = gsap.utils.toArray<HTMLElement>("[data-numero]");
      const barras = gsap.utils.toArray<HTMLElement>("[data-barra]");

      if (reduzido) {
        aneis.forEach((a) => gsap.set(a, { strokeDashoffset: CIRCUNFERENCIA * (1 - Number(a.dataset.nivel) / 100) }));
        barras.forEach((b) => gsap.set(b, { scaleX: Number(b.dataset.nivel) / 100 }));
        return;
      }

      const tl = gsap.timeline({ scrollTrigger: { trigger: "[data-aneis]", start: "top 78%", once: true } });
      aneis.forEach((anel, i) => {
        const nivel = Number(anel.dataset.nivel);
        const contador = { v: 0 };
        tl.fromTo(anel, { strokeDashoffset: CIRCUNFERENCIA }, { strokeDashoffset: CIRCUNFERENCIA * (1 - nivel / 100), duration: 1.4, ease: "power3.out" }, i * 0.12);
        tl.to(contador, { v: nivel, duration: 1.4, ease: "power3.out", onUpdate: () => (numeros[i].textContent = String(Math.round(contador.v))) }, i * 0.12);
      });

      gsap.utils.toArray<HTMLElement>("[data-grupo]").forEach((grupo) => {
        gsap.fromTo(
          grupo.querySelectorAll("[data-barra]"),
          { scaleX: 0 },
          {
            scaleX: (_i: number, el: HTMLElement) => Number(el.dataset.nivel) / 100,
            duration: 1.1,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: { trigger: grupo, start: "top 85%", once: true },
          },
        );
      });
    },
    [reduzido],
  );

  return (
    <section ref={raiz} id="habilidades" className={estilos.habilidades} aria-labelledby="titulo-habilidades">
      <div className="container">
        <TituloSecao
          id="titulo-habilidades"
          numero="02"
          titulo="Minha caixa de ferramentas"
          subtitulo="Tecnologias que uso nos meus projetos, com o nível em que estou hoje."
        />

        <ul className={estilos.aneis} data-aneis aria-label="Principais tecnologias">
          {habilidadesDestaque.map((h) => (
            <li key={h.nome} className={estilos.anelItem} data-revelar>
              <div className={estilos.anelCaixa}>
              <svg viewBox="0 0 128 128" className={estilos.anelSvg} aria-hidden="true">
                <circle cx="64" cy="64" r={RAIO} className={estilos.trilho} />
                <circle
                  cx="64"
                  cy="64"
                  r={RAIO}
                  className={estilos.anel}
                  strokeDasharray={CIRCUNFERENCIA}
                  strokeDashoffset={CIRCUNFERENCIA * (1 - h.nivel / 100)}
                  data-anel
                  data-nivel={h.nivel}
                />
              </svg>
              <span className={estilos.valor} aria-hidden="true">
                <span data-numero>{h.nivel}</span>%
              </span>
              </div>
              <span className={estilos.anelNome}>
                {h.nome}
                <span className="sr-only">: nível {h.nivel}%</span>
              </span>
            </li>
          ))}
        </ul>

        <div className={estilos.grupos}>
          {habilidades.map((g) => (
            <div key={g.categoria} className={estilos.grupo} data-grupo data-revelar>
              <h3>{g.categoria}</h3>
              <ul>
                {g.itens.map((item) => (
                  <li key={item.nome}>
                    <div className={estilos.linhaItem}>
                      <span>{item.nome}</span>
                      <span className={estilos.porcentagem}>{item.nivel}%</span>
                    </div>
                    <span
                      className={estilos.trilhoBarra}
                      role="progressbar"
                      aria-label={item.nome}
                      aria-valuenow={item.nivel}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <span className={estilos.barra} data-barra data-nivel={item.nivel} style={{ transform: `scaleX(${item.nivel / 100})` }} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
