import type { LikeEntity } from './like.entity';
import type { ReplyEntity } from './reply.entity';
import type { UserEntity } from './user.entity';

export interface ThreadEntity {
    id: string;
    content: string;
    images: string;
    user?: UserEntity;
    like?: LikeEntity[];
    replies?: ReplyEntity[];
    createdAt: string;
    updatedAt: string;
}
