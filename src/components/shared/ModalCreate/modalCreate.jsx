/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Button, Input, Modal, Select } from 'antd';
import { UserOutlined, FormOutlined, PhoneOutlined, SafetyOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { createStaff } from '~/services/userService';
import { getToken } from '~/utils/token';
import { getAllRoles } from '~/services/roleService';

const { Option } = Select;

const ModalCreate = ({ isVisible, onCancel }) => {
    const [user_name, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [roleId, setRoleId] = useState('');

    // Data
    const [roleData, setRoleData] = useState([]);

    const clearHandler = () => {
        setUserName('');
        setEmail('');
        setPhoneNumber('');
        setPassword('');
    };

    useEffect(() => {
        const fetchRoles = async () => {
            const roles = await getAllRoles();
            setRoleData(roles.data);
            setRoleId(roles.data[0].id);
        };
        fetchRoles();
    }, []);

    const createHandler = async () => {
        try {
            if (!user_name || !email || !password || !phone_number || !roleId) {
                toast.error('Các trường bắc buộc không được để trống');
                return;
            }

            const token = getToken('auth').auth.access_token;

            const response = await createStaff(token, {
                user_name,
                email,
                phone_number,
                password,
                role_id: roleId
            });

            if (response.status === true) {
                toast.success(response.message);
                clearHandler();
                onCancel();
            } else {
                toast.error(response.message || 'Tạo nhân viên thất bại');
            }
        } catch (error) {
            const errorMessage =
                error.response?.data?.message || 'Đã có lỗi xảy ra, vui lòng thử lại sau';
            toast.error(errorMessage);
        }
    };

    return (
        <Modal visible={isVisible} onCancel={onCancel} footer={null} maskClosable={true}>
            <div className='mb-10 text-4xl font-semibold'>Tạo nhân viên mới</div>
            <div className='flex flex-col items-start justify-center gap-5'>
                <div className='flex flex-col w-full gap-4 text-gray-800'>
                    <label className='text-2xl font-bold'>Tên nhân viên:</label>
                    <Input
                        autoFocus
                        size='large'
                        prefix={<UserOutlined />}
                        placeholder='Nhập vào tên nhân viên'
                        value={user_name}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>
                <div className='flex flex-col w-full gap-4 text-gray-800'>
                    <label className='text-2xl font-bold'>Email:</label>
                    <Input
                        size='large'
                        prefix={<FormOutlined />}
                        placeholder='Nhập vào email của nhân viên'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='flex flex-col w-full gap-4 text-gray-800'>
                    <label className='text-2xl font-bold'>Mật khẩu:</label>
                    <Input.Password
                        size='large'
                        prefix={<SafetyOutlined />}
                        placeholder='Nhập vào mật khẩu'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className='flex flex-col w-full gap-4 text-gray-800'>
                    <label className='text-2xl font-bold'>Số điện thoại:</label>
                    <Input
                        size='large'
                        prefix={<PhoneOutlined />}
                        placeholder='Nhập vào số điện thoại của nhân viên'
                        value={phone_number}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </div>
                <div className='flex flex-col w-full gap-4 text-gray-800'>
                    <label className='text-2xl w-[30%] text-left font-bold'>Vai trò:</label>
                    <Select
                        size='large'
                        value={roleId}
                        onChange={(value) => setRoleId(value)}
                        className='flex-2 w-[100%]'
                    >
                        {roleData &&
                            roleData.map((item) => {
                                return (
                                    item.name !== 'USER' && (
                                        <Option key={item.id} value={item.id}>
                                            {item.name}
                                        </Option>
                                    )
                                );
                            })}
                    </Select>
                </div>
                <div className='w-full text-right'>
                    <Button
                        onClick={createHandler}
                        disabled={
                            !user_name.length ||
                            !email.length ||
                            !phone_number.length ||
                            !password.length ||
                            !roleId.length
                        }
                        type='primary'
                        className='h-16 text-2xl text-right'
                    >
                        Xác nhận
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default ModalCreate;
