"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import SmartImage from "@/components/ui/SmartImage";
import { GithubIcon } from "@/components/ui/Icons";
import { projetos, type Projeto } from "@/data/portfolio";
import { EASE } from "@/lib/utils";

const categorias = ["Todos", ...Array.from(new Set(projetos.map((p) => p.categoria)))];

function CardProjeto({ projeto }: { projeto: Projeto }) {
  // inclinação 3D seguindo o mouse
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 150, damping: 18 });
  const rotateY = useSpring(ry, { stiffness: 150, damping: 18 });

  function aoMover(e: React.MouseEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    rx.set((0.5 - py) * 8);
    ry.set((px - 0.5) * 8);
    e.currentTarget.style.setProperty("--x", `${px * 100}%`);
    e.currentTarget.style.setProperty("--y", `${py * 100}%`);
  }

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.5, ease: EASE }}
      onMouseMove={aoMover}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className={`spotlight group overflow-hidden rounded-3xl border border-line bg-panel/80 transition-colors hover:border-brand/60 ${
        projeto.destaque ? "md:col-span-2" : ""
      }`}
    >
      <div className={`grid h-full ${projeto.destaque ? "md:grid-cols-[1.25fr_1fr]" : ""}`}>
        {/* capa */}
        <div className="relative aspect-[16/10] overflow-hidden border-b border-line md:aspect-auto md:min-h-[320px] md:border-b-0 md:border-r">
          <SmartImage
            src={projeto.imagem}
            alt={`Tela do projeto ${projeto.nome}`}
            className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            fallback={
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand/40 to-night font-display text-2xl font-semibold text-white">
                {projeto.nome}
              </div>
            }
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" aria-hidden="true" />
          <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur">
            {projeto.categoria}
          </span>
        </div>

        {/* conteúdo */}
        <div className="flex flex-col p-7">
          <h3 className="flex items-start justify-between gap-4 font-display text-2xl font-semibold text-white">
            {projeto.nome}
            <ArrowUpRight
              className="h-6 w-6 shrink-0 text-brand-bright transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-mist sm:text-base">{projeto.descricao}</p>

          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tecnologias usadas">
            {projeto.tecnologias.map((t) => (
              <li key={t} className="rounded-md bg-brand/10 px-2.5 py-1 text-xs font-medium text-brand-bright ring-1 ring-brand/25">
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap gap-3 pt-7">
            {projeto.github && (
              <a
                href={projeto.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-white transition-shadow hover:shadow-[0_0_28px_rgba(10,91,255,0.7)]"
              >
                <GithubIcon className="h-4 w-4" /> Ver código
              </a>
            )}
            {projeto.demo ? (
              <a
                href={projeto.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-brand hover:bg-brand/10"
              >
                <ExternalLink className="h-4 w-4" aria-hidden="true" /> Demonstração
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-line px-5 py-2.5 text-sm text-mist">
                Demo em breve
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [filtro, setFiltro] = useState("Todos");
  const lista = filtro === "Todos" ? projetos : projetos.filter((p) => p.categoria === filtro);

  return (
    <section id="projetos" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          etiqueta="Projetos"
          titulo="O que eu já construí"
          subtitulo="Aplicações completas, com código aberto no GitHub."
        />

        {categorias.length > 1 && (
          <div role="group" aria-label="Filtrar projetos por categoria" className="mb-10 flex flex-wrap justify-center gap-2">
            {categorias.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setFiltro(c)}
                aria-pressed={filtro === c}
                className={`relative isolate rounded-full px-5 py-2 text-sm transition-colors ${
                  filtro === c ? "text-white" : "text-mist hover:text-white"
                }`}
              >
                {filtro === c && (
                  <motion.span layoutId="filtro-ativo" className="absolute inset-0 -z-10 rounded-full bg-brand glow" />
                )}
                {c}
              </button>
            ))}
          </div>
        )}

        <motion.div layout className="grid gap-6 md:grid-cols-2">
          <AnimatePresence>
            {lista.map((p) => (
              <CardProjeto key={p.nome} projeto={p} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
