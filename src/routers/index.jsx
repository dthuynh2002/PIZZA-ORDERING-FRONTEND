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
import Cart from '~/pages/Cart/cart';
import AdminLayout from '~/layouts/AdminLayout';

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
            },
            {
                path: 'cart',
                element: <Cart />
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
    },
    {
        path: '/',
        element: <AdminLayout />,
        children: [
            {
                path: 'dashboard',
                element: <h1>Dashboard</h1>
            },
            {
                path: 'products',
                element: <h1>Product </h1>
            },
            {
                path: 'category',
                element: <h1>Category</h1>
            },
            {
                path: 'size',
                element: <h1>Size</h1>
            },
            {
                path: 'topping',
                element: <h1>Topping</h1>
            },
            {
                path: 'order',
                element: <h1>Order</h1>
            },
            {
                path: 'user',
                element: <h1>User</h1>
            },
            {
                path: 'staff',
                element: <h1>Staff</h1>
            },
            {
                path: 'supervisor',
                element: <h1>Supervisor</h1>
            },
            {
                path: 'admin-profile',
                element: <ProfilePage />
            },
            {
                path: 'admin-change-password',
                element: <ChangePasswordPage />
            }
        ]
    }
]);
