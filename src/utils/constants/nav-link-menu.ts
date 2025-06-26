import {
    CircleUserRound,
    Heart,
    Home,
    UserRound,
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
            outline: Home,
        },
    },
    {
        label: 'Search',
        path: '/search',
        logo: {
            fill: UserRound,
            outline: UserRound,
        },
    },
    {
        label: 'Follows',
        path: '/follows',
        logo: {
            fill: Heart,
            outline: Heart,
        },
    },
    {
        label: 'Profile',
        path: '/profile',
        logo: {
            fill: CircleUserRound,
            outline: CircleUserRound,
        },
    },
];
