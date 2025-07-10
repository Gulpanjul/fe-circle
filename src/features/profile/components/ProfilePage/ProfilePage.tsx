import { useProfilePage } from '@/features/profile/hooks/useProfilePage';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import EditProfile from '../EditProfile/editProfile';
import Banner from '@/assets/Banner.png';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/libs/utils';
import ItemPost from '../ItemPost';
import { useToggleFollow } from '@/features/follows/hooks/useToggleFollow';
import FollowToggleButton from '@/features/follows/components/FollowToggleButton';

function ProfilePage() {
    const { user, userPosts, isUserLoading, isOwnProfile } = useProfilePage();

    const {
        isFollowed: followState,
        toggleFollow,
        isLoading,
    } = useToggleFollow(user.isFollowed, user.id);

    if (isUserLoading || !user) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground text-sm">User not Found</p>
            </div>
        );
    }

    const { profile, username, followersCount, followingsCount } = user;
    const { fullName, bio, avatarUrl } = profile ?? {};

    return (
        <div className="flex flex-col gap-4 py-6">
            <div className="px-8 flex flex-col gap-4">
                <img
                    src={Banner}
                    alt="Cover"
                    className="rounded-md w-full h-40 object-cover"
                />
                <div className="flex justify-between items-end -mt-16 pl-4">
                    <Avatar className="w-24 h-24 border-4 border-black bg-white">
                        <AvatarImage
                            src={
                                avatarUrl ||
                                `https://api.dicebear.com/9.x/micah/svg?seed=${fullName}`
                            }
                            alt={fullName}
                        />
                        <AvatarFallback>{fullName?.[0]}</AvatarFallback>
                    </Avatar>

                    {isOwnProfile ? (
                        <EditProfile />
                    ) : (
                        <FollowToggleButton
                            isFollowed={followState}
                            onClick={toggleFollow}
                            isLoading={isLoading}
                        />
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <p className="text-xl font-bold">✨{fullName}✨</p>
                    <p className="text-muted-foreground text-sm">@{username}</p>
                    <p className="text-sm">{bio || 'No bio available'}</p>

                    <div className="flex gap-4 mt-2 text-sm">
                        <div className="flex gap-1">
                            <span className="font-semibold">
                                {followingsCount ?? 0}
                            </span>
                            <span className="text-muted-foreground">
                                Following
                            </span>
                        </div>
                        <div className="flex gap-1">
                            <span className="font-semibold">
                                {followersCount ?? 0}
                            </span>
                            <span className="text-muted-foreground">
                                Followers
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <Tabs defaultValue="All Post" className="relative w-full ">
                <TabsList className="w-full bg-background rounded-none p-0 border-b gap-1">
                    <TabsTrigger
                        value="All Post"
                        className={cn(
                            '!bg-transparent border-0 ml-8',
                            'data-[state=active]:border-brand data-[state=active]:border-b-4',
                            'dark:data-[state=active]:border-b-brand',
                            'rounded-none',
                        )}
                    >
                        All Post
                    </TabsTrigger>
                    <TabsTrigger
                        value="Media"
                        className={cn(
                            '!bg-transparent border-0 mr-8',
                            'data-[state=active]:border-brand data-[state=active]:border-b-4',
                            'dark:data-[state=active]:border-b-brand',
                            'rounded-none',
                        )}
                    >
                        Media
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="All Post">
                    {userPosts.map((thread) => (
                        <ItemPost key={thread.id} thread={thread} />
                    ))}
                </TabsContent>

                <TabsContent value="Media">
                    <div className="text-sm text-muted-foreground">
                        Under Construction...
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default ProfilePage;
