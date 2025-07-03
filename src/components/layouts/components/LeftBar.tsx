import brandLogo from '@/assets/logo.svg';
import { NAV_LINK_MENU } from '@/utils/constants/nav-link-menu';
import { useAuthStore } from '@/stores/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogOutIcon } from 'lucide-react';
import { cn } from '@/libs/utils';
import Cookies from 'js-cookie';
import type React from 'react';

export function LeftBar(props: React.HTMLAttributes<HTMLDivElement>) {
    const { pathname } = useLocation();
    const { logout } = useAuthStore();
    const navigate = useNavigate();

    function onLogout() {
        logout();
        Cookies.remove('token');
        navigate('login');
    }

    return (
        <div
            {...props}
            className="flex flex-col h-full items-end justify-between p-10"
        >
            <div className="flex flex-col gap-2">
                <img
                    src={brandLogo}
                    alt="Logo"
                    className="w-[220px] px-4 mb-6"
                />
                {NAV_LINK_MENU.map(({ label, logo, path }, index) => {
                    const isActive = pathname === path;
                    const Icon = isActive ? logo.fill : logo.outline;

                    return (
                        <Link
                            key={index}
                            to={path}
                            className={cn(
                                'flex items-center gap-4 px-5 py-4 hover:bg-muted rounded-md',
                                isActive && 'bg-muted font-semibold',
                            )}
                        >
                            <Icon
                                className={cn(
                                    'w-[27px] h-[27px] box-content',
                                    isActive && 'rounded-sm outline-2',
                                )}
                            />
                            <span>{label}</span>
                        </Link>
                    );
                })}
            </div>
            <Button
                onClick={onLogout}
                variant="ghost"
                className="flex justify-start gap-4 px-5 py-4 hover:bg-muted rounded-md w-full h-[67px]"
            >
                <LogOutIcon className="w-[27px] h-[27px] box-content" />
                <span>Logout</span>
            </Button>
        </div>
    );
}
