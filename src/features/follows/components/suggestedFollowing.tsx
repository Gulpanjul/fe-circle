// components/suggested-following.tsx
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { SearchUser } from '@/features/search/types/searchUser';
import { useToggleFollow } from '../hooks/useToggleFollow';
import { FollowToggleButton } from './followToggleButton';

interface SuggestedFollowingProps {
    user: SearchUser;
    goToProfile: (username: string) => void;
}

export function SuggestedFollowing({
    user,
    goToProfile,
}: SuggestedFollowingProps) {
    const { isFollowed, toggleFollow, isLoading } = useToggleFollow(
        user.isFollowed,
        user.id,
    );

    return (
        <div className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-xl">
            <div
                className="flex gap-4 cursor-pointer w-full"
                onClick={() => goToProfile(user.username)}
            >
                <Avatar className="w-10 h-10">
                    <AvatarImage
                        src={
                            user.profile.avatarUrl ||
                            `https://api.dicebear.com/9.x/micah/svg?seed=${user.profile.fullName}`
                        }
                        alt={user.profile.fullName}
                    />
                    <AvatarFallback>
                        {user.profile.fullName.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                </Avatar>

                <div className="flex flex-col">
                    <p className="font-medium leading-tight">
                        {user.profile.fullName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        @{user.username}
                    </p>
                </div>
            </div>

            <FollowToggleButton
                isFollowed={isFollowed}
                onClick={() => toggleFollow()}
                isLoading={isLoading}
            />
        </div>
    );
}
