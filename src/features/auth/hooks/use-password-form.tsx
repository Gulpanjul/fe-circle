import { api } from '@/libs/api';
import {
    resetPasswordSchema,
    type ResetPasswordSchemaDTO,
} from '@/utils/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

interface ResetPasswordResponse {
    message: string;
    data: {
        id: string;
        email: string;
        updateAt: Date;
    };
}

export function usePasswordForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ResetPasswordSchemaDTO>({
        mode: 'all',
        resolver: zodResolver(resetPasswordSchema),
    });
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get('token');

    const { isPending, mutateAsync } = useMutation<
        ResetPasswordResponse,
        Error,
        ResetPasswordSchemaDTO
    >({
        mutationKey: ['reset-password'],
        mutationFn: async ({
            oldPassword,
            newPassword,
        }: ResetPasswordSchemaDTO) => {
            const response = await api.post(
                '/auth/reset-password',
                { oldPassword, newPassword },
                { headers: { Authorization: `Bearer ${token}` } },
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

    async function onSubmit(data: ResetPasswordSchemaDTO) {
        await mutateAsync(data);
        reset();
    }

    return {
        register,
        onSubmit,
        isPending,
        handleSubmit,
        errors,
    };
}
