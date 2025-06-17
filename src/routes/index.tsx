import { createBrowserRouter } from 'react-router-dom';
import RegisterPage from './register';
import HomePage from './home';
import LoginPage from './Login';

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
]);

export default router;
