import type { ProfileEntity } from '@/entities/profile.entity';
import type { UserEntity } from '@/entities/user.entity';

export type SearchUser = UserEntity & {
    profile: ProfileEntity;
    isFollowed: boolean;
};
