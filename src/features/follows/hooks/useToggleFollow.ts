import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { api } from '@/libs/api';

export function useToggleFollow(initialState: boolean, followedId: string) {
    const [isFollowed, setIsFollowed] = useState(initialState);
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async () => {
            if (isFollowed) {
                await api.delete(`/follow/${followedId}`);
            } else {
                await api.post('/follow', { followedId });
            }
        },
        onSuccess: () => {
            setIsFollowed((prev) => !prev);
            queryClient.invalidateQueries({ queryKey: ['user-profile'] });
            queryClient.invalidateQueries({ queryKey: ['user-posts'] });
            queryClient.invalidateQueries({ queryKey: ['suggested-users'] });
            queryClient.invalidateQueries({ queryKey: ['followers'] });
            queryClient.invalidateQueries({ queryKey: ['followings'] });
        },
        onError: (error) => {
            console.error('Failed to toggle follow:', error);
        },
    });

    return {
        isFollowed,
        toggleFollow: mutation.mutate,
        isLoading: mutation.isPending,
    };
}
