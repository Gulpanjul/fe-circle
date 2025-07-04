import { api } from '@/libs/api';
import {
    registerSchema,
    type RegisterSchemaDTO,
} from '@/utils/schemas/auth-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface RegisterResponse {
    message: string;
    data: {
        id: string;
        fullName: string;
        email: string;
        createdAt: Date;
        updateAt: Date;
    };
}

export function useRegisterForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<RegisterSchemaDTO>({
        mode: 'onChange',
        resolver: zodResolver(registerSchema),
    });

    const navigate = useNavigate();

    const { isPending, mutateAsync } = useMutation<
        RegisterResponse,
        Error,
        RegisterSchemaDTO
    >({
        mutationKey: ['register'],
        mutationFn: async (data: RegisterSchemaDTO) => {
            const response = await api.post<RegisterResponse>(
                '/auth/register',
                data,
            );
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
            navigate({ pathname: '/login' });
        },
    });

    async function onSubmit(data: RegisterSchemaDTO) {
        try {
            await mutateAsync(data);
            reset();
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.response?.data.message);
            } else {
                toast.error('Something went wrong!');
            }
        }
    }

    return {
        onSubmit,
        isPending,
        handleSubmit,
        register,
        errors,
    };
}
