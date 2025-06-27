import { ImagePlus } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useRef, useState } from 'react';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
    createThreadSchema,
    type createThreadSchemaDTO,
} from '@/utils/schemas/thread.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import { isAxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores/auth';
import type { ThreadResponse } from '@/features/thread/dto/thread';

export default function CreateThread() {
    const {
        user: {
            profile: { fullName, avatarUrl },
        },
    } = useAuthStore();
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const inputFileRef = useRef<HTMLInputElement | null>(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<createThreadSchemaDTO>({
        mode: 'onChange',
        resolver: zodResolver(createThreadSchema),
    });

    const {
        ref: registerImagesRef,
        onChange: registerImagesOnChange,
        ...restRegisterImages
    } = register('images');

    const queryClient = useQueryClient();

    function onClickFile() {
        inputFileRef?.current?.click();
    }

    const { isPending, mutateAsync } = useMutation<
        ThreadResponse,
        Error,
        createThreadSchemaDTO
    >({
        mutationKey: ['create-thread'],
        mutationFn: async (data: createThreadSchemaDTO) => {
            const formData = new FormData();
            formData.append('content', data.content);
            formData.append('images', data.images[0]);

            const response = await api.post<ThreadResponse>(
                '/threads',
                formData,
            );
            return response.data;
        },
        onError: (error) => {
            if (isAxiosError(error)) {
                return toast.error(error.response?.data.message);
            }
            toast.error('Something went wrong!');
        },
        onSuccess: async (data) => {
            queryClient.invalidateQueries({
                queryKey: ['threads'],
            });
            toast.success(data.message);
        },
    });

    async function onSubmit(data: createThreadSchemaDTO) {
        await mutateAsync(data);
        reset();
        setPreviewUrl('');
    }

    function handlePreview(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            const file = e.target.files[0];
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="flex gap-4 border-b py-4">
                    <Avatar className="w-[50px] h-[50px]">
                        <AvatarImage src={avatarUrl || ''} alt={fullName} />
                        <AvatarFallback>{fullName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex items-center justify-between w-full">
                        <p className="text-muted-foreground text-xl">
                            What is happening?!
                        </p>
                        <div className="flex items-center gap-5">
                            <ImagePlus className="w-[27px] h-[27px]" />
                            <Button className="rounded-full">Post</Button>
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
                                {fullName.charAt(0)}
                            </AvatarFallback>
                        </Avatar>

                        <Textarea
                            placeholder="What is happening?!"
                            {...register('content')}
                            className={cn(
                                '!bg-transparent !resize-none border-none focus-visible:ring-0 field-sizing-fixed',
                                errors.content && 'border-red-500',
                            )}
                        ></Textarea>
                        {errors.content && (
                            <p className="text-sm text-destructive mt-1">
                                {errors.content.message}
                            </p>
                        )}
                    </div>

                    {previewUrl && (
                        <img
                            src={previewUrl}
                            alt="Preview"
                            className="max-h-[300px] object-contain mx-auto"
                        />
                    )}

                    <DialogFooter>
                        <div className="w-full flex items-center justify-between">
                            <Button
                                variant="ghost"
                                type="button"
                                className="p-2"
                                onClick={onClickFile}
                            >
                                <ImagePlus className="w-6 h-6" />
                            </Button>

                            <Input
                                type="file"
                                className="hidden"
                                {...restRegisterImages}
                                onChange={(e) => {
                                    handlePreview(e);
                                    registerImagesOnChange(e);
                                }}
                                ref={(e) => {
                                    registerImagesRef(e);
                                    inputFileRef.current = e;
                                }}
                            />
                            <Button type="submit" disabled={isPending}>
                                {isPending ? 'Loading...' : 'Post'}
                            </Button>
                        </div>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
