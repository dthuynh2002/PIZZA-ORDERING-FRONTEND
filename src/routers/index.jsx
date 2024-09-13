import { createBrowserRouter } from "react-router-dom";

import { DefaultLayout } from "~/layouts"

import LoginPage from "~/pages/Auth/Login/login";
import RegisterPage from "~/pages/Auth/Register/register";
import HomePage from "~/pages/Home/home";
import ProductPage from "~/pages/Product/product";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "product",
                element: <ProductPage />,
            },
        ]
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },

])