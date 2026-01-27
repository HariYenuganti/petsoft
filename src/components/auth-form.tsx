import { logIn } from '@/actions/actions';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

type AuthFormProps = {
  type: 'logIn' | 'signUp';
};

export default function AuthForm({ type }: AuthFormProps) {
  return (
    <form action={logIn}>
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input
          className="border-zinc-400"
          name="email"
          type="email"
          id="email"
        />
      </div>
      <div className="mb-4 mt-2 space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input
          className="border-zinc-400"
          name="password"
          type="password"
          id="password"
        />
      </div>
      <Button type="submit">{type === 'logIn' ? 'Log In' : 'Sign Up'}</Button>
    </form>
  );
}
