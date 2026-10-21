"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, CircleCheck, GraduationCap, MapPin } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { experiencias, formacao } from "@/data/portfolio";
import { slideIn } from "@/lib/utils";

type ItemLinha = {
  icone: typeof Briefcase;
  titulo: string;
  subtitulo: string;
  periodo: string;
  local?: string;
  pontos: string[];
};

const itens: ItemLinha[] = [
  ...experiencias.map((e) => ({
    icone: Briefcase,
    titulo: e.cargo,
    subtitulo: e.empresa,
    periodo: e.periodo,
    local: e.local,
    pontos: e.realizacoes,
  })),
  {
    icone: GraduationCap,
    titulo: formacao.curso,
    subtitulo: formacao.instituicao,
    periodo: formacao.periodo,
    pontos: ["Graduação tecnológica com foco em desenvolvimento de software."],
  },
];

export default function Experience() {
  const secaoRef = useRef<HTMLDivElement>(null);
  const linhaRef = useRef<HTMLDivElement>(null);

  // GSAP: a linha da timeline vai "se desenhando" conforme a rolagem
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        linhaRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: secaoRef.current,
            start: "top 70%",
            end: "bottom 60%",
            scrub: true,
          },
        },
      );
    }, secaoRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experiencia" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-5xl px-5">
        <SectionHeading
          etiqueta="Trajetória"
          titulo="Experiência profissional"
          subtitulo="Minha caminhada até aqui, no trabalho e nos estudos."
        />

        <div ref={secaoRef} className="relative">
          {/* trilho e linha animada */}
          <div className="absolute bottom-0 left-5 top-0 w-px bg-line md:left-1/2" aria-hidden="true" />
          <div
            ref={linhaRef}
            className="absolute bottom-0 left-5 top-0 w-px origin-top bg-gradient-to-b from-electric via-brand to-brand shadow-[0_0_12px_#0a5bff] md:left-1/2"
            aria-hidden="true"
          />

          <ol className="space-y-12">
            {itens.map((item, i) => {
              const direita = i % 2 === 1;
              const Icone = item.icone;
              return (
                <li key={item.titulo + item.subtitulo} className="relative md:grid md:grid-cols-2 md:gap-14">
                  {/* marcador */}
                  <span className="absolute left-5 top-6 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-brand bg-black text-brand-bright shadow-[0_0_20px_rgba(10,91,255,0.6)] md:left-1/2">
                    <Icone className="h-4 w-4" aria-hidden="true" />
                  </span>

                  <motion.div
                    variants={slideIn(direita ? "direita" : "esquerda")}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.4 }}
                    className={`ml-14 md:ml-0 ${direita ? "md:col-start-2" : "md:col-start-1 md:text-right"}`}
                  >
                    <div className="glass group rounded-2xl p-6 transition-all duration-500 hover:border-brand/60 hover:shadow-[0_0_40px_-10px_rgba(10,91,255,0.6)]">
                      <span className="inline-block rounded-full bg-brand/15 px-3 py-1 text-xs font-medium text-brand-bright">
                        {item.periodo}
                      </span>
                      <h3 className="mt-3 font-display text-xl font-semibold text-white">{item.titulo}</h3>
                      <p className="text-sm font-medium text-mist">{item.subtitulo}</p>
                      {item.local && (
                        <p className={`mt-1 flex items-center gap-1 text-xs text-mist ${direita ? "" : "md:justify-end"}`}>
                          <MapPin className="h-3 w-3" aria-hidden="true" /> {item.local}
                        </p>
                      )}
                      <ul className="mt-4 space-y-2">
                        {item.pontos.map((p) => (
                          <li
                            key={p}
                            className={`flex gap-2 text-sm leading-relaxed text-mist ${
                              direita ? "" : "md:flex-row-reverse md:text-right"
                            }`}
                          >
                            <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-bright" aria-hidden="true" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
