import Palavras from "./Palavras";
import estilos from "./TituloSecao.module.css";

type Props = { id: string; titulo: string; subtitulo?: string; numero: string; alinhamento?: "esquerda" | "centro" };

/** Título de seção: o número indica a ordem do capítulo na página. */
export default function TituloSecao({ id, titulo, subtitulo, numero, alinhamento = "esquerda" }: Props) {
  return (
    <header className={`${estilos.cabecalho} ${alinhamento === "centro" ? estilos.centro : ""}`} data-cabecalho>
      <span className={estilos.numero} data-revelar aria-hidden="true">
        {numero}
      </span>
      <h2 id={id} className={estilos.titulo}>
        <Palavras texto={titulo} />
      </h2>
      {subtitulo && (
        <p className={estilos.subtitulo} data-revelar>
          {subtitulo}
        </p>
      )}
    </header>
  );
}
