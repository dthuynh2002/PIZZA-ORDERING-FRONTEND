import {
    useState
    // useEffect
} from 'react';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import defaultAvatar from '~/assets/images/avt.jpg';
import { LeftOutlined } from '@ant-design/icons';
import {
    useSelector
    // useDispatch
} from 'react-redux';

const ProfileLayout = () => {
    const user = useSelector((state) => state.user.user);

    let urlImage = import.meta.env.URL_IMAGE || 'http://localhost:3001/images/';

    const nav = [
        {
            id: 1,
            name: 'Thông tin người dùng',
            path: 'profile'
        },
        {
            id: 2,
            name: 'Lịch sử đơn hàng',
            path: 'history'
        },
        {
            id: 3,
            name: 'Thay đổi mật khẩu',
            path: 'change-password'
        }
    ];
    const [activeId, setActiveId] = useState(1);
    const navigate = useNavigate();
    const handleClick = (id, path) => {
        setActiveId(id);
        navigate(path);
    };
    const backHandler = () => {
        navigate('/');
    };
    return (
        <div className='w-full h-fit'>
            <div className='grid grid-cols-5 grid-rows-5 gap-4 '>
                <div className='col-span-3 col-start-2 '>
                    <div className='flex items-center justify-between px-10 py-4'>
                        <button
                            className='flex items-center gap-2 px-5 py-3 rounded-lg bg-[#333] text-white'
                            onClick={backHandler}
                        >
                            <LeftOutlined />
                            <span>Về trang chủ</span>
                        </button>
                        <img
                            src={user.avatar ? urlImage + user?.avatar : defaultAvatar}
                            alt='avatar'
                            className='w-20 h-20 rounded-full'
                        />
                    </div>
                </div>
                <div className='col-start-2 row-span-4 row-start-2'>
                    <div className='flex flex-col gap-5 px-10 py-4'>
                        {nav.map((item) => (
                            <div
                                key={item.id}
                                className={`p-5 rounded-xl text-2xl font-bold cursor-pointer ${
                                    activeId === item.id ? 'bg-[#f1f1f1] text-black' : 'text-black'
                                }`}
                                onClick={() => handleClick(item.id, item.path)}
                            >
                                {item.name}
                            </div>
                        ))}
                    </div>
                </div>
                <div className='w-full col-span-2 col-start-3 row-span-4 row-start-2 h-fit '>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default ProfileLayout;
