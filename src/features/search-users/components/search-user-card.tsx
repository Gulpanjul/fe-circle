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
    return (
        <div className="flex gap-4 border-b py-4 items-start" {...props}>
            <Avatar className="w-[50px] h-[50px]">
                <AvatarImage
                    src={searchUserData.profile.avatarUrl ?? ''}
                    alt={searchUserData.profile.fullName}
                />
                <AvatarFallback>
                    {searchUserData.profile.fullName}
                </AvatarFallback>
            </Avatar>

            <div className="flex flex-col flex-[10]">
                <p className="font-bold">{searchUserData.profile.fullName}</p>
                <p className="text-muted-foreground">
                    @{searchUserData.username}
                </p>
                <p>{searchUserData.profile.bio}</p>
            </div>

            <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                    // searchUserData.profile.isFollowed = !searchUserData.isFollowed;
                    // forceUpdate();
                }}
            >
                {/* {searchUserData.isFollowed ? 'Unfollow' : 'Follow'} */}
                Follow
            </Button>
        </div>
    );
}
