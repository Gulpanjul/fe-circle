import brandLogo from '@/assets/logo.svg';
import { NAV_LINK_MENU } from '@/utils/constants/nav-link-menu';
import { useAuthStore } from '@/stores/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogOutIcon } from 'lucide-react';
import { cn } from '@/libs/utils';
import Cookies from 'js-cookie';
import type React from 'react';

export function IconOnlyLeftBar(props: React.HTMLAttributes<HTMLDivElement>) {
    const { pathname } = useLocation();
    const { logout } = useAuthStore();
    const navigate = useNavigate();

    function onLogout() {
        logout();
        Cookies.remove('token');
        navigate('login');
    }

    return (
        <div {...props}>
            <div className="flex flex-col items-end justify-between gap-6">
                <img src={brandLogo} alt="Logo" className="w-14 h-14" />
                {NAV_LINK_MENU.map(({ label, logo, path }, index) => {
                    const isActive = pathname === path;
                    const Icon = isActive ? logo.fill : logo.outline;

                    return (
                        <Link
                            key={index}
                            to={path}
                            className={cn(
                                'group relative flex flex-col items-center justify-center w-14 h-14 hover:bg-muted rounded-md',
                                isActive && 'bg-muted',
                            )}
                        >
                            <Icon className="w-6 h-6" />
                            <span className="absolute top-full  left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-muted px-2 py-1 text-sm opacity-0 group-hover:opacity-100 group-hover:translate-y-1 group-hover:scale-100 transition-all duration-200 ease-out transform scale-95 translate-y-0 z-10 shadow">
                                {label}
                            </span>
                        </Link>
                    );
                })}
                <Button
                    onClick={onLogout}
                    variant="ghost"
                    className="group relative flex items-center justify-center w-14 h-14"
                >
                    <LogOutIcon className="w-5 h-5" />
                    <span className="absolute left-full ml-2 whitespace-nowrap rounded bg-muted px-2 py-1 text-sm opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow">
                        Logout
                    </span>
                </Button>
            </div>
        </div>
    );
}
