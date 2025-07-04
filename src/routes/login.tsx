// import { ModeToggle } from '@/components/ui/mode-toggle';
import LoginForm from '../features/auth/components/loginForm';

export default function LoginPage() {
    return (
        <>
            <div className="flex justify-center mt-32">
                <div className="w-[412px]">
                    <LoginForm />
                </div>
            </div>
        </>
    );
}
