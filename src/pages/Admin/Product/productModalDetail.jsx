/* eslint-disable react/prop-types */
import { Input, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updateSize } from '~/services/sizeService.js';

const ProductModalDetail = ({ isVisible, onCancel, product }) => {
    const token = useSelector((state) => state.auth.auth.access_token);

    const [name_product, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [categoryId, setCategorId] = useState('');
    const [sale, setSale] = useState('');
    const [quantity, setQuantity] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {
        if (product) {
            setName(product.name_product);
            setDescription(product.description);
            setPrice(product.price);
            setCategorId(product.category_id);
            setSale(product.sale);
            setQuantity(product.quantity);
            setImage(product.image);
        }
    }, [product]);

    const updateHandler = async () => {
        try {
            const response = await updateSize(token, product.id, {
                product,
                description,
                price,
                category_id: categoryId,
                sale,
                quantity,
                image
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
            <div className='mb-10 text-4xl font-semibold'>Chi tiết sản phẩm</div>
            {product && (
                <div className='flex flex-col items-start justify-center gap-5'>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Tên sản phẩm:</label>
                        <Input
                            size='large'
                            value={name_product}
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
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Loại sản phẩm:</label>
                        <Input
                            size='large'
                            value={categoryId}
                            onChange={(e) => setCategorId(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Số lượng:</label>
                        <Input
                            size='large'
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Giá:</label>
                        <Input
                            size='large'
                            value={price}
                            onChange={(e) => setImage(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Sale:</label>
                        <Input
                            size='large'
                            value={sale}
                            onChange={(e) => setSale(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Hình sản phẩm:</label>
                        <Input
                            size='large'
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
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

export default ProductModalDetail;
