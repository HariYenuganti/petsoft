'use client';
import { logIn, signUp } from '@/actions/actions';
import { Input } from './ui/input';
import { Label } from './ui/label';
import AuthFormBtn from './auth-form-btn';
import { useActionState } from 'react';

type AuthFormProps = {
  type: 'logIn' | 'signUp';
};

export default function AuthForm({ type }: AuthFormProps) {
  const [signUpError, signUpAction] = useActionState(signUp, undefined);
  const [logInError, logInAction] = useActionState(logIn, undefined);

  const error = type === 'logIn' ? logInError : signUpError;

  return (
    <form
      action={type === 'logIn' ? logInAction : signUpAction}
      className="flex flex-col gap-6"
    >
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          variant="underline"
          name="email"
          type="email"
          id="email"
          required
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input
          variant="underline"
          name="password"
          type="password"
          id="password"
          required
        />
        <p className="field-hint">At least 8 characters.</p>
      </div>
      <AuthFormBtn type={type} />
      {error && <p className="auth-error">{error.message}</p>}
    </form>
  );
}
