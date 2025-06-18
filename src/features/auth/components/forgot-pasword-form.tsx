import brandLogo from '@/assets/Logo.svg';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import dummyUsers from '@/utils/datas/user.json';
import {
    forgotPasswordSchema,
    type ForgotPasswordSchemaDTO,
} from '@/utils/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export default function ForgotPasswordForm(
    props: React.HTMLAttributes<HTMLDivElement>,
) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<ForgotPasswordSchemaDTO>({
        mode: 'onChange',
        resolver: zodResolver(forgotPasswordSchema),
    });

    async function onSubmit(data: ForgotPasswordSchemaDTO) {
        const user = dummyUsers.find(
            (dummyUser) => dummyUser.email === watch('email'),
        );

        if (!user) {
            toast.error('Email/password is wrong');
            return;
        }
        toast.success(
            'Reset password link has been sent to your email! Check it out',
        );

        console.log(data);
    }

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
                >
                    Send
                </Button>
            </form>
        </div>
    );
}
