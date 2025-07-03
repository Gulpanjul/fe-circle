import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthStore } from '@/stores/auth';
import Banner from '@/assets/Banner.png';
import {
    FacebookIcon,
    GithubIcon,
    InstagramIcon,
    LinkedinIcon,
} from 'lucide-react';
import EditProfile from '@/features/profile/components/edit-profile';

export function RightBar() {
    return (
        <div className="flex flex-col gap-3">
            <Profile />
            <Suggestions />
            <Meta />
        </div>
    );
}

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

function Suggestions() {
    return (
        <Card className="bg-secondary">
            <CardHeader>
                <CardTitle className="text-2xl">Suggested for you</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-3">
                    <div className="flex justify-between">
                        <div className="flex items-center gap-2">
                            <Avatar className="w-10 h-10">
                                <AvatarImage
                                    src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"
                                    alt="Avatar"
                                />
                                <AvatarFallback>A</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <p className="font-bold">John Doe</p>
                                <p className="text-muted-foreground">
                                    @johndoe
                                </p>
                            </div>
                        </div>
                        <Button>Follow</Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function Meta() {
    return (
        <Card className="bg-secondary">
            <CardHeader>
                <CardTitle className="text-sm flex flex-wrap gap-1">
                    Developed By
                    <span className="font-semibold"> Andhika C. Gulpa</span>
                    <span className="text-muted-foreground">•</span>
                    {/* Social Icons */}
                    <div className="flex gap-2 items-center">
                        <a
                            href="https://github.com/username"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <GithubIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                        </a>
                        <a
                            href="https://linkedin.com/in/username"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <LinkedinIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                        </a>
                        <a
                            href="https://facebook.com/username"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FacebookIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                        </a>
                        <a
                            href="https://instagram.com/username"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <InstagramIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                        </a>
                    </div>
                </CardTitle>
            </CardHeader>

            <CardContent className="text-sm sm:text-base text-muted-foreground">
                Powered by{' '}
                <span className="font-semibold">Dumbways Indonesia</span> • #1
                Coding Bootcamp
            </CardContent>
        </Card>
    );
}
