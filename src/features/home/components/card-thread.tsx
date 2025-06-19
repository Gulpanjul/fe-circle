import { MessageCircle, ThumbsUp } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { type Post } from '../types/posts';

interface CardThreadProps extends React.HTMLAttributes<HTMLDivElement> {
    postData: Post;
}

export default function Cardpost({ postData }: CardThreadProps) {
    const navigate = useNavigate();

    function onClickCard() {
        navigate(`/detail/${postData.id}`);
    }

    return (
        <div className="flex gap-4 border-b outline py-4">
            <Avatar className="w-[50px] h-[50px]">
                <AvatarImage
                    src={postData.user.avatarUrl}
                    alt={postData.user.fullName}
                />
                <AvatarFallback>
                    {postData.user.fullName.charAt(0)}
                </AvatarFallback>
            </Avatar>

            <div className="flex flex-col gap-1">
                <div className="flex gap-1 text-sm">
                    <span className="font-bold">{postData.user.fullName}</span>
                    <span className="text-muted-foreground">
                        @{postData.user.username}
                    </span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">
                        {postData.createdAt.getHours()}h
                    </span>
                </div>

                <p className="cursor-pointer" onClick={onClickCard}>
                    {postData.content}
                </p>

                <div className="flex gap-2">
                    <Button variant="ghost" className="flex gap-1 p-0 h-auto">
                        <ThumbsUp className="w-[20px] h-[20px]" />
                        <span>{postData.likesCount}</span>
                    </Button>

                    <Button variant="ghost" className="flex gap-1 p-0 h-auto">
                        <MessageCircle className="w-[20px] h-[20px]" />
                        <span>{postData.repliesCount}</span>
                        <span>Replies</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}
