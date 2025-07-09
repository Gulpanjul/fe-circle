import type React from 'react';
import { Logo } from './Logo';
import ListItemMenu from './ListItemMenu';
import ListMenu from './ListMenu';
import FormStatusTrigger from './FormStatusTrigger';

function IconOnlyLeftBar(props: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            {...props}
            className="flex flex-col h-full items-end justify-between pb-5"
        >
            <div className="flex flex-col gap-6 items-center">
                <Logo />
                <ListMenu />
                <FormStatusTrigger />
            </div>
            <ListItemMenu />
        </div>
    );
}

export default IconOnlyLeftBar;
