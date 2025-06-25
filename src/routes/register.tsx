import RegisterForm from '../features/auth/components/register-form';

export default function RegisterPage() {
    return (
        <>
            <div className="flex justify-center mt-32">
                <div className="w-[412px]">
                    <RegisterForm />
                </div>
            </div>
        </>
    );
}
