import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import { ThemeToggleButton } from '../ui/mode-toggle-button';

export default function AuthLayout() {
    const token = Cookies.get('token');

    if (token) return <Navigate to={'/'} />;

    return (
        <>
            <div className="fixed top-4 right-4 z-50">
                <ThemeToggleButton />
            </div>
            <Outlet />
        </>
    );
}
