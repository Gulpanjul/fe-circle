import { Skeleton } from '@/components/ui/skeleton';
import { useUserProfile } from '../hooks/useUserProfile';
import { FollowToggleButton } from '@/features/follows/components/followToggleButton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function UserProfile() {
    const { user, userPosts, refetch, isUserLoading, isPostsLoading } =
        useUserProfile();

    if (isUserLoading || !user) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground text-sm">
                    Loading user profile...
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 px-6 py-4 border-l border-border">
            <h1 className="text-2xl font-semibold">
                ✨{user.profile.fullName}✨
            </h1>

            <img src="/cover.svg" alt="Cover" className="rounded-md" />

            <div className="flex justify-between -mt-14 items-end">
                <Avatar className="w-[100px] h-[100px] border-2 border-black ml-5">
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

                <FollowToggleButton
                    followsData={user}
                    key={user.id}
                    isFollowingList={true}
                    onFollowChange={refetch}
                />
            </div>

            <div className="space-y-1">
                <h2 className="text-xl font-bold">{user.profile.fullName}</h2>
                <p className="text-sm text-muted-foreground">
                    @{user.username}
                </p>
                <p>{user.profile.bio || 'No bio available'}</p>
            </div>

            <div className="flex gap-4 text-sm text-muted-foreground">
                <p>{user.followersCount} Followers</p>
                <p>{user.followingsCount} Following</p>
            </div>

            <div className="space-y-4">
                {isPostsLoading ? (
                    <Skeleton className="w-full h-32" />
                ) : userPosts.length > 0 ? (
                    userPosts.map((postData) => (
                        <CardThreadUser key={postData.id} postData={postData} />
                    ))
                ) : (
                    <p className="text-muted-foreground">No posts yet.</p>
                )}
            </div>
        </div>
    );
}
