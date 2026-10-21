"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { certificacoes, perfil } from "@/data/portfolio";

const links = [
  { id: "inicio", label: "Início" },
  { id: "sobre", label: "Sobre" },
  { id: "projetos", label: "Projetos" },
  { id: "habilidades", label: "Habilidades" },
  { id: "experiencia", label: "Experiência" },
  ...(certificacoes.length ? [{ id: "certificacoes", label: "Certificações" }] : []),
  { id: "contato", label: "Contato" },
];

export default function Navbar() {
  const [rolou, setRolou] = useState(false);
  const [ativo, setAtivo] = useState("inicio");
  const [aberto, setAberto] = useState(false);

  // fundo do menu aparece depois de rolar
  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 24);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  // destaca a seção que está na tela
  useEffect(() => {
    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => e.isIntersecting && setAtivo(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) observador.observe(el);
    });
    return () => observador.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        rolou ? "border-b border-line bg-black/60 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <nav aria-label="Navegação principal" className="mx-auto flex h-18 max-w-6xl items-center justify-between px-5 py-4">
        <a href="#inicio" className="group flex items-center gap-3" aria-label={`${perfil.nome}, voltar ao início`}>
          <span className="glow flex h-9 w-9 items-center justify-center rounded-xl bg-brand font-display text-sm font-bold text-white transition-transform duration-300 group-hover:rotate-12">
            {perfil.iniciais}
          </span>
          <span className="hidden font-display text-sm font-semibold tracking-wide text-white sm:block">
            {perfil.nome}
          </span>
        </a>

        {/* desktop */}
        <ul className="hidden items-center gap-1 rounded-full border border-line bg-black/40 p-1 backdrop-blur-md lg:flex">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                aria-current={ativo === l.id ? "page" : undefined}
                className={`relative isolate block rounded-full px-4 py-2 text-sm transition-colors ${
                  ativo === l.id ? "text-white" : "text-mist hover:text-white"
                }`}
              >
                {ativo === l.id && (
                  <motion.span
                    layoutId="nav-ativo"
                    className="absolute inset-0 -z-10 rounded-full bg-brand/25 ring-1 ring-brand/50"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contato"
          className="hidden rounded-full bg-brand px-5 py-2 text-sm font-medium text-white transition-all hover:bg-brand-bright hover:shadow-[0_0_24px_rgba(10,91,255,0.7)] lg:block"
        >
          Vamos conversar
        </a>

        {/* celular */}
        <button
          type="button"
          onClick={() => setAberto((v) => !v)}
          aria-expanded={aberto}
          aria-controls="menu-mobile"
          aria-label={aberto ? "Fechar menu" : "Abrir menu"}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-line text-white lg:hidden"
        >
          {aberto ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {aberto && (
          <motion.ul
            id="menu-mobile"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="glass mx-5 mb-4 flex flex-col gap-1 rounded-2xl p-3 lg:hidden"
          >
            {links.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={() => setAberto(false)}
                  className={`block rounded-xl px-4 py-3 text-sm ${
                    ativo === l.id ? "bg-brand/20 text-white" : "text-mist"
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
