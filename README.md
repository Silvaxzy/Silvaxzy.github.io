# Portfólio — Bruno Silva

Portfólio pessoal de **Bruno Silva**, desenvolvedor Full Stack em formação.

🔗 **https://silvaxzy.github.io**

## ✨ Destaques

- Abertura com contador do carregamento real das fontes e imagens
- Hero fixado na rolagem: o crachá vira de frente e o próximo capítulo sobe por cima dele
- Crachá 3D com luz percorrendo a borda, inclinação pelo mouse e verso com a stack
- Projetos empilhados, linha do tempo que se desenha e certificados que se abrem em leque
- Certificados em tela cheia (diálogo nativo, fecha com Esc)
- Botão para ligar e desligar as animações, respeitando a preferência do sistema
- Responsivo, navegável por teclado e com textos para leitores de tela

## 🛠️ Tecnologias

| Parte | Tecnologias |
|---|---|
| Base | React 19, TypeScript (strict), Vite |
| Estilos | CSS Modules + variáveis CSS globais |
| Animações | GSAP + ScrollTrigger |
| Rolagem suave | Lenis (sincronizado com o ticker do GSAP) |
| Publicação | GitHub Pages via GitHub Actions |

## 🏗️ Organização

```
src/data/portfolio.ts   → TODOS os textos do site (edite só aqui)
src/lib/rolagem.ts      → Lenis + GSAP num relógio só, navegação por âncoras
src/lib/movimento.tsx   → preferência de animações (botão da navegação)
src/lib/useGsap.ts      → animações com limpeza automática por componente
src/components/         → uma pasta de estilo (.module.css) para cada seção
public/                 → foto, imagens dos projetos e certificados
```

## 🚀 Como rodar

Precisa do Node.js 20.19 ou mais novo.

```bash
npm install
npm run dev        # abre em http://localhost:5173
npm run build      # gera a versão final na pasta dist
npm run typecheck  # confere os tipos do TypeScript
```

A cada `git push` na branch `main`, o GitHub Actions publica o site automaticamente.

### Formulário de contato (opcional)

Sem configuração, o formulário abre o e-mail do visitante. Para receber as mensagens direto, crie um formulário grátis em [formspree.io](https://formspree.io) e salve o ID no GitHub em **Settings → Secrets and variables → Actions → Variables** com o nome `FORMSPREE_ID`.
