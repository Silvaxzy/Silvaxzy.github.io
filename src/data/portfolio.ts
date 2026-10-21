// ============================================================
//  TODOS OS TEXTOS DO PORTFÓLIO FICAM AQUI.
//  Para atualizar o site, edite só este arquivo.
// ============================================================

export const perfil = {
  nome: "Bruno Silva",
  nomeCompleto: "Bruno Vanderley Thomé da Silva",
  iniciais: "BS",
  cargo: "Desenvolvedor Full Stack em formação",
  stack: "Python · Flask · JavaScript",
  disponibilidade: "Disponível para estágio",
  localizacao: "São Paulo, SP",
  apresentacao:
    "Construo aplicações web completas, do banco de dados à interface. Uso Python e Flask no back-end, crio APIs REST e desenvolvo interfaces rápidas e interativas com HTML, CSS e JavaScript.",
  bio: [
    "Sou estudante de Análise e Desenvolvimento de Sistemas na UNICID, com foco em desenvolvimento web Full Stack.",
    "Hoje atuo como Assistente de Operações em Trade Marketing, onde desenvolvi organização, comunicação e visão de processos. Agora levo essa bagagem para a tecnologia, criando aplicações que resolvem problemas reais.",
    "Estou em busca do meu primeiro estágio em tecnologia, para aprender com um time e evoluir rápido.",
  ],
  // Coloque sua foto em public/foto.jpg
  foto: "/foto.jpg",
  email: "brunovanderley@icloud.com",
  whatsapp: "5511960972984",
  whatsappLabel: "(11) 96097-2984",
  linkedin: "https://www.linkedin.com/in/bruno-silva-2846192aa",
  github: "https://github.com/Silvaxzy",
  siteUrl: "https://silvaxzy.github.io",
  descricaoSeo:
    "Portfólio de Bruno Silva, desenvolvedor Full Stack em formação. Projetos com Python, Flask, SQL, HTML, CSS e JavaScript.",
};

export const formacao = {
  curso: "Análise e Desenvolvimento de Sistemas",
  instituicao: "UNICID – Universidade Cidade de São Paulo",
  periodo: "ago. 2026 – 2029 (previsão)",
};

// ---------------- Projetos ----------------
export type Projeto = {
  nome: string;
  descricao: string;
  categoria: "Full Stack" | "Back-end" | "Front-end";
  tecnologias: string[];
  imagem: string;
  github?: string;
  demo?: string;
  destaque?: boolean;
};

export const projetos: Projeto[] = [
  {
    nome: "Gerenciador de Finanças",
    descricao:
      "Aplicação web para controle de finanças pessoais. O usuário cria uma conta, faz login e registra receitas e despesas, acompanhando saldo e gastos por categoria em um painel que atualiza sem recarregar a página.",
    categoria: "Full Stack",
    tecnologias: ["Python", "Flask", "SQLite", "JavaScript", "Chart.js", "HTML", "CSS"],
    imagem: "/projetos/gerenciador-financas.png",
    github: "https://github.com/Silvaxzy/gerenciador-financas",
    destaque: true,
  },
];

// ---------------- Habilidades ----------------
export type Habilidade = { nome: string; nivel: number };

export const habilidades: { categoria: string; itens: Habilidade[] }[] = [
  {
    categoria: "Back-end",
    itens: [
      { nome: "Python", nivel: 70 },
      { nome: "Flask", nivel: 60 },
      { nome: "APIs REST", nivel: 55 },
    ],
  },
  {
    categoria: "Front-end",
    itens: [
      { nome: "HTML", nivel: 75 },
      { nome: "CSS", nivel: 70 },
      { nome: "JavaScript", nivel: 55 },
    ],
  },
  {
    categoria: "Dados e ferramentas",
    itens: [
      { nome: "SQL / SQLite", nivel: 50 },
      { nome: "Git e GitHub", nivel: 55 },
      { nome: "VS Code", nivel: 75 },
    ],
  },
];

// Aparecem como indicadores circulares
export const habilidadesDestaque: Habilidade[] = [
  { nome: "Python", nivel: 70 },
  { nome: "HTML & CSS", nivel: 72 },
  { nome: "JavaScript", nivel: 55 },
  { nome: "SQL", nivel: 50 },
];

export const comportamentais = ["Comunicação", "Organização", "Trabalho em equipe", "Aprendizado rápido"];

// ---------------- Experiência ----------------
export type Experiencia = {
  cargo: string;
  empresa: string;
  periodo: string;
  local: string;
  realizacoes: string[];
};

export const experiencias: Experiencia[] = [
  {
    cargo: "Assistente de Operações",
    empresa: "EVER Trade Marketing",
    periodo: "mar. 2026 – atual",
    local: "São Paulo, SP",
    realizacoes: [
      "Suporte às rotinas operacionais e estratégicas da área de Trade Marketing.",
      "Acompanhamento de demandas e organização das atividades do setor.",
    ],
  },
  {
    cargo: "Jovem Aprendiz",
    empresa: "Work On Trade Marketing",
    periodo: "set. 2024 – mar. 2026",
    local: "São Paulo, SP · Presencial",
    realizacoes: [
      "Atividades administrativas e de apoio às rotinas do setor.",
      "Atendimento interno e comunicação com diferentes áreas.",
    ],
  },
];

// ---------------- Certificações ----------------
// Deixe a lista vazia para esconder a seção.
// Exemplo de item:
// { nome: "Python Essentials 1", instituicao: "Cisco", ano: "2026", link: "https://..." }
export type Certificacao = { nome: string; instituicao: string; ano: string; link?: string };

export const certificacoes: Certificacao[] = [];
