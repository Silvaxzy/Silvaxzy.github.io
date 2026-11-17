import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

/**
 * "Um relógio só": o ticker do GSAP move o Lenis, e o Lenis avisa o ScrollTrigger.
 * Assim pins e animações ligadas à rolagem nunca ficam fora de sincronia.
 */
export function iniciarRolagem(suave: boolean): () => void {
  const instancia = new Lenis({
    autoRaf: false,
    smoothWheel: suave,
    syncTouch: false,
    lerp: 0.085,
    // diálogos (certificados) rolam com a rolagem nativa
    prevent: (no) => no.closest("dialog") !== null,
  });
  lenis = instancia;

  const tick = (segundos: number) => instancia.raf(segundos * 1000);
  const atualizar = () => ScrollTrigger.update();
  const redimensionar = () => instancia.resize();

  instancia.on("scroll", atualizar);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  ScrollTrigger.addEventListener("refresh", redimensionar);

  return () => {
    gsap.ticker.remove(tick);
    gsap.ticker.lagSmoothing(500, 33);
    ScrollTrigger.removeEventListener("refresh", redimensionar);
    instancia.destroy();
    if (lenis === instancia) lenis = null;
  };
}

/** Todos os links internos passam por aqui (menu, botões e "voltar ao topo"). */
export function irPara(alvo: string) {
  const elemento = alvo === "#inicio" ? 0 : document.querySelector<HTMLElement>(alvo);
  if (elemento === null) return;
  if (lenis) {
    lenis.scrollTo(elemento, { offset: alvo === "#inicio" ? 0 : -72, duration: 1.4 });
  } else if (elemento === 0) {
    window.scrollTo({ top: 0 });
  } else {
    elemento.scrollIntoView();
  }
  if (typeof elemento !== "number") {
    elemento.setAttribute("tabindex", "-1");
    elemento.focus({ preventScroll: true });
  }
}

export function pausarRolagem(pausar: boolean) {
  if (!lenis) return;
  if (pausar) lenis.stop();
  else lenis.start();
}

export { gsap, ScrollTrigger };
