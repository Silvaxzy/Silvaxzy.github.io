/** Símbolo de raios circulares azuis que giram lentamente. */
export default function BrandRays({ className = "" }: { className?: string }) {
  const raios = Array.from({ length: 24 }, (_, i) => i);

  return (
    <svg viewBox="-200 -200 400 400" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="raio" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#00b3ff" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#0a5bff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="nucleo">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="35%" stopColor="#3d7dff" />
          <stop offset="100%" stopColor="#0a5bff" stopOpacity="0" />
        </radialGradient>
        <filter id="brilho" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* anel externo pontilhado (gira ao contrário) */}
      <g className="girar-reverso">
        <circle r="186" fill="none" stroke="#0a5bff" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="2 10" />
        <circle r="150" fill="none" stroke="#3d7dff" strokeOpacity="0.18" strokeWidth="1" />
      </g>

      {/* raios */}
      <g className="girar-lento" filter="url(#brilho)">
        {raios.map((i) => {
          const longo = i % 2 === 0;
          return (
            <rect
              key={i}
              x={longo ? 44 : 58}
              y={-3}
              width={longo ? 128 : 84}
              height={6}
              rx={3}
              fill="url(#raio)"
              transform={`rotate(${(360 / raios.length) * i})`}
            />
          );
        })}
      </g>

      {/* núcleo */}
      <circle r="44" fill="url(#nucleo)" className="pulsar" />
      <circle r="18" fill="#ffffff" opacity="0.9" />
    </svg>
  );
}
