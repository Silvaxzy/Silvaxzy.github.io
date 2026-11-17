import { gsap } from "./rolagem";

/**
 * Revelação padrão de um capítulo: título palavra por palavra e depois o restante.
 * Um único momento por seção, disparado quando ela entra na tela.
 */
export function revelarSecao(secao: Element, reduzido: boolean) {
  const palavras = secao.querySelectorAll("[data-cabecalho] [data-palavra]");
  const itens = secao.querySelectorAll("[data-revelar]");
  if (reduzido) {
    gsap.from([...palavras, ...itens], {
      autoAlpha: 0,
      duration: 0.5,
      scrollTrigger: { trigger: secao, start: "top 80%", once: true },
    });
    return;
  }
  gsap
    .timeline({ scrollTrigger: { trigger: secao, start: "top 72%", once: true } })
    .from(palavras, { yPercent: 110, filter: "blur(6px)", duration: 0.75, ease: "power3.out", stagger: 0.07, clearProps: "filter" })
    .from(itens, { autoAlpha: 0, y: 28, duration: 0.7, ease: "power2.out", stagger: 0.06 }, 0.2);
}
