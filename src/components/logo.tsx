import Link from 'next/link';
import Icon from './icon';

type LogoProps = {
  size?: 'sm' | 'md';
  withSuffix?: boolean;
};

export default function Logo({ size = 'md', withSuffix = true }: LogoProps) {
  return (
    <Link href="/" className="brand inline-flex items-baseline gap-2 group">
      <span className="brand-mark">
        <Icon name="paw" size={size === 'sm' ? 12 : 14} />
      </span>
      <span
        className={
          size === 'sm'
            ? 'font-serif text-[18px] tracking-[-0.01em] text-ink'
            : 'font-serif text-[22px] tracking-[-0.01em] text-ink'
        }
      >
        Kennelry
      </span>
      {withSuffix && (
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3 ml-auto self-center">
          est. &rsquo;24
        </span>
      )}
    </Link>
  );
}
