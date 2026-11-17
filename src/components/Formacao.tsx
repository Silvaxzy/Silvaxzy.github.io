import { useRef, useState } from "react";
import { certificacoes, formacao, type Certificacao } from "../data/portfolio";
import { useMovimento } from "../lib/movimento";
import { revelarSecao } from "../lib/revelar";
import { gsap } from "../lib/rolagem";
import { useGsap } from "../lib/useGsap";
import { Fechar, SetaDiagonal } from "./Icones";
import TituloSecao from "./TituloSecao";
import estilos from "./Formacao.module.css";

export default function Formacao() {
  const raiz = useRef<HTMLElement>(null);
  const dialogo = useRef<HTMLDialogElement>(null);
  const { reduzido } = useMovimento();
  const [aberto, setAberto] = useState<Certificacao | null>(null);

  // a formação fica no centro e os certificados se abrem em leque a partir dela
  const [primeiro, ...outros] = certificacoes;
  const ordem: ({ tipo: "formacao" } | { tipo: "certificado"; cert: Certificacao })[] = [
    ...(primeiro ? [{ tipo: "certificado" as const, cert: primeiro }] : []),
    { tipo: "formacao" },
    ...outros.map((cert) => ({ tipo: "certificado" as const, cert })),
  ];
  const centro = ordem.findIndex((o) => o.tipo === "formacao");

  useGsap(
    raiz,
    () => {
      revelarSecao(raiz.current!, reduzido);
      if (reduzido) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 900px)", () => {
        const cartas = gsap.utils.toArray<HTMLElement>("[data-carta]");
        const tl = gsap.timeline({ scrollTrigger: { trigger: "[data-leque]", start: "top 95%", end: "center 55%", scrub: 1 } });
        cartas.forEach((carta, i) => {
          const distancia = i - centro;
          tl.fromTo(
            carta,
            { xPercent: -distancia * 100, rotation: 0, y: 100, autoAlpha: distancia === 0 ? 1 : 0.4 },
            { xPercent: distancia * 8, rotation: distancia === 0 ? -1.5 : distancia * 6, y: Math.abs(distancia) * 26, autoAlpha: 1, ease: "power2.out" },
            0,
          );
        });
      });
      return () => mm.revert();
    },
    [reduzido, centro],
  );

  const abrir = (cert: Certificacao) => {
    setAberto(cert);
    dialogo.current?.showModal();
  };

  return (
    <section ref={raiz} id="formacao" className={estilos.formacao} aria-labelledby="titulo-formacao">
      <div className="container">
        <TituloSecao id="titulo-formacao" numero="05" titulo="Formação e cursos" subtitulo="Aprendizado contínuo." alinhamento="centro" />

        <ul className={estilos.leque} data-leque>
          {ordem.map((item, i) =>
            item.tipo === "formacao" ? (
              <li key="formacao" className={`${estilos.carta} ${estilos.cartaFormacao}`} data-carta style={{ zIndex: 3 }}>
                <span className={estilos.tipo}>Graduação</span>
                <h3 className={estilos.curso}>{formacao.curso}</h3>
                <p className={estilos.instituicao}>{formacao.instituicao}</p>
                <p className={estilos.periodo}>{formacao.periodo}</p>
                <span className={estilos.selo} aria-hidden="true">
                  ADS
                </span>
              </li>
            ) : (
              <li key={item.cert.nome} className={estilos.carta} data-carta style={{ zIndex: 2 - Math.abs(i - centro) }}>
                <span className={estilos.tipo}>Certificado · {item.cert.ano}</span>
                {item.cert.imagem && (
                  <div className={estilos.miniatura}>
                    <img src={item.cert.imagem} alt="" loading="lazy" width={640} height={460} />
                  </div>
                )}
                <h3 className={estilos.certNome}>{item.cert.nome}</h3>
                <p className={estilos.instituicao}>{item.cert.instituicao}</p>
                {item.cert.imagem ? (
                  <button type="button" className={estilos.ver} onClick={() => abrir(item.cert)}>
                    Ver certificado <SetaDiagonal className={estilos.icone} />
                  </button>
                ) : item.cert.link ? (
                  <a href={item.cert.link} target="_blank" rel="noopener noreferrer" className={estilos.ver}>
                    Ver certificado <SetaDiagonal className={estilos.icone} />
                  </a>
                ) : null}
              </li>
            ),
          )}
        </ul>
      </div>

      <dialog ref={dialogo} className={estilos.dialogo} aria-labelledby="titulo-certificado" onClose={() => setAberto(null)}>
        {aberto && (
          <>
            <header className={estilos.dialogoTopo}>
              <div>
                <h3 id="titulo-certificado">{aberto.nome}</h3>
                <p>
                  {aberto.instituicao}, {aberto.ano}
                </p>
              </div>
              <button type="button" className={estilos.fechar} onClick={() => dialogo.current?.close()} aria-label="Fechar certificado" autoFocus>
                <Fechar className={estilos.icone} />
              </button>
            </header>
            {aberto.imagem && <img src={aberto.imagem} alt={`Certificado: ${aberto.nome}`} className={estilos.certificadoImg} />}
          </>
        )}
      </dialog>
    </section>
  );
}
