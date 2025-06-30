import type { ThreadEntity } from './thread.entity';
import type { UserEntity } from './user.entity';
export interface LikeEntity {
    id: string;
    content: string;
    threadId: string;
    userId: string;

    thread?: ThreadEntity;
    user?: UserEntity;

    createdAt: Date;
    updatedAt: Date;
}
