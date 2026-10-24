import { useId } from 'react';
import type { FryerShape } from '@/lib/products';

interface FryerArtProps {
  shape: FryerShape;
  body: string;
  accent: string;
  className?: string;
  /** Temperature shown on the display. */
  temp?: string;
}

function isLight(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return 0.299 * r + 0.587 * g + 0.114 * b > 150;
}

/** Stylised product illustration, drawn in code so every colourway stays consistent. */
export default function FryerArt({ shape, body, accent, className, temp = '200°' }: FryerArtProps) {
  const uid = useId().replace(/:/g, '');
  const light = isLight(body);
  const panel = light ? '#1c1a17' : '#0d0c0b';
  const seam = light ? 'rgba(0,0,0,0.14)' : 'rgba(255,255,255,0.08)';
  const handle = light ? '#2a2723' : '#3a3631';
  const g = (k: string) => `${k}-${uid}`;

  const defs = (
    <defs>
      <linearGradient id={g('shade')} x1="0" x2="1">
        <stop offset="0" stopColor="#000" stopOpacity="0.18" />
        <stop offset="0.25" stopColor="#000" stopOpacity="0" />
        <stop offset="0.7" stopColor="#fff" stopOpacity="0.10" />
        <stop offset="1" stopColor="#000" stopOpacity="0.22" />
      </linearGradient>
      <linearGradient id={g('gloss')} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#fff" stopOpacity="0.35" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </linearGradient>
      <radialGradient id={g('glow')} cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor="#ffb347" />
        <stop offset="1" stopColor="#ff5a1f" />
      </radialGradient>
      <linearGradient id={g('food')} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ffd27a" />
        <stop offset="1" stopColor="#d9822b" />
      </linearGradient>
      <radialGradient id={g('shadow')} cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor="#000" stopOpacity="0.28" />
        <stop offset="1" stopColor="#000" stopOpacity="0" />
      </radialGradient>
    </defs>
  );

  const display = (cx: number, cy: number, r = 26) => (
    <g>
      <circle cx={cx} cy={cy} r={r + 6} fill={panel} />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={accent === '#26231f' ? '#ff5a1f' : accent} strokeWidth="2.5" strokeDasharray="120 200" strokeLinecap="round" transform={`rotate(-200 ${cx} ${cy})`} />
      <text x={cx} y={cy + 6} textAnchor="middle" fontFamily="ui-sans-serif, system-ui" fontWeight="600" fontSize="17" fill="#fff">{temp}</text>
    </g>
  );

  if (shape === 'oven') {
    return (
      <svg viewBox="0 0 400 420" className={className} role="img" aria-label="Фурна-фритюрник">
        {defs}
        <ellipse cx="200" cy="392" rx="170" ry="16" fill={`url(#${g('shadow')})`} />
        <rect x="40" y="60" width="320" height="320" rx="34" fill={body} />
        <rect x="40" y="60" width="320" height="320" rx="34" fill={`url(#${g('shade')})`} />
        <rect x="58" y="78" width="284" height="56" rx="16" fill={panel} />
        <text x="80" y="113" fontFamily="ui-sans-serif, system-ui" fontWeight="600" fontSize="18" fill="#fff">{temp}C</text>
        {[0, 1, 2, 3, 4].map((i) => (
          <circle key={i} cx={210 + i * 26} cy="106" r="6" fill={i === 1 ? '#ff5a1f' : '#4a4640'} />
        ))}
        <rect x="58" y="150" width="284" height="206" rx="20" fill="#120f0c" />
        <rect x="70" y="162" width="260" height="182" rx="14" fill={`url(#${g('glow')})`} opacity="0.85" />
        <rect x="70" y="162" width="260" height="182" rx="14" fill="#1c0f06" opacity="0.35" />
        {[214, 270].map((y) => (
          <line key={y} x1="76" y1={y} x2="324" y2={y} stroke="#2b1a0e" strokeWidth="3" />
        ))}
        <rect x="104" y="196" width="80" height="16" rx="8" fill={`url(#${g('food')})`} />
        <rect x="196" y="194" width="100" height="18" rx="9" fill={`url(#${g('food')})`} />
        <rect x="120" y="250" width="160" height="18" rx="9" fill={`url(#${g('food')})`} />
        <rect x="70" y="162" width="260" height="60" rx="14" fill={`url(#${g('gloss')})`} />
        <rect x="120" y="140" width="160" height="10" rx="5" fill={handle} />
      </svg>
    );
  }

  if (shape === 'dual') {
    return (
      <svg viewBox="0 0 400 420" className={className} role="img" aria-label="Фритюрник с двойна кошница">
        {defs}
        <ellipse cx="200" cy="396" rx="175" ry="16" fill={`url(#${g('shadow')})`} />
        <path d="M44 120 Q44 40 124 40 H276 Q356 40 356 120 V360 Q356 384 332 384 H68 Q44 384 44 360 Z" fill={body} />
        <path d="M44 120 Q44 40 124 40 H276 Q356 40 356 120 V360 Q356 384 332 384 H68 Q44 384 44 360 Z" fill={`url(#${g('shade')})`} />
        <rect x="88" y="66" width="224" height="80" rx="24" fill={panel} />
        {display(144, 106, 22)}
        {display(256, 106, 22)}
        <circle cx="200" cy="106" r="5" fill="#ff5a1f" />
        {[64, 208].map((x) => (
          <g key={x}>
            <rect x={x} y="172" width="128" height="192" rx="18" fill={body} stroke={seam} strokeWidth="2" />
            <rect x={x} y="172" width="128" height="192" rx="18" fill={`url(#${g('gloss')})`} opacity="0.5" />
            <rect x={x + 24} y="236" width="80" height="20" rx="10" fill={handle} />
          </g>
        ))}
      </svg>
    );
  }

  const windowed = shape === 'window';
  return (
    <svg viewBox="0 0 400 420" className={className} role="img" aria-label="Фритюрник с горещ въздух">
      {defs}
      <ellipse cx="200" cy="396" rx="150" ry="16" fill={`url(#${g('shadow')})`} />
      <path d="M70 150 Q70 36 200 36 Q330 36 330 150 V358 Q330 384 304 384 H96 Q70 384 70 358 Z" fill={body} />
      <path d="M70 150 Q70 36 200 36 Q330 36 330 150 V358 Q330 384 304 384 H96 Q70 384 70 358 Z" fill={`url(#${g('shade')})`} />
      <path d="M118 96 Q150 60 200 58 Q250 60 282 96 Q290 140 270 150 H130 Q110 140 118 96 Z" fill={panel} />
      {display(200, 106)}
      <path d="M88 196 H312 V352 Q312 368 296 368 H104 Q88 368 88 352 Z" fill={body} stroke={seam} strokeWidth="2" />
      <path d="M88 196 H312 V230 H88 Z" fill={`url(#${g('gloss')})`} opacity="0.5" />
      {windowed && (
        <g>
          <rect x="124" y="214" width="152" height="86" rx="18" fill="#140d07" />
          <rect x="132" y="222" width="136" height="70" rx="12" fill={`url(#${g('glow')})`} opacity="0.75" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect key={i} x={146 + i * 19} y={252 - (i % 2) * 8} width="10" height="34" rx="4" fill={`url(#${g('food')})`} transform={`rotate(${(i % 3) * 8 - 8} ${151 + i * 19} 270)`} />
          ))}
          <rect x="132" y="222" width="136" height="24" rx="12" fill={`url(#${g('gloss')})`} />
        </g>
      )}
      <rect x="150" y={windowed ? 318 : 268} width="100" height="22" rx="11" fill={handle} />
    </svg>
  );
}
