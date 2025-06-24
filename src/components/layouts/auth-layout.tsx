import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function AuthLayout() {
    const token = Cookies.get('token');

    if (token) return <Navigate to={'/'} />;

    return <Outlet />;
}
