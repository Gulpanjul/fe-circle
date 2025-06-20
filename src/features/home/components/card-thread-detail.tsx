import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Post } from '../types/posts';
import { formatDate } from '@/utils/format-date';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle } from 'lucide-react';

interface CardThreadDetailProps extends React.HTMLAttributes<HTMLDivElement> {
    postData: Post;
}

export default function CardThreadDetail({ postData }: CardThreadDetailProps) {
    return (
        <div className="flex flex-col gap-4 border-b py-4">
            <div className="flex gap-1">
                <Avatar className="w-[50px] h-[50px]">
                    <AvatarImage
                        src={postData.user.avatarUrl}
                        alt={postData.user.fullName}
                    />
                    <AvatarFallback>
                        {postData.user.fullName.charAt(0)}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-bold">{postData.user.fullName}</p>
                    <p className="text-muted-foreground">
                        @{postData.user.username}
                    </p>
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <p>{postData.content}</p>
                <p className="text-muted-foreground text-sm">
                    {formatDate(postData.createdAt)}
                </p>

                <div className="flex gap-2">
                    <Button
                        variant="ghost"
                        className="flex gap-1 p-0 h-auto text-muted-foreground"
                    >
                        <Heart className="w-[20px] h-[20px]" />
                        <span>{postData.likesCount}</span>
                    </Button>

                    <Button
                        variant="ghost"
                        className="flex gap-1 p-0 h-auto text-muted-foreground"
                    >
                        <MessageCircle className="w-[20px] h-[20px]" />
                        <span>{postData.repliesCount}</span>
                        <span>Replies</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}
