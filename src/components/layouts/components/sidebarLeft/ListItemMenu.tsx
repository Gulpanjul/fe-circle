import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth';
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
            className="flex justify-start gap-4 px-5 py-4 hover:bg-muted rounded-md w-full h-[67px]"
        >
            <RiLogoutBoxLine className="w-[27px] h-[27px] box-content" />
            <span>Logout</span>
        </Button>
    );
}

export default ListItemMenu;
