import { cn } from '@/lib/utils';

type ContentBlockProps = {
  children: React.ReactNode;
  className?: string;
};

export default function ContentBlock({
  children,
  className,
}: ContentBlockProps) {
  return (
    <div
      className={cn(
        'bg-paper-2 border border-line rounded-lg overflow-hidden h-full w-full',
        className,
      )}
    >
      {children}
    </div>
  );
}
