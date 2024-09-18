import { Fragment, useState, useEffect } from 'react';
import { Input, Button, Spin } from 'antd';
import {
    UserOutlined,
    MailOutlined,
    PhoneOutlined,
    HomeOutlined,
    PictureOutlined
} from '@ant-design/icons';
import defaultAvatar from '~/assets/images/avt.jpg';
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '~/redux/slice/userSlice';
import { getToken } from '~/utils/token';

const ProfilePage = () => {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const [avatar, setAvatar] = useState(user.avatar || null);
    const [userName, setUserName] = useState(user.user_name || '');
    const [email, setEmail] = useState(user.email || '');
    const [phoneNumber, setPhoneNumber] = useState(user.phone_number || '');
    const [address, setAddress] = useState(user.address || '');
    const [loading, setLoading] = useState(false);

    let urlImage = import.meta.env.URL_IMAGE || 'http://localhost:3001/images/';
    useEffect(() => {
        const authData = getToken('auth');
        const userData = getToken('user');
        if (userData) {
            setAvatar(userData.avatar || null);
            setUserName(userData.user_name || '');
            setEmail(userData.email || '');
            setPhoneNumber(userData.phone_number || '');
            setAddress(userData.address || '');
        }
        if (authData && authData.auth && authData.auth.access_token) {
            dispatch(userActions.getUser(authData.auth.access_token));
        }
    }, [dispatch]);
    useEffect(() => {
        setAvatar(user.avatar || null);
        setUserName(user.user_name || '');
        setEmail(user.email || '');
        setPhoneNumber(user.phone_number || '');
        setAddress(user.address || '');
    }, [user]);
    const handleUploadFilesImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const uploadedAvatar = URL.createObjectURL(file);
            setAvatar(uploadedAvatar);
        }
    };

    const handleReviewImage = () => {
        if (avatar) {
            return (
                <div>
                    <img
                        src={avatar.includes('blob') ? avatar : `${urlImage}${avatar}`}
                        className='object-cover rounded-full size-60'
                        alt='User Avatar'
                    />
                </div>
            );
        } else {
            return (
                <div>
                    <img
                        src={defaultAvatar}
                        className='object-cover rounded-full size-60'
                        alt='Default Avatar'
                    />
                </div>
            );
        }
    };
    const handleSubmit = () => {
        const formData = new FormData();
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput.files.length > 0) {
            formData.append('avatar', fileInput.files[0]);
        }

        formData.append('user_name', userName);
        formData.append('email', email);
        formData.append('phone_number', phoneNumber);
        formData.append('address', address);
        const token = getToken('auth').auth.access_token;
        setLoading(true);
        setTimeout(() => {
            dispatch(userActions.updateUser({ token, formData }));
        }, 1000);
        setLoading(false);
    };
    return (
        <Fragment>
            {loading && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50'>
                    <Spin size='large' />
                </div>
            )}
            <form className='flex flex-col gap-5'>
                <div className='flex flex-col items-center'>
                    <div className='flex items-center justify-center w-full gap-5 my-5'>
                        {handleReviewImage()}
                    </div>
                    <div className='relative w-60'>
                        <input
                            type='file'
                            accept='image/*'
                            onChange={handleUploadFilesImage}
                            className='absolute inset-0 h-full opacity-0 cursor-pointer w-60'
                        />
                        <div className='flex items-center justify-center px-4 py-2 font-semibold text-white transition-all bg-blue-500 rounded-md shadow-md cursor-pointer hover:bg-blue-600'>
                            <PictureOutlined className='mr-2' />
                            Upload Avatar
                        </div>
                    </div>
                </div>
                <div className='flex items-center gap-10'>
                    <label className='text-2xl w-[40%] text-left '>User Name: </label>
                    <Input
                        size='large'
                        placeholder='User Name'
                        prefix={<UserOutlined />}
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>
                <div className='flex items-center gap-10'>
                    <label className='text-2xl w-[40%] text-left '>Email: </label>
                    <Input
                        size='large'
                        disabled
                        placeholder='Email'
                        prefix={<MailOutlined />}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='flex items-center gap-10'>
                    <label className='text-2xl w-[40%] text-left '>Phone Number: </label>
                    <Input
                        size='large'
                        placeholder='Phone Number'
                        prefix={<PhoneOutlined />}
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </div>
                <div className='flex items-center gap-10'>
                    <label className='text-2xl w-[40%] text-left '>Address: </label>
                    <Input
                        size='large'
                        placeholder='Address'
                        prefix={<HomeOutlined />}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div className='flex justify-end w-full mt-10 '>
                    <Button
                        className='w-[15%] font-bold h-14'
                        type='primary'
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </div>
            </form>
        </Fragment>
    );
};

export default ProfilePage;