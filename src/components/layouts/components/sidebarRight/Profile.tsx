import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import EditProfile from '@/features/profile/components/editProfile';
import { useAuthStore } from '@/stores/auth';
import Banner from '@/assets/banner.png';

function Profile() {
    const {
        username,
        followers,
        followings,
        profile: { fullName, bio, bannerUrl, avatarUrl },
    } = useAuthStore((state) => state.user);
    return (
        <Card className="bg-secondary">
            <CardHeader>
                <CardTitle className="text-2xl">My Profile</CardTitle>
            </CardHeader>

            <CardContent>
                <div className="flex flex-col gap-3">
                    <div className="relative w-full">
                        <img
                            src={bannerUrl || Banner}
                            alt="Banner"
                            className="w-full h-[3rem] sm:h-[9rem] md:h-[7rem] object-cover rounded-lg"
                        />

                        <div className="absolute -bottom-11 left-0 right-0 pl-4 sm:pl-6 flex justify-between items-end">
                            <Avatar className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-black bg-white">
                                <AvatarImage
                                    src={
                                        avatarUrl ||
                                        `https://api.dicebear.com/9.x/notionists/svg?seed=${fullName}`
                                    }
                                    alt={fullName}
                                />
                                <AvatarFallback>{fullName?.[0]}</AvatarFallback>
                            </Avatar>

                            <EditProfile />
                        </div>
                    </div>

                    <div className="pt-14 sm:pt-16 flex flex-col gap-1 px-2 sm:px-4">
                        <p className="font-bold text-lg sm:text-xl">
                            ✨{fullName}✨
                        </p>
                        <p className="text-muted-foreground text-sm sm:text-base">
                            @{username}
                        </p>
                        <p className="text-sm sm:text-base">
                            {bio || 'No bio'}
                        </p>

                        <div className="flex gap-6 mt-2 text-sm sm:text-base">
                            <div className="flex gap-1">
                                <span className="font-bold">
                                    {followings?.length}
                                </span>
                                <span className="text-muted-foreground">
                                    Following
                                </span>
                            </div>
                            <div className="flex gap-1">
                                <span className="font-bold">
                                    {followers?.length}
                                </span>
                                <span className="text-muted-foreground">
                                    Followers
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default Profile;
