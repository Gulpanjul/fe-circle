import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth';
import { LeftBar } from './components/LeftBar';
import { RightBar } from './components/RightBar';
import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { api } from '@/lib/api';

export default function AppLayout() {
    const {
        user: { username },
        setUser,
        logout,
    } = useAuthStore();

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
        if (!username) {
            if (!username) return <Navigate to="/login" />;
        }

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
    return <></>;
}
