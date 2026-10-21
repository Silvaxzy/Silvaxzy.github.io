import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { perfil } from "@/data/portfolio";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk", display: "swap" });

const titulo = `${perfil.nome} | ${perfil.cargo}`;

export const metadata: Metadata = {
  metadataBase: new URL(perfil.siteUrl),
  title: titulo,
  description: perfil.descricaoSeo,
  keywords: [
    "Bruno Silva",
    "desenvolvedor full stack",
    "estágio em tecnologia",
    "Python",
    "Flask",
    "JavaScript",
    "portfólio",
    "São Paulo",
  ],
  authors: [{ name: perfil.nomeCompleto, url: perfil.siteUrl }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: perfil.siteUrl,
    siteName: perfil.nome,
    title: titulo,
    description: perfil.descricaoSeo,
  },
  twitter: { card: "summary_large_image", title: titulo, description: perfil.descricaoSeo },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

// Dados estruturados para o Google entender quem é o dono do site
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: perfil.nomeCompleto,
  alternateName: perfil.nome,
  jobTitle: perfil.cargo,
  url: perfil.siteUrl,
  email: `mailto:${perfil.email}`,
  address: { "@type": "PostalAddress", addressLocality: "São Paulo", addressCountry: "BR" },
  sameAs: [perfil.linkedin, perfil.github],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${grotesk.variable}`}>
      <body>
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-white"
        >
          Pular para o conteúdo
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
