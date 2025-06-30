import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDate } from '@/utils/format-date';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type {
    CreateLikeSchemaDTO,
    DeleteLikeSchemaDTO,
} from '@/utils/schemas/like.schema';
import type { LikeResponse } from '@/features/like/dto/like';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';
import type { Thread } from '@/features/thread/types/thread';
import ThreadActions from '@/features/thread-detail/components/thread-actions';

export default function CardThreadDetail({ thread }: { thread: Thread }) {
    const { threadId } = useParams();
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
            await queryClient.invalidateQueries({
                queryKey: [`threads/${threadId}`],
            });
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
                await queryClient.invalidateQueries({
                    queryKey: [`threads/${threadId}`],
                });
            },
        });

    async function onLike(data: CreateLikeSchemaDTO) {
        await mutateLike(data);
    }

    async function onUnlike(data: DeleteLikeSchemaDTO) {
        await mutateUnlike(data);
    }

    return (
        <div className="flex flex-col gap-4 border-b py-4">
            <div className="flex gap-1">
                <Avatar className="w-[50px] h-[50px]">
                    <AvatarImage
                        src={thread.user?.profile?.avatarUrl || ''}
                        alt={thread.user?.profile?.fullName || ''}
                    />
                    <AvatarFallback>
                        {thread.user?.profile?.fullName
                            .slice(0, 2)
                            .toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-bold">
                        {thread.user?.profile?.fullName || 'fullname'}
                    </p>
                    <p className="text-muted-foreground">
                        @{thread.user?.username || 'username'}
                    </p>
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <p>{thread.content}</p>
                {thread.images && (
                    <img
                        className="object-contain max-h-75 max-w-75"
                        src={thread.images}
                        alt="thread images"
                    />
                )}
                <p className="text-muted-foreground text-sm">
                    {formatDate(new Date(thread.createdAt))}
                </p>

                <ThreadActions
                    thread={thread}
                    isPendingLike={isPendingLike}
                    isPendingUnlike={isPendingUnlike}
                    onLike={onLike}
                    onUnlike={onUnlike}
                />
            </div>
        </div>
    );
}
