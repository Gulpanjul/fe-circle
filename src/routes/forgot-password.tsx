import { ModeToggle } from '@/components/ui/mode-toggle';
import ForgotPasswordForm from '@/features/auth/components/forgot-pasword-form';

export default function ForgotPasswordPage() {
    return (
        <>
            <div className="fixed top-4 right-4 z-50">
                <ModeToggle />
            </div>
            <div className="flex justify-center mt-32">
                <div className="w-[412px]">
                    <ForgotPasswordForm />
                </div>
            </div>
        </>
    );
}
