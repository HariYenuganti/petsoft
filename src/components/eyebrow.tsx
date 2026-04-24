import { cn } from '@/lib/utils';

type EyebrowProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <p
      className={cn(
        'font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-3',
        className,
      )}
    >
      {children}
    </p>
  );
}
