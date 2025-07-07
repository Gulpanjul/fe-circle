import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useSearchUsers } from '../hooks/useSearchUsers';
import SearchInput from '../components/searchInput';
import SearchResult from '../components/searchResult';

export default function Search() {
    const [searchText, setSearchText] = useState('');
    const [debounced] = useDebounce(searchText, 500);
    const { data, isLoading } = useSearchUsers(debounced);

    return (
        <div className="h-screen px-4 py-6">
            <SearchInput onChange={(e) => setSearchText(e.target.value)} />
            <SearchResult
                isLoading={isLoading}
                users={data?.data ?? []}
                searchText={debounced}
            />
        </div>
    );
}
