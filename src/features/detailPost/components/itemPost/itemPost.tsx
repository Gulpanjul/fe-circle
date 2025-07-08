import type { ReplyEntity } from '@/entities/reply.entity';
import CardItemPost from '@/features/shared/cardItemPost';

export default function CardReply(reply: ReplyEntity) {
    return (
        <CardItemPost
            avatarUrl={reply.user?.profile?.avatarUrl}
            fullName={reply.user?.profile?.fullName}
            username={reply.user?.username}
            createdAt={new Date(reply.createdAt).toISOString()}
            content={reply.content}
            likesCount={reply.likesCount}
            isReply
        />
    );
}
