import { Button } from '@/components/ui/button';
import {
    RiHeart3Fill,
    RiHeart3Line,
    RiMessage2Fill,
    RiMessage2Line,
} from 'react-icons/ri';
import type { Thread } from '@/features/thread/types/thread';

type Props = {
    thread: Thread;
    isPendingLike: boolean;
    isPendingUnlike: boolean;
    onLike: (data: { threadId: string }) => void;
    onUnlike: (data: { threadId: string }) => void;
};

export default function ThreadActions({
    thread,
    isPendingLike,
    isPendingUnlike,
    onLike,
    onUnlike,
}: Props) {
    return (
        <div className="flex gap-2">
            <Button
                variant="ghost"
                className="flex gap-1 p-0 h-auto text-muted-foreground hover:bg-0 dark:hover:bg-0"
                disabled={isPendingLike || isPendingUnlike}
                onClick={() =>
                    thread.isLiked
                        ? onUnlike({ threadId: thread.id })
                        : onLike({ threadId: thread.id })
                }
            >
                {thread.isLiked ? (
                    <RiHeart3Fill className="w-[20px] h-[20px] fill-current text-red-500" />
                ) : (
                    <RiHeart3Line className="w-[20px] h-[20px]" />
                )}
                <span>{thread.likesCount}</span>
            </Button>

            <Button
                variant="ghost"
                className="flex gap-1 text-muted-foreground hover:bg-0 dark:hover:bg-0"
            >
                {thread.repliesCount > 0 ? (
                    <RiMessage2Fill className="w-[20px] h-[20px]" />
                ) : (
                    <RiMessage2Line className="w-[20px] h-[20px]" />
                )}
                <span>{thread.repliesCount} Replies</span>
            </Button>
        </div>
    );
}
