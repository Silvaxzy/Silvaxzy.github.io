"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { certificacoes } from "@/data/portfolio";
import { fadeUp, stagger } from "@/lib/utils";

/** Só aparece quando houver certificados em src/data/portfolio.ts */
export default function Certifications() {
  if (!certificacoes.length) return null;

  return (
    <section id="certificacoes" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading etiqueta="Certificações" titulo="Aprendizado contínuo" />

        <motion.ul
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {certificacoes.map((c) => {
            const conteudo = (
              <>
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/15 text-brand-bright transition-all group-hover:bg-brand group-hover:text-white">
                  <Award className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-white">{c.nome}</h3>
                <p className="mt-1 text-sm text-mist">
                  {c.instituicao} · {c.ano}
                </p>
                {c.link && (
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-bright">
                    Ver certificado <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                )}
              </>
            );

            return (
              <motion.li key={c.nome} variants={fadeUp} whileHover={{ y: -6 }}>
                {c.link ? (
                  <a
                    href={c.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group glass block h-full rounded-2xl p-6 transition-colors hover:border-brand/60"
                  >
                    {conteudo}
                  </a>
                ) : (
                  <div className="group glass h-full rounded-2xl p-6">{conteudo}</div>
                )}
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
