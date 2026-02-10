'use client';
import { logIn, signUp } from '@/actions/actions';
import { Input } from './ui/input';
import { Label } from './ui/label';
import AuthFormBtn from './auth-form-btn';
import { useFormState } from 'react-dom';

type AuthFormProps = {
  type: 'logIn' | 'signUp';
};

export default function AuthForm({ type }: AuthFormProps) {
  const [signUpError, signUpAction] = useFormState(signUp, undefined);
  const [logInError, logInAction] = useFormState(logIn, undefined);

  return (
    <form action={type === 'logIn' ? logInAction : signUpAction}>
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input
          className="border-zinc-400"
          name="email"
          type="email"
          id="email"
          required
        />
      </div>
      <div className="mb-4 mt-2 space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input
          className="border-zinc-400"
          name="password"
          type="password"
          id="password"
          required
        />
      </div>
      <AuthFormBtn type={type} />
      {signUpError && (
        <p className="text-red-500 text-sm mt-2">{signUpError.message}</p>
      )}
      {logInError && (
        <p className="text-red-500 text-sm mt-2">{logInError.message}</p>
      )}
    </form>
  );
}
