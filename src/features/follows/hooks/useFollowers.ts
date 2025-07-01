import type { FollowEntity } from '@/entities/follow.entity';
import { api } from '@/libs/api';
import { useQuery } from '@tanstack/react-query';

export const useFollowers = () => {
    return useQuery<FollowEntity[]>({
        queryKey: ['followers'],
        queryFn: async () => {
            const res = await api.get('/follow/followers');
            return res.data.data;
        },
    });
};
