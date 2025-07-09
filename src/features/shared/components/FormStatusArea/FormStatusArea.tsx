// components/ThreadDialog.tsx
import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/libs/utils';
import { useAuthStore } from '@/stores/auth';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    createThreadSchema,
    type createThreadSchemaDTO,
} from '@/utils/schemas/thread-schema';
import { ImagePlus } from 'lucide-react';
import { useCreateThread } from '../../hooks';

interface ThreadDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

function FormStatusArea({ open, onOpenChange }: ThreadDialogProps) {
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

    const { isPending, handlePreview, mutateAsync } = useCreateThread({
        reset,
        setPreviewUrl,
    });

    const onClickFile = () => inputFileRef.current?.click();

    async function onSubmit(data: createThreadSchemaDTO) {
        await mutateAsync(data);
        onOpenChange(false);
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="flex items-start gap-4 border-b">
                        <Avatar className="w-[50px] h-[50px] mt-1">
                            <AvatarImage src={avatarUrl || ''} alt={fullName} />
                            <AvatarFallback>
                                {fullName?.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>

                        <Textarea
                            placeholder="What is happening?!"
                            {...register('content')}
                            className={cn(
                                '!bg-transparent !resize-none border-none focus-visible:ring-0',
                                errors.content && 'border-red-500',
                            )}
                        />
                    </div>
                    {errors.content && (
                        <p className="text-sm text-destructive mt-1">
                            {errors.content.message}
                        </p>
                    )}

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

export default FormStatusArea;
