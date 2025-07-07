import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';
import { api } from '@/libs/api';
import type { ReplyResponse } from '@/features/reply/dto/reply';
import type { CreateReplySchemaDTO } from '@/utils/schemas/reply-schema';

export function useCreateReply(
    threadId: string | undefined,
    reset: () => void,
) {
    const queryClient = useQueryClient();

    const { mutateAsync, isPending } = useMutation<
        ReplyResponse,
        Error,
        CreateReplySchemaDTO
    >({
        mutationKey: ['create-reply'],
        mutationFn: async (data: CreateReplySchemaDTO) => {
            const response = await api.post<ReplyResponse>(
                `/replies/${threadId}`,
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
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['thread'] });
            reset();
        },
    });

    return {
        isPending,
        mutateAsync,
    };
}
