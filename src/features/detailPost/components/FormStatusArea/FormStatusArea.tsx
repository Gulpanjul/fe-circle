import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/libs/utils';
import { useAuthStore } from '@/stores/auth';
import {
    createReplySchema,
    type CreateReplySchemaDTO,
} from '@/utils/schemas/reply-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { ImagePlus, Loader2 } from 'lucide-react';
import { useCreateReply } from '../../hooks';

export default function FormStatusArea() {
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

    const { isPending, mutateAsync } = useCreateReply(threadId, reset); // ✅ panggil hook

    async function onSubmit(data: CreateReplySchemaDTO) {
        await mutateAsync(data);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="flex gap-4 border-b p-4">
                    <Avatar className="w-[50px] h-[50px]">
                        <AvatarImage src={avatarUrl || ''} alt={fullName} />
                        <AvatarFallback>
                            {fullName?.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex items-center justify-between w-full">
                        <p className="text-muted-foreground text-xl">
                            Type your reply!
                        </p>
                        <div className="flex items-center gap-5">
                            <ImagePlus className="w-[27px] h-[27px]" />
                            <Button className="rounded-full">Reply</Button>
                        </div>
                    </div>
                </div>
            </DialogTrigger>

            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="flex items-center gap-4 border-b">
                        <Avatar className="w-[50px] h-[50px]">
                            <AvatarImage src={avatarUrl || ''} alt={fullName} />
                            <AvatarFallback>
                                {fullName?.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>

                        <Textarea
                            placeholder="Type your reply!"
                            {...register('content')}
                            className={cn(
                                '!bg-transparent !resize-none border-none focus-visible:ring-0 field-sizing-fixed',
                                errors.content && 'border-red-500',
                            )}
                        />
                        {errors.content && (
                            <p className="text-sm text-destructive mt-1">
                                {errors.content.message}
                            </p>
                        )}
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? (
                                <Loader2 className="animate-spin h-5 w-5 text-muted-foreground" />
                            ) : (
                                'Reply'
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
