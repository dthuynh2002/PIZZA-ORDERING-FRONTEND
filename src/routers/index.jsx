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
import Category from '~/pages/Admin/Category/category';
import Size from '~/pages/Admin/Size/size';
import Topping from '~/pages/Admin/Topping/topping';
import Customers from '~/pages/Admin/Customer/customers';
import Staffs from '~/pages/Admin/Staff/staffs';
import Supervisor from '~/pages/Admin/Supervisor/supervisor';
import Products from '~/pages/Admin/Product/products';
import Orders from '~/pages/Admin/Order/orders';
import ProtectedRoute from './protectedRoute';

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
            }
        ]
    },
    {
        path: '/',
        element: (
            <ProtectedRoute
                roleRequired={[
                    '449cbc4f-1901-4724-8881-c5fc3b6253e1', // Admin
                    '945a8db9-dc54-4442-9f98-49c6c380f130' // Staff
                ]}
            >
                <AdminLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                path: 'products',
                element: <Products />
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
                element: <Orders />
            },
            {
                path: 'user',
                element: <Customers />
            },
            {
                path: 'staff',
                element: <Staffs />
            },
            {
                path: 'supervisor',
                element: <Supervisor />
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
