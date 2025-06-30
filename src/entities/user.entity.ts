import type { FollowEntity } from './follow.entity';
import type { LikeEntity } from './like.entity';
import type { ProfileEntity } from './profile.entity';
import type { ReplyEntity } from './reply.entity';
import type { ThreadEntity } from './thread.entity';

export interface UserEntity {
    id: string;
    email: string;
    username: string;
    password: string;

    profile?: ProfileEntity;
    threads?: ThreadEntity[];
    likes?: LikeEntity[];
    replies?: ReplyEntity[];
    followers?: FollowEntity[];
    followings?: FollowEntity[];

    createdAt: string;
    updatedAt: string;
}
