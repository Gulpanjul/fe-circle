import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/auth';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { RiLogoutBoxLine } from 'react-icons/ri';

function ListItemMenu() {
    const { logout } = useAuthStore();
    const navigate = useNavigate();

    function onLogout() {
        logout();
        Cookies.remove('token');
        navigate('/login');
    }

    return (
        <Button
            onClick={onLogout}
            variant="ghost"
            className="group relative flex items-center justify-center w-14 h-14"
        >
            <RiLogoutBoxLine className="w-5 h-5" />
            <span className="absolute left-full ml-2 whitespace-nowrap rounded bg-muted px-2 py-1 text-sm opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow">
                Logout
            </span>
        </Button>
    );
}

export default ListItemMenu;
