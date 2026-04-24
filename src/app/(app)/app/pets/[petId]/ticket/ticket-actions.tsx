'use client';

import { Button, type ButtonProps } from '@/components/ui/button';
import Icon from '@/components/icon';

type TicketActionsProps = {
  variant?: ButtonProps['variant'];
  size?: ButtonProps['size'];
};

export default function TicketActions({
  variant = 'default',
  size = 'sm',
}: TicketActionsProps) {
  return (
    <Button
      size={size}
      variant={variant}
      onClick={() => {
        if (typeof window !== 'undefined') window.print();
      }}
    >
      <Icon name="check" size={14} />
      Print ticket
    </Button>
  );
}
