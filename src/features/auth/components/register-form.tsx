import brandLogo from '@/assets/Logo.svg';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function RegisterForm() {
  return (
    <div className="flex flex-col gap-3">
      <img src={brandLogo} alt="Circle logo" className="w-[108px]" />
      <h2 className="text-2xl font-semibold">Create an Account to Cicle</h2>
      <div className="space-y-1">
        <Input placeholder="Full Name" />
        <p className="text-sm text-destructive">This is an error text</p>
      </div>
      <div className="space-y-1">
        <Input placeholder="Email/Username" />
        <p className="text-sm text-destructive">This is an error text</p>
      </div>
      <div className="space-y-1">
        <Input placeholder="Password" />
        <p className="text-sm text-destructive">This is an error text</p>
      </div>

      <Button className="bg-primary text-primary-foreground">Register</Button>

      <p className="text-sm">
        Already have account?{' '}
        <Link to="/login" className="text-primary underline">
          Login
        </Link>
      </p>
    </div>
  );
}
