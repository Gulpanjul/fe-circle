// components/FormStatusTrigger.tsx
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ImagePlus } from 'lucide-react';
import { useAuthStore } from '@/stores/auth';
import FormStatusArea from '@/features/shared/components/FormStatusArea';

export default function FormStatusTrigger() {
    const {
        user: {
            profile: { fullName, avatarUrl },
        },
    } = useAuthStore();
    const [open, setOpen] = useState(false);

    return (
        <>
            <div
                className="flex gap-4 border-b p-4 cursor-pointer"
                onClick={() => setOpen(true)}
            >
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

            <FormStatusArea open={open} onOpenChange={setOpen} />
        </>
    );
}
