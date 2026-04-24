import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const inputVariants = cva(
  'flex w-full transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-ink-4 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        solid:
          'h-9 rounded-md border border-line bg-paper-2 px-3 py-1 text-[13px] text-ink focus-visible:border-ink-3',
        underline:
          'border-0 border-b border-line bg-transparent font-serif text-[17px] text-ink px-0 py-2 focus-visible:border-ink',
      },
    },
    defaultVariants: {
      variant: 'solid',
    },
  },
);

export interface InputProps
  extends Omit<React.ComponentProps<'input'>, 'size'>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input, inputVariants };
