import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import type { ReplyResponse } from '@/features/reply/dto/reply';
import { api } from '@/lib/api';
import { useAuthStore } from '@/stores/auth';
import {
    createReplySchema,
    type CreateReplySchemaDTO,
} from '@/utils/schemas/reply.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

export default function CreateReply() {
    const { threadId } = useParams();
    const {
        user: {
            profile: { fullName, avatarUrl },
        },
    } = useAuthStore();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CreateReplySchemaDTO>({
        mode: 'onChange',
        resolver: zodResolver(createReplySchema),
    });

    const queryClient = useQueryClient();

    const { isPending, mutateAsync } = useMutation<
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
            await queryClient.invalidateQueries({
                queryKey: ['thread'],
            });
        },
    });

    async function onSubmit(data: CreateReplySchemaDTO) {
        await mutateAsync(data);
        reset();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col border-b by-5">
                <Avatar className="w-[50px] h-[50px]">
                    <AvatarImage src={avatarUrl || ''} alt={fullName} />
                    <AvatarFallback>
                        {fullName?.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-1">
                    <Textarea
                        placeholder="What is happening?!"
                        {...register('content')}
                        className={errors.content ? 'border-destructive' : ''}
                    />
                    {errors.content && (
                        <p className="text-sm text-destructive">
                            {errors.content.message}
                        </p>
                    )}
                </div>

                <Button type="submit" disabled={isPending}>
                    {isPending ? (
                        <Loader2 className="animate-spin h-5 w-5 text-muted-foreground" />
                    ) : (
                        'Post'
                    )}
                </Button>
            </div>
        </form>
    );
}
