import { Heart, MessageCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { type Thread } from '../types/posts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type {
    CreateLikeSchemaDTO,
    DeleteLikeSchemaDTO,
} from '@/utils/schemas/like.schema';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { isAxiosError } from 'axios';

interface CardThreadProps extends React.HTMLAttributes<HTMLDivElement> {
    threadData: Thread;
}

interface LikeResponse {
    message: string;
    data: {
        id: string;
        userId: string;
        threadId: string;
        createdAt: string;
        updatedAt: string;
    };
}

export default function Cardpost({ threadData }: CardThreadProps) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    function onClickCard() {
        navigate(`/detail/${threadData.id}`);
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
        <div className="flex gap-4 border-b py-4">
            <Avatar className="w-[50px] h-[50px]">
                <AvatarImage
                    src={threadData.user.profile.avatarUrl}
                    alt={threadData.user.profile.fullName}
                />
                <AvatarFallback>
                    {threadData.user.profile.fullName}
                </AvatarFallback>
            </Avatar>

            <div className="flex flex-col gap-1">
                <div className="flex gap-1 text-sm">
                    <span className="font-bold">
                        {threadData.user.profile.fullName}
                    </span>
                    <span className="text-muted-foreground">
                        @{threadData.user.username}
                    </span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">
                        {new Date(threadData.createdAt).getHours()}h
                    </span>
                </div>

                <button
                    className="cursor-pointer bg-transparent border-none p-0 text-left"
                    onClick={onClickCard}
                >
                    {threadData.content}
                </button>
                <img
                    className="object-contain max-h-75 max-w-75"
                    src={threadData.images}
                    alt="thread images"
                />

                <div className="flex gap-2">
                    <Button variant="ghost" className="flex gap-1 p-0 h-auto">
                        {threadData.isLiked ? (
                            <Heart className="w-[20px] h-[20px] fill-current text-red-500" />
                        ) : (
                            <Heart className="w-[20px] h-[20px]" />
                        )}
                        <span>{threadData.likesCount}</span>
                    </Button>

                    <Button
                        variant="ghost"
                        className="flex gap-1 p-0 h-auto"
                        disabled={isPendingLike || isPendingUnlike}
                        onClick={() =>
                            threadData.isLiked
                                ? onUnlike({ threadId: threadData.id })
                                : onLike({ threadId: threadData.id })
                        }
                    >
                        <MessageCircle className="w-[20px] h-[20px]" />
                        <span>{threadData.repliesCount}</span>
                        <span>Replies</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}
