import { ModeToggle } from '@/components/ui/mode-toggle';
import RegisterForm from '../features/auth/components/register-form';

export default function RegisterPage() {
  return (
    <>
      <div className="fixed top-4 right-4 z-50">
        <ModeToggle />
      </div>
      <div className="flex justify-center mt-32">
        <div className="w-[412px]">
          <RegisterForm />
        </div>
      </div>
    </>
  );
}
