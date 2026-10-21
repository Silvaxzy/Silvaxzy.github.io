"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/utils";

type Props = { etiqueta: string; titulo: string; subtitulo?: string };

export default function SectionHeading({ etiqueta, titulo, subtitulo }: Props) {
  return (
    <motion.div
      variants={stagger(0.12)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
      className="mx-auto mb-14 max-w-2xl text-center"
    >
      <motion.span
        variants={fadeUp}
        className="inline-flex items-center gap-2 rounded-full border border-line bg-brand/10 px-4 py-1.5 font-display text-xs font-medium uppercase tracking-[0.2em] text-brand-bright"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-electric shadow-[0_0_8px_#00b3ff]" />
        {etiqueta}
      </motion.span>
      <motion.h2
        variants={fadeUp}
        className="mt-5 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl"
      >
        {titulo}
      </motion.h2>
      {subtitulo && (
        <motion.p variants={fadeUp} className="mt-4 text-base leading-relaxed text-mist sm:text-lg">
          {subtitulo}
        </motion.p>
      )}
    </motion.div>
  );
}
