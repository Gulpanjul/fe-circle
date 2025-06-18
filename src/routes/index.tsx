import { createBrowserRouter } from 'react-router-dom';
import RegisterPage from './register';
import HomePage from './home';
import LoginPage from './login';
import ForgotPasswordPage from './forgot-password';
import ResetPasswordPage from './reset-password';

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
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
]);

export default router;
