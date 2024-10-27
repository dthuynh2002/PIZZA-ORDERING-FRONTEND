import { Badge, Tabs } from 'antd';
import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import producttest from '~/assets/images/Pizza/Pizza_HaiSan.jpg';
import { WrapperCartScroll, WrapperMenuScroll } from './style';
import { formatVND } from '~/utils/formatVND';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import ProductModalDetail from './productModalDetail';
import { allCategoriesPublic } from '~/services/categoryService';
import { getAllProducts } from '~/services/productService';

const ProductPage = () => {
    let urlImage = import.meta.env.VITE_URL_IMAGE || 'http://localhost:3001/images/';

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectProduct, setSelectProduct] = useState(null);

    // Data
    const [categoryData, setCategoryData] = useState([]);
    const [productData, setProductData] = useState([]);

    // Filter
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const resCategory = await allCategoriesPublic();
            setCategoryData(resCategory.data);
        };

        const fetchProducts = async () => {
            const resProduct = await getAllProducts({ page: 1, limit: 100 });
            setProductData(resProduct.data);
            setFilteredProducts(resProduct.data);
        };
        fetchCategories();
        fetchProducts();
    }, []);
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);
    const showModal = (product) => {
        setSelectProduct(product);
        setIsModalVisible(true);
    };
    const handelCancel = () => {
        setIsModalVisible(false);
    };
    const navigate = useNavigate();
    const gotoCart = () => {
        navigate('/cart');
    };

    const onChange = (key) => {
        const filtered = productData.filter((product) => product.category_id === key);
        setFilteredProducts(filtered);
    };

    const items = categoryData.map((item) => ({
        key: item.id,
        label: item.category_name
    }));

    return (
        <Fragment>
            <div className='flex items-start w-full min-h-screen px-10 py-14'>
                <div className='w-[75%] flex flex-col justify-start '>
                    <Tabs defaultActiveKey={items[0]?.key} items={items} onChange={onChange} />
                    <WrapperMenuScroll className='pr-10'>
                        <div className='grid gap-10 mt-10 md:grid-cols-4 md:grid-rows-2 '>
                            {filteredProducts && filteredProducts.length > 0 ? (
                                filteredProducts.map((item) => {
                                    return item.sale ? (
                                        <Badge.Ribbon text='Discount 10%' color='red' key={item.id}>
                                            <div className='flex flex-col gap-4 shadow-xl'>
                                                <img
                                                    src={
                                                        item.image
                                                            ? `${urlImage}${item.image}`
                                                            : producttest
                                                    }
                                                    alt=''
                                                    className='rounded-2xl'
                                                />
                                                <div className='flex flex-col gap-6 p-10'>
                                                    <span className='text-4xl'>
                                                        {item.name_product}
                                                    </span>
                                                    <p className='font-[400]'>{item.description}</p>
                                                    <div className='flex items-center justify-between'>
                                                        <div className='flex flex-col'>
                                                            <span className='font-[400]'>Giá</span>
                                                            <span className='font-bold'>
                                                                {formatVND(item.price)}đ
                                                            </span>
                                                        </div>
                                                        <div
                                                            className='px-4 py-2 border-2 cursor-pointer rounded-xl hover:text-red-600 hover:border-red-600'
                                                            onClick={() => showModal(item)}
                                                        >
                                                            Order now
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Badge.Ribbon>
                                    ) : (
                                        <div
                                            className='flex flex-col gap-4 shadow-xl'
                                            key={item.id}
                                        >
                                            <div className='flex items-center justify-center '>
                                                <img
                                                    src={
                                                        item.image
                                                            ? `${urlImage}${item.image}`
                                                            : 'https://placehold.co/225x155'
                                                    }
                                                    alt=''
                                                    className='rounded-2xl'
                                                />
                                            </div>
                                            <div className='flex flex-col gap-6 p-10 text-2xl'>
                                                <span className='text-4xl'>
                                                    {item.name_product}
                                                </span>
                                                <p className='font-[400] text-ellipsis whitespace-nowrap overflow-hidden'>
                                                    {item.description}
                                                </p>
                                                <div className='flex items-center justify-between'>
                                                    <div className='flex flex-col'>
                                                        <span className='font-[400]'>Giá</span>
                                                        <span className='font-bold'>
                                                            {formatVND(item.price)}đ
                                                        </span>
                                                    </div>
                                                    <div
                                                        className='px-4 py-2 border-2 cursor-pointer rounded-xl hover:text-red-600 hover:border-red-600'
                                                        onClick={() => showModal(item)}
                                                    >
                                                        Order now
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className='w-full text-2xl font-bold text-center text-gray-500'>
                                    Not found
                                </div>
                            )}
                        </div>
                    </WrapperMenuScroll>
                </div>
                <div className='w-[25%]'>
                    <div className='flex items-center justify-between px-5 py-10 mb-6 text-3xl'>
                        <span className='font-bold'>Giỏ hàng của bạn</span>
                        <div className='flex items-center gap-2'>
                            <span>1</span>
                            <span>món</span>
                        </div>
                    </div>
                    <WrapperCartScroll className='flex flex-col gap-10 px-5'>
                        <div className='flex items-center justify-center'>
                            <Badge.Ribbon text='Discount 10%' color='red'>
                                <img src={producttest} alt='' className='rounded-2xl size-52' />
                            </Badge.Ribbon>
                        </div>
                        <div className='flex flex-col gap-2 '>
                            <div className='flex items-center justify-between text-2xl font-[400]'>
                                <span className='text-2xl font-bold text-red-700'>
                                    {' '}
                                    Pizza Hải Sản
                                </span>
                                <span className='line-through'> {formatVND(275000)}đ</span>
                            </div>
                            <div className='flex items-center justify-between'>
                                <span className='text-xl font-[400] text-gray-500'>
                                    Cỡ lớn (34cm)
                                </span>
                                <span className='text-2xl font-[500] text-red-500'>
                                    {formatVND(247500)}đ
                                </span>
                            </div>
                        </div>
                        <div className='flex items-start justify-between'>
                            <span className='text-2xl cursor-pointer hover:text-gray-500'>Xóa</span>
                            <div className='flex select-none'>
                                <div
                                    className='cursor-pointer w-[40px] h-[40px] text-xl flex items-center justify-center border border-solid border-gray-200 hover:bg-neutral-100 transition-all ease-out'
                                    // onClick={onDecrease}
                                >
                                    <MinusOutlined />
                                </div>
                                <div className='w-[40px] h-[40px] text-2xl border-t border-b border-solid border-gray-200'>
                                    <input
                                        value={0}
                                        // onChange={onChangeQuantity}
                                        className='w-full h-full text-center outline-none'
                                    />
                                </div>
                                <div
                                    className='cursor-pointer w-[40px] h-[40px] text-xl flex items-center justify-center border border-solid border-gray-200 hover:bg-neutral-100 transition-all ease-out'
                                    // onClick={onIncrease}
                                >
                                    <PlusOutlined />
                                </div>
                            </div>
                        </div>
                        <hr className='my-3' />
                        <div className='flex items-center justify-center'>
                            <Badge.Ribbon text='Discount 10%' color='red'>
                                <img src={producttest} alt='' className='rounded-2xl size-52' />
                            </Badge.Ribbon>
                        </div>
                        <div className='flex flex-col gap-2 '>
                            <div className='flex items-center justify-between text-2xl font-[400]'>
                                <span className='text-2xl font-bold text-red-700'>
                                    {' '}
                                    Pizza Hải Sản
                                </span>
                                <span className='line-through'> {formatVND(275000)}đ</span>
                            </div>
                            <div className='flex items-center justify-between'>
                                <span className='text-xl font-[400] text-gray-500'>
                                    Cỡ lớn (34cm)
                                </span>
                                <span className='text-2xl font-[500] text-red-500'>
                                    {formatVND(247500)}đ
                                </span>
                            </div>
                        </div>
                        <div className='flex items-start justify-between'>
                            <span className='text-2xl cursor-pointer hover:text-gray-500'>Xóa</span>
                            <div className='flex select-none'>
                                <div
                                    className='cursor-pointer w-[40px] h-[40px] text-xl flex items-center justify-center border border-solid border-gray-200 hover:bg-neutral-100 transition-all ease-out'
                                    // onClick={onDecrease}
                                >
                                    <MinusOutlined />
                                </div>
                                <div className='w-[40px] h-[40px] text-2xl border-t border-b border-solid border-gray-200'>
                                    <input
                                        value={0}
                                        // onChange={onChangeQuantity}
                                        className='w-full h-full text-center outline-none'
                                    />
                                </div>
                                <div
                                    className='cursor-pointer w-[40px] h-[40px] text-xl flex items-center justify-center border border-solid border-gray-200 hover:bg-neutral-100 transition-all ease-out'
                                    // onClick={onIncrease}
                                >
                                    <PlusOutlined />
                                </div>
                            </div>
                        </div>
                    </WrapperCartScroll>
                    <div className='text-2xl font-[400] flex flex-col justify-end gap-4 px-5 '>
                        <div className='flex items-center justify-between'>
                            <span>Tổng</span>
                            <span>{formatVND(185000)}đ</span>
                        </div>
                        <div className='flex items-center justify-between'>
                            <span>Giảm khuyến mãi</span>
                            <span>{formatVND(12000)}đ</span>
                        </div>
                        <div className='flex items-center justify-between'>
                            <span>Thành tiền</span>
                            <span>{formatVND(175000)}đ</span>
                        </div>
                        <div
                            className='py-3 text-center text-white bg-black rounded-lg cursor-pointer hover:bg-red-700'
                            onClick={gotoCart}
                        >
                            Thanh toán
                        </div>
                    </div>
                    <ProductModalDetail
                        isVisible={isModalVisible}
                        onCancel={handelCancel}
                        product={selectProduct}
                    />
                </div>
            </div>
        </Fragment>
    );
};

export default ProductPage;
