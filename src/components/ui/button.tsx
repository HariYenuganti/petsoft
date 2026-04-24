import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-ink text-paper hover:bg-ink-2 active:bg-accent-ink',
        primary:
          'bg-ink text-paper hover:bg-ink-2 active:bg-accent-ink',
        secondary:
          'border border-line text-ink hover:border-ink hover:bg-paper-2 active:bg-ink active:text-paper',
        outline:
          'border border-line text-ink hover:border-ink hover:bg-paper-2 active:bg-ink active:text-paper active:border-ink',
        ghost:
          'text-ink-2 hover:bg-paper-2 hover:text-ink active:bg-paper-3',
        accent:
          'bg-accent text-[#FBF5EC] hover:bg-accent-ink active:bg-ink',
        destructive:
          'bg-destructive text-destructive-foreground hover:opacity-90 active:opacity-80',
        link: 'text-ink underline-offset-4 hover:underline active:text-accent-ink',
      },
      size: {
        default: 'h-10 px-[18px] text-[13px] rounded-md [&_svg]:size-4',
        sm: 'h-8 px-3 text-xs rounded-md [&_svg]:size-3.5',
        lg: 'h-12 px-6 text-[14px] rounded-md [&_svg]:size-4',
        icon: 'h-9 w-9 rounded-full [&_svg]:size-4',
      },
      shape: {
        default: '',
        pill: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      shape: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, shape, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, shape, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
