import { createBrowserRouter } from 'react-router-dom';
import HomePage from './home';
import FollowsPage from './follows';
import ProfilePage from './profile';
import RegisterPage from './register';
import LoginPage from './login';
import ForgotPasswordPage from './forgot-password';
import ResetPasswordPage from './resetPassword';
import AuthLayout from '@/components/layouts/authLayout';
import AppLayout from '@/components/layouts/appLayout';
import ThreadDetailPage from './threadDetail';
import SearchUsersPage from './searchUsers';

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
                element: <SearchUsersPage />,
            },
            {
                path: '/follows',
                element: <FollowsPage />,
            },
            {
                path: '/profile',
                element: <ProfilePage />,
            },
            {
                path: '/detail/:threadId',
                element: <ThreadDetailPage />,
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
