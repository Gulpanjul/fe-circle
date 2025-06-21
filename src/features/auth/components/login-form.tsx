import brandLogo from '@/assets/Logo.svg';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { userDatas } from '@/utils/fake-datas/user';
import { loginSchema, type LoginSchemaDTO } from '@/utils/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth';

export default function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<LoginSchemaDTO>({
        mode: 'onChange',
        resolver: zodResolver(loginSchema),
    });

    const setUser = useAuthStore((state) => state.setUser);

    const navigate = useNavigate();

    async function onSubmit(data: LoginSchemaDTO) {
        const user = userDatas.find(
            (userData) => userData.email === watch('email'),
        );

        if (!user) {
            toast.error('Email is wrong');
            return;
        }

        const isPasswordCorrect = user?.password === data.password;

        if (!isPasswordCorrect) {
            toast.error('Password is wrong');
            return;
        }
        console.log(data);

        setUser(user);

        toast.success('Login success');

        navigate({ pathname: '/' });
    }
    return (
        <div className="flex flex-col gap-3">
            <img src={brandLogo} alt="Circle logo" className="w-[108px]" />
            <h2 className="text-2xl font-semibold">Login to Circle</h2>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-3"
            >
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

                <div className="flex justify-end">
                    <Link
                        to="/forgot-password"
                        className="text-sm text-primary underline"
                    >
                        Forgot password?
                    </Link>
                </div>

                <Button className="bg-primary text-primary-foreground w-full">
                    Login
                </Button>

                <p className="text-sm">
                    Don&apos;t have an account yet?{' '}
                    <Link to="/register" className="text-primary underline">
                        Create account
                    </Link>
                </p>
            </form>
        </div>
    );
}
