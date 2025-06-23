import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth';
import { LeftBar } from './components/LeftBar';
import { RightBar } from './components/RightBar';

export default function AppLayout() {
    const username = useAuthStore((state) => state.user.username);
    if (!username) return <Navigate to={'/login'} />;

    return (
        <div className="grid grid-cols-4">
            <div className="h-screen p-10 hidden lg:block">
                <LeftBar />
            </div>

            <div className="col-span-2 p-10 border-x outline">
                <Outlet />
            </div>

            <div className="h-screen p-10 hidden lg:block">
                <RightBar />
            </div>
        </div>
    );
}
