/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Button, Image, Input, Modal, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { createProduct } from '~/services/productService';
import { allCategoriesPublic } from '~/services/categoryService';

const ProductModalCreate = ({ isVisible, onCancel }) => {
    const token = useSelector((state) => state.auth.auth.access_token);

    const [name_product, setName] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [sale, setSale] = useState('');
    const [image, setImage] = useState(null);

    // Data
    const [categoryData, setCategoryData] = useState([]);
    const [selectedCategoryData, setSelectedCategoryData] = useState(null);

    let urlImage = import.meta.env.VITE_URL_IMAGE || 'http://localhost:3001/images/';

    const clearHandler = () => {
        setName('');
        setDescription('');
        setQuantity('');
        setPrice('');
        setCategoryId('');
        setSale('');
        setImage('');

        if (categoryData.length > 0) {
            setSelectedCategoryData({
                value: categoryData[0].id,
                label: categoryData[0].category_name
            });
        }
    };

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await allCategoriesPublic();
            if (response.status === true) {
                setCategoryData(response.data);

                if (categoryData.length > 0) {
                    setSelectedCategoryData({
                        value: categoryData[0].id,
                        label: categoryData[0].category_name
                    });
                    setCategoryId(categoryData[0].id);
                }
            } else toast.error(response.message);
        };
        fetchCategories();
    }, []);

    const createHandler = async () => {
        try {
            if (!name_product || !price || !quantity || !categoryId) {
                toast.error('Các trường bắc buộc không được để trống');
                return;
            }

            const formData = new FormData();

            const fileInput = document.querySelector('input[type="file"]');
            if (fileInput && fileInput.files.length > 0) {
                formData.append('image', fileInput.files[0]);
            }
            formData.append('name_product', name_product);
            formData.append('description', description);
            formData.append('quantity', quantity);
            formData.append('price', price);
            formData.append('category_id', categoryId);
            formData.append('sale', sale);

            const response = await createProduct(token, formData);
            if (response.status === true) {
                toast.success(response.message);
                clearHandler();
                onCancel();
            } else toast.error(response.message);
        } catch (error) {
            const errorMessage =
                error.response?.data?.message || 'Đã có lỗi xảy ra, vui lòng thử lại sau';
            toast.error(errorMessage);
        }
    };

    const handleUploadFilesImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const uploadImage = URL.createObjectURL(file);
            setImage(uploadImage);
        }
    };

    const handleReviewImage = () => {
        if (image) {
            return (
                <Image
                    src={image.includes('blob') ? image : `${urlImage}${image}`}
                    className='object-cover size-52'
                    alt='Ảnh sản phẩm'
                />
            );
        }
    };

    return (
        <Modal visible={isVisible} onCancel={onCancel} footer={null} maskClosable={true}>
            <div className='mb-10 text-4xl font-semibold'>Tạo danh sản phẩm mới</div>
            <div className='flex flex-col items-start justify-center gap-5'>
                <div className='flex flex-col w-full gap-4 text-gray-800'>
                    <label className='text-2xl font-bold'>Tên sản phẩm:</label>
                    <Input
                        autoFocus
                        size='large'
                        placeholder='Nhập vào tên danh mục'
                        value={name_product}
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
                <div className='flex flex-col w-full gap-4 text-gray-800'>
                    <label className='text-2xl font-bold'>Số lượng:</label>
                    <Input
                        size='large'
                        placeholder='Nhập vào số lượng'
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                </div>
                <div className='flex flex-col w-full gap-4'>
                    <label className='text-2xl'>Chọn danh mục:</label>
                    <Select
                        labelInValue
                        value={selectedCategoryData}
                        onChange={(e) => {
                            setSelectedCategoryData(e);
                            setCategoryId(e.value);
                        }}
                        options={categoryData.map((category) => ({
                            value: category.id,
                            label: category.category_name
                        }))}
                    />
                </div>
                <div className='flex flex-col w-full gap-4 text-gray-800'>
                    <label className='text-2xl font-bold'>Giá:</label>
                    <Input
                        size='large'
                        placeholder='Nhập vào giá'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div className='flex flex-col w-full gap-4 text-gray-800'>
                    <label className='text-2xl font-bold'>Giảm giá:</label>
                    <Input
                        size='large'
                        placeholder='Nhập vào giảm giá'
                        value={sale}
                        onChange={(e) => setSale(e.target.value)}
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <span className='text-2xl'>Chọn ảnh (nếu có):</span>
                    <div className='flex'>
                        <label htmlFor='file' className='text-5xl cursor-pointer'>
                            <div className='flex items-center justify-center py-10 border-2 border-[#eeefee] mr-5 border-dashed rounded-lg size-60'>
                                <PlusOutlined />
                            </div>
                        </label>
                        <div className='flex items-center justify-center w-full gap-5'>
                            {handleReviewImage()}
                        </div>
                        <input
                            id='file'
                            type='file'
                            accept='image/*'
                            onChange={handleUploadFilesImage}
                            hidden
                        />
                    </div>
                </div>

                <div className='w-full text-right'>
                    <Button
                        onClick={createHandler}
                        disabled={
                            !name_product.length ||
                            !description.length ||
                            !price.length ||
                            !quantity.length ||
                            !categoryId.length
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

export default ProductModalCreate;
