/* eslint-disable react/prop-types */
import { Badge, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { formatVND } from '~/utils/formatVND';

const ProductModalDetail = ({ isVisible, onCancel }) => {
    const sizes = [
        { id: 1, name: 'Trung bình (24cm)', price: '' },
        { id: 2, name: 'Lớn (34cm)', price: '96000' },
        { id: 3, name: 'Rất lớn (42cm)', price: '190000' }
    ];

    const handleOnClick = () => {
        toast.success('Thêm sản phẩm thành công!');
    };

    const [activeSize, setActiveSize] = useState(null); // Đặt activeSize mặc định là null

    const handleClickSize = (size) => {
        setActiveSize(size); // Cập nhật activeSize bằng đối tượng size được chọn
    };

    return (
        <Modal
            visible={isVisible}
            onCancel={onCancel}
            footer={null}
            maskClosable={true}
            width={900}
            styles={{ body: { maxHeight: '85vh', overflowY: 'auto', overflowX: 'hidden' } }}
        >
            <div className='py-10'>
                <div className='w-full mb-10 text-4xl font-bold text-center text-red-600 uppercase'>
                    Thêm vào giỏ hàng
                </div>
                <div className='flex gap-5'>
                    <div className='flex 1'>
                        <img src='https://placehold.co/380' alt='' />
                    </div>
                    <div className='bg-[#f9fafb] flex-1 px-5 pt-7 flex flex-col gap-5'>
                        <div className='flex flex-col'>
                            <span className='text-4xl font-[600]'>
                                Pizza Xúc Xích và Thịt Xông Khói
                            </span>
                            <span>Cà chua, xúc xích, thịt xông khói</span>
                        </div>
                        <div className='py-5 text-2xl bg-white'>
                            <span className='text-red-600 text-sm font-[500] uppercase'>Giá</span>
                            <div className='flex'>
                                <span className='text-red-600'>225.000đ</span>
                                <span className='text-xl text-gray-500 line-through'>250.000đ</span>
                            </div>
                        </div>
                        <div>
                            <span className='text-red-600 font-[500] uppercase'>Kích thước</span>
                            <div className='flex items-center justify-between'>
                                {sizes.map((size) => (
                                    <Badge.Ribbon text='Sale 10%' color='red' key={size.id}>
                                        <div className='py-8'>
                                            <div
                                                className={`flex flex-col items-center justify-center h-24 border-2 rounded-lg cursor-pointer w-52 ${
                                                    activeSize?.id === size.id
                                                        ? 'bg-red-600 text-white'
                                                        : 'border-red-600'
                                                }`}
                                                onClick={() => handleClickSize(size)}
                                            >
                                                <span>{size.name}</span>
                                                <span>{formatVND(size.price)}</span>
                                            </div>
                                        </div>
                                    </Badge.Ribbon>
                                ))}
                            </div>
                        </div>
                        <div>
                            <span className='text-red-600 font-[500] uppercase'>Ghi chú</span>
                            <TextArea rows={4} />
                        </div>
                        <div
                            className='py-3 text-center text-white bg-black rounded-lg cursor-pointer hover:bg-red-700'
                            onClick={handleOnClick}
                        >
                            Thêm vào giỏ hàng
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ProductModalDetail;
