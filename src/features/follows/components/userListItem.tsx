import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FollowToggleButton } from './followToggleButton';
import type { UserListItemProps } from '../types/userListItemProps';
import { useToggleFollow } from '../hooks/useToggleFollow';

export const UserListItem = ({
    id,
    fullName,
    username,
    avatarUrl,
    bio,
    isFollowed: initiallyFollowed,
}: UserListItemProps) => {
    const { isFollowed, toggleFollow, isLoading } = useToggleFollow(
        initiallyFollowed,
        id,
    );

    return (
        <li key={id}>
            <div className="flex gap-4 py-4 items-center justify-between">
                <div className="flex gap-4">
                    <Avatar className="w-[50px] h-[50px]">
                        <AvatarImage
                            src={avatarUrl || ''}
                            alt={fullName || ''}
                        />
                        <AvatarFallback>
                            {fullName.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col gap-1">
                        <div className="gap-1 text-sm">
                            <p className="font-bold">{fullName}</p>
                            <p className="text-muted-foreground">@{username}</p>
                            <p>{bio}</p>
                        </div>
                    </div>
                </div>

                <FollowToggleButton
                    isFollowed={isFollowed}
                    onClick={toggleFollow}
                    isLoading={isLoading}
                />
            </div>
        </li>
    );
};
