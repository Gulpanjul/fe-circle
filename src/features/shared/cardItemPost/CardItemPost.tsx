import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { PostProps } from '../type/PostProps';

export default function CardThreadBase({
    avatarUrl,
    fullName,
    username,
    createdAt,
    content,
    images,
    likesCount,
    onClickContent,
    onLikeClick,
    isLikeLoading,
    children,
}: PostProps) {
    return (
        <div className="flex gap-4 border-b p-4">
            <Avatar className="w-[50px] h-[50px]">
                <AvatarImage src={avatarUrl || ''} alt={fullName} />
                <AvatarFallback>
                    {fullName?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
            </Avatar>

            <div className="flex flex-col gap-1 w-full">
                <div className="flex gap-1 text-sm">
                    <Link to={`/${username}`} className="font-bold">
                        {fullName}
                    </Link>
                    <span className="text-muted-foreground">@{username}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">
                        {new Date(createdAt).getHours()}h
                    </span>
                </div>

                <button
                    onClick={onClickContent}
                    className="cursor-pointer bg-transparent border-none p-0 text-left"
                >
                    {content}
                </button>

                {images && (
                    <img
                        className="object-contain max-h-75 max-w-75"
                        src={images}
                        alt="thread image"
                    />
                )}

                {children ?? (
                    <div className="flex">
                        <Button
                            variant="ghost"
                            className="flex gap-1 p-0 h-auto"
                            onClick={onLikeClick}
                            disabled={isLikeLoading}
                        >
                            <Heart className="w-[20px] h-[20px]" />
                            <span>{likesCount}</span>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
