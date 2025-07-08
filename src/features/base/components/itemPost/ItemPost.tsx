import { useNavigate } from 'react-router-dom';
import ThreadActions from '@/features/thread-detail/components/threadActions';
import CardItemPost from '@/features/shared/cardItemPost';
import type { Thread } from '@/features/thread/types/thread';
import { usePostLike } from '@/features/detailPost/hooks';

export default function CardPost(thread: Thread) {
    const navigate = useNavigate();
    const onClickCard = () => navigate(`/detail/${thread.id}`);

    const { isPendingLike, isPendingUnlike, onLike, onUnlike } = usePostLike(
        thread.id,
    );

    return (
        <CardItemPost
            avatarUrl={thread.user?.profile?.avatarUrl}
            fullName={thread.user?.profile?.fullName}
            username={thread.user?.username}
            createdAt={new Date(thread.createdAt).toISOString()}
            content={thread.content}
            images={thread.images}
            onClickContent={onClickCard}
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
