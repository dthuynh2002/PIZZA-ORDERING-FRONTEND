/* eslint-disable react/prop-types */
import { Button, Image, Input, Modal, Select } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { allCategoriesPublic } from '~/services/categoryService';
import { allSizesPublic, updateSize } from '~/services/sizeService.js';
import { allToppingsPublic } from '~/services/toppingService';
import { formatVND } from '~/utils/formatVND';
import {
    createProductSize,
    createProductTopping,
    deleteProductSize,
    deleteProductTopping,
    getAllProductSizesByProduct,
    getAllProductToppingsByProduct,
    updateProduct
} from '~/services/productService';

const ProductModalDetail = ({ isVisible, onCancel, product }) => {
    const token = useSelector((state) => state.auth.auth.access_token);

    let urlImage = import.meta.env.VITE_URL_IMAGE || 'http://localhost:3001/images/';

    const [name_product, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [categoryId, setCategoryId] = useState('');
    const [sale, setSale] = useState(0);
    const [quantity, setQuantity] = useState(1);
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

    useEffect(() => {
        if (product) {
            setName(product.name_product);
            setDescription(product.description);
            setPrice(product.price);
            setCategoryId(product.category_id);
            setSale(product.sale);
            setQuantity(product.quantity);
            setImage(product.image);

            const defaultCategory = categoryData.find(
                (category) => category.id === product.category_id
            );
            if (defaultCategory) {
                setSelectedCategoryData({
                    value: defaultCategory.id,
                    label: defaultCategory.category_name
                });
            }
        }
    }, [product]);

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

    const handleDeleteProductSize = async (index, productSizeId) => {
        try {
            const response = await deleteProductSize(token, productSizeId);
            if (response.status === true) {
                toast.success('Xóa kích cở của sản phẩm thành công');
                setSizeForms(sizeForms.filter((_, i) => i !== index));
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error('Có lỗi khi xóa kích cỡ của sản phẩm');
        }
    };

    const handleDeleteProductTopping = async (index, productToppingId) => {
        try {
            const response = await deleteProductTopping(token, productToppingId);
            if (response.status === true) {
                toast.success('Xóa topping của sản phẩm thành công');
                setToppingForms(toppingForms.filter((_, i) => i !== index));
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error('Có lỗi khi xóa topping của sản phẩm');
        }
    };

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await allCategoriesPublic();
            if (response.status === true) {
                setCategoryData(response.data);
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

        const fetchProductSizes = async () => {
            if (product) {
                const response = await getAllProductSizesByProduct(product.id);
                if (response.status === true) {
                    const formattedSizes = response.data.map((item) => ({
                        productSizeId: item.id,
                        sizeId: item.size_id,
                        priceSize: item.price
                    }));
                    setSizeForms(formattedSizes);
                } else {
                    toast.error(response.message);
                }
            }
        };

        const fetchProductToppings = async () => {
            if (product) {
                const response = await getAllProductToppingsByProduct(product.id);
                if (response.status === true) {
                    const formattedToppings = response.data.map((item) => ({
                        productToppingId: item.id,
                        toppingId: item.topping_id,
                        priceTopping: item.price
                    }));
                    setToppingForms(formattedToppings);
                } else {
                    toast.error(response.message);
                }
            }
        };

        fetchCategories();
        fetchSizes();
        fetchToppings();
        fetchProductSizes();
        fetchProductToppings();
    }, [product]);

    const updateHandler = async () => {
        try {
            if (!name_product || !price || !quantity || !categoryId) {
                toast.error('Các trường bắc buộc không được để trống');
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

            const response = await updateProduct(token, product.id, formData);
            if (response.status === true) {
                const productId = response.data.id;

                const newSizes = sizeForms.filter((sizeForm) => !sizeForm.productSizeId);
                await Promise.all(
                    newSizes.map((sizeForm) =>
                        createProductSize(token, {
                            product_id: productId,
                            size_id: sizeForm.sizeId,
                            price: sizeForm.priceSize
                        })
                    )
                );

                const newToppings = toppingForms.filter(
                    (toppingForm) => !toppingForm.productToppingId
                );
                await Promise.all(
                    newToppings.map((toppingForm) =>
                        createProductTopping(token, {
                            product_id: productId,
                            topping_id: toppingForm.toppingId,
                            price: toppingForm.priceTopping
                        })
                    )
                );

                toast.success(response.message);
                onCancel();
            } else toast.error(response.message);
        } catch (error) {
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
        } else {
            return (
                <div>
                    <Image
                        src='https://placehold.co/200'
                        alt='Ảnh linh kiện'
                        className='object-cover size-52'
                    />
                </div>
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
            <div className='mb-10 text-4xl font-semibold'>Chi tiết sản phẩm</div>
            {product && (
                <div className=''>
                    <div className='flex items-start justify-between gap-10'>
                        <div className='w-[60%] flex flex-col gap-10'>
                            <div className='flex flex-col items-start justify-center gap-5 p-10 bg-[#f4f6f8] shadow-lg rounded-xl'>
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
                        <div className='w-[40%]'>
                            <div className='flex flex-col items-start justify-center gap-4 p-10 bg-[#f4f6f8] shadow-lg rounded-xl'>
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
                                        value={formatVND(Number(price))}
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
                                            onChange={(e) =>
                                                handleSizeFormChange(index, 'sizeId', e.value)
                                            }
                                            options={sizeData.map((size) => ({
                                                value: size.id,
                                                label: size.size_name
                                            }))}
                                        />
                                    </div>
                                    <div className='flex flex-col w-full gap-4 flex-2'>
                                        <label className='text-2xl font-[500] text-center'>
                                            Giá:
                                        </label>
                                        <Input
                                            size='large'
                                            placeholder='Nhập vào giá cho kích cỡ này'
                                            value={sizeForm.priceSize}
                                            onChange={(e) =>
                                                handleSizeFormChange(
                                                    index,
                                                    'priceSize',
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
                                                handleDeleteProductSize(
                                                    index,
                                                    sizeForm.productSizeId
                                                )
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
                                        <label className='text-2xl font-[500] text-center'>
                                            Giá:
                                        </label>
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
                                                handleDeleteProductTopping(
                                                    index,
                                                    toppingForm.productToppingId
                                                )
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
                            onClick={updateHandler}
                            type='primary'
                            className='h-16 text-2xl text-right'
                        >
                            Xác nhận
                        </Button>
                    </div>
                </div>
            )}
        </Modal>
    );
};

export default ProductModalDetail;
