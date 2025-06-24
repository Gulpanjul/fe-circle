// import { ModeToggle } from '@/components/ui/mode-toggle';
import LoginForm from '../features/auth/components/login-form';
import { ThemeToggleButton } from '@/components/ui/mode-toggle-button';

export default function LoginPage() {
    return (
        <>
            <div className="fixed top-4 right-4 z-50">
                <ThemeToggleButton />
            </div>

            <div className="flex justify-center mt-32">
                <div className="w-[412px]">
                    <LoginForm />
                </div>
            </div>
        </>
    );
}
