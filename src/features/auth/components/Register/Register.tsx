import brandLogo from '@/assets/Logo.svg';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useRegisterForm } from '../../hooks/useRegisterForm';

function Register() {
    const { errors, handleSubmit, isPending, onSubmit, register } =
        useRegisterForm();
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
                    <Input placeholder="Email" {...register('email')} />
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

export default Register;
