import brandLogo from '@/assets/Logo.svg';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForgotPasswordForm } from '../hooks/use-forgot-password-form';
import { Loader2 } from 'lucide-react';

export default function ForgotPasswordForm(
    props: React.HTMLAttributes<HTMLDivElement>,
) {
    const { errors, handleSubmit, isPending, onSubmit, register } =
        useForgotPasswordForm();

    return (
        <div className="flex flex-col gap-3" {...props}>
            <img src={brandLogo} alt="Circle logo" className="w-[108px]" />
            <h2 className="text-2xl font-semibold">Forgot password</h2>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-3"
            >
                <div className="space-y-1">
                    <Input placeholder="Email" {...register('email')} />
                    {errors.email && (
                        <p className="text-sm text-destructive">
                            {errors.email.message}
                        </p>
                    )}
                </div>
                <Button
                    type="submit"
                    className="bg-primary text-primary-foreground"
                    disabled={isPending ? true : false}
                >
                    {isPending ? (
                        <Loader2 className="animate-spin h-5 w-5 text-muted-foreground" />
                    ) : (
                        'Send'
                    )}
                </Button>
            </form>
        </div>
    );
}
