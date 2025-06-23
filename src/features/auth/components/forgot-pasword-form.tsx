import brandLogo from '@/assets/Logo.svg';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import {
    forgotPasswordSchema,
    type ForgotPasswordSchemaDTO,
} from '@/utils/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { api } from '@/lib/api';
import { isAxiosError } from 'axios';

export default function ForgotPasswordForm(
    props: React.HTMLAttributes<HTMLDivElement>,
) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordSchemaDTO>({
        mode: 'onChange',
        resolver: zodResolver(forgotPasswordSchema),
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function onSubmit({ email }: ForgotPasswordSchemaDTO) {
        try {
            setIsLoading(true);
            const response = await api.post('/auth/forgot-password', { email });

            toast.success(response.data.message);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            if (isAxiosError(error)) {
                return toast.error(error.response?.data.message);
            }
            toast.error('Something went wrong!');
        }
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
                    disabled={isLoading ? true : false}
                >
                    {isLoading ? 'Loading...' : 'Send'}
                </Button>
            </form>
        </div>
    );
}
