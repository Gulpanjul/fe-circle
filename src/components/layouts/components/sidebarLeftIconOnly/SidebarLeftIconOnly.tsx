import type React from 'react';
import { Logo } from './Logo';
import ListItemMenu from './ListItemMenu';
import ListMenu from './ListMenu';

function IconOnlyLeftBar(props: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            {...props}
            className="flex flex-col h-full items-end justify-between"
        >
            <div className="flex flex-col gap-6 items-center">
                <Logo />
                <ListMenu />
            </div>
            <ListItemMenu />
        </div>
    );
}

export default IconOnlyLeftBar;
