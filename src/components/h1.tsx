import { cn } from '@/lib/utils';

type DisplayProps = {
  children: React.ReactNode;
  className?: string;
  size?: 'display-1' | 'display-2' | 'h1' | 'h2';
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div';
};

const sizeClasses = {
  'display-1': 'text-[clamp(48px,6vw,72px)] leading-[0.95]',
  'display-2': 'text-[clamp(36px,4.5vw,56px)] leading-[1]',
  h1: 'text-[clamp(28px,3.2vw,36px)] leading-[1.05]',
  h2: 'text-[24px] leading-[1.1]',
};

export default function H1({
  children,
  className,
  size = 'h1',
  as: Tag = 'h1',
}: DisplayProps) {
  return (
    <Tag
      className={cn(
        'font-serif font-normal tracking-[-0.015em] text-ink',
        sizeClasses[size],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
