import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { searchUserDatas } from '@/utils/fake-datas/search-users';
import { useDebounce } from 'use-debounce';
import SearchUserCard from './search-user-card';
import { useEffect, useState } from 'react';
import type { SearchUser } from '../types/search-user';
import UserCardSkeleton from '@/components/skeletons/user-card-skeletons';

export default function SearchUsers() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [searchText, setSearchText] = useState<string>('');
    const [searchTextDebounced] = useDebounce(searchText, 500);
    const [searchUserDataInterval, setSearchUserDataInterval] = useState<
        SearchUser[]
    >([]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSearchText(e.target.value);
    }

    function getSearchUserDatas() {
        setTimeout(() => {
            setSearchUserDataInterval(searchUserDatas);
            setIsLoading(false);
        }, 1500);
    }

    useEffect(() => {
        getSearchUserDatas();
    }, []);

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

            {isLoading &&
                Array(searchUserDatas.length)
                    .fill(0)
                    .map((_, index) => <UserCardSkeleton key={index} />)}

            {searchUserDataInterval
                .filter((searchUserData) =>
                    searchUserData.fullName
                        .toLowerCase()
                        .trim()
                        .includes(searchTextDebounced.toLowerCase().trim()),
                )
                .map((searchUserData) => (
                    <SearchUserCard
                        searchUserData={searchUserData}
                        key={searchUserData.id}
                    />
                ))}
        </div>
    );
}
