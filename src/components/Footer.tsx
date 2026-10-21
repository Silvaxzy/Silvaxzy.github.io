import { ArrowUp } from "lucide-react";
import { perfil } from "@/data/portfolio";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-line bg-black/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 py-10 sm:flex-row">
        <p className="text-sm text-mist">
          © {new Date().getFullYear()} {perfil.nome}. Feito com Next.js, React e Tailwind CSS.
        </p>
        <div className="flex items-center gap-3">
          <a
            href={perfil.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-line text-mist transition-colors hover:border-brand hover:text-white"
          >
            <GithubIcon />
          </a>
          <a
            href={perfil.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-line text-mist transition-colors hover:border-brand hover:text-white"
          >
            <LinkedinIcon />
          </a>
          <a
            href="#inicio"
            aria-label="Voltar ao topo"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-white transition-all hover:shadow-[0_0_24px_rgba(10,91,255,0.7)]"
          >
            <ArrowUp className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
