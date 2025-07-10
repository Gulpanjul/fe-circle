import { type SearchUser } from '../../types/searchUser';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import FollowToggleButton from '@/features/follows/components/FollowToggleButton';
import { useToggleFollow } from '@/features/follows/hooks/useToggleFollow';

interface ItemPostProps extends React.HTMLAttributes<HTMLDivElement> {
    searchUserData: SearchUser;
}

function ItemPost({ searchUserData, ...props }: ItemPostProps) {
    const {
        id,
        username,
        profile,
        isFollowed: initiallyFollowed,
    } = searchUserData;

    const { isFollowed, toggleFollow, isLoading } = useToggleFollow(
        initiallyFollowed,
        id,
    );
    return (
        <div className="flex gap-4 border-b py-4 items-start" {...props}>
            <Avatar className="w-[50px] h-[50px]">
                <AvatarImage
                    src={profile.avatarUrl ?? ''}
                    alt={profile.fullName}
                />
                <AvatarFallback>
                    {profile.fullName.slice(0, 2).toUpperCase()}
                </AvatarFallback>
            </Avatar>

            <div className="flex flex-col flex-[10]">
                <p className="font-bold">{profile.fullName}</p>
                <p className="text-muted-foreground">@{username}</p>
                <p>{profile.bio || 'No bio'}</p>
            </div>

            <FollowToggleButton
                isFollowed={isFollowed}
                onClick={toggleFollow}
                isLoading={isLoading}
            />
        </div>
    );
}

export default ItemPost;
