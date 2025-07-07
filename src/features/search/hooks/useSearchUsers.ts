import { useQuery } from '@tanstack/react-query';
import { api } from '@/libs/api';
import type { SearchUser } from '../types/searchUser';

export function useSearchUsers(query: string) {
    return useQuery<{ data: SearchUser[] }>({
        queryKey: ['search-users', query],
        queryFn: async () => {
            const response = await api.get(`/users/search?q=${query}`);
            return response.data;
        },
        enabled: query.trim().length > 0,
        staleTime: 1000 * 30,
    });
}
