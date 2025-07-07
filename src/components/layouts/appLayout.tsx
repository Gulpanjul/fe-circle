import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/auth';
import { api } from '@/libs/api';

import SidebarRight from './components/sidebarRight';
import SidebarLeft from './components/sidebarLeft';
import SidebarLeftIconOnly from './components/sidebarLeftIconOnly/SidebarLeftIconOnly';

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
            <div className="flex justify-center min-h-screen w-full max-w-[1920px] mx-auto">
                {/* Left Sidebar */}
                <div>
                    {/* Show full LeftBar on xl+, IconOnlyLeftBar on smaller screens */}
                    <div className="hidden xl:block w-[280px] h-screen sticky top-0">
                        <SidebarLeft />
                    </div>
                    <div className="block xl:hidden p-4 h-screen sticky top-0">
                        <SidebarLeftIconOnly />
                    </div>
                </div>

                {/* Main Content (Thread/Post/Outlet) */}
                <div className="flex-[2] min-w-0 border-x outline pt-10">
                    <Outlet />
                </div>

                {/* Right Sidebar */}
                <div className="hidden lg:block flex-[1] p-6 sm:p-8 md:p-10 w-[320px] xl:w-[360px] 2xl:w-[400px]">
                    <SidebarRight />
                </div>
            </div>
        );
    }
    return <></>;
}
