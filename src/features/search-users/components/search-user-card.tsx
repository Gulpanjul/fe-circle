import { useReducer } from 'react';
import { type SearchUser } from '../types/search-user';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface SearchUserCardProps extends React.HTMLAttributes<HTMLDivElement> {
    searchUserData: SearchUser;
}

export default function SearchUserCard({
    searchUserData,
    ...props
}: SearchUserCardProps) {
    const [, forceUpdate] = useReducer((state) => state + 1, 0);

    return (
        <div className="flex gap-4 border-b py-4 items-start" {...props}>
            <Avatar className="w-[50px] h-[50px]">
                <AvatarImage
                    src={searchUserData.avatarUrl}
                    alt={searchUserData.fullName}
                />
                <AvatarFallback>
                    {searchUserData.fullName.charAt(0)}
                </AvatarFallback>
            </Avatar>

            <div className="flex flex-col gap-1 flex-[10]">
                <p className="font-bold">{searchUserData.fullName}</p>
                <p className="text-muted-foreground">
                    @{searchUserData.username}
                </p>
                <p>{searchUserData.bio}</p>
            </div>

            <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                    searchUserData.isFollowed = !searchUserData.isFollowed;
                    forceUpdate();
                }}
            >
                {searchUserData.isFollowed ? 'Unfollow' : 'Follow'}
            </Button>
        </div>
    );
}
