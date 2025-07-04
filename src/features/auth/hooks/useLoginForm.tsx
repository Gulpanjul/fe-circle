import type { ProfileEntity } from '@/entities/profile.entity';
import type { UserEntity } from '@/entities/user.entity';
import { api } from '@/libs/api';
import { useAuthStore } from '@/stores/auth';
import { loginSchema, type LoginSchemaDTO } from '@/utils/schemas/auth-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

type UserProfile = UserEntity & {
    profile: ProfileEntity;
};

interface LoginResponse {
    message: string;
    data: {
        token: string;
        user: UserProfile;
    };
}

export function useLoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<LoginSchemaDTO>({
        mode: 'onChange',
        resolver: zodResolver(loginSchema),
    });

    const { setUser } = useAuthStore();
    const navigate = useNavigate();

    const { isPending, mutateAsync: mutateLogin } = useMutation<
        LoginResponse,
        Error,
        LoginSchemaDTO
    >({
        mutationKey: ['login'],
        mutationFn: async (data: LoginSchemaDTO) => {
            const response = await api.post<LoginResponse>('/auth/login', data);
            setUser(response.data.data.user);
            Cookies.set('token', response.data.data.token, { expires: 1 });
            return response.data;
        },
        onError: (error) => {
            if (isAxiosError(error)) {
                return toast.error(error.response?.data.message);
            }
            toast.error('Something went wrong!');
        },
        onSuccess: async (data) => {
            toast.success(data.message);
            navigate({ pathname: '/' });
        },
    });

    async function onSubmit(data: LoginSchemaDTO) {
        await mutateLogin(data);
        reset();
    }

    return {
        register,
        handleSubmit,
        errors,
        isPending,
        onSubmit,
    };
}
