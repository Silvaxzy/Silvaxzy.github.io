import { useEffect, useState, type MouseEvent } from "react";
import { perfil } from "../data/portfolio";
import { useMovimento } from "../lib/movimento";
import { irPara } from "../lib/rolagem";
import { Fechar, Menu, Movimento } from "./Icones";
import estilos from "./Nav.module.css";

const links = [
  { href: "#sobre", rotulo: "Sobre" },
  { href: "#habilidades", rotulo: "Habilidades" },
  { href: "#experiencia", rotulo: "Experiência" },
  { href: "#projetos", rotulo: "Projetos" },
  { href: "#formacao", rotulo: "Formação" },
  { href: "#contato", rotulo: "Contato" },
];

export default function Nav() {
  const { reduzido, alternar } = useMovimento();
  const [aberto, setAberto] = useState(false);
  const [ativo, setAtivo] = useState("");
  const [rolou, setRolou] = useState(false);

  // marca no menu a seção que está na tela
  useEffect(() => {
    const secoes = links.map((l) => document.querySelector(l.href)).filter((s): s is Element => s !== null);
    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => e.isIntersecting && setAtivo(`#${e.target.id}`));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    secoes.forEach((s) => observador.observe(s));
    const aoRolar = () => setRolou(window.scrollY > 40);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => {
      observador.disconnect();
      window.removeEventListener("scroll", aoRolar);
    };
  }, []);

  useEffect(() => {
    if (!aberto) return;
    const aoTeclar = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, [aberto]);

  const navegar = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setAberto(false);
    irPara(href);
  };

  return (
    <header className={`${estilos.nav} ${rolou ? estilos.solida : ""}`}>
      <div className={`container ${estilos.barra}`}>
        <a href="#inicio" className={estilos.marca} onClick={(e) => navegar(e, "#inicio")} aria-label={`${perfil.nome}, voltar ao início`}>
          <span className={estilos.monograma} aria-hidden="true">
            {perfil.iniciais}
          </span>
          <span className={estilos.nome}>{perfil.nome}</span>
        </a>

        <nav aria-label="Seções" className={`${estilos.links} ${aberto ? estilos.aberto : ""}`} id="menu-principal">
          <ul>
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={(e) => navegar(e, l.href)} aria-current={ativo === l.href ? "true" : undefined}>
                  {l.rotulo}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={estilos.acoes}>
          <button
            type="button"
            className={estilos.movimento}
            onClick={alternar}
            aria-pressed={!reduzido}
            title={reduzido ? "Ativar animações" : "Reduzir animações"}
          >
            <Movimento className={estilos.icone} />
            <span>{reduzido ? "Animações desligadas" : "Animações ligadas"}</span>
          </button>
          <button
            type="button"
            className={estilos.hamburguer}
            onClick={() => setAberto((a) => !a)}
            aria-expanded={aberto}
            aria-controls="menu-principal"
            aria-label={aberto ? "Fechar menu" : "Abrir menu"}
          >
            {aberto ? <Fechar className={estilos.icone} /> : <Menu className={estilos.icone} />}
          </button>
        </div>
      </div>
    </header>
  );
}
