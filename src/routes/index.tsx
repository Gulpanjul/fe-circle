import { createBrowserRouter } from 'react-router-dom';
import HomePage from './home';
import FollowsPage from './follows';
import SearchPage from './search';
import ProfilePage from './profile';
import RegisterPage from './register';
import LoginPage from './login';
import ForgotPasswordPage from './forgot-password';
import ResetPasswordPage from './reset-password';
import AuthLayout from '@/components/layouts/auth-layout';
import AppLayout from '@/components/layouts/app-layout';

const router = createBrowserRouter([
    {
        element: <AppLayout />,
        children: [
            {
                path: '/',
                element: <HomePage />,
            },
            {
                path: '/search',
                element: <SearchPage />,
            },
            {
                path: '/follows',
                element: <FollowsPage />,
            },
            {
                path: '/profile',
                element: <ProfilePage />,
            },
        ],
    },
    {
        element: <AuthLayout />,
        children: [
            {
                path: '/login',
                element: <LoginPage />,
            },
            {
                path: '/register',
                element: <RegisterPage />,
            },
            {
                path: '/forgot-password',
                element: <ForgotPasswordPage />,
            },
            {
                path: '/reset-password',
                element: <ResetPasswordPage />,
            },
        ],
    },
]);

export default router;
