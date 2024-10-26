import { useNavigate } from 'react-router-dom';
import { WrapperMenuScroll } from './style';
import { getToken, setToken } from '~/utils/token';
import { useState } from 'react';
import {
    LineChartOutlined,
    ProductOutlined,
    MenuUnfoldOutlined,
    ContainerOutlined,
    TeamOutlined,
    InboxOutlined
} from '@ant-design/icons';

const SectionMenu = () => {
    const overview = [
        {
            id: 1,
            name: 'Thống kê',
            path: 'dashboard',
            element: <LineChartOutlined />
        }
    ];
    const application = [
        {
            id: 2,
            name: 'Danh sách sản phẩm',
            path: 'products',
            element: <ProductOutlined />
        },
        {
            id: 3,
            name: 'Quản lý danh mục',
            path: 'category',
            element: <MenuUnfoldOutlined />
        },
        {
            id: 4,
            name: 'Quản lý size',
            path: 'size',
            element: <ContainerOutlined />
        },
        {
            id: 5,
            name: 'Quản lý topping',
            path: 'topping',
            element: <ContainerOutlined />
        },
        {
            id: 6,
            name: 'Quản lý hóa đơn',
            path: 'order',
            element: <InboxOutlined />
        }
    ];
    const account = [
        {
            id: 7,
            name: 'Người dùng',
            path: 'user',
            element: <TeamOutlined />
        },
        {
            id: 8,
            name: 'Nhân viên cửa hàng',
            path: 'staff',
            element: <TeamOutlined />
        },
        {
            id: 9,
            name: 'Quản lý',
            path: 'supervisor',
            element: <TeamOutlined />
        }
    ];

    const [activeId, setActiveId] = useState(() => {
        return getToken('activeId') ? Number(getToken('activeId')) : 1;
    });
    const navigate = useNavigate();

    const handleClick = (id, path) => {
        setActiveId(id);
        setToken('activeId', id);
        navigate(path);
    };
    return (
        <WrapperMenuScroll className='w-full pr-5'>
            <div className='flex flex-col items-start justify-center'>
                <div className='w-full h-fit'>
                    <div className='flex flex-col items-start justify-start gap-3 pt-10 pb-4'>
                        <span className='px-5 text-2xl font-bold text-gray-600 uppercase'>
                            Tổng quan
                        </span>
                        {overview.map((item) => (
                            <div
                                key={item.id}
                                className={`px-5 py-4 flex gap-4 items-center hover:bg-[#efdadb] hover:text-[#d7282f] rounded-2xl text-2xl font-bold cursor-pointer w-full ${
                                    activeId === item.id
                                        ? 'bg-[#efdadb] text-[#d7282f] hover:bg-[#dcf1ff]'
                                        : 'text-gray-700'
                                }`}
                                onClick={() => handleClick(item.id, item.path)}
                            >
                                {item.element}
                                {item.name}
                            </div>
                        ))}
                    </div>
                </div>
                <div className='w-full h-fit'>
                    <div className='flex flex-col items-start justify-start gap-3 py-4'>
                        <span className='px-5 text-2xl font-bold text-gray-600 uppercase'>
                            Danh mục quản lý
                        </span>
                        {application.map((item) => (
                            <div
                                key={item.id}
                                className={`px-5 py-4 flex gap-4 items-center hover:bg-[#efdadb] hover:text-[#d7282f] rounded-2xl text-2xl font-bold cursor-pointer w-full ${
                                    activeId === item.id
                                        ? 'bg-[#efdadb] text-[#d7282f] hover:bg-[#dcf1ff]'
                                        : 'text-gray-700'
                                }`}
                                onClick={() => handleClick(item.id, item.path)}
                            >
                                {item.element}
                                {item.name}
                            </div>
                        ))}
                    </div>
                </div>
                <div className='w-full h-fit'>
                    <div className='flex flex-col items-start justify-start gap-3 py-4'>
                        <span className='px-5 text-2xl font-bold text-gray-600 uppercase'>
                            Tài khoản
                        </span>
                        {account.map((item) => (
                            <div
                                key={item.id}
                                className={`px-5 py-4 flex gap-4 items-center hover:bg-[#efdadb] hover:text-[#d7282f] rounded-2xl text-2xl font-bold cursor-pointer w-full ${
                                    activeId === item.id
                                        ? 'bg-[#efdadb] text-[#d7282f] hover:bg-[#dcf1ff]'
                                        : 'text-gray-700'
                                }`}
                                onClick={() => handleClick(item.id, item.path)}
                            >
                                {item.element}
                                {item.name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </WrapperMenuScroll>
    );
};

export default SectionMenu;
