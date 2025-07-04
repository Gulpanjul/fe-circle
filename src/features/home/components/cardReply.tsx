import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import type { ReplyEntity } from '@/entities/reply.entity';

export default function CardReply(reply: ReplyEntity) {
    return (
        <div className="flex gap-4 border-b py-7.5">
            <Avatar className="w-[50px] h-[50px]">
                <AvatarImage
                    src={reply.user?.profile?.avatarUrl || ''}
                    alt={reply.user?.profile?.fullName || ''}
                />
                <AvatarFallback>
                    {reply.user?.profile?.fullName.slice(0, 2).toUpperCase()}
                </AvatarFallback>
            </Avatar>

            <div className="flex flex-col gap-1">
                <div className="flex gap-1 text-sm">
                    <span className="font-bold">
                        {reply.user?.profile?.fullName}
                    </span>
                    <span className="text-muted-foreground">
                        @{reply.user?.username}
                    </span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">
                        {new Date(reply.createdAt).getHours()}h
                    </span>
                </div>

                <button className="cursor-pointer bg-transparent border-none p-0 text-left">
                    {reply.content}
                </button>

                <div className="flex">
                    <Button variant="ghost" className="flex gap-1 p-0 h-auto">
                        <Heart className="w-[20px] h-[20px]" />
                        {/* <span>{reply.likesCount}</span> */}
                    </Button>
                </div>
            </div>
        </div>
    );
}
