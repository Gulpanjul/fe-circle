import brandLogo from '@/assets/Logo.svg';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { usePasswordForm } from '../hooks/usePasswordForm';
import { Loader2 } from 'lucide-react';

export default function ResetPasswordForm(
    props: React.HTMLAttributes<HTMLDivElement>,
) {
    const { errors, handleSubmit, register, isPending, onSubmit } =
        usePasswordForm();

    return (
        <div className="flex flex-col gap-3" {...props}>
            <img src={brandLogo} alt="Circle logo" className="w-[108px]" />
            <h2 className="text-2xl font-semibold">Reset password</h2>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-3"
            >
                <div className="space-y-1">
                    <Input
                        placeholder="Password"
                        {...register('oldPassword')}
                    />
                    {errors.oldPassword && (
                        <p className="text-sm text-destructive">
                            {errors.oldPassword.message}
                        </p>
                    )}
                </div>
                <div className="space-y-1">
                    <Input
                        placeholder="Confirm password"
                        {...register('newPassword')}
                    />
                    {errors.newPassword && (
                        <p className="text-sm text-destructive">
                            {errors.newPassword.message}
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
                        'Register'
                    )}
                </Button>
            </form>
        </div>
    );
}
