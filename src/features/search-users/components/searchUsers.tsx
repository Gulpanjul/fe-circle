import { Loader2, UserSearch } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useDebounce } from 'use-debounce';
import SearchUserCard from './searchUserCard';
import { useState } from 'react';
import type { SearchUser } from '../types/searchUser';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/libs/api';

export default function SearchUsers() {
    const [searchText, setSearchText] = useState<string>('');
    const [searchTextDebounced] = useDebounce(searchText, 500);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSearchText(e.target.value);
    }

    const { data, isLoading } = useQuery({
        queryKey: ['search-users'],
        queryFn: async () => {
            const response = await api.get(
                `/users/search?q=${searchTextDebounced}`,
            );
            return response.data;
        },
        enabled: !!searchTextDebounced.trim(),
    });

    const users = data?.data ?? [];

    return (
        <div className="space-y-4">
            <div className="relative w-full">
                <UserSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4"></UserSearch>
                <Input
                    placeholder="Username"
                    className="pl-10 rounded-xl focus-visible:ring-brand"
                    onChange={handleChange}
                />
            </div>

            {isLoading ? (
                <Loader2 className="animate-spin h-5 w-5 text-muted-foreground" />
            ) : searchTextDebounced.trim() === '' ? (
                <div className="flex flex-col justify-center items-center h-64 text-center">
                    <p className="text-base font-medium">
                        Write and search something
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                        Try searching for something else or check the spelling
                        of what you typed.
                    </p>
                </div>
            ) : (
                <>
                    {users?.map((user: SearchUser) => (
                        <SearchUserCard key={user.id} searchUserData={user} />
                    ))}
                </>
            )}
        </div>
    );
}
