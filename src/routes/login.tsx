import { ModeToggle } from '@/components/ui/mode-toggle';
import LoginForm from '../features/auth/components/login-form';

export default function LoginPage() {
  return (
    <>
      <div className="fixed top-4 right-4 z-50">
        <ModeToggle />
      </div>

      <div className="flex justify-center mt-32">
        <div className="w-[412px]">
          <LoginForm />
        </div>
      </div>
    </>
  );
}
