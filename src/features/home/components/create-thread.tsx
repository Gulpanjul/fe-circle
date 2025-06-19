import { ImagePlus } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { userSession } from '@/utils/fake-datas/session';
import { useRef } from 'react';
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

export default function CreateThread() {
    const { fullName, avatarUrl } = userSession;
    const inputFileRef = useRef<HTMLInputElement>(null);

    function onClickFile() {
        inputFileRef?.current?.click();
    }

    return (
        <Dialog>
            <div className="flex items-center gap-5 border-b border-outline py-5">
                <Avatar className="w-[50px] h-[50px]">
                    <AvatarImage src={avatarUrl} alt={fullName} />
                    <AvatarFallback>{fullName.charAt(0)}</AvatarFallback>
                </Avatar>

                <DialogTrigger asChild>
                    <Textarea
                        placeholder="What is happening?!"
                        className="resize-none"
                    />
                </DialogTrigger>

                <Button
                    variant="ghost"
                    onClick={onClickFile}
                    disabled
                    className="cursor-not-allowed"
                >
                    <ImagePlus className="w-[27px] h-[27px]" />
                </Button>

                <Input type="file" className="hidden" ref={inputFileRef} />

                <Button className="bg-brand text-white" disabled>
                    Post
                </Button>
            </div>

            <DialogContent>
                <DialogClose className="absolute right-4 top-4" />
                <DialogHeader>
                    <DialogTitle>Create Post</DialogTitle>
                    <DialogDescription>Start a new thread.</DialogDescription>
                </DialogHeader>
                <Textarea
                    placeholder="Write your thoughts..."
                    className="resize-none"
                />
                <DialogFooter>
                    <Button disabled>Post</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
