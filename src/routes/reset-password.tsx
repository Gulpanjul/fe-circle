import { ModeToggle } from '@/components/ui/mode-toggle';
import ResetPasswordForm from '@/features/auth/components/reset-pasword-form';

export default function ResetPasswordPage() {
    return (
        <>
            <div className="fixed top-4 right-4 z-50">
                <ModeToggle />
            </div>
            <div className="flex justify-center mt-32">
                <div className="w-[412px]">
                    <ResetPasswordForm />
                </div>
            </div>
        </>
    );
}
