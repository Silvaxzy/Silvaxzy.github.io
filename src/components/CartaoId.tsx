import { useState } from "react";
import { perfil } from "../data/portfolio";
import { GitHub, Girar, LinkedIn, Local } from "./Icones";
import estilos from "./CartaoId.module.css";

/**
 * O "crachá" do Bruno: o objeto principal do hero.
 * Camadas separadas: a de fora é movida pela rolagem, a do meio pelo mouse e a de dentro vira (frente/verso).
 */
export default function CartaoId() {
  const [virado, setVirado] = useState(false);
  const [semFoto, setSemFoto] = useState(false);

  return (
    <div className={estilos.area}>
      <div className={estilos.rolagem} data-cartao>
        <div className={estilos.mouse} data-cartao-mouse>
          <div className={`${estilos.virar} ${virado ? estilos.virado : ""}`}>
            {/* frente */}
            <div className={`${estilos.face} ${estilos.frente}`} aria-hidden={virado}>
              <span className={estilos.aro} aria-hidden="true" />
              <div className={estilos.topo}>
                <span className={estilos.chip} aria-hidden="true" />
                <span className={estilos.mono}>{perfil.iniciais}</span>
              </div>
              <div className={estilos.foto}>
                {semFoto ? (
                  <span className={estilos.iniciais}>{perfil.iniciais}</span>
                ) : (
                  <img src={perfil.foto} alt={`Foto de ${perfil.nome}`} width={320} height={320} onError={() => setSemFoto(true)} />
                )}
              </div>
              <div className={estilos.dados}>
                <strong className={estilos.nome}>{perfil.nome}</strong>
                <span className={estilos.cargo}>{perfil.cargo}</span>
              </div>
              <div className={estilos.rodape}>
                <span className={estilos.local}>
                  <Local className={estilos.iconeLocal} />
                  {perfil.localizacao}
                </span>
                <span className={estilos.status}>
                  <span className={estilos.ponto} aria-hidden="true" />
                  {perfil.disponibilidade}
                </span>
              </div>
            </div>

            {/* verso */}
            <div className={`${estilos.face} ${estilos.verso}`} aria-hidden={!virado}>
              <span className={estilos.aro} aria-hidden="true" />
              <span className={estilos.faixa} aria-hidden="true" />
              <p className={estilos.versoTitulo}>Stack principal</p>
              <p className={estilos.stack}>{perfil.stack}</p>
              <ul className={estilos.versoLinks}>
                <li>
                  <a href={perfil.github} target="_blank" rel="noopener noreferrer" tabIndex={virado ? 0 : -1}>
                    <GitHub className={estilos.iconeLink} /> github.com/Silvaxzy
                  </a>
                </li>
                <li>
                  <a href={perfil.linkedin} target="_blank" rel="noopener noreferrer" tabIndex={virado ? 0 : -1}>
                    <LinkedIn className={estilos.iconeLink} /> LinkedIn
                  </a>
                </li>
              </ul>
              <span className={estilos.site}>silvaxzy.github.io</span>
            </div>
          </div>
        </div>
      </div>
      <button type="button" className={estilos.botaoVirar} onClick={() => setVirado((v) => !v)} aria-pressed={virado}>
        <Girar className={estilos.iconeVirar} />
        {virado ? "Ver a frente" : "Virar o cartão"}
      </button>
    </div>
  );
}
