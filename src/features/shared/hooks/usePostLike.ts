import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { api } from '@/libs/api';
import { isAxiosError } from 'axios';
import type { LikeResponse } from '@/features/like/dto/like';
import type {
    CreateLikeSchemaDTO,
    DeleteLikeSchemaDTO,
} from '@/utils/schemas/like-schema';

export function usePostLike(threadId: string | undefined) {
    const queryClient = useQueryClient();

    const { isPending: isPendingLike, mutateAsync: mutateLike } = useMutation<
        LikeResponse,
        Error,
        CreateLikeSchemaDTO
    >({
        mutationKey: ['like'],
        mutationFn: async (data: CreateLikeSchemaDTO) => {
            const response = await api.post<LikeResponse>('/likes', data);
            return response.data;
        },
        onError: (error) => {
            if (isAxiosError(error)) {
                return toast.error(error.response?.data.message);
            }
            toast.error('Something went wrong!');
        },
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: ['thread', threadId],
                }), // detail
                queryClient.invalidateQueries({ queryKey: ['threads'] }), // list
            ]);
        },
    });

    const { isPending: isPendingUnlike, mutateAsync: mutateUnlike } =
        useMutation<LikeResponse, Error, DeleteLikeSchemaDTO>({
            mutationKey: ['unlike'],
            mutationFn: async (data: DeleteLikeSchemaDTO) => {
                const response = await api.delete<LikeResponse>(
                    `/likes/${data.threadId}`,
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
                await Promise.all([
                    queryClient.invalidateQueries({
                        queryKey: ['thread', threadId],
                    }), // detail
                    queryClient.invalidateQueries({ queryKey: ['threads'] }), // list
                ]);
            },
        });

    const onLike = async (data: CreateLikeSchemaDTO) => mutateLike(data);
    const onUnlike = async (data: DeleteLikeSchemaDTO) => mutateUnlike(data);

    return {
        isPendingLike,
        isPendingUnlike,
        onLike,
        onUnlike,
    };
}
