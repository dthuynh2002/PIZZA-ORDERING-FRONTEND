import { useDispatch } from 'react-redux';
import { useState, Fragment } from 'react';
import { LockOutlined } from '@ant-design/icons';
import { Input, Button, Spin } from 'antd';
import { toast } from 'react-toastify';
import { userActions } from '~/redux/slice/userSlice';
import { getToken } from '~/utils/token';

const ChangePasswordPage = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [comfirmPassword, setComfirmPassword] = useState('');

    const clearHandler = () => {
        setCurrentPassword('');
        setNewPassword('');
        setComfirmPassword('');
    };

    const handleChangePassword = () => {
        if (newPassword !== comfirmPassword) {
            toast.error('New password and confirm password do not match');
            return;
        }
        const token = getToken('auth').auth.access_token;
        setIsLoading(true);
        setTimeout(() => {
            dispatch(userActions.changePassword({ token, data: { currentPassword, newPassword } }));
            clearHandler();
            setIsLoading(false);
        }, 1000);
    };
    return (
        <Fragment>
            {isLoading && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50'>
                    <Spin size='large' />
                </div>
            )}
            <form className='flex flex-col gap-5'>
                <div className='flex items-center gap-10'>
                    <label className='text-2xl w-[40%] text-left '>Password: </label>
                    <Input.Password
                        autoFocus
                        size='large'
                        placeholder='Password'
                        prefix={<LockOutlined />}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                </div>
                <div className='flex items-center gap-10'>
                    <label className='text-2xl w-[40%] text-left '>New Password: </label>
                    <Input.Password
                        size='large'
                        placeholder='New Password'
                        prefix={<LockOutlined />}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <div className='flex items-center gap-10'>
                    <label className='text-2xl w-[40%] text-left '>Comfirm Password: </label>
                    <Input.Password
                        size='large'
                        placeholder='Confirm Password'
                        prefix={<LockOutlined />}
                        value={comfirmPassword}
                        onChange={(e) => setComfirmPassword(e.target.value)}
                    />
                </div>

                <div className='flex justify-end w-full mt-10 '>
                    <Button
                        className='w-[15%] font-bold h-14'
                        type='primary'
                        onClick={handleChangePassword}
                        disabled={
                            currentPassword === '' || newPassword === '' || comfirmPassword === ''
                        }
                    >
                        Submit
                    </Button>
                </div>
            </form>
        </Fragment>
    );
};

export default ChangePasswordPage;
