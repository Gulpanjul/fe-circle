import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import type { ThreadEntity } from '@/entities/thread.entity';
import { api } from '@/lib/api';
import { useAuthStore } from '@/stores/auth';
import { useQuery } from '@tanstack/react-query';
import Banner from '@/assets/Banner.png';
import CardThreadProfile from '@/features/home/components/card-thread-profile';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

export default function Profile() {
    const {
        id: userId,
        username,
        followings,
        followers,
        profile: { fullName, avatarUrl, bio },
    } = useAuthStore((state) => state.user);

    const { data: posts = [] } = useQuery<ThreadEntity[]>({
        queryKey: ['userPosts', userId],
        queryFn: async () => {
            const response = await api.get(`/threads/users/${userId}`);
            return response.data.data;
        },
        enabled: !!userId,
    });

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

                    <Button
                        variant="outline"
                        className="rounded-full h-8 text-xs hover:bg-muted transition-all"
                    >
                        Edit Profile
                    </Button>
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-xl font-bold">✨{fullName}✨</p>
                    <p className="text-muted-foreground text-sm">@{username}</p>
                    <p className="text-sm">{bio || 'No bio available'}</p>

                    <div className="flex gap-4 mt-2 text-sm">
                        <div className="flex gap-1">
                            <span className="font-semibold">
                                {followers?.length ?? 0}
                            </span>
                            <span className="text-muted-foreground">
                                Followers
                            </span>
                        </div>
                        <div className="flex gap-1">
                            <span className="font-semibold">
                                {followings?.length ?? 0}
                            </span>
                            <span className="text-muted-foreground">
                                Following
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <Tabs defaultValue="followers" className="relative w-full ">
                <TabsList className="w-full bg-background rounded-none p-0 border-b gap-1">
                    <TabsTrigger
                        value="followers"
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
                        value="following"
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

                <TabsContent value="followers">
                    <div className="text-sm text-muted-foreground">
                        {(posts ?? []).length > 0 ? (
                            posts.map((post) => (
                                <CardThreadProfile
                                    key={post.id}
                                    {...post}
                                    likesCount={post.like?.length ?? 0}
                                    repliesCount={post.replies?.length ?? 0}
                                    isLiked={false}
                                />
                            ))
                        ) : (
                            <p className="text-sm text-muted-foreground">
                                No posts yet.
                            </p>
                        )}
                    </div>
                </TabsContent>

                <TabsContent value="following">
                    <div className="text-sm text-muted-foreground">
                        You are not following anyone yet.
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
