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
import Payment from '~/pages/Payment/payment';
import TrackingPage from '~/pages/Auth/Tracking/tracking';
import Category from '~/pages/Admin/Category/category';
import Size from '~/pages/Admin/Size/size';
import Topping from '~/pages/Admin/Topping/topping';
import Customers from '~/pages/Admin/Customer/customers';

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
            },
            {
                path: 'payment',
                element: <Payment />
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
            },
            {
                path: 'tracking',
                element: <TrackingPage />
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
                element: <Category />
            },
            {
                path: 'size',
                element: <Size />
            },
            {
                path: 'topping',
                element: <Topping />
            },
            {
                path: 'order',
                element: <h1>Order</h1>
            },
            {
                path: 'user',
                element: <Customers />
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
