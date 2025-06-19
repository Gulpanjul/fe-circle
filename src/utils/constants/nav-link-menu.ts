import {
    Home,
    HomeIcon,
    Search,
    SearchIcon,
    User,
    UserIcon,
    Users,
    UsersIcon,
    type LucideIcon,
} from 'lucide-react';

interface NavLinkMenu {
    label: string;
    path: string;
    logo: {
        fill: LucideIcon;
        outline: LucideIcon;
    };
}

export const NAV_LINK_MENU: NavLinkMenu[] = [
    {
        label: 'Home',
        path: '/',
        logo: {
            fill: Home,
            outline: HomeIcon,
        },
    },
    {
        label: 'Search',
        path: '/search',
        logo: {
            fill: Search,
            outline: SearchIcon,
        },
    },
    {
        label: 'Follows',
        path: '/follows',
        logo: {
            fill: Users,
            outline: UsersIcon,
        },
    },
    {
        label: 'Profile',
        path: '/profile',
        logo: {
            fill: User,
            outline: UserIcon,
        },
    },
];
