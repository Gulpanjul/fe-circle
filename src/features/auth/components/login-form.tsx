import brandLogo from '@/assets/Logo.svg';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function RegisterForm() {
  return (
    <div className="flex flex-col gap-3">
      <img src={brandLogo} alt="Circle logo" className="w-[108px]" />
      <h2 className="text-2xl font-semibold">Login to Circle</h2>
      <div className="space-y-1">
        <Input placeholder="Email/Username" />
        <p className="text-sm text-destructive">This is an error text</p>
      </div>
      <div className="space-y-1">
        <Input placeholder="Password" />
        <p className="text-sm text-destructive">This is an error text</p>
      </div>

      <div className="flex justify-end">
        <Link to="/forgot-password" className="text-sm text-primary underline">
          Forgot password?
        </Link>
      </div>

      <Button className="bg-primary text-primary-foreground w-full">
        Login
      </Button>

      <p className="text-sm">
        Don&apos;t have an account yet?{' '}
        <Link to="/register" className="text-primary underline">
          Create account
        </Link>
      </p>
    </div>
  );
}
