import { Popover } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import defaultAvatar from '~/assets/images/avt.jpg';
import { removeToken } from '~/utils/token';
import backGround from '~/assets/images/background.jpg';
import { MailOutlined, PhoneOutlined, MoreOutlined } from '@ant-design/icons';

const SectionInfo = () => {
    const user = useSelector((state) => state.user.user);
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    let urlImage = import.meta.env.VITE_URL_IMAGE || 'http://localhost:3001/images/';

    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };

    const goToHomeHandler = () => {
        navigate('/');
        removeToken('activeProfileId');
    };

    return (
        <div className='w-full h-fit border-2 border-[#eeefee] rounded-2xl px-3 pt-2'>
            <div
                className='h-[160px] w-full rounded-xl bg-center bg-no-repeat bg-cover opacity-90 relative'
                style={{ backgroundImage: `url(${backGround})` }}
            >
                <img
                    src={user.avatar ? `${urlImage}${user.avatar}` : defaultAvatar}
                    className='absolute -bottom-7 size-60 rounded-full left-10 border-2 border-[#e2e3e2]'
                />
            </div>
            <div className='flex items-center justify-between px-10'>
                <div className=''>
                    <div className='mt-12 text-4xl font-bold'>{user.name}</div>
                    <div className='flex items-center gap-10 mt-5 mb-2 text-2xl text-gray-500'>
                        <span className='flex gap-3'>
                            <MailOutlined />
                            {user.email}
                        </span>
                        <span className='flex gap-3'>
                            <PhoneOutlined />
                            {user.phone_number}
                        </span>
                    </div>
                </div>
                <Popover
                    content={
                        <span
                            className='my-2 text-2xl text-red-500 cursor-pointer'
                            onClick={goToHomeHandler}
                        >
                            Về trang chủ
                        </span>
                    }
                    trigger='click'
                    open={open}
                    onOpenChange={handleOpenChange}
                >
                    <div className='border-2 border-[#e2e3e2] rounded-xl p-1 cursor-pointer'>
                        <MoreOutlined className='text-5xl' />
                    </div>
                </Popover>
            </div>
        </div>
    );
};

export default SectionInfo;
