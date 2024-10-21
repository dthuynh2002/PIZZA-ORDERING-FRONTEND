import { createBrowserRouter } from 'react-router-dom';

import { DefaultLayout, ProfileLayout } from '~/layouts';

import LoginPage from '~/pages/Auth/Login/login';
import RegisterPage from '~/pages/Auth/Register/register';
import HomePage from '~/pages/Home/home';
import ProductPage from '~/pages/Product/product';
import ProfilePage from '~/pages/Auth/Profile/profile';
import ChangePasswordPage from '~/pages/Auth/ChangePassword/changePassword';
import OrderHistoryPage from '~/pages/Auth/OrderHistory/oderHistory';
import AboutUs from '~/pages/AboutUs/aboutUs';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <HomePage />
            },
            {
                path: 'product',
                element: <ProductPage />
            },
            {
                path: 'about-us',
                element: <AboutUs />
            }
        ]
    },
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '/register',
        element: <RegisterPage />
    },
    {
        path: '/',
        element: <ProfileLayout />,
        children: [
            {
                path: 'profile',
                element: <ProfilePage />
            },
            {
                path: 'change-password',
                element: <ChangePasswordPage />
            },
            {
                path: 'history',
                element: <OrderHistoryPage />
            }
        ]
    }
]);
