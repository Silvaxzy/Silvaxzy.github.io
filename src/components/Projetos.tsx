import { useRef } from "react";
import { projetos } from "../data/portfolio";
import { useMovimento } from "../lib/movimento";
import { revelarSecao } from "../lib/revelar";
import { gsap } from "../lib/rolagem";
import { useGsap } from "../lib/useGsap";
import { GitHub, SetaDiagonal } from "./Icones";
import TituloSecao from "./TituloSecao";
import estilos from "./Projetos.module.css";

export default function Projetos() {
  const raiz = useRef<HTMLElement>(null);
  const { reduzido } = useMovimento();

  useGsap(
    raiz,
    () => {
      revelarSecao(raiz.current!, reduzido);
      if (reduzido) return;
      const cartoes = gsap.utils.toArray<HTMLElement>("[data-projeto]");
      cartoes.forEach((cartao, i) => {
        // a imagem anda dentro da moldura (profundidade)
        gsap.fromTo(
          cartao.querySelector("[data-imagem]"),
          { yPercent: -6 },
          { yPercent: 6, ease: "none", scrollTrigger: { trigger: cartao, start: "top bottom", end: "bottom top", scrub: true } },
        );
        // o cartão de baixo empurra o de cima para trás
        const proximo = cartoes[i + 1];
        if (!proximo) return;
        gsap.to(cartao.querySelector("[data-projeto-corpo]"), {
          scale: 0.92,
          filter: "brightness(0.55)",
          ease: "none",
          scrollTrigger: { trigger: proximo, start: "top 75%", end: "top 15%", scrub: true },
        });
      });
    },
    [reduzido],
  );

  return (
    <section ref={raiz} id="projetos" className={estilos.projetos} aria-labelledby="titulo-projetos">
      <div className="container">
        <TituloSecao id="titulo-projetos" numero="04" titulo="O que eu já construí" subtitulo="Aplicações completas, com código aberto no GitHub." />

        <div className={estilos.pilha}>
          {projetos.map((p, i) => (
            <article key={p.nome} className={estilos.projeto} data-projeto style={{ top: `calc(96px + ${i * 22}px)` }} aria-labelledby={`projeto-${i}`}>
              <div className={estilos.corpo} data-projeto-corpo>
                <div className={estilos.janela}>
                  <div className={estilos.barraJanela} aria-hidden="true">
                    <span />
                    <span />
                    <span />
                    <em>{p.demo ? new URL(p.demo).host : p.nome}</em>
                  </div>
                  <div className={estilos.imagemCaixa}>
                    <img src={p.imagem} alt={`Tela do projeto ${p.nome}`} loading="lazy" width={1280} height={800} data-imagem />
                  </div>
                </div>

                <div className={estilos.info}>
                  <span className={estilos.categoria}>{p.categoria}</span>
                  <h3 id={`projeto-${i}`} className={estilos.nome}>
                    {p.nome}
                  </h3>
                  <p className={estilos.descricao}>{p.descricao}</p>
                  <ul className={estilos.tecnologias} aria-label="Tecnologias">
                    {p.tecnologias.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                  <div className={estilos.links}>
                    {p.demo && (
                      <a href={p.demo} target="_blank" rel="noopener noreferrer" className={estilos.demo}>
                        Abrir demonstração <SetaDiagonal className={estilos.icone} />
                        <span className="sr-only"> (abre em nova aba)</span>
                      </a>
                    )}
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noopener noreferrer" className={estilos.codigo}>
                        <GitHub className={estilos.icone} /> Ver código
                        <span className="sr-only"> no GitHub (abre em nova aba)</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
