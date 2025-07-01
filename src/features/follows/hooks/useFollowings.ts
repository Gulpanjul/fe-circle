import { useQuery } from '@tanstack/react-query';
import { api } from '@/libs/api';
import type { FollowEntity } from '@/entities/follow.entity';

export const useFollowings = () => {
    return useQuery<FollowEntity[]>({
        queryKey: ['followings'],
        queryFn: async () => {
            const res = await api.get('/follow/followings');
            return res.data.data;
        },
    });
};
