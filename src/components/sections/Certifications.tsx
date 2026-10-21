"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Award, Maximize2, X } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import SmartImage from "@/components/ui/SmartImage";
import { certificacoes, type Certificacao } from "@/data/portfolio";
import { asset, fadeUp, stagger } from "@/lib/utils";

/** Só aparece quando houver certificados em src/data/portfolio.ts */
export default function Certifications() {
  const [aberto, setAberto] = useState<Certificacao | null>(null);

  // fecha a imagem ampliada com a tecla Esc
  useEffect(() => {
    if (!aberto) return;
    const aoTeclar = (e: KeyboardEvent) => e.key === "Escape" && setAberto(null);
    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, [aberto]);

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
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {certificacoes.map((c) => (
            <motion.li key={c.nome} variants={fadeUp} whileHover={{ y: -6 }}>
              <button
                type="button"
                onClick={() => c.imagem && setAberto(c)}
                aria-label={`Ampliar certificado: ${c.nome}`}
                className="group glass block h-full w-full overflow-hidden rounded-2xl text-left transition-colors hover:border-brand/60"
              >
                {/* imagem do certificado */}
                <div className="relative aspect-[1.414/1] overflow-hidden border-b border-line bg-panel">
                  {c.imagem ? (
                    <SmartImage
                      src={c.imagem}
                      alt={`Certificado ${c.nome}`}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      fallback={
                        <div className="flex h-full items-center justify-center text-brand-bright">
                          <Award className="h-12 w-12" aria-hidden="true" />
                        </div>
                      }
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-brand-bright">
                      <Award className="h-12 w-12" aria-hidden="true" />
                    </div>
                  )}
                  <span className="absolute inset-0 flex items-center justify-center bg-black/55 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-medium text-white shadow-[0_0_24px_rgba(10,91,255,0.7)]">
                      <Maximize2 className="h-4 w-4" aria-hidden="true" /> Ver certificado
                    </span>
                  </span>
                </div>

                {/* texto */}
                <div className="p-6">
                  <h3 className="font-display text-lg font-semibold leading-snug text-white">{c.nome}</h3>
                  <p className="mt-2 text-sm text-mist">
                    {c.instituicao} · {c.ano}
                  </p>
                </div>
              </button>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      {/* certificado ampliado */}
      <AnimatePresence>
        {aberto?.imagem && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={aberto.nome}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setAberto(null)}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              className="relative w-full max-w-4xl"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset(aberto.imagem)}
                alt={`Certificado ${aberto.nome}`}
                className="w-full rounded-2xl border border-line shadow-[0_0_60px_-10px_rgba(10,91,255,0.7)]"
              />
              <button
                type="button"
                onClick={() => setAberto(null)}
                aria-label="Fechar"
                className="absolute -top-4 -right-4 flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white shadow-lg sm:-top-5 sm:-right-5"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}