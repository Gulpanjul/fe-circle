import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/auth';
import { api } from '@/libs/api';
import type { Thread } from '@/features/thread/types/thread';

export function useProfilePage() {
    const { username: paramUsername } = useParams<{ username: string }>();
    const currentUser = useAuthStore((state) => state.user);

    const isOwnProfile = paramUsername === currentUser.username;

    const {
        data: user,
        isLoading: isUserLoading,
        refetch: refetchUser,
    } = useQuery({
        queryKey: ['user-profile', paramUsername],
        queryFn: async () => {
            const res = await api.get(`/users/username/${paramUsername}`);
            return res.data.data;
        },
        enabled: !!paramUsername,
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
        isOwnProfile,
    };
}
