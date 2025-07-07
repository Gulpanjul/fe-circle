import ListItemMenu from './ListItemMenu';
import ListMenu from './ListMenu';
import Logo from './Logo';

function SidebarLeft() {
    return (
        <div className="flex flex-col h-full justify-between p-10">
            <div>
                <Logo />
                <ListMenu />
            </div>
            <ListItemMenu />
        </div>
    );
}

export default SidebarLeft;
