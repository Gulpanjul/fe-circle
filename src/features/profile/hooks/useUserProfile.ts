import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { api } from '@/libs/api';
import type { Thread } from '@/features/thread/types/thread';

export function useUserProfile() {
    const { username } = useParams<{ username: string }>();

    // Query untuk data user lengkap (termasuk followers, followings, dll)
    const {
        data: user,
        isLoading: isUserLoading,
        refetch: refetchUser,
    } = useQuery({
        queryKey: ['user-profile', username],
        queryFn: async () => {
            const res = await api.get(`/users/username/${username}`);
            return res.data.data;
        },
        enabled: !!username,
    });

    const {
        data: userPosts = [],
        isLoading: isPostsLoading,
        refetch: refetchPosts,
    } = useQuery<Thread[]>({
        queryKey: ['user-posts', user?.id],
        queryFn: async () => {
            const res = await api.get(`/threads/users/${user?.id}`);
            return res.data.data;
        },
        enabled: !!user?.id,
    });
    const refetchAll = async () => {
        await Promise.all([refetchUser(), refetchPosts()]);
    };

    return {
        user,
        userPosts,
        isUserLoading,
        isPostsLoading,
        refetch: refetchAll,
    };
}
