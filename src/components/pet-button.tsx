'use client';
import { Button } from './ui/button';
import Icon from './icon';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import PetForm from './pet-form';
import { useState } from 'react';
import { flushSync } from 'react-dom';

type PetButtonProps = {
  actionType: 'add' | 'edit' | 'checkout';
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

export default function PetButton({
  actionType,
  children,
  onClick,
  disabled,
  className,
}: PetButtonProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  if (actionType === 'checkout') {
    return (
      <Button
        variant="outline"
        onClick={onClick}
        disabled={disabled}
        className={className}
      >
        {children}
      </Button>
    );
  }

  return (
    <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
      <DialogTrigger asChild>
        {actionType === 'add' ? (
          <Button size="sm" className={className}>
            <Icon name="plus" size={14} />
            New guest
          </Button>
        ) : (
          <Button variant="outline" className={className}>
            {children}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-3">
            {actionType === 'add' ? 'New guest' : 'Edit guest'}
          </p>
          <DialogTitle>
            {actionType === 'add' ? 'Welcome a new guest.' : 'Update the ledger.'}
          </DialogTitle>
        </DialogHeader>
        <PetForm
          actionType={actionType}
          onFormSubmit={() => {
            flushSync(() => {
              setIsFormOpen(false);
            });
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
