import type { UserEntity } from './user.entity';

export interface FollowEntity {
    id: string;
    followedId: string;
    followingId: string;

    followed?: UserEntity;
    following?: UserEntity;

    isFollowed: boolean;

    createdAt: Date;
    updatedAt: Date;
}
