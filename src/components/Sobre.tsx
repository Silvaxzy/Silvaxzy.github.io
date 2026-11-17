import { useRef, useState } from "react";
import { competencias, comportamentais, formacao, perfil } from "../data/portfolio";
import { useMovimento } from "../lib/movimento";
import { revelarSecao } from "../lib/revelar";
import { gsap } from "../lib/rolagem";
import { useGsap } from "../lib/useGsap";
import TituloSecao from "./TituloSecao";
import estilos from "./Sobre.module.css";

export default function Sobre() {
  const raiz = useRef<HTMLElement>(null);
  const { reduzido } = useMovimento();
  const [semFoto, setSemFoto] = useState(false);

  useGsap(
    raiz,
    () => {
      revelarSecao(raiz.current!, reduzido);
      if (reduzido) return;
      // paralaxe: a foto anda mais devagar que o texto
      gsap.fromTo(
        "[data-foto]",
        { yPercent: -8 },
        { yPercent: 8, ease: "none", scrollTrigger: { trigger: "[data-moldura]", start: "top bottom", end: "bottom top", scrub: true } },
      );
      gsap.from("[data-competencia]", {
        y: 40,
        autoAlpha: 0,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: { trigger: "[data-competencias]", start: "top 82%", once: true },
      });
    },
    [reduzido],
  );

  return (
    <section ref={raiz} id="sobre" className={estilos.sobre} aria-labelledby="titulo-sobre">
      <div className="container">
        <TituloSecao
          id="titulo-sobre"
          numero="01"
          titulo="Tecnologia com visão de negócio"
          subtitulo="Da operação ao código: uso o que aprendi no dia a dia das empresas para construir soluções úteis."
        />

        <div className={estilos.grade}>
          <figure className={estilos.moldura} data-moldura data-revelar>
            <div className={estilos.fotoJanela}>
              {semFoto ? (
                <span className={estilos.iniciais} data-foto>
                  {perfil.iniciais}
                </span>
              ) : (
                <img
                  src={perfil.foto}
                  alt={`Foto de ${perfil.nome}`}
                  width={480}
                  height={600}
                  loading="lazy"
                  data-foto
                  onError={() => setSemFoto(true)}
                />
              )}
            </div>
            <figcaption className={estilos.legenda}>
              <span className={estilos.legendaNome}>{perfil.nomeCompleto}</span>
              <span>{perfil.localizacao}</span>
            </figcaption>
          </figure>

          <div className={estilos.texto}>
            {perfil.bio.map((paragrafo, i) => (
              <p key={i} className={i === 0 ? estilos.destaque : undefined} data-revelar>
                {paragrafo}
              </p>
            ))}

            <dl className={estilos.fatos} data-revelar>
              <div>
                <dt>Formação</dt>
                <dd>{formacao.curso}</dd>
                <dd className={estilos.fatoSub}>
                  {formacao.instituicao}, {formacao.periodo}
                </dd>
              </div>
              <div>
                <dt>Competências comportamentais</dt>
                <dd>
                  <ul className={estilos.chips}>
                    {comportamentais.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <ul className={estilos.competencias} data-competencias aria-label="Áreas de atuação">
          {competencias.map((c) => (
            <li key={c.titulo} className={estilos.competencia} data-competencia>
              <span className={estilos.marcador} aria-hidden="true" />
              <h3>{c.titulo}</h3>
              <p>{c.texto}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
