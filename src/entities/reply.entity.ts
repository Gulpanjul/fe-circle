import type { ThreadEntity } from './thread.entity';
import type { UserEntity } from './user.entity';

export interface ReplyEntity {
    id: string;
    content: string;
    threadId: string;

    thread?: ThreadEntity;
    user?: UserEntity;
    likesCount: number;
    isLiked: boolean;

    createdAt: Date;
    updatedAt: Date;
}
