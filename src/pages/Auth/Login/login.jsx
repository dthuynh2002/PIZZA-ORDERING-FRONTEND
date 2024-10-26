import { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Input, Spin } from 'antd';
import { FormOutlined, SafetyOutlined } from '@ant-design/icons';
import background from '~/assets/images/background.jpg';
import { WrapperButton } from '~/pages/Auth/style';
import { Link, useNavigate } from 'react-router-dom';
import { authActions } from '~/redux/slice/authSlice';
import { toast } from 'react-toastify';
import { getToken } from '~/utils/token';
import { getUser } from '~/services/userService';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const clearHandler = () => {
        setEmail('');
        setPassword('');
    };
    const handleLogin = () => {
        if (!email || !password) {
            toast.error('Please enter your email and password');
            return;
        }
        dispatch(authActions.loginUser({ email, password }));
        clearHandler();
        setIsLoading(true);
        setTimeout(async () => {
            const dataAuth = getToken('auth');
            const token = dataAuth?.auth?.access_token;
            try {
                const user = await getUser(token);
                const checkRole = user?.data?.role_id;
                if (
                    checkRole === '449cbc4f-1901-4724-8881-c5fc3b6253e1' || //ADMIN
                    checkRole === '945a8db9-dc54-4442-9f98-49c6c380f130' //STAFF
                ) {
                    navigate('/dashboard');
                } else {
                    navigate('/');
                }
            } catch (e) {
                toast.error(e.message);
            }
            setIsLoading(false);
        }, 3000);
    };

    return (
        <Fragment>
            {isLoading && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50'>
                    <Spin size='large' />
                </div>
            )}
            <div
                className='flex items-center justify-center min-h-screen mx-auto my-0 bg-center bg-no-repeat bg-cover '
                style={{ backgroundImage: `url(${background})` }}
            >
                <form
                    className='w-1/3 h-fit bg-[rgba(0,0,0,0.74)] text-white rounded-xl flex flex-col justify-center py-32 px-10 gap-10 '
                    style={{ backdropFilter: 'blur(19px) saturate(180%)' }}
                >
                    <div className='text-4xl font-bold text-center uppercase'>Đăng nhập</div>
                    <div className='flex flex-col '>
                        <label className='text-2xl'>Email :</label>
                        <Input
                            autoFocus
                            size='large'
                            prefix={<FormOutlined />}
                            placeholder='Nhập Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className='flex flex-col '>
                        <label className='text-2xl'>Mật khẩu :</label>
                        <Input.Password
                            size='large'
                            prefix={<SafetyOutlined />}
                            placeholder='Nhập mật khẩu'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <WrapperButton
                        className='h-16 text-2xl font-bold'
                        type='light'
                        onClick={handleLogin}
                    >
                        Đăng nhập
                    </WrapperButton>
                    <span className='text-center'>
                        {`Bạn đã có tài khoản?`}{' '}
                        <Link className='text-blue-300 underline' to='/register'>
                            Đăng ký
                        </Link>
                    </span>
                </form>
            </div>
        </Fragment>
    );
};
export default LoginPage;
