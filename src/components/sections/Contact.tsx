"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, CircleCheck, LoaderCircle, Mail, MessageCircle, Send } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { perfil } from "@/data/portfolio";
import { fadeUp, slideIn, stagger } from "@/lib/utils";

// Opcional: crie um formulário grátis em formspree.io e coloque o ID aqui
// (ou na variável NEXT_PUBLIC_FORMSPREE_ID). Sem ID, o formulário abre o e-mail.
const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "";

const canais = [
  { icone: Mail, nome: "E-mail", valor: perfil.email, href: `mailto:${perfil.email}` },
  {
    icone: MessageCircle,
    nome: "WhatsApp",
    valor: perfil.whatsappLabel,
    href: `https://wa.me/${perfil.whatsapp}`,
  },
  { icone: LinkedinIcon, nome: "LinkedIn",valor: "bruno-silva-2846192aa", href: perfil.linkedin },
  { icone: GithubIcon, nome: "GitHub", valor: "Silvaxzy", href: perfil.github },
];

type Estado = "parado" | "enviando" | "enviado" | "erro";

export default function Contact() {
  const [estado, setEstado] = useState<Estado>("parado");

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const dados = new FormData(form);
    const nome = String(dados.get("nome") ?? "");
    const email = String(dados.get("email") ?? "");
    const mensagem = String(dados.get("mensagem") ?? "");

    if (!FORMSPREE_ID) {
      // sem servidor: abre o app de e-mail já preenchido
      const assunto = encodeURIComponent(`Contato pelo portfólio — ${nome}`);
      const corpo = encodeURIComponent(`${mensagem}\n\n${nome}\n${email}`);
      window.location.href = `mailto:${perfil.email}?subject=${assunto}&body=${corpo}`;
      setEstado("enviado");
      form.reset();
      return;
    }

    setEstado("enviando");
    try {
      const resposta = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, mensagem }),
      });
      if (!resposta.ok) throw new Error("Falha no envio");
      setEstado("enviado");
      form.reset();
    } catch {
      setEstado("erro");
    }
  }

  const campo =
    "w-full rounded-xl border border-line bg-black/50 px-4 py-3 text-sm text-white placeholder:text-mist/60 transition-all focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/20";

  return (
    <section id="contato" className="relative py-28 sm:py-36">
      <div aria-hidden="true" className="absolute bottom-0 left-1/2 h-96 w-[700px] -translate-x-1/2 rounded-full bg-brand/15 blur-[140px]" />
      <div className="relative mx-auto max-w-6xl px-5">
        <SectionHeading
          etiqueta="Contato"
          titulo="Vamos construir algo juntos?"
          subtitulo="Estou aberto a oportunidades de estágio e projetos. Respondo rápido."
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          {/* canais */}
          <motion.ul
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-4"
          >
            {canais.map(({ icone: Icone, nome, valor, href }) => (
              <motion.li key={nome} variants={fadeUp}>
                <a
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="group glass flex items-center gap-4 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand/60 hover:shadow-[0_0_40px_-12px_rgba(10,91,255,0.8)]"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/15 text-brand-bright transition-all group-hover:bg-brand group-hover:text-white">
                    <Icone className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs uppercase tracking-wider text-mist">{nome}</span>
                    <span className="block truncate font-medium text-white">{valor}</span>
                  </span>
                  <ArrowUpRight
                    className="h-5 w-5 text-mist transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-bright"
                    aria-hidden="true"
                  />
                </a>
              </motion.li>
            ))}
          </motion.ul>

          {/* formulário */}
          <motion.form
            variants={slideIn("direita")}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            onSubmit={enviar}
            className="glass rounded-3xl p-7 sm:p-9"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="nome" className="mb-2 block text-sm font-medium text-white">
                  Nome
                </label>
                <input id="nome" name="nome" required autoComplete="name" placeholder="Seu nome" className={campo} />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-white">
                  E-mail
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="voce@empresa.com"
                  className={campo}
                />
              </div>
            </div>
            <div className="mt-5">
              <label htmlFor="mensagem" className="mb-2 block text-sm font-medium text-white">
                Mensagem
              </label>
              <textarea
                id="mensagem"
                name="mensagem"
                required
                rows={6}
                placeholder="Conte um pouco sobre a oportunidade ou o projeto..."
                className={`${campo} resize-none`}
              />
            </div>

            <button
              type="submit"
              disabled={estado === "enviando"}
              className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-7 py-3.5 font-medium text-white transition-all hover:shadow-[0_0_40px_rgba(10,91,255,0.75)] disabled:opacity-60 sm:w-auto"
            >
              {estado === "enviando" ? (
                <>
                  <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> Enviando...
                </>
              ) : (
                <>
                  Enviar mensagem
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </>
              )}
            </button>

            <p role="status" aria-live="polite" className="mt-4 min-h-[1.25rem] text-sm">
              {estado === "enviado" && (
                <span className="inline-flex items-center gap-2 text-electric">
                  <CircleCheck className="h-4 w-4" aria-hidden="true" /> Obrigado! Sua mensagem foi encaminhada.
                </span>
              )}
              {estado === "erro" && (
                <span className="text-red-400">Não foi possível enviar. Tente pelo e-mail ou WhatsApp.</span>
              )}
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
