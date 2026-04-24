type PetFaceProps = {
  kind?: string;
  size?: number;
  className?: string;
};

const FACES = [
  'poodle',
  'shiba',
  'berner',
  'golden',
  'whippet',
  'cat',
  'daxie',
  'aussie',
  'cavalier',
];

function hashPick(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return FACES[h % FACES.length];
}

export default function PetFace({ kind, size = 64, className }: PetFaceProps) {
  const resolved = kind && FACES.includes(kind) ? kind : kind ? hashPick(kind) : 'default';
  const base = {
    width: size,
    height: size,
    viewBox: '0 0 80 80',
    fill: 'none' as const,
    className,
  };
  const s = {
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill: 'none',
  };
  const eyes = (
    <>
      <circle cx="32" cy="42" r="1.8" fill="currentColor" />
      <circle cx="48" cy="42" r="1.8" fill="currentColor" />
    </>
  );
  const nose = <path {...s} d="M37 50h6M40 50v3" />;
  const smile = <path {...s} d="M35 55c2 3 4 4 5 4s3-1 5-4" />;

  switch (resolved) {
    case 'poodle':
      return (
        <svg {...base}>
          <path
            {...s}
            d="M20 36c-2-7 2-14 9-16 2-4 7-6 11-6s9 2 11 6c7 2 11 9 9 16 3 4 2 10-3 13-2 6-8 11-17 11s-15-5-17-11c-5-3-6-9-3-13z"
          />
          {eyes}
          {nose}
          {smile}
        </svg>
      );
    case 'shiba':
      return (
        <svg {...base}>
          <path {...s} d="M18 18l8 14M62 18l-8 14" />
          <path {...s} d="M40 18c-10 0-22 8-22 22 0 14 10 22 22 22s22-8 22-22c0-14-12-22-22-22z" />
          <path {...s} d="M20 44c-4 2-5 6-4 10M60 44c4 2 5 6 4 10" />
          {eyes}
          {nose}
          {smile}
        </svg>
      );
    case 'berner':
      return (
        <svg {...base}>
          <path {...s} d="M40 16c-14 0-26 10-26 24s10 24 26 24 26-10 26-24-12-24-26-24z" />
          <path
            {...s}
            d="M16 32c-4-2-6 4-4 10 1 4 4 6 6 6M64 32c4-2 6 4 4 10-1 4-4 6-6 6"
          />
          {eyes}
          {nose}
          {smile}
        </svg>
      );
    case 'golden':
      return (
        <svg {...base}>
          <path {...s} d="M40 16c-13 0-24 9-24 22 0 13 9 26 24 26s24-13 24-26c0-13-11-22-24-22z" />
          <path {...s} d="M20 26c-4-1-8 2-8 8 0 5 3 8 7 9M60 26c4-1 8 2 8 8 0 5-3 8-7 9" />
          {eyes}
          {nose}
          <path {...s} d="M34 55c2 4 4 5 6 5s4-1 6-5" />
          <path {...s} d="M38 60c0 2 1 3 2 3s2-1 2-3" />
        </svg>
      );
    case 'whippet':
      return (
        <svg {...base}>
          <path
            {...s}
            d="M40 16c-8 0-14 6-14 14 0 4-4 6-4 12 0 12 8 22 18 22s18-10 18-22c0-6-4-8-4-12 0-8-6-14-14-14z"
          />
          <path {...s} d="M30 22l-4-4M50 22l4-4" />
          {eyes}
          {nose}
          {smile}
        </svg>
      );
    case 'cat':
      return (
        <svg {...base}>
          <path {...s} d="M20 18l8 16M60 18l-8 16" />
          <path {...s} d="M40 22c-12 0-22 8-22 20s10 22 22 22 22-8 22-22-10-20-22-20z" />
          {eyes}
          {nose}
          {smile}
          <path {...s} d="M14 48l14 2M14 54l14-2M66 48l-14 2M66 54l-14-2" />
        </svg>
      );
    case 'daxie':
      return (
        <svg {...base}>
          <path {...s} d="M40 18c-12 0-22 8-22 20s10 22 22 22 22-8 22-22-10-20-22-20z" />
          <path {...s} d="M16 26c-4 4-4 14 0 22 4 6 8 6 10 4M64 26c4 4 4 14 0 22-4 6-8 6-10 4" />
          {eyes}
          {nose}
          {smile}
        </svg>
      );
    case 'aussie':
      return (
        <svg {...base}>
          <path {...s} d="M40 18c-13 0-23 9-23 22s9 22 23 22 23-9 23-22-10-22-23-22z" />
          <path {...s} d="M20 20l4 14c-3-1-6 0-7 3M60 20l-4 14c3-1 6 0 7 3" />
          {eyes}
          {nose}
          {smile}
          <circle cx="26" cy="50" r="2" fill="currentColor" opacity="0.3" />
          <circle cx="54" cy="52" r="2.5" fill="currentColor" opacity="0.3" />
        </svg>
      );
    case 'cavalier':
      return (
        <svg {...base}>
          <path {...s} d="M40 20c-10 0-20 7-20 20 0 13 8 22 20 22s20-9 20-22c0-13-10-20-20-20z" />
          <path {...s} d="M18 28c-4 4-6 14-2 22 3 6 8 6 10 4M62 28c4 4 6 14 2 22-3 6-8 6-10 4" />
          {eyes}
          {nose}
          {smile}
        </svg>
      );
    default:
      return (
        <svg {...base}>
          <path {...s} d="M40 18c-12 0-22 8-22 20s10 22 22 22 22-8 22-22-10-20-22-20z" />
          <path {...s} d="M22 24c-2 2-4 6-2 10M58 24c2 2 4 6 2 10" />
          {eyes}
          {nose}
          {smile}
        </svg>
      );
  }
}
