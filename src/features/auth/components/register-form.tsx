import brandLogo from '@/assets/Logo.svg';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import {
    registerSchema,
    type RegisterSchemaDTO,
} from '@/utils/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { isAxiosError } from 'axios';
import { api } from '@/lib/api';

export default function RegisterForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterSchemaDTO>({
        mode: 'onChange',
        resolver: zodResolver(registerSchema),
    });

    const navigate = useNavigate();

    async function onSubmit(data: RegisterSchemaDTO) {
        try {
            const response = await api.post('/auth/register', data);
            toast.success(response.data.message);

            navigate({ pathname: '/login' });
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.response?.data.message);
            }
        }
    }
    return (
        <div className="flex flex-col gap-3">
            <img src={brandLogo} alt="Circle logo" className="w-[108px]" />
            <h2 className="text-2xl font-semibold">
                Create an Account to Circle
            </h2>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-3"
            >
                <div className="space-y-1">
                    <Input placeholder="Full Name" {...register('fullName')} />
                    {errors.fullName && (
                        <p className="text-sm text-destructive">
                            {errors.fullName.message}
                        </p>
                    )}
                </div>
                <div className="space-y-1">
                    <Input placeholder="Username" {...register('username')} />
                    {errors.username && (
                        <p className="text-sm text-destructive">
                            {errors.username.message}
                        </p>
                    )}
                </div>
                <div className="space-y-1">
                    <Input
                        placeholder="Email/Username"
                        {...register('email')}
                    />
                    {errors.email && (
                        <p className="text-sm text-destructive">
                            {errors.email.message}
                        </p>
                    )}
                </div>
                <div className="space-y-1">
                    <Input placeholder="Password" {...register('password')} />
                    {errors.password && (
                        <p className="text-sm text-destructive">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                <Button className="bg-primary text-primary-foreground">
                    Register
                </Button>

                <p className="text-sm">
                    Already have account?{' '}
                    <Link to="/login" className="text-primary underline">
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
}
