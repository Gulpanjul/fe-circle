import { Heart, MessageCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { type Thread } from '../types/posts';
import { useReducer } from 'react';

interface CardThreadProps extends React.HTMLAttributes<HTMLDivElement> {
    threadData: Thread;
}

export default function Cardpost({ threadData }: CardThreadProps) {
    const navigate = useNavigate();
    const [, forceUpdate] = useReducer((state) => state + 1, 0);

    function onClickCard() {
        navigate(`/detail/${threadData.id}`);
    }

    return (
        <div className="flex gap-4 border-b py-4">
            <Avatar className="w-[50px] h-[50px]">
                <AvatarImage
                    src={threadData.user.avatarUrl}
                    alt={threadData.user.fullName}
                />
                <AvatarFallback>
                    {threadData.user.fullName.charAt(0)}
                </AvatarFallback>
            </Avatar>

            <div className="flex flex-col gap-1">
                <div className="flex gap-1 text-sm">
                    <span className="font-bold">
                        {threadData.user.fullName}
                    </span>
                    <span className="text-muted-foreground">
                        @{threadData.user.username}
                    </span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">
                        {threadData.createdAt.getHours()}h
                    </span>
                </div>

                <p className="cursor-pointer" onClick={onClickCard}>
                    {threadData.content}
                </p>
                <img
                    className="object-contain max-h-75 max-w-75"
                    src={threadData.images}
                />

                <div className="flex gap-2">
                    <Button variant="ghost" className="flex gap-1 p-0 h-auto">
                        {threadData.isLiked ? (
                            <Heart className="w-[20px] h-[20px] fill-current text-red-500" />
                        ) : (
                            <Heart className="w-[20px] h-[20px]" />
                        )}
                        <span>{threadData.likesCount}</span>
                    </Button>

                    <Button
                        variant="ghost"
                        className="flex gap-1 p-0 h-auto"
                        onClick={() => {
                            threadData.isLiked = !threadData.isLiked;
                            forceUpdate();
                        }}
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
