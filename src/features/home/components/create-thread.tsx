import { ImagePlus } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { userSession } from '@/utils/fake-datas/session';
import { useRef, useState } from 'react';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
    DialogClose,
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

export default function CreateThread() {
    const { fullName, avatarUrl } = userSession;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const inputFileRef = useRef<HTMLInputElement | null>(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<createThreadSchemaDTO>({
        mode: 'onChange',
        resolver: zodResolver(createThreadSchema),
    });

    function onClickFile() {
        inputFileRef?.current?.click();
    }

    async function onSubmit(data: createThreadSchemaDTO) {
        try {
            setIsLoading(true);
            const formData = new FormData();
            formData.append('content', data.content);
            formData.append('images', data.images[0]);

            const response = await api.post('/threads', formData);

            toast.success(response.data.message);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            if (isAxiosError(error)) {
                return toast.error(error.response?.data.message);
            }
        }
        toast.error('Something went wrong!');
    }

    return (
        <Dialog>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex items-center gap-5 border-b py-5">
                    <Avatar className="w-[50px] h-[50px]">
                        <AvatarImage src={avatarUrl} alt={fullName} />
                        <AvatarFallback>{fullName.charAt(0)}</AvatarFallback>
                    </Avatar>

                    <DialogTrigger asChild>
                        <div className="w-full">
                            <Textarea
                                placeholder="What is happening?!"
                                className="resize-none"
                                {...register('content')}
                            />
                            {errors.content && (
                                <p className="text-sm text-destructive">
                                    {errors.content.message}
                                </p>
                            )}
                        </div>
                    </DialogTrigger>

                    <Button
                        variant="ghost"
                        onClick={onClickFile}
                        className="p-2"
                    >
                        <ImagePlus className="w-[27px] h-[27px]" />
                    </Button>

                    <Input
                        type="file"
                        className="hidden"
                        {...register('images')}
                        ref={(e) => {
                            register('images');
                            inputFileRef.current = e;
                        }}
                    />

                    <Button
                        className="bg-brand text-white"
                        disabled={isLoading ? true : false}
                    >
                        {isLoading ? 'Loading...' : 'Post'}
                    </Button>
                </div>

                <DialogContent>
                    <DialogClose className="absolute right-4 top-4" />
                    <DialogHeader>
                        <DialogTitle>Create Post</DialogTitle>
                        <DialogDescription>
                            Start a new thread.
                        </DialogDescription>
                    </DialogHeader>
                    <Textarea
                        placeholder="Write your thoughts..."
                        className="resize-none"
                    />
                    <DialogFooter>
                        <Button disabled={isLoading ? true : false}>
                            {isLoading ? 'Loading...' : 'Post'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}
