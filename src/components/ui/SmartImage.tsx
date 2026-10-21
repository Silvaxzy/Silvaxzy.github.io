"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  className?: string;
  /** O que mostrar se a imagem ainda não existir na pasta public */
  fallback: React.ReactNode;
};

/** Imagem que mostra um substituto bonito caso o arquivo não exista. */
export default function SmartImage({ src, alt, className, fallback }: Props) {
  const [erro, setErro] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  // a imagem pode falhar antes do React carregar; confere ao montar
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setErro(true);
  }, []);

  if (erro) return <>{fallback}</>;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={asset(src)}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => setErro(true)}
    />
  );
}
