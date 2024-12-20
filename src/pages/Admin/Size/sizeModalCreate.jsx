/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Button, Input, Modal } from 'antd';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { createSize } from '~/services/sizeService.js';

const SizeModalCreate = ({ isVisible, onCancel }) => {
    const token = useSelector((state) => state.auth.auth.access_token);

    const [size_name, setName] = useState('');
    const [description, setDescription] = useState('');

    const clearHandler = () => {
        setName('');
        setDescription('');
    };

    const createHandler = async () => {
        try {
            if (!size_name) {
                toast.error('Các trường bắc buộc không được để trống');
                return;
            }

            const response = await createSize(token, {
                size_name,
                description
            });

            if (response.status === true) {
                toast.success(response.message);
                clearHandler();
                onCancel();
            } else {
                toast.error(response.message || 'Tạo danh mục thất bại');
            }
        } catch (error) {
            const errorMessage =
                error.response?.data?.message || 'Đã có lỗi xảy ra, vui lòng thử lại sau';
            toast.error(errorMessage);
        }
    };

    return (
        <Modal visible={isVisible} onCancel={onCancel} footer={null} maskClosable={true}>
            <div className='mb-10 text-4xl font-semibold'>Tạo size mới</div>
            <div className='flex flex-col items-start justify-center gap-5'>
                <div className='flex flex-col w-full gap-4 text-gray-800'>
                    <label className='text-2xl font-bold'>Tên danh mục:</label>
                    <Input
                        autoFocus
                        size='large'
                        placeholder='Nhập vào tên danh mục'
                        value={size_name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className='flex flex-col w-full gap-4 text-gray-800'>
                    <label className='text-2xl font-bold'>Mô tả:</label>
                    <Input
                        size='large'
                        placeholder='Nhập vào mô tả'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className='w-full text-right'>
                    <Button
                        onClick={createHandler}
                        disabled={!size_name.length || !description.length}
                        type='primary'
                        className='h-16 text-2xl text-right'
                        style={{
                            fontFamily: 'LXGW WenKai TC',
                            cursive: 'LXGW Wen'
                        }}
                    >
                        Xác nhận
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default SizeModalCreate;
