import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/libs/utils';
import { useNavLinkMenu } from '@/utils/constants/nav-link-menu';
import FormStatusTrigger from './FormStatusTrigger';

function ListMenu() {
    const { pathname } = useLocation();
    const navLinks = useNavLinkMenu();

    return (
        <div className="flex flex-col gap-2">
            {navLinks.map((item, index) => {
                const isActive = pathname === item.path;
                const Icon = isActive ? item.logo.fill : item.logo.outline;

                return (
                    <Link
                        key={index}
                        to={item.path}
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
                        <span>{item.label}</span>
                    </Link>
                );
            })}
            <FormStatusTrigger />
        </div>
    );
}

export default ListMenu;
