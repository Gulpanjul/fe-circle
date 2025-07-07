import EmptyState from '../emptyState';
import ItemPost from '../itemPost';
import { Loader2 } from 'lucide-react';
import type { SearchUser } from '../../types/searchUser';

interface Props {
    isLoading: boolean;
    users: SearchUser[];
    searchText: string;
}

function SearchResult({ isLoading, users, searchText }: Props) {
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-full">
                <Loader2 className="animate-spin w-6 h-6 text-muted-foreground" />
            </div>
        );
    }

    if (searchText.trim() === '') {
        return (
            <EmptyState
                title="Write and search something"
                message="Try searching for something else or check the spelling of what you typed."
            />
        );
    }

    if (users.length === 0) {
        return (
            <EmptyState
                title={`No result for "${searchText}"`}
                message="Try searching for something else or check the spelling of what you typed."
            />
        );
    }

    return (
        <div className="mt-4 flex flex-col gap-4">
            {users.map((user) => (
                <ItemPost key={user.id} searchUserData={user} />
            ))}
        </div>
    );
}

export default SearchResult;
