"use client";

import { motion } from "framer-motion";
import { Database, LayoutTemplate, Server } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { habilidades, habilidadesDestaque } from "@/data/portfolio";
import { EASE, fadeUp, stagger } from "@/lib/utils";

const icones = [Server, LayoutTemplate, Database];

function Circulo({ nome, nivel }: { nome: string; nivel: number }) {
  const raio = 42;
  const circunferencia = 2 * Math.PI * raio;

  return (
    <motion.div variants={fadeUp} className="glass flex flex-col items-center rounded-2xl p-6">
      <div className="relative h-28 w-28">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" aria-hidden="true">
          <circle cx="50" cy="50" r={raio} fill="none" stroke="rgba(110,150,255,0.14)" strokeWidth="6" />
          <motion.circle
            cx="50"
            cy="50"
            r={raio}
            fill="none"
            stroke="url(#gradCirculo)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circunferencia}
            initial={{ strokeDashoffset: circunferencia }}
            whileInView={{ strokeDashoffset: circunferencia * (1 - nivel / 100) }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: EASE }}
            style={{ filter: "drop-shadow(0 0 6px rgba(10,91,255,0.8))" }}
          />
          <defs>
            <linearGradient id="gradCirculo" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#00b3ff" />
              <stop offset="100%" stopColor="#0a5bff" />
            </linearGradient>
          </defs>
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-display text-2xl font-semibold text-white">
          {nivel}%
        </span>
      </div>
      <p className="mt-4 font-medium text-white">{nome}</p>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="habilidades" className="relative py-28 sm:py-36">
      <div aria-hidden="true" className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-brand/15 blur-[130px]" />
      <div className="relative mx-auto max-w-6xl px-5">
        <SectionHeading
          etiqueta="Habilidades"
          titulo="Minha caixa de ferramentas"
          subtitulo="Tecnologias que uso nos meus projetos, com o nível em que estou hoje."
        />

        {/* indicadores circulares */}
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-2 gap-5 lg:grid-cols-4"
        >
          {habilidadesDestaque.map((h) => (
            <Circulo key={h.nome} {...h} />
          ))}
        </motion.div>

        {/* barras por categoria */}
        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-8 grid gap-5 lg:grid-cols-3"
        >
          {habilidades.map((grupo, i) => {
            const Icone = icones[i % icones.length];
            return (
              <motion.div
                key={grupo.categoria}
                variants={fadeUp}
                className="spotlight glass rounded-2xl p-7"
                onMouseMove={(e: React.MouseEvent<HTMLDivElement>) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
                  e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
                }}
              >
                <h3 className="flex items-center gap-3 font-display text-lg font-semibold text-white">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/15 text-brand-bright">
                    <Icone className="h-5 w-5" aria-hidden="true" />
                  </span>
                  {grupo.categoria}
                </h3>

                <ul className="mt-6 space-y-5">
                  {grupo.itens.map((item) => (
                    <li key={item.nome}>
                      <div className="mb-2 flex justify-between text-sm">
                        <span className="text-white">{item.nome}</span>
                        <span className="text-mist">{item.nivel}%</span>
                      </div>
                      <div
                        className="h-2 overflow-hidden rounded-full bg-white/[0.06]"
                        role="progressbar"
                        aria-label={item.nome}
                        aria-valuenow={item.nivel}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      >
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.nivel}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.3, ease: EASE, delay: 0.2 }}
                          className="h-full rounded-full bg-gradient-to-r from-brand to-electric shadow-[0_0_12px_rgba(0,179,255,0.7)]"
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
