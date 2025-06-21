import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Thread } from '../types/posts';
import { formatDate } from '@/utils/format-date';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle } from 'lucide-react';

interface CardThreadDetailProps extends React.HTMLAttributes<HTMLDivElement> {
    threadData: Thread;
}

export default function CardThreadDetail({
    threadData,
}: CardThreadDetailProps) {
    return (
        <div className="flex flex-col gap-4 border-b py-4">
            <div className="flex gap-1">
                <Avatar className="w-[50px] h-[50px]">
                    <AvatarImage
                        src={threadData.user.avatarUrl}
                        alt={threadData.user.fullName}
                    />
                    <AvatarFallback>
                        {threadData.user.fullName.charAt(0)}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-bold">{threadData.user.fullName}</p>
                    <p className="text-muted-foreground">
                        @{threadData.user.username}
                    </p>
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <p>{threadData.content}</p>
                <p className="text-muted-foreground text-sm">
                    {formatDate(threadData.createdAt)}
                </p>

                <div className="flex gap-2">
                    <Button
                        variant="ghost"
                        className="flex gap-1 p-0 h-auto text-muted-foreground"
                    >
                        <Heart className="w-[20px] h-[20px]" />
                        <span>{threadData.likesCount}</span>
                    </Button>

                    <Button
                        variant="ghost"
                        className="flex gap-1 p-0 h-auto text-muted-foreground"
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
