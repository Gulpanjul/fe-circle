// hooks/use-suggested-users.ts
import { useQuery } from '@tanstack/react-query';
import { api } from '@/libs/api';
import type { SearchUser } from '@/features/search/types/searchUser';

export function useSuggestedUsers() {
    return useQuery<SearchUser[]>({
        queryKey: ['suggested-users'],
        queryFn: async () => {
            const response = await api.get('/users/suggested');
            return response.data.data;
        },
    });
}
