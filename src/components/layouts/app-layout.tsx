import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth';
import { LeftBar } from './components/LeftBar';
import { RightBar } from './components/RightBar';
import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { api } from '@/lib/api';

export default function AppLayout() {
    const { user, setUser, logout } = useAuthStore();

    const { isFetched } = useQuery({
        queryKey: ['check-auth'],
        queryFn: async () => {
            try {
                const token = Cookies.get('token');
                const response = await api.post(
                    '/auth/check',
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );

                setUser(response.data.data);
                return response.data;
            } catch (error) {
                console.log(error);
                Cookies.remove('token');
                logout();
            }
        },
    });

    if (isFetched) {
        if (!user?.username) return <Navigate to="/login" />;

        return (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr]">
                <div className="hidden lg:block h-screen p-10">
                    <LeftBar />
                </div>

                <div className="p-10 border-x outline">
                    <Outlet />
                </div>

                <div className="hidden lg:flex flex-col gap-4 border-l border-outline p-10">
                    <RightBar />
                </div>
            </div>
        );
    }
    return <></>;
}
