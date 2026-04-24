'use client';
import { Button } from './ui/button';
import Icon from './icon';
import { useFormStatus } from 'react-dom';

type AuthFormBtnProps = {
  type: 'logIn' | 'signUp';
};

export default function AuthFormBtn({ type }: AuthFormBtnProps) {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending}
      size="lg"
      className="w-full justify-between"
      type="submit"
    >
      <span>
        {pending
          ? type === 'logIn'
            ? 'Opening the door…'
            : 'Beginning the ledger…'
          : type === 'logIn'
            ? 'Sign in'
            : 'Create account'}
      </span>
      <Icon name="arrow-right" size={14} />
    </Button>
  );
}
