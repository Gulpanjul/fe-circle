import type { Thread } from '@/features/thread/types/thread';
import { api } from '@/libs/api';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export function useUserProfile() {
    const { username } = useParams<{ username: string }>();

    const {
        data: user,
        refetch,
        isLoading: isUserLoading,
    } = useQuery({
        queryKey: ['user-profile', username],
        queryFn: async () => {
            const response = await api.get(`/users/username/${username}`);
            return response.data.data;
        },
        enabled: !!username,
    });

    const { data: userPosts = [], isLoading: isPostsLoading } = useQuery<
        Thread[]
    >({
        queryKey: ['user-posts', username],
        queryFn: async () => {
            const response = await api.get(`/threads/user/${user?.id}`);
            return response.data.data;
        },
        enabled: !!user?.id,
    });

    return {
        user,
        userPosts,
        isUserLoading,
        isPostsLoading,
        refetch,
    };
}
