import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type {
    CreateLikeSchemaDTO,
    DeleteLikeSchemaDTO,
} from '@/utils/schemas/like.schema';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { isAxiosError } from 'axios';
import type { LikeResponse } from '@/features/like/dto/like';
import type { Thread } from '@/features/thread/types/thread';
import ThreadActions from '@/features/thread-detail/components/thread-actions';

export default function Cardpost(thread: Thread) {
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
                queryKey: ['threads'],
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
                    queryKey: ['threads'],
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
        <div className="flex gap-4 border-b py-4">
            <Avatar className="w-[50px] h-[50px]">
                <AvatarImage
                    src={thread.user?.profile?.avatarUrl || ''}
                    alt={thread.user?.profile?.fullName || ''}
                />
                <AvatarFallback>
                    {thread.user?.profile?.fullName.slice(0, 2).toUpperCase()}
                </AvatarFallback>
            </Avatar>

            <div className="flex flex-col gap-1">
                <div className="flex gap-1 text-sm">
                    <span className="font-bold">
                        {thread.user?.profile?.fullName}
                    </span>
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
    );
}
