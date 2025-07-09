import { useNavLinkMenu } from '@/utils/constants/nav-link-menu';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/libs/utils';

function ListMenu() {
    const { pathname } = useLocation();
    const navLinks = useNavLinkMenu();

    return (
        <div className="flex flex-col gap-6 items-center">
            {navLinks.map(({ label, logo, path }, index) => {
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
                        <span className="absolute top-full left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-muted px-2 py-1 text-sm opacity-0 group-hover:opacity-100 group-hover:translate-y-1 group-hover:scale-100 transition-all duration-200 ease-out transform scale-95 translate-y-0 z-10 shadow">
                            {label}
                        </span>
                    </Link>
                );
            })}
        </div>
    );
}

export default ListMenu;
