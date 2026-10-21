"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import BrandRays from "@/components/ui/BrandRays";
import { perfil } from "@/data/portfolio";
import { EASE } from "@/lib/utils";

const techs = ["Python", "Flask", "JavaScript", "SQL", "HTML", "CSS", "Git"];

export default function Hero() {
  // posição do mouse de -0.5 a 0.5, suavizada
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 18 });
  const sy = useSpring(my, { stiffness: 50, damping: 18 });

  // cada camada se move em intensidade diferente = efeito parallax
  const raiosX = useTransform(sx, (v: number) => v * -50);
  const raiosY = useTransform(sy, (v: number) => v * -50);
  const textoX = useTransform(sx, (v: number) => v * 14);
  const textoY = useTransform(sy, (v: number) => v * 14);
  const gradeX = useTransform(sx, (v: number) => v * 24);
  const gradeY = useTransform(sy, (v: number) => v * 24);

  function aoMover(e: React.MouseEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }

  return (
    <section
      id="inicio"
      onMouseMove={aoMover}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-24"
    >
      {/* grade e brilhos de fundo */}
      <motion.div style={{ x: gradeX, y: gradeY }} className="grid-bg absolute -inset-10" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/3 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-brand/20 blur-[140px]"
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-5 lg:grid-cols-[1.15fr_1fr]">
        {/* texto */}
        <motion.div style={{ x: textoX, y: textoY }} className="relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-black/50 px-4 py-1.5 text-xs text-mist backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-electric opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-electric" />
            </span>
            {perfil.disponibilidade}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="mt-6 font-display text-6xl font-bold leading-[0.95] tracking-tight text-white sm:text-7xl lg:text-8xl"
          >
            {perfil.nome.split(" ")[0]}
            <br />
            <span className="text-gradient">{perfil.nome.split(" ").slice(1).join(" ")}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
            className="mt-6 flex items-center gap-2 font-display text-lg font-medium text-brand-bright sm:text-xl"
          >
            <Sparkles className="h-5 w-5" aria-hidden="true" />
            {perfil.cargo}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
            className="mt-5 max-w-xl text-base leading-relaxed text-mist sm:text-lg"
          >
            {perfil.apresentacao}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <a
              href="#projetos"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-brand px-7 py-3.5 font-medium text-white transition-shadow hover:shadow-[0_0_40px_rgba(10,91,255,0.75)]"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              Ver Projetos
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <a
              href="#contato"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-7 py-3.5 font-medium text-white backdrop-blur transition-colors hover:border-brand hover:bg-brand/10"
            >
              Entrar em contato
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-mist"
          >
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-brand-bright" aria-hidden="true" />
              {perfil.localizacao}
            </span>
            <span className="hidden h-4 w-px bg-line sm:block" />
            <ul className="flex flex-wrap gap-2" aria-label="Tecnologias">
              {techs.map((t) => (
                <li key={t} className="rounded-md border border-line px-2 py-0.5 text-xs">
                  {t}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* símbolo animado */}
        <motion.div
          style={{ x: raiosX, y: raiosY }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: EASE }}
          className="pointer-events-none absolute inset-0 -z-0 flex items-center justify-center opacity-30 lg:pointer-events-auto lg:relative lg:opacity-100"
        >
          <div className="flutuar relative aspect-square w-[min(90vw,520px)]">
            <div className="absolute inset-[18%] rounded-full bg-brand/30 blur-3xl" aria-hidden="true" />
            <BrandRays className="relative h-full w-full" />
          </div>
        </motion.div>
      </div>

      {/* indicador de rolagem */}
      <a
        href="#sobre"
        aria-label="Rolar para a próxima seção"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs text-mist sm:flex"
      >
        <span className="flex h-9 w-5 justify-center rounded-full border border-line pt-2">
          <span className="rolar h-2 w-1 rounded-full bg-brand-bright" />
        </span>
        Role
      </a>
    </section>
  );
}
