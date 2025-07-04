import { api } from '@/libs/api';
import {
    forgotPasswordSchema,
    type ForgotPasswordSchemaDTO,
} from '@/utils/schemas/auth-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError, type AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export function useForgotPasswordForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordSchemaDTO>({
        mode: 'onChange',
        resolver: zodResolver(forgotPasswordSchema),
    });

    const { isPending, mutateAsync } = useMutation<
        { message: string },
        AxiosError,
        ForgotPasswordSchemaDTO
    >({
        mutationKey: ['forgot-password'],
        mutationFn: async ({ email }: ForgotPasswordSchemaDTO) => {
            const response = await api.post('/auth/forgot-password', { email });
            return response.data;
        },
        onError: (error) => {
            if (isAxiosError(error)) {
                return toast.error(
                    (error.response?.data as { message: string }).message,
                );
            }
            toast.error('Something went wrong!');
        },
        onSuccess: async (data) => {
            toast.success(data.message);
        },
    });

    async function onSubmit(data: ForgotPasswordSchemaDTO) {
        await mutateAsync(data);
    }
    return {
        register,
        onSubmit,
        handleSubmit,
        errors,
        isPending,
    };
}
