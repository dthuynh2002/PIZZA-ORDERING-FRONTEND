/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Button, Image, Input, Modal, Select } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { createProduct, createProductSize, createProductTopping } from '~/services/productService';
import { allCategoriesPublic } from '~/services/categoryService';
import { allSizesPublic } from '~/services/sizeService';
import { allToppingsPublic } from '~/services/toppingService';

const ProductModalCreate = ({ isVisible, onCancel }) => {
    const token = useSelector((state) => state.auth.auth.access_token);

    let urlImage = import.meta.env.VITE_URL_IMAGE || 'http://localhost:3001/images/';

    const [name_product, setName] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(0);
    const [categoryId, setCategoryId] = useState('');
    const [sale, setSale] = useState(0);
    const [image, setImage] = useState(null);

    const [priceSize, setPriceSize] = useState(0);
    const [sizeId, setSizeId] = useState('');

    const [priceTopping, setPriceTopping] = useState(0);
    const [toppingId, setToppingId] = useState('');

    const [categoryData, setCategoryData] = useState([]);
    const [selectedCategoryData, setSelectedCategoryData] = useState(null);

    const [sizeData, setSizeData] = useState([]);
    const [selectedSizeData, setSelectedSizeData] = useState(null);

    const [toppingData, setToppingData] = useState([]);
    const [selectedToppingData, setSelectedToppingData] = useState(null);

    const [sizeForms, setSizeForms] = useState([]);
    const [toppingForms, setToppingForms] = useState([]);

    const addSizeForm = () => {
        setSizeForms([
            ...sizeForms,
            { sizeId: sizeData.length > 0 ? sizeData[0].id : '', priceSize: 0 }
        ]);
    };

    const addToppingForm = () => {
        setToppingForms([
            ...toppingForms,
            { toppingId: toppingData.length > 0 ? toppingData[0].id : '', priceTopping: 0 }
        ]);
    };

    const handleSizeFormChange = (index, field, value) => {
        const updatedForms = [...sizeForms];
        updatedForms[index][field] = value;
        setSizeForms(updatedForms);
    };

    const handleToppingFormChange = (index, field, value) => {
        const updatedForms = [...toppingForms];
        updatedForms[index][field] = value;
        setToppingForms(updatedForms);
    };

    const clearHandler = () => {
        setName('');
        setDescription('');
        setQuantity('');
        setPrice('');
        setCategoryId('');
        setSale('');
        setImage(null);
        setSizeId('');
        setToppingId('');

        setSelectedCategoryData(null);
        setSelectedSizeData(null);
        setSelectedToppingData(null);
        setSizeForms([]);
        setToppingForms([]);

        if (categoryData.length > 0) {
            setSelectedCategoryData({
                value: categoryData[0].id,
                label: categoryData[0].category_name
            });
        }

        if (sizeData.length > 0) {
            setSelectedSizeData({
                value: sizeData[0].id,
                label: sizeData[0].size_name
            });
        }

        if (toppingData.length > 0) {
            setSelectedToppingData({
                value: toppingData[0].id,
                label: toppingData[0].topping_name
            });
        }
    };

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await allCategoriesPublic();
            if (response.status === true) {
                setCategoryData(response.data);
                setSelectedCategoryData({
                    value: response.data[0].id,
                    label: response.data[0].category_name
                });
                setCategoryId(response.data[0].id);
            } else toast.error(response.message);
        };

        const fetchSizes = async () => {
            const response = await allSizesPublic();
            if (response.status === true) {
                setSizeData(response.data);
                setSelectedSizeData({
                    value: response.data[0].id,
                    label: response.data[0].size_name
                });
                setSizeId(response.data[0].id);
            } else toast.error(response.message);
        };

        const fetchToppings = async () => {
            const response = await allToppingsPublic();
            if (response.status === true) {
                setToppingData(response.data);
                setSelectedToppingData({
                    value: response.data[0].id,
                    label: response.data[0].topping_name
                });
                setToppingId(response.data[0].id);
            } else toast.error(response.message);
        };
        fetchCategories();
        fetchSizes();
        fetchToppings();
    }, []);

    const createHandler = async () => {
        try {
            if (!name_product || !price || !quantity || !categoryId) {
                toast.error('Các trường bắc buộc không được để trống');
                clearHandler();
                onCancel();
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
                const productId = response.data.id;

                await Promise.all(
                    sizeForms.map((sizeForm) =>
                        createProductSize(token, {
                            product_id: productId,
                            size_id: sizeForm.sizeId,
                            price: sizeForm.priceSize
                        })
                    )
                );

                await Promise.all(
                    toppingForms.map((toppingForm) =>
                        createProductTopping(token, {
                            product_id: productId,
                            topping_id: toppingForm.toppingId,
                            price: toppingForm.priceTopping
                        })
                    )
                );

                toast.success(response.message);
                clearHandler();
                onCancel();
            } else toast.error(response.message);
        } catch (error) {
            // console.log(error);
            const errorMessage = error.response?.data?.message;
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
        <Modal
            visible={isVisible}
            onCancel={onCancel}
            footer={null}
            maskClosable={true}
            width={900}
        >
            <div className='mb-10 text-4xl font-semibold'>Tạo sản phẩm mới</div>
            <div className='flex items-start justify-between gap-10'>
                {/* Infor */}
                <div className='w-[60%] flex flex-col gap-10'>
                    <div className='flex flex-col items-start justify-center gap-5 p-10 bg-[#f4f6f8] shadow-lg rounded-xl'>
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
                        <div className='flex flex-col w-full gap-4'>
                            <label className='text-2xl font-bold'>Chọn danh mục:</label>
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
                    </div>
                </div>
                {/* Price, sale */}
                <div className='w-[40%]'>
                    <div className='flex flex-col items-start justify-center gap-4 p-10 bg-[#f4f6f8] shadow-lg rounded-xl'>
                        <div className='flex flex-col w-full gap-4 text-gray-800'>
                            <label className='text-2xl font-bold'>Số lượng:</label>
                            <Input
                                size='large'
                                placeholder='Nhập vào số lượng'
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
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
                    </div>
                </div>
            </div>
            {/* Image */}
            <div className='flex flex-col gap-4 p-10 my-10 bg-[#f4f6f8] shadow-lg h-fit rounded-xl'>
                <span className='text-2xl font-bold'>Chọn ảnh:</span>
                <div className='flex'>
                    <label htmlFor='file' className='text-5xl cursor-pointer'>
                        <div className='flex items-center justify-center py-10 border-2 border-[#989998] mr-5 border-dashed rounded-lg size-60'>
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
            {/* Product size */}
            <div className='flex flex-col gap-4 p-10 mb-10 bg-[#f4f6f8] shadow-lg h-fit rounded-xl'>
                <div className='flex items-center justify-between'>
                    <span className='text-2xl font-bold'>Kích cỡ:</span>
                    <button
                        className='px-6 py-5 mr-2 text-xl text-white bg-green-600 rounded-2xl'
                        onClick={addSizeForm}
                    >
                        <PlusOutlined /> {'  '}
                        Thêm
                    </button>
                </div>
                {sizeForms.map((sizeForm, index) => (
                    <div key={index} className='flex flex-col gap-5'>
                        <div className='flex items-center gap-10'>
                            <div className='flex flex-col w-full gap-4 flex-2'>
                                <label className='text-2xl font-[500]'>Chọn Kích cỡ:</label>
                                <Select
                                    labelInValue
                                    value={sizeForm.sizeId || sizeData[0]?.id}
                                    onChange={(e) => handleSizeFormChange(index, 'sizeId', e.value)}
                                    options={sizeData.map((size) => ({
                                        value: size.id,
                                        label: size.size_name
                                    }))}
                                />
                            </div>
                            <div className='flex flex-col w-full gap-4 flex-2'>
                                <label className='text-2xl font-[500] text-center'>Giá:</label>
                                <Input
                                    size='large'
                                    placeholder='Nhập vào giá cho kích cỡ này'
                                    value={sizeForm.priceSize}
                                    onChange={(e) =>
                                        handleSizeFormChange(index, 'priceSize', e.target.value)
                                    }
                                    className='h-14'
                                />
                            </div>
                            <div className='flex flex-col flex-1 w-full'>
                                <label className='text-2xl font-[500]'>Xóa:</label>
                                <div
                                    className='mt-4 mb-4 text-4xl text-red-600 cursor-pointer'
                                    onClick={() =>
                                        setSizeForms(sizeForms.filter((_, i) => i !== index))
                                    }
                                >
                                    <DeleteOutlined />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Product topping */}
            <div className='flex flex-col gap-4 p-10 mb-10 bg-[#f4f6f8] shadow-lg h-fit rounded-xl'>
                <div className='flex items-center justify-between'>
                    <span className='text-2xl font-bold'>Topping:</span>
                    <button
                        className='px-6 py-5 mr-2 text-xl text-white bg-green-600 rounded-2xl'
                        onClick={addToppingForm}
                    >
                        <PlusOutlined /> {'  '}
                        Thêm
                    </button>
                </div>
                {toppingForms.map((toppingForm, index) => (
                    <div key={index} className='flex flex-col gap-5'>
                        <div className='flex items-center gap-10'>
                            <div className='flex flex-col w-full gap-4 flex-2'>
                                <label className='text-2xl font-[500]'>Chọn Topping:</label>
                                <Select
                                    labelInValue
                                    value={toppingForm.toppingId || toppingData[0]?.id}
                                    onChange={(e) =>
                                        handleToppingFormChange(index, 'toppingId', e.value)
                                    }
                                    options={toppingData.map((topping) => ({
                                        value: topping.id,
                                        label: topping.topping_name
                                    }))}
                                />
                            </div>
                            <div className='flex flex-col w-full gap-4 flex-2'>
                                <label className='text-2xl font-[500] text-center'>Giá:</label>
                                <Input
                                    size='large'
                                    placeholder='Nhập vào giá cho topping này'
                                    value={toppingForm.priceTopping}
                                    onChange={(e) =>
                                        handleToppingFormChange(
                                            index,
                                            'priceTopping',
                                            e.target.value
                                        )
                                    }
                                    className='h-14'
                                />
                            </div>
                            <div className='flex flex-col flex-1 w-full'>
                                <label className='text-2xl font-[500]'>Xóa:</label>
                                <div
                                    className='mt-4 mb-4 text-4xl text-red-600 cursor-pointer'
                                    onClick={() =>
                                        setToppingForms(toppingForms.filter((_, i) => i !== index))
                                    }
                                >
                                    <DeleteOutlined />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* Submit */}
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
        </Modal>
    );
};

export default ProductModalCreate;
