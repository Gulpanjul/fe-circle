import type { ThreadEntity } from './thread.entity';
import type { UserEntity } from './user.entity';

export interface ReplyEntity {
    id: string;
    content: string;
    thread?: ThreadEntity;
    user?: UserEntity;
    createdAt: string;
    updatedAt: string;
}
