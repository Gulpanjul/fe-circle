import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDate } from '@/utils/format-date';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle } from 'lucide-react';
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

export default function CardThreadDetail(thread: Thread) {
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
                    queryKey: ['threads/${threadId}'],
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
                        {thread.user?.profile?.fullName || ''}
                    </p>
                    <p className="text-muted-foreground">
                        @{thread.user?.username || ''}
                    </p>
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <p>{thread.content}</p>
                <p className="text-muted-foreground text-sm">
                    {formatDate(new Date(thread.createdAt))}
                </p>

                <div className="flex gap-2">
                    <Button
                        variant="ghost"
                        className="flex gap-1 p-0 h-auto text-muted-foreground"
                        disabled={isPendingLike || isPendingUnlike}
                        onClick={() =>
                            thread.isLiked
                                ? onUnlike({ threadId: thread.id })
                                : onLike({ threadId: thread.id })
                        }
                    >
                        <Heart className="w-[20px] h-[20px]" />
                        <span>{thread.likesCount}</span>
                    </Button>

                    <Button
                        variant="ghost"
                        className="flex gap-1 p-0 h-auto text-muted-foreground"
                    >
                        <MessageCircle className="w-[20px] h-[20px]" />
                        <span>{thread.repliesCount}</span>
                        <span>Replies</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}
