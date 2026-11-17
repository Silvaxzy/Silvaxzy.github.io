import { useEffect, useState } from "react";
import Contato from "./components/Contato";
import Experiencia from "./components/Experiencia";
import Formacao from "./components/Formacao";
import Habilidades from "./components/Habilidades";
import Hero from "./components/Hero";
import Nav from "./components/Nav";
import Preloader from "./components/Preloader";
import Projetos from "./components/Projetos";
import Rodape from "./components/Rodape";
import Sobre from "./components/Sobre";
import { useMovimento } from "./lib/movimento";
import { iniciarRolagem, pausarRolagem, ScrollTrigger } from "./lib/rolagem";

export default function App() {
  const { reduzido } = useMovimento();
  const [pronto, setPronto] = useState(false);

  // rolagem suave só quando as animações estão ligadas
  useEffect(() => {
    const parar = iniciarRolagem(!reduzido);
    return parar;
  }, [reduzido]);

  // durante a abertura a página fica parada; libera ao fim da entrada do hero
  useEffect(() => {
    if (!pronto) {
      pausarRolagem(true);
      return;
    }
    const liberar = setTimeout(() => {
      pausarRolagem(false);
      ScrollTrigger.refresh();
    }, reduzido ? 0 : 1500);
    return () => clearTimeout(liberar);
  }, [pronto, reduzido]);

  // recalcula as posições depois que imagens e fontes terminam de carregar
  useEffect(() => {
    const atualizar = () => ScrollTrigger.refresh();
    window.addEventListener("load", atualizar);
    return () => window.removeEventListener("load", atualizar);
  }, []);

  return (
    <>
      <a className="pular" href="#sobre">
        Pular para o conteúdo
      </a>
      {!pronto && <Preloader aoConcluir={() => setPronto(true)} />}
      <Nav />
      <main id="conteudo">
        <Hero pronto={pronto} />
        <Sobre />
        <Habilidades />
        <Experiencia />
        <Projetos />
        <Formacao />
        <Contato />
      </main>
      <Rodape />
    </>
  );
}
