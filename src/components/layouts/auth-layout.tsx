import { api } from '@/lib/api';
import { useAuthStore } from '@/stores/auth';
import { isAxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'sonner';

export default function AuthLayout() {
    const { setUser } = useAuthStore();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    async function checkAuth() {
        try {
            const token = localStorage.getItem('token');
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
            console.log(response);
            setIsLoading(false);
        } catch (error) {
            localStorage.removeItem('token');
            if (isAxiosError(error)) {
                toast.error(
                    error.response?.data.message || 'Authentication failed',
                );
            } else {
                toast.error('Something went wrong!');
            }
            setIsLoading(false);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) checkAuth();
    }, []);

    const { user } = useAuthStore();

    if (!isLoading && user) return <Navigate to={'/'} />;

    return <Outlet />;
}
