/** @type {import('next').NextConfig} */

// Se publicar em um repositório que NÃO seja "silvaxzy.github.io",
// defina NEXT_PUBLIC_BASE_PATH com o nome do repositório (ex: "/portfolio").
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  output: "export", // gera um site estático na pasta "out" (para o GitHub Pages)
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
