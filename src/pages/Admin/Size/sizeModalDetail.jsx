/* eslint-disable react/prop-types */
import { Input, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updateSize } from '~/services/sizeService.js';

const SizeModalDetail = ({ isVisible, onCancel, size }) => {
    const token = useSelector((state) => state.auth.auth.access_token);

    const [size_name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (size) {
            setName(size.size_name);
            setDescription(size.description);
        }
    }, [size]);

    const updateHandler = async () => {
        try {
            const response = await updateSize(token, size.id, {
                size_name,
                description
            });
            if (response.status === true) {
                toast.success(response.message);
                onCancel();
            } else {
                toast.error(response.message || 'Cập nhật danh mục thất bại');
            }
        } catch (error) {
            toast.error('Đã có lỗi xảy ra, vui lòng thử lại sau');
        }
    };
    return (
        <Modal visible={isVisible} onCancel={onCancel} footer={null} maskClosable={true}>
            <div className='mb-10 text-4xl font-semibold'>Chi tiết danh sách size</div>
            {size && (
                <div className='flex flex-col items-start justify-center gap-5'>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Tên danh mục:</label>
                        <Input
                            size='large'
                            value={size_name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Mô tả:</label>
                        <Input
                            size='large'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className='flex justify-end w-full'>
                        <button
                            className='px-6 py-3 mr-2 text-xl text-white bg-black rounded-2xl'
                            onClick={updateHandler}
                        >
                            Lưu những thay đổi
                        </button>
                    </div>
                </div>
            )}
        </Modal>
    );
};

export default SizeModalDetail;
