import { Link, useParams } from 'react-router-dom';
import { usePostLike } from '../../hooks';
import ThreadActions from '@/features/thread-detail/components/threadActions';
import type { Thread } from '@/features/thread/types/thread';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDate } from '@/utils/format-date';

export default function ItemPostDetail({ thread }: { thread: Thread }) {
    const { threadId } = useParams();
    const { isPendingLike, isPendingUnlike, onLike, onUnlike } =
        usePostLike(threadId);

    console.log('thread.createdAt', thread.createdAt);

    return (
        <div className="flex flex-col gap-4 border-b p-4">
            <div className="flex gap-4  ">
                <Avatar className="w-[50px] h-[50px]">
                    <AvatarImage
                        src={thread.user?.profile?.avatarUrl || ''}
                        alt={thread.user?.profile?.fullName}
                    />
                    <AvatarFallback>
                        {thread.user?.profile?.fullName
                            .slice(0, 2)
                            .toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-sm justify-center">
                    <Link
                        to={`/${thread.user?.username}`}
                        className="font-bold"
                    >
                        {thread.user?.profile?.fullName}
                    </Link>
                    <span className="text-muted-foreground">
                        @{thread.user?.username}
                    </span>
                </div>
            </div>

            <div className="flex flex-col gap-1 w-full">
                <p className="cursor-pointer bg-transparent border-none  text-left">
                    {thread.content}
                </p>

                {thread.images && (
                    <img
                        className="object-contain max-h-75 max-w-75"
                        src={thread.images}
                        alt="thread image"
                    />
                )}
            </div>
            <p className="text-muted-foreground text-sm">
                {formatDate(new Date(thread.createdAt))}
            </p>
            <div>
                <ThreadActions
                    thread={thread}
                    isPendingLike={isPendingLike}
                    isPendingUnlike={isPendingUnlike}
                    onLike={onLike}
                    onUnlike={onUnlike}
                />
            </div>
        </div>
    );
}
