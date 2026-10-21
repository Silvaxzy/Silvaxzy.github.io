"use client";

import { motion } from "framer-motion";
import { Briefcase, Database, GitBranch, GraduationCap, LayoutTemplate, MapPin, Server } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import SmartImage from "@/components/ui/SmartImage";
import { comportamentais, experiencias, formacao, perfil } from "@/data/portfolio";
import { fadeUp, slideIn, stagger } from "@/lib/utils";

const competencias = [
  { icone: Server, titulo: "Back-end", texto: "Python, Flask e APIs REST com rotas protegidas." },
  { icone: LayoutTemplate, titulo: "Front-end", texto: "Interfaces responsivas com HTML, CSS e JavaScript." },
  { icone: Database, titulo: "Banco de dados", texto: "Modelagem e consultas SQL com SQLite." },
  { icone: GitBranch, titulo: "Versionamento", texto: "Git e GitHub com commits organizados." },
];

export default function About() {
  return (
    <section id="sobre" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          etiqueta="Sobre mim"
          titulo="Tecnologia com visão de negócio"
          subtitulo="Da operação ao código: uso o que aprendi no dia a dia das empresas para construir soluções úteis."
        />

        <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          {/* foto */}
          <motion.div
            variants={slideIn("esquerda")}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="relative mx-auto w-full max-w-sm"
          >
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-brand/50 via-transparent to-electric/40 blur-2xl" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[2rem] border border-line bg-panel p-2">
              <div className="aspect-[4/5] overflow-hidden rounded-[1.6rem] bg-gradient-to-br from-brand/30 to-night">
                <SmartImage
                  src={perfil.foto}
                  alt={`Foto de ${perfil.nome}`}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  fallback={
                    <div className="flex h-full w-full items-center justify-center font-display text-8xl font-bold text-white/90">
                      {perfil.iniciais}
                    </div>
                  }
                />
              </div>
            </div>

            <div className="glass absolute -bottom-6 -right-4 flex items-center gap-3 rounded-2xl px-4 py-3 sm:-right-8">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/20 text-brand-bright">
                <GraduationCap className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold text-white">ADS · UNICID</p>
                <p className="text-xs text-mist">Cursando</p>
              </div>
            </div>
          </motion.div>

          {/* texto */}
          <motion.div
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {perfil.bio.map((p) => (
              <motion.p key={p} variants={fadeUp} className="mb-4 text-base leading-relaxed text-mist sm:text-lg">
                {p}
              </motion.p>
            ))}

            <motion.dl variants={fadeUp} className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="glass rounded-2xl p-4">
                <dt className="flex items-center gap-2 text-xs uppercase tracking-wider text-mist">
                  <GraduationCap className="h-4 w-4 text-brand-bright" aria-hidden="true" /> Formação
                </dt>
                <dd className="mt-2 text-sm font-medium text-white">{formacao.curso}</dd>
                <dd className="text-xs text-mist">{formacao.periodo}</dd>
              </div>
              <div className="glass rounded-2xl p-4">
                <dt className="flex items-center gap-2 text-xs uppercase tracking-wider text-mist">
                  <Briefcase className="h-4 w-4 text-brand-bright" aria-hidden="true" /> Experiência
                </dt>
                <dd className="mt-2 text-sm font-medium text-white">{experiencias[0]?.cargo}</dd>
                <dd className="text-xs text-mist">
                  {experiencias[0]?.empresa} · {experiencias[0]?.periodo}
                </dd>
              </div>
              <div className="glass rounded-2xl p-4 sm:col-span-2">
                <dt className="flex items-center gap-2 text-xs uppercase tracking-wider text-mist">
                  <MapPin className="h-4 w-4 text-brand-bright" aria-hidden="true" /> Competências comportamentais
                </dt>
                <dd className="mt-3 flex flex-wrap gap-2">
                  {comportamentais.map((c) => (
                    <span key={c} className="rounded-full border border-line bg-brand/10 px-3 py-1 text-xs text-white">
                      {c}
                    </span>
                  ))}
                </dd>
              </div>
            </motion.dl>
          </motion.div>
        </div>

        {/* competências técnicas */}
        <motion.ul
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-24 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {competencias.map(({ icone: Icone, titulo, texto }) => (
            <motion.li
              key={titulo}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className="group glass rounded-2xl p-6 transition-colors hover:border-brand/60"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/15 text-brand-bright transition-all duration-500 group-hover:rotate-6 group-hover:bg-brand group-hover:text-white group-hover:shadow-[0_0_24px_rgba(10,91,255,0.7)]">
                <Icone className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold text-white">{titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mist">{texto}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
