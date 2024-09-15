import { Fragment, useState } from 'react';
import { Input, Spin } from 'antd';
import { UserOutlined, FormOutlined, PhoneOutlined, SafetyOutlined } from '@ant-design/icons';
import background from '~/assets/images/background.avif';
import { WrapperButton } from '~/pages/Auth/style';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register } from '~/services/userService';

const RegisterPage = () => {
    const [user_name, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const clearHandler = () => {
        setUserName('');
        setEmail('');
        setPassword('');
        setPhoneNumber('');
    };

    const registerHandler = async () => {
        try {
            setIsLoading(true);
            if (!user_name || !email || !phone_number || !password) {
                toast.error('All fields are required');
                return;
            }
            const response = await register({
                user_name,
                email,
                phone_number,
                password
            });
            clearHandler();
            if (response.status === true) {
                toast.success(response.message);
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            } else {
                toast.error(response.message || 'Register failed');
            }
        } catch (e) {
            const errorMessage =
                e.response?.data?.message || 'Something went wrong. Please try again.';
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
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
                    className='w-1/3 h-fit bg-[rgba(0,0,0,0.57)] text-white rounded-xl flex flex-col justify-center py-32 px-10 gap-10 '
                    style={{ backdropFilter: 'blur(19px) saturate(180%)' }}
                >
                    <div className='text-4xl font-bold text-center uppercase'>register</div>
                    <div className='flex flex-col '>
                        <label className='text-2xl'>User Name:</label>
                        <Input
                            autoFocus
                            size='large'
                            prefix={<UserOutlined />}
                            placeholder='User Name'
                            value={user_name}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col '>
                        <label className='text-2xl'>Email :</label>
                        <Input
                            size='large'
                            prefix={<FormOutlined />}
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col '>
                        <label className='text-2xl'>Phone number :</label>
                        <Input
                            size='large'
                            prefix={<PhoneOutlined />}
                            placeholder='Phone number'
                            value={phone_number}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col '>
                        <label className='text-2xl'>Password :</label>
                        <Input.Password
                            size='large'
                            prefix={<SafetyOutlined />}
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <WrapperButton
                        className='h-16 text-2xl font-bold'
                        type='light'
                        onClick={registerHandler}
                    >
                        Register
                    </WrapperButton>
                    <span className='text-center'>
                        Already have an account? {''}
                        <Link className='text-blue-300 underline' to='/login'>
                            Login
                        </Link>
                    </span>
                </form>
            </div>
        </Fragment>
    );
};
export default RegisterPage;
