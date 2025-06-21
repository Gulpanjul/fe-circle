import brandLogo from '@/assets/logo.svg';
import { NAV_LINK_MENU } from '@/utils/constants/nav-link-menu';
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores/auth';

export default function AppLayout() {
    const username = useAuthStore((state) => state.user.username);
    if (!username) return <Navigate to={'/login'} />;

    return (
        <div className="grid grid-cols-4">
            <div className="h-screen p-10 hidden lg:block">
                <LeftBar />
            </div>

            <div className="col-span-2 p-10 border-x outline">
                <Outlet />
            </div>

            <div className="h-screen p-10 hidden lg:block">
                <RightBar />
            </div>
        </div>
    );
}

function LeftBar(props: React.HTMLAttributes<HTMLDivElement>) {
    const { pathname } = useLocation();

    return (
        <div {...props}>
            <img src={brandLogo} alt="Logo" className="w-[220px] px-4" />
            <div className="mt-6 bg-background flex flex-col gap-2">
                {NAV_LINK_MENU.map(({ label, logo, path }, index) => {
                    const Icon = pathname === path ? logo.fill : logo.outline;
                    return (
                        <Link
                            key={index}
                            to={path}
                            className={cn(
                                'flex items-center gap-4 px-5 py-4 hover:bg-muted rounded-md',
                                pathname === path && 'bg-muted font-semibold',
                            )}
                        >
                            <Icon className="w-[27px] h-[27px]" />
                            <span>{label}</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

function RightBar() {
    const {
        avatarUrl,
        backgroundUrl,
        followersCount,
        followingsCount,
        fullName,
        username,
        bio,
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
                        style={{ backgroundImage: `url(${backgroundUrl})` }}
                    >
                        <Avatar className="w-20 h-20 mx-auto">
                            <AvatarImage src={avatarUrl} alt={fullName} />
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
                                <span className="font-bold">
                                    {followingsCount}
                                </span>
                                <span>Following</span>
                            </div>
                            <div className="flex gap-1">
                                <span className="font-bold">
                                    {followersCount}
                                </span>
                                <span>Followers</span>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
