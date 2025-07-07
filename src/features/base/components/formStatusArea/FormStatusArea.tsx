import { ImagePlus } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { cn } from '@/libs/utils';
import { useAuthStore } from '@/stores/auth';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    createThreadSchema,
    type createThreadSchemaDTO,
} from '@/utils/schemas/thread-schema';
import useCreateThread from '../../hooks';

export default function FormStatusArea() {
    const {
        user: {
            profile: { fullName, avatarUrl },
        },
    } = useAuthStore();

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

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

    const inputFileRef = useRef<HTMLInputElement | null>(null);

    const { isPending, handlePreview, mutateAsync } = useCreateThread({
        reset,
        setPreviewUrl,
    });

    function onClickFile() {
        inputFileRef?.current?.click();
    }

    async function onSubmit(data: createThreadSchemaDTO) {
        await mutateAsync(data);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="flex gap-4 border-b p-4">
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
                                {fullName?.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>

                        <Textarea
                            placeholder="What is happening?!"
                            {...register('content')}
                            className={cn(
                                '!bg-transparent !resize-none border-none focus-visible:ring-0 field-sizing-fixed',
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
