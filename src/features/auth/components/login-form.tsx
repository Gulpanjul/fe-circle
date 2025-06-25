import brandLogo from '@/assets/Logo.svg';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { useLoginForm } from '../hooks/use-login-form';
import { Loader2 } from 'lucide-react';

export default function LoginForm() {
    const { errors, handleSubmit, isPending, onSubmit, register } =
        useLoginForm();
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

                {/* <Button className="bg-primary text-primary-foreground w-full">
                    Login
                </Button> */}

                <Button
                    type="submit"
                    className="bg-primary text-primary-foreground"
                    disabled={isPending ? true : false}
                >
                    {isPending ? (
                        <Loader2 className="animate-spin h-5 w-5 text-muted-foreground" />
                    ) : (
                        'Login'
                    )}
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
