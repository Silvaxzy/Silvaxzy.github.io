import { useRef, useState, type FormEvent } from "react";
import { perfil } from "../data/portfolio";
import { useMovimento } from "../lib/movimento";
import { revelarSecao } from "../lib/revelar";
import { useGsap } from "../lib/useGsap";
import { Email, GitHub, LinkedIn, Mensagem, SetaDiagonal } from "./Icones";
import TituloSecao from "./TituloSecao";
import estilos from "./Contato.module.css";

// Para receber as mensagens direto no e-mail, crie um formulário grátis em formspree.io
// e coloque o ID na variável VITE_FORMSPREE_ID. Sem ID, o formulário abre o seu e-mail.
const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID ?? "";

const canais = [
  { Icone: Email, nome: "E-mail", valor: perfil.email, href: `mailto:${perfil.email}` },
  { Icone: Mensagem, nome: "WhatsApp", valor: perfil.whatsappLabel, href: `https://wa.me/${perfil.whatsapp}` },
  { Icone: LinkedIn, nome: "LinkedIn", valor: "bruno-silva-2846192aa", href: perfil.linkedin },
  { Icone: GitHub, nome: "GitHub", valor: "Silvaxzy", href: perfil.github },
];

type Estado = "parado" | "enviando" | "enviado" | "erro";

export default function Contato() {
  const raiz = useRef<HTMLElement>(null);
  const { reduzido } = useMovimento();
  const [estado, setEstado] = useState<Estado>("parado");

  useGsap(raiz, () => revelarSecao(raiz.current!, reduzido), [reduzido]);

  async function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const dados = new FormData(form);
    const nome = String(dados.get("nome") ?? "").trim();
    const email = String(dados.get("email") ?? "").trim();
    const mensagem = String(dados.get("mensagem") ?? "").trim();

    if (!FORMSPREE_ID) {
      const assunto = encodeURIComponent(`Contato pelo portfólio: ${nome}`);
      const corpo = encodeURIComponent(`${mensagem}\n\n${nome} (${email})`);
      window.location.href = `mailto:${perfil.email}?subject=${assunto}&body=${corpo}`;
      return;
    }

    setEstado("enviando");
    try {
      const resposta = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: dados,
      });
      if (!resposta.ok) throw new Error("falha");
      form.reset();
      setEstado("enviado");
    } catch {
      setEstado("erro");
    }
  }

  return (
    <section ref={raiz} id="contato" className={estilos.contato} aria-labelledby="titulo-contato">
      <div className="container">
        <TituloSecao
          id="titulo-contato"
          numero="06"
          titulo="Vamos construir algo juntos?"
          subtitulo="Estou aberto a oportunidades de estágio e projetos. Respondo rápido."
        />

        <div className={estilos.grade}>
          <ul className={estilos.canais}>
            {canais.map(({ Icone, nome, valor, href }) => (
              <li key={nome} data-revelar>
                <a href={href} target={href.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer" className={estilos.canal}>
                  <Icone className={estilos.iconeCanal} />
                  <span className={estilos.canalNome}>{nome}</span>
                  <span className={estilos.canalValor}>{valor}</span>
                  <SetaDiagonal className={estilos.seta} />
                </a>
              </li>
            ))}
          </ul>

          <form className={estilos.form} onSubmit={enviar} data-revelar>
            <div className={estilos.campos}>
              <label>
                <span>Nome</span>
                <input name="nome" type="text" required autoComplete="name" maxLength={80} />
              </label>
              <label>
                <span>E-mail</span>
                <input name="email" type="email" required autoComplete="email" maxLength={120} />
              </label>
            </div>
            <label>
              <span>Mensagem</span>
              <textarea name="mensagem" rows={5} required maxLength={2000} />
            </label>
            <button type="submit" className={estilos.enviar} disabled={estado === "enviando"}>
              {estado === "enviando" ? "Enviando..." : FORMSPREE_ID ? "Enviar mensagem" : "Escrever e-mail"}
            </button>
            <p className={estilos.retorno} role="status">
              {estado === "enviado" && "Mensagem enviada! Respondo em breve."}
              {estado === "erro" && `Não foi possível enviar agora. Escreva direto para ${perfil.email}.`}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
