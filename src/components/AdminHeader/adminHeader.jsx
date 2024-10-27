import { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Popover } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '~/redux/slice/authSlice';
import logo from '~/assets/images/logo.png';
import defaultAvatar from '~/assets/images/avt.jpg';
import { removeToken } from '~/utils/token';

const AdminHeader = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.user.user);

    let urlImage = import.meta.env.VITE_URL_IMAGE || 'http://localhost:3001/images/';

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };

    const backHome = () => {
        navigate('/');
        removeToken('activeId');
    };

    const gotoProfile = () => {
        navigate('/admin-profile');
    };

    const changePassword = () => {
        navigate('/admin-change-password');
    };

    const logOutHandler = () => {
        dispatch(authActions.logoutUser());
        navigate('/login');
    };
    return (
        <Fragment>
            <header className='sticky top-0 z-10 flex items-center text-2xl justify-between text-red-600 bg-[#f4f6f8] shadow-xl'>
                <div className='flex items-center justify-between w-full pr-10 mx-auto '>
                    <div className='w-full h-auto'>
                        <img
                            src={logo}
                            alt=''
                            className='h-24 bg-center bg-no-repeat bg-cover w-60 '
                            onClick={backHome}
                        />
                    </div>
                    <div className='flex items-center gap-10'>
                        {isAuthenticated ? (
                            <Fragment>
                                <Popover
                                    content={
                                        <div className='flex flex-col gap-2 w-60'>
                                            <span className='text-2xl font-bold'>
                                                {user.user_name}
                                            </span>
                                            <span className='text-xl'>{user.email}</span>
                                            <div className='border-y-2 boder-[f4f4f4] py-1'>
                                                <div
                                                    className='text-2xl cursor-pointer py-2 hover:bg-[#f4f4f4]'
                                                    onClick={gotoProfile}
                                                >
                                                    Thông tin cá nhân
                                                </div>
                                                <div
                                                    className='text-2xl cursor-pointer py-2 hover:bg-[#f4f4f4]'
                                                    onClick={changePassword}
                                                >
                                                    Đổi mật khẩu
                                                </div>
                                            </div>
                                            <span
                                                className='my-2 text-2xl text-red-500 cursor-pointer'
                                                onClick={logOutHandler}
                                            >
                                                Thoát
                                            </span>
                                        </div>
                                    }
                                    trigger='click'
                                    open={open}
                                    onOpenChange={handleOpenChange}
                                >
                                    <img
                                        src={user.avatar ? urlImage + user?.avatar : defaultAvatar}
                                        alt=''
                                        className='-bottom-7 size-20 rounded-full left-10 border-2 border-[#e2e3e2]'
                                    />
                                </Popover>
                            </Fragment>
                        ) : (
                            <Link to='/login'>
                                <Button className='text-blue-500'>Login</Button>
                            </Link>
                        )}
                    </div>
                </div>
            </header>
        </Fragment>
    );
};

export default AdminHeader;
