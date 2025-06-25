import { Loader2, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useDebounce } from 'use-debounce';
import SearchUserCard from './search-user-card';
import { useEffect, useState } from 'react';
import type { SearchUser } from '../types/search-user';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export default function SearchUsers() {
    const [searchText, setSearchText] = useState<string>('');
    const [searchTextDebounced] = useDebounce(searchText, 500);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSearchText(e.target.value);
    }

    const {
        data: users,
        isLoading,
        refetch,
    } = useQuery<SearchUser[]>({
        queryKey: ['search-users'],
        queryFn: async () => {
            const response = await api.get(
                `/users?search=${searchTextDebounced}`,
            );
            return response.data;
        },
    });

    useEffect(() => {
        refetch();
    }, [searchTextDebounced, refetch]);

    return (
        <div className="space-y-4">
            <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4"></Search>
                <Input
                    placeholder="Username"
                    className="pl-10 rounded-xl focus-visible:ring-brand"
                    onChange={handleChange}
                />
            </div>

            {isLoading ? (
                <Loader2 className="animate-spin h-5 w-5 text-muted-foreground" />
            ) : (
                <>
                    {users?.map((user) => (
                        <SearchUserCard key={user.id} searchUserData={user} />
                    ))}
                </>
            )}
        </div>
    );
}
