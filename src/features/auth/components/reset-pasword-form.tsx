import brandLogo from '@/assets/Logo.svg';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import {
    resetPasswordSchema,
    type ResetPasswordSchemaDTO,
} from '@/utils/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { api } from '@/lib/api';
import { isAxiosError } from 'axios';

export default function ResetPasswordForm(
    props: React.HTMLAttributes<HTMLDivElement>,
) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ResetPasswordSchemaDTO>({
        mode: 'all',
        resolver: zodResolver(resetPasswordSchema),
    });

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const token = searchParams.get('token');

    async function onSubmit({
        oldPassword,
        newPassword,
    }: ResetPasswordSchemaDTO) {
        try {
            setIsLoading(true);
            const response = await api.post(
                '/auth/reset-password',
                { oldPassword, newPassword },
                { headers: { Authorization: `Bearer ${token}` } },
            );
            toast.success(response.data.message);
            navigate({ pathname: '/login' });
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            if (isAxiosError(error)) {
                return toast.error(error.response?.data.message);
            }
        }
        toast.error('Something went wrong!');
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
                    disabled={isLoading ? true : false}
                >
                    {isLoading ? 'Loading...' : 'Send'}
                </Button>
            </form>
        </div>
    );
}
