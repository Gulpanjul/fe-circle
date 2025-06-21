import brandLogo from '@/assets/Logo.svg';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { userDatas } from '@/utils/fake-datas/user';
import {
    resetPasswordSchema,
    type ResetPasswordSchemaDTO,
} from '@/utils/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function ResetPasswordForm(
    props: React.HTMLAttributes<HTMLDivElement>,
) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<ResetPasswordSchemaDTO>({
        mode: 'all',
        resolver: zodResolver(resetPasswordSchema),
    });

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const email = searchParams.get('email');

    async function onSubmit(data: ResetPasswordSchemaDTO) {
        const user = userDatas.find((userData) => userData.email === email);

        if (!user) {
            toast.error('Email is not valid');
            return;
        }
        if (user.password === watch('password')) {
            toast.error('Password cannot be the same as previous');
            return;
        }
        toast.success('Reset password success!');

        console.log(data);
        navigate({ pathname: '/login' });
    }

    return (
        <div className="flex flex-col gap-3" {...props}>
            <img src={brandLogo} alt="Circle logo" className="w-[108px]" />
            <h2 className="text-2xl font-semibold">Reset password</h2>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-3"
            >
                <div className="space-y-1">
                    <Input placeholder="Password" {...register('password')} />
                    {errors.password && (
                        <p className="text-sm text-destructive">
                            {errors.password.message}
                        </p>
                    )}
                </div>
                <div className="space-y-1">
                    <Input
                        placeholder="Confirm password"
                        {...register('confirmPassword')}
                    />
                    {errors.confirmPassword && (
                        <p className="text-sm text-destructive">
                            {errors.confirmPassword.message}
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
