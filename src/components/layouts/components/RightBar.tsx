import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthStore } from '@/stores/auth';

export function RightBar() {
    const {
        username,
        profile: { fullName, bio, bannerUrl, avatarUrl },
    } = useAuthStore((state) => state.user);

    return (
        <Card className="bg-secondary">
            <CardHeader>
                <CardTitle className="text-2xl">My Profile</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-3">
                    <div
                        className="rounded-lg p-4 bg-cover bg-center"
                        style={{ backgroundImage: `url(${bannerUrl})` }}
                    >
                        <Avatar className="w-20 h-20 mx-auto">
                            <AvatarImage
                                src={
                                    avatarUrl ||
                                    `https://api.dicebear.com/9.x/notionists/svg?seed=${fullName}`
                                }
                                alt={fullName}
                            />
                            <AvatarFallback>
                                {fullName.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                    </div>
                    <Button className="bg-brand text-white">
                        Edit Profile
                    </Button>
                    <div className="mt-4 flex flex-col gap-1">
                        <p>{fullName}</p>
                        <p className="text-muted-foreground">@{username}</p>
                        <p>{bio}</p>
                        <div className="flex gap-4 mt-2">
                            <div className="flex gap-1">
                                <span className="font-bold">{200}</span>
                                <span>Following</span>
                            </div>
                            <div className="flex gap-1">
                                <span className="font-bold">{100}</span>
                                <span>Followers</span>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
