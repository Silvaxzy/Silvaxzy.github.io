import { perfil } from "../data/portfolio";
import { irPara } from "../lib/rolagem";
import { GitHub, LinkedIn, SetaCima } from "./Icones";
import estilos from "./Rodape.module.css";

export default function Rodape() {
  return (
    <footer className={estilos.rodape}>
      <div className={`container ${estilos.linha}`}>
        <p>
          © {new Date().getFullYear()} {perfil.nome}. Feito com React, Vite e GSAP.
        </p>
        <div className={estilos.links}>
          <a href={perfil.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <GitHub className={estilos.icone} />
          </a>
          <a href={perfil.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <LinkedIn className={estilos.icone} />
          </a>
          <a
            href="#inicio"
            aria-label="Voltar ao topo"
            onClick={(e) => {
              e.preventDefault();
              irPara("#inicio");
            }}
          >
            <SetaCima className={estilos.icone} />
          </a>
        </div>
      </div>
      <p className={estilos.marca} aria-hidden="true">
        {perfil.nome}
      </p>
    </footer>
  );
}
