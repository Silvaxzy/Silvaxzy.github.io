import { certificacoes, perfil, projetos } from "../data/portfolio";

/**
 * Carrega fontes e imagens principais e informa o progresso real (0 a 1).
 * Nunca trava: se algo falhar ou demorar, o site abre do mesmo jeito.
 */
export function carregarAssets(aoProgredir: (p: number) => void): Promise<void> {
  const imagens = [perfil.foto, ...projetos.map((p) => p.imagem), ...certificacoes.flatMap((c) => (c.imagem ? [c.imagem] : []))];
  const tarefas: Promise<unknown>[] = [
    document.fonts ? document.fonts.ready : Promise.resolve(),
    ...imagens.map(
      (src) =>
        new Promise<void>((resolver) => {
          const img = new Image();
          img.onload = img.onerror = () => resolver();
          img.src = src;
        }),
    ),
  ];
  let prontas = 0;
  tarefas.forEach((t) =>
    t.finally(() => {
      prontas += 1;
      aoProgredir(prontas / tarefas.length);
    }),
  );
  const limite = new Promise<void>((resolver) => setTimeout(resolver, 4000));
  return Promise.race([Promise.allSettled(tarefas).then(() => undefined), limite]);
}
