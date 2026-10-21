"use client";

import { useEffect, useRef } from "react";

type Ponto = { x: number; y: number; vx: number; vy: number; r: number };

/** Partículas flutuantes ligadas por linhas, que fogem do mouse. */
export default function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouse = { x: -9999, y: -9999 };
    let pontos: Ponto[] = [];
    let largura = 0;
    let altura = 0;
    let frame = 0;

    function criar() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      largura = window.innerWidth;
      altura = window.innerHeight;
      canvas!.width = largura * dpr;
      canvas!.height = altura * dpr;
      canvas!.style.width = `${largura}px`;
      canvas!.style.height = `${altura}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const total = Math.min(90, Math.floor((largura * altura) / 16000));
      pontos = Array.from({ length: total }, () => ({
        x: Math.random() * largura,
        y: Math.random() * altura,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.6 + 0.4,
      }));
    }

    function desenhar() {
      ctx!.clearRect(0, 0, largura, altura);

      for (const p of pontos) {
        if (!reduzir) {
          // afasta do mouse
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 120 && dist > 0) {
            p.x += (dx / dist) * 1.2;
            p.y += (dy / dist) * 1.2;
          }
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > largura) p.vx *= -1;
          if (p.y < 0 || p.y > altura) p.vy *= -1;
        }

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = "rgba(90, 145, 255, 0.75)";
        ctx!.fill();
      }

      // linhas entre partículas próximas
      for (let i = 0; i < pontos.length; i++) {
        for (let j = i + 1; j < pontos.length; j++) {
          const a = pontos[i];
          const b = pontos[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 130) {
            ctx!.strokeStyle = `rgba(10, 91, 255, ${0.18 * (1 - dist / 130)})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }

      if (!reduzir) frame = requestAnimationFrame(desenhar);
    }

    const aoMover = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const aoRedimensionar = () => {
      criar();
      if (reduzir) desenhar();
    };

    criar();
    desenhar();
    window.addEventListener("mousemove", aoMover);
    window.addEventListener("resize", aoRedimensionar);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", aoMover);
      window.removeEventListener("resize", aoRedimensionar);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 opacity-70"
    />
  );
}
