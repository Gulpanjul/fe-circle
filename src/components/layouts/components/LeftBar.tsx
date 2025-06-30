import brandLogo from '@/assets/logo.svg';
import { NAV_LINK_MENU } from '@/utils/constants/nav-link-menu';
import { useAuthStore } from '@/stores/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogOutIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
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
        <div {...props}>
            <img src={brandLogo} alt="Logo" className="w-[220px] px-4" />
            <div className="mt-6 flex flex-col gap-2">
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
                <Button
                    onClick={onLogout}
                    variant="ghost"
                    className="flex items-center gap-2"
                >
                    <LogOutIcon className="w-5 h-5" />
                    <span>Logout</span>
                </Button>
            </div>
        </div>
    );
}
