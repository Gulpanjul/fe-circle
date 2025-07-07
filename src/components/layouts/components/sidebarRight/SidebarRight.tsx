import Meta from './Meta';
import Profile from './Profile';
import SuggestionsPeople from './SuggestionPeople';

function SidebarRight() {
    return (
        <div className="flex flex-col gap-4">
            <Profile />
            <SuggestionsPeople />
            <Meta />
        </div>
    );
}

export default SidebarRight;
