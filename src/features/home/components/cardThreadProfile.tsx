import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';
import type {
    CreateLikeSchemaDTO,
    DeleteLikeSchemaDTO,
} from '@/utils/schemas/like-schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { isAxiosError } from 'axios';
import { api } from '@/libs/api';
import type { LikeResponse } from '@/features/like/dto/like';
import ThreadActions from '@/features/shared/components/PostActions/PostActions';
import type { Thread } from '@/features/thread/types/thread';

export default function CardThreadProfile(thread: Thread) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    function onClickCard() {
        navigate(`/detail/${thread.id}`);
    }

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
                queryKey: ['thread'],
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
                    queryKey: ['thread'],
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
        <div className="border-b">
            <div className="flex gap-4 px-8 py-4">
                <div></div>
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

                <div className="flex flex-col gap-1">
                    <div className="flex gap-1 text-sm">
                        <p className="font-bold">
                            {thread.user?.profile?.fullName}
                        </p>
                        <span className="text-muted-foreground">
                            @{thread.user?.username}
                        </span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-muted-foreground">
                            {new Date(thread.createdAt).getHours()}h
                        </span>
                    </div>

                    <button
                        className="cursor-pointer bg-transparent border-none p-0 text-left"
                        onClick={onClickCard}
                    >
                        {thread.content}
                    </button>
                    {thread.images && (
                        <img
                            className="object-contain max-h-75 max-w-75"
                            src={thread.images}
                            alt="thread images"
                        />
                    )}

                    <ThreadActions
                        thread={thread}
                        isPendingLike={isPendingLike}
                        isPendingUnlike={isPendingUnlike}
                        onLike={onLike}
                        onUnlike={onUnlike}
                    />
                </div>
            </div>
        </div>
    );
}
