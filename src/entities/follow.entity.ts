import type { UserEntity } from './user.entity';

export interface FollowEntity {
    id: string;
    content: string;
    followed?: UserEntity;
    following?: UserEntity;
    createdAt: Date;
    updatedAt: Date;
}
