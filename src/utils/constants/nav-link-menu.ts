import { type IconType } from 'react-icons';
import {
    RiAccountCircleFill,
    RiAccountCircleLine,
    RiHeart2Fill,
    RiHeart2Line,
    RiHome7Fill,
    RiHome7Line,
    RiUserSearchFill,
    RiUserSearchLine,
} from 'react-icons/ri';

interface NavLinkMenu {
    label: string;
    path: string;
    logo: {
        fill: IconType;
        outline: IconType;
    };
}

export const NAV_LINK_MENU: NavLinkMenu[] = [
    {
        label: 'Home',
        path: '/',
        logo: {
            fill: RiHome7Fill,
            outline: RiHome7Line,
        },
    },
    {
        label: 'Search',
        path: '/search',
        logo: {
            fill: RiUserSearchFill,
            outline: RiUserSearchLine,
        },
    },
    {
        label: 'Follows',
        path: '/follows',
        logo: {
            fill: RiHeart2Fill,
            outline: RiHeart2Line,
        },
    },
    {
        label: 'Profile',
        path: '/profile',
        logo: {
            fill: RiAccountCircleFill,
            outline: RiAccountCircleLine,
        },
    },
];
