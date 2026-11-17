import { useRef } from "react";
import { perfil } from "../data/portfolio";
import { useMovimento } from "../lib/movimento";
import { gsap, irPara, ScrollTrigger } from "../lib/rolagem";
import { useGsap } from "../lib/useGsap";
import CartaoId from "./CartaoId";
import { Local, Seta } from "./Icones";
import Palavras from "./Palavras";
import estilos from "./Hero.module.css";

/** Mesma condição usada no CSS da seção "Sobre" (margem negativa do pull-up). */
export const CONSULTA_PIN = "(min-width: 900px)";

export default function Hero({ pronto }: { pronto: boolean }) {
  const raiz = useRef<HTMLElement>(null);
  const { reduzido } = useMovimento();
  const [primeiro, ...resto] = perfil.nome.split(" ");

  // 1) entrada: a cena abre do centro e as palavras aparecem uma a uma
  useGsap(
    raiz,
    () => {
      if (!pronto) {
        gsap.set("[data-entrada]", { autoAlpha: 0 });
        return;
      }
      if (reduzido) {
        gsap.fromTo("[data-entrada]", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 });
        return;
      }
      gsap
        .timeline()
        .fromTo("[data-palco]", { clipPath: "inset(36% 28% 36% 28% round 28px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 0.85, ease: "power3.out", clearProps: "clipPath" })
        .fromTo("[data-entrada]", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out", stagger: 0.06 }, 0.35)
        .fromTo(
          "[data-titulo] [data-palavra]",
          { yPercent: 110, filter: "blur(8px)" },
          { yPercent: 0, filter: "blur(0px)", duration: 0.7, ease: "power3.out", stagger: 0.09, clearProps: "filter" },
          0.4,
        )
        .fromTo("[data-cartao]", { y: 80, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, ease: "power3.out" }, 0.45);
    },
    [pronto, reduzido],
  );

  // 2) rolagem: fixa o hero, vira o cartão de frente e puxa o próximo capítulo por cima
  useGsap(
    raiz,
    () => {
      if (!pronto || reduzido) return;
      const mm = gsap.matchMedia();
      mm.add(CONSULTA_PIN, () => {
        // avisa o CSS que o hero está fixado (a seção "Sobre" sobe por cima dele)
        document.documentElement.dataset.pin = "ativo";
        const cartao = raiz.current!.querySelector<HTMLElement>("[data-cartao]")!;
        const mouse = raiz.current!.querySelector<HTMLElement>("[data-cartao-mouse]")!;
        gsap.set(cartao, { rotationY: -22, rotationX: 9, rotation: -4 });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: "[data-palco]",
            start: "top top",
            end: "+=200%",
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
        // 0 → 0.4: o cartão vira de frente e cresce um pouco
        tl.to(cartao, { rotationY: 0, rotationX: 0, rotation: 0, scale: 1.08, duration: 0.4 }, 0)
          .to("[data-marca]", { xPercent: -6, duration: 0.4 }, 0)
          // 0.4 → 0.5: segura
          .to({}, { duration: 0.1 })
          // 0.5 → 1: o próximo capítulo sobe por cima
          .to(cartao, { y: -110, scale: 0.88, rotation: -3, duration: 0.5 }, 0.5)
          .to("[data-titulo]", { y: -65, duration: 0.5 }, 0.5)
          .to("[data-marca]", { y: -160, duration: 0.5 }, 0.5)
          .to("[data-sombra]", { opacity: 0.35, duration: 0.5 }, 0.5);

        // inclinação pelo mouse (só ponteiro fino), some quando a rolagem começa
        const fino = window.matchMedia("(pointer: fine)").matches;
        if (!fino) return;
        const rx = gsap.quickTo(mouse, "rotationX", { duration: 0.6, ease: "power3.out" });
        const ry = gsap.quickTo(mouse, "rotationY", { duration: 0.6, ease: "power3.out" });
        const aoMover = (e: PointerEvent) => {
          const forca = Math.max(0, 1 - tl.progress() * 5);
          rx((0.5 - e.clientY / window.innerHeight) * 14 * forca);
          ry((e.clientX / window.innerWidth - 0.5) * 18 * forca);
        };
        window.addEventListener("pointermove", aoMover);
        return () => window.removeEventListener("pointermove", aoMover);
      });
      mm.add(CONSULTA_PIN, () => () => {
        delete document.documentElement.dataset.pin;
      });
      ScrollTrigger.refresh();
      return () => mm.revert();
    },
    [pronto, reduzido],
  );

  return (
    <section id="inicio" ref={raiz} className={estilos.hero} aria-label="Apresentação">
      <div className={estilos.palco} data-palco>
        <div className={estilos.fundo} aria-hidden="true">
          <div className={estilos.horizonte} />
          <div className={estilos.chao} />
          <p className={estilos.marcaFundo} data-marca>
            {perfil.nome}
          </p>
        </div>

        <div className={`container ${estilos.conteudo}`}>
          <div className={estilos.texto} data-titulo>
            <p className={estilos.status} data-entrada>
              <span className={estilos.ponto} aria-hidden="true" />
              {perfil.disponibilidade}
            </p>
            <h1 className={estilos.nome}>
              <Palavras texto={primeiro} />{" "}
              <Palavras texto={resto.join(" ")} className="texto-gradiente" />
            </h1>
            <p className={estilos.cargo} data-entrada>
              {perfil.cargo}
            </p>
            <p className={estilos.apresentacao} data-entrada>
              {perfil.apresentacao}
            </p>
            <div className={estilos.acoes} data-entrada>
              <a
                href="#projetos"
                className={estilos.primario}
                onClick={(e) => {
                  e.preventDefault();
                  irPara("#projetos");
                }}
              >
                Ver projetos <Seta className={estilos.iconeBotao} />
              </a>
              <a
                href="#contato"
                className={estilos.secundario}
                onClick={(e) => {
                  e.preventDefault();
                  irPara("#contato");
                }}
              >
                Falar comigo
              </a>
            </div>
            <ul className={estilos.meta} data-entrada>
              <li>
                <Local className={estilos.iconeMeta} />
                {perfil.localizacao}
              </li>
              <li>{perfil.stack}</li>
            </ul>
          </div>

          <div className={estilos.cartaoArea}>
            <CartaoId />
          </div>
        </div>

        <div className={estilos.sombra} data-sombra aria-hidden="true" />
        <p className={estilos.dica} data-entrada aria-hidden="true">
          <span className={estilos.mouseIcone} />
          Role para explorar
        </p>
      </div>
    </section>
  );
}
