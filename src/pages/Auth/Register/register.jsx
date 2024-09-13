import { Fragment } from "react";
import {MenuUnfoldOutlined, ForwardOutlined} from '@ant-design/icons'

const RegisterPage = () => {
    return (
        <Fragment>
            <div className="flex items-center justify-center">
            <MenuUnfoldOutlined />
            <ForwardOutlined />
            <i className="fa-regular fa-image"></i>

            <h1 className="px-5 py-10 text-2xl border-2 text-[red]">Register Page</h1>
            <p>Welcome to the register page!</p>
            </div>
        </Fragment>
    );
};
export default RegisterPage;