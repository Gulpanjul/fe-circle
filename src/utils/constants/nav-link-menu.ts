import { useAuthStore } from '@/stores/auth';
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

export interface NavLinkMenu {
    label: string;
    path: string;
    logo: {
        fill: IconType;
        outline: IconType;
    };
}

export function useNavLinkMenu(): NavLinkMenu[] {
    const username = useAuthStore((state) => state.user?.username ?? '');

    return [
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
            path: `/${username}`,
            logo: {
                fill: RiAccountCircleFill,
                outline: RiAccountCircleLine,
            },
        },
    ];
}
