import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth';
import { LeftBar } from './components/LeftBar';
import { RightBar } from './components/RightBar';
import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { api } from '@/lib/api';
import { IconOnlyLeftBar } from './components/IconOnlyLeftBar';

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
            <div className="flex justify-center min-h-screen">
                <div className="flex-none">
                    <div className="hidden xl:block p-10 w-[280px]">
                        <LeftBar />
                    </div>
                    <div className="block xl:hidden justify-end p-4">
                        <IconOnlyLeftBar />
                    </div>
                </div>

                <div className="flex-4 p-10 border-x outline min-w-0">
                    <Outlet />
                </div>

                <div className="hidden lg:block w-[320px] xl:w-[360px] 2xl:w-[400px] p-10">
                    <RightBar />
                </div>
            </div>
        );
    }
    return <></>;
}
