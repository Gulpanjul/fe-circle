import { useParams } from 'react-router-dom';
import { usePostLike } from '../../hooks';
import ThreadActions from '@/features/thread-detail/components/threadActions';
import CardItemPost from '@/features/shared/cardItemPost';
import type { Thread } from '@/features/thread/types/thread';

export default function ItemPostDetail({ thread }: { thread: Thread }) {
    const { threadId } = useParams();
    const { isPendingLike, isPendingUnlike, onLike, onUnlike } =
        usePostLike(threadId);

    return (
        <CardItemPost
            avatarUrl={thread.user?.profile?.avatarUrl}
            fullName={thread.user?.profile?.fullName}
            username={thread.user?.username}
            createdAt={new Date(thread.createdAt).toISOString()}
            content={thread.content}
            images={thread.images}
        >
            <ThreadActions
                thread={thread}
                isPendingLike={isPendingLike}
                isPendingUnlike={isPendingUnlike}
                onLike={onLike}
                onUnlike={onUnlike}
            />
        </CardItemPost>
    );
}
