import { useNavigate } from 'react-router-dom';
import { type Reply } from '../types/posts';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ThumbsUp } from 'lucide-react';

interface CardReplyProps extends React.HTMLAttributes<HTMLDivElement> {
    replyData: Reply;
}

export default function CardReply({ replyData }: CardReplyProps) {
    const navigate = useNavigate();

    function onClickCard() {
        navigate(`/detail/${replyData.id}`);
    }

    return (
        <div className="flex gap-4 border-b outline py-4">
            <Avatar className="w-[50px] h-[50px]">
                <AvatarImage
                    src={replyData.user.avatarUrl}
                    alt={replyData.user.fullName}
                />
                <AvatarFallback>
                    {replyData.user.fullName.charAt(0)}
                </AvatarFallback>
            </Avatar>

            <div className="flex flex-col gap-1">
                <div className="flex gap-1 text-sm">
                    <span className="font-bold">{replyData.user.fullName}</span>
                    <span className="text-muted-foreground">
                        @{replyData.user.username}
                    </span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">
                        {replyData.createdAt.getHours()}h
                    </span>
                </div>

                <p className="cursor-pointer" onClick={onClickCard}>
                    {replyData.content}
                </p>

                <div className="flex">
                    <Button variant="ghost" className="flex gap-1 p-0 h-auto">
                        <ThumbsUp className="w-[20px] h-[20px]" />
                        <span>{replyData.likesCount}</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}
