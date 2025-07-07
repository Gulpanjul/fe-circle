import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import AuthLayout from '@/components/layouts/authLayout';
import AppLayout from '@/components/layouts/appLayout';

// ⬇️ Lazy load semua halaman
const ForgotPasswordPage = lazy(() => import('@/pages/auth/forgotPassword'));
const LoginPage = lazy(() => import('@/pages/auth/login'));
const RegisterPage = lazy(() => import('@/pages/auth/register'));
const ResetPasswordPage = lazy(() => import('@/pages/auth/resetPassword'));
const BasePage = lazy(() => import('@/pages/base'));
const FollowsPage = lazy(() => import('./follows'));
const ProfilePage = lazy(() => import('./profile'));
const ThreadDetailPage = lazy(() => import('./threadDetail'));
const SearchUsersPage = lazy(() => import('./searchUsers'));
const UserProfilePage = lazy(() => import('./userProfile'));

// ⬇️ Bungkus dengan Suspense
function withSuspense(element: React.ReactNode) {
    return <Suspense fallback={<div>Loading...</div>}>{element}</Suspense>;
}

const router = createBrowserRouter([
    {
        element: <AppLayout />,
        children: [
            {
                path: '/',
                element: withSuspense(<BasePage />),
            },
            {
                path: '/search',
                element: withSuspense(<SearchUsersPage />),
            },
            {
                path: '/follows',
                element: withSuspense(<FollowsPage />),
            },
            {
                path: '/profile',
                element: withSuspense(<ProfilePage />),
            },
            {
                path: '/detail/:threadId',
                element: withSuspense(<ThreadDetailPage />),
            },
            {
                path: '/:username',
                element: withSuspense(<UserProfilePage />),
            },
        ],
    },
    {
        element: <AuthLayout />,
        children: [
            {
                path: '/login',
                element: withSuspense(<LoginPage />),
            },
            {
                path: '/register',
                element: withSuspense(<RegisterPage />),
            },
            {
                path: '/forgot-password',
                element: withSuspense(<ForgotPasswordPage />),
            },
            {
                path: '/reset-password',
                element: withSuspense(<ResetPasswordPage />),
            },
        ],
    },
]);

export default router;
