import { Fragment } from "react";

/**
 * Divide um texto em palavras para animar uma a uma.
 * O texto completo fica disponível para leitores de tela.
 */
export default function Palavras({ texto, className }: { texto: string; className?: string }) {
  const partes = texto.split(" ");
  return (
    <span className={className}>
      <span className="sr-only">{texto}</span>
      <span aria-hidden="true">
        {partes.map((p, i) => (
          <Fragment key={`${p}-${i}`}>
            <span className="palavra">
              <span data-palavra>{p}</span>
            </span>
            {i < partes.length - 1 ? " " : null}
          </Fragment>
        ))}
      </span>
    </span>
  );
}
