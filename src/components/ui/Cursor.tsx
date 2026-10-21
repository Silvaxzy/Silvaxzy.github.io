"use client";

import { useEffect, useRef } from "react";

/**
 * Cursor interativo: um ponto, um anel que cresce sobre links/botões
 * e uma luz azul grande que acompanha o mouse.
 * Só liga em computadores com mouse (não em celular).
 */
export default function Cursor() {
  const pontoRef = useRef<HTMLDivElement>(null);
  const anelRef = useRef<HTMLDivElement>(null);
  const luzRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const temMouse = window.matchMedia("(pointer: fine)").matches;
    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!temMouse || reduzir) return;

    document.documentElement.classList.add("cursor-custom");

    const alvo = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const anel = { ...alvo };
    const luz = { ...alvo };
    let escala = 1;
    let escalaAlvo = 1;
    let frame = 0;

    const aoMover = (e: MouseEvent) => {
      alvo.x = e.clientX;
      alvo.y = e.clientY;
      if (pontoRef.current) {
        pontoRef.current.style.transform = `translate3d(${alvo.x}px, ${alvo.y}px, 0)`;
      }
    };

    const aoPassar = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      escalaAlvo = el?.closest("a, button, [data-cursor]") ? 2.2 : 1;
    };

    const animar = () => {
      anel.x += (alvo.x - anel.x) * 0.18;
      anel.y += (alvo.y - anel.y) * 0.18;
      luz.x += (alvo.x - luz.x) * 0.08;
      luz.y += (alvo.y - luz.y) * 0.08;
      escala += (escalaAlvo - escala) * 0.15;

      if (anelRef.current) {
        anelRef.current.style.transform = `translate3d(${anel.x}px, ${anel.y}px, 0) scale(${escala})`;
      }
      if (luzRef.current) {
        luzRef.current.style.transform = `translate3d(${luz.x}px, ${luz.y}px, 0)`;
      }
      frame = requestAnimationFrame(animar);
    };

    window.addEventListener("mousemove", aoMover);
    window.addEventListener("mouseover", aoPassar);
    frame = requestAnimationFrame(animar);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", aoMover);
      window.removeEventListener("mouseover", aoPassar);
      document.documentElement.classList.remove("cursor-custom");
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60] hidden [@media(pointer:fine)]:block">
      {/* luz que acompanha o mouse */}
      <div
        ref={luzRef}
        className="absolute left-0 top-0 -ml-[300px] -mt-[300px] h-[600px] w-[600px] rounded-full opacity-60 mix-blend-screen"
        style={{ background: "radial-gradient(circle, rgba(10,91,255,0.16) 0%, transparent 60%)" }}
      />
      {/* anel */}
      <div
        ref={anelRef}
        className="absolute left-0 top-0 -ml-4 -mt-4 h-8 w-8 rounded-full border border-brand-bright/70"
      />
      {/* ponto */}
      <div
        ref={pontoRef}
        className="absolute left-0 top-0 -ml-1 -mt-1 h-2 w-2 rounded-full bg-electric shadow-[0_0_12px_#00b3ff]"
      />
    </div>
  );
}
