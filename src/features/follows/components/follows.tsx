import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/libs/utils';
import { useFollowers } from '../hooks/useFollowers';
import { useFollowings } from '../hooks/useFollowings';
import { UserListItem } from './userListItem';

export default function Follows() {
    const { data: followerData, isLoading: loadingFollowers } = useFollowers();
    const { data: followingData, isLoading: loadingFollowings } =
        useFollowings();

    const followers = followerData ?? [];
    const followings = followingData ?? [];

    return (
        <div className="space-y-4">
            <Tabs defaultValue="followers" className="relative w-full">
                <TabsList className="w-full bg-transparent border-b-2 rounded-none">
                    <TabsTrigger
                        value="followers"
                        className={cn(
                            '!bg-transparent active:text-foreground border-0 !border-b-2',
                            'data-[state=active]:border-brand',
                            'dark:data-[state=active]:border-b-brand',
                            'rounded-none',
                        )}
                    >
                        Followers
                    </TabsTrigger>
                    <TabsTrigger
                        value="following"
                        className={cn(
                            '!bg-transparent active:text-foreground border-0 !border-b-2',
                            'data-[state=active]:border-brand',
                            'dark:data-[state=active]:border-b-brand',
                            'rounded-none',
                        )}
                    >
                        Following
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="followers">
                    {loadingFollowers ? (
                        <p className="text-muted-foreground text-sm">
                            Loading followers...
                        </p>
                    ) : followers.length > 0 ? (
                        <ul className="space-y-4">
                            {followers.map((f) => {
                                const user = f.followed;
                                const profile = user?.profile;
                                if (!user || !profile) return null;

                                return (
                                    <UserListItem
                                        key={f.id}
                                        id={user.id}
                                        fullName={profile.fullName}
                                        username={user.username}
                                        avatarUrl={
                                            profile.avatarUrl ?? undefined
                                        }
                                    />
                                );
                            })}
                        </ul>
                    ) : (
                        <p className="text-muted-foreground text-sm">
                            No followers yet.
                        </p>
                    )}
                </TabsContent>

                <TabsContent value="following">
                    {loadingFollowings ? (
                        <p className="text-muted-foreground text-sm">
                            Loading following...
                        </p>
                    ) : followings.length > 0 ? (
                        <ul className="space-y-4">
                            {followings.map((f) => {
                                const user = f.followed;
                                const profile = user?.profile;
                                if (!user || !profile) return null;

                                return (
                                    <UserListItem
                                        key={f.id}
                                        id={user.id}
                                        fullName={profile.fullName}
                                        username={user.username}
                                        avatarUrl={
                                            profile.avatarUrl ?? undefined
                                        }
                                    />
                                );
                            })}
                        </ul>
                    ) : (
                        <p className="text-muted-foreground text-sm">
                            You are not following anyone yet.
                        </p>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}
