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
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '~/redux/slice/cartSlice';
import {
    cartDiscountTotalSelector,
    cartsCountSelector,
    cartTotalSelector
} from '~/redux/selector/cartSelector';
import { getSizeById } from '~/services/sizeService';
import { toast } from 'react-toastify';

const ProductPage = () => {
    const token = useSelector((state) => state.auth.auth.access_token);
    const cart = useSelector((state) => state.cart.carts);
    const cartsCount = useSelector(cartsCountSelector);
    const cartTotal = useSelector(cartTotalSelector);
    const cartSale = useSelector(cartDiscountTotalSelector);

    const dispatch = useDispatch();

    let urlImage = import.meta.env.VITE_URL_IMAGE || 'http://localhost:3001/images/';

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectProduct, setSelectProduct] = useState(null);

    // Data
    const [categoryData, setCategoryData] = useState([]);
    const [productData, setProductData] = useState([]);
    const [sizeByIdData, setSizeByIdData] = useState([]);

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
        };

        const fetchSizeById = async () => {
            if (!token || !cart) {
                return;
            }

            const cartSize = [];
            for (const item of cart) {
                try {
                    const sizeRes = await getSizeById(token, item.size.size_id);
                    console.log(sizeRes.data);
                    if (sizeRes.status === true) {
                        cartSize.push(sizeRes.data);
                    } else {
                        toast.error(sizeRes.message);
                    }
                } catch (err) {
                    toast.error(err.message);
                }
            }
            setSizeByIdData(cartSize);
        };

        fetchCategories();
        fetchProducts();
        fetchSizeById();
    }, [token, cart]);

    const getSizeName = (sizeId) => {
        const size = sizeByIdData.find((size) => size.id === sizeId);
        return size ? size.size_name : 'Không có tên';
    };

    useEffect(() => {
        const pizzaCategory = categoryData.find(
            (cat) => cat.category_name.toLowerCase() === 'pizza'
        );
        if (pizzaCategory) {
            const filtered = productData.filter(
                (product) => product.category_id === pizzaCategory.id
            );
            setFilteredProducts(filtered);
        }
    }, [categoryData, productData]);

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

    const handleDelete = (productId, sizeId) => {
        dispatch(cartActions.removeFromCart({ id: productId, sizeId }));
    };

    const onIncrease = (cartItem) => {
        dispatch(cartActions.setQuantity({ id: cartItem.id, quantity: cartItem.quantity + 1 }));
    };

    const onDecrease = (cartItem) => {
        if (cartItem.quantity > 1) {
            dispatch(cartActions.setQuantity({ id: cartItem.id, quantity: cartItem.quantity - 1 }));
        } else {
            handleDelete(cartItem.id, cartItem.size.id);
        }
    };

    return (
        <Fragment>
            <div className='flex items-start w-full min-h-screen px-10 py-14'>
                <div className='w-[75%] flex flex-col justify-start '>
                    <Tabs defaultActiveKey={items[0]?.key} items={items} onChange={onChange} />
                    <WrapperMenuScroll className='pr-10'>
                        <div className='grid gap-10 mt-10 md:grid-cols-4 md:grid-rows-2 '>
                            {filteredProducts && filteredProducts.length > 0 ? (
                                filteredProducts.map((item) => {
                                    return item && item.sale > 0 ? (
                                        <Badge.Ribbon
                                            text={`Sale ${item.sale}%`}
                                            color='red'
                                            key={item.id}
                                        >
                                            <div className='flex flex-col gap-4 shadow-xl'>
                                                <img
                                                    src={
                                                        item.image
                                                            ? `${urlImage}${item.image}`
                                                            : producttest
                                                    }
                                                    alt=''
                                                    className='object-cover rounded-2xl'
                                                />
                                                <div className='flex flex-col gap-6 p-10'>
                                                    <span className='overflow-hidden text-4xl text-ellipsis whitespace-nowrap'>
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
                                                    className='object-cover rounded-2xl'
                                                />
                                            </div>
                                            <div className='flex flex-col gap-6 p-10 text-2xl'>
                                                <span className='overflow-hidden text-4xl text-ellipsis whitespace-nowrap'>
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
                            <span>{cartsCount}</span>
                            <span>món</span>
                        </div>
                    </div>

                    <WrapperCartScroll className='flex flex-col gap-10 px-5'>
                        {cart &&
                            cart.map((cartItem) => {
                                return (
                                    <div key={cartItem.id}>
                                        <div className='flex items-center justify-center mb-3'>
                                            {cartItem && cartItem.product.sale > 0 ? (
                                                <Badge.Ribbon
                                                    text={`Sale ${cartItem.product.sale}%`}
                                                    color='red'
                                                >
                                                    <img
                                                        src={
                                                            cartItem.product.image
                                                                ? `${urlImage}${cartItem.product.image}`
                                                                : 'https://placehold.co/380'
                                                        }
                                                        alt=''
                                                        className='rounded-2xl size-52'
                                                    />
                                                </Badge.Ribbon>
                                            ) : (
                                                <div>
                                                    <img
                                                        src={
                                                            cartItem.product.image
                                                                ? `${urlImage}${cartItem.product.image}`
                                                                : 'https://placehold.co/380'
                                                        }
                                                        alt=''
                                                        className='rounded-2xl size-52'
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        <div className='flex flex-col gap-2 '>
                                            <div className='flex items-center justify-between text-2xl font-[400]'>
                                                <span className='text-2xl font-bold text-red-700'>
                                                    {cartItem.product.name}
                                                </span>
                                                {cartItem && cartItem.product.sale > 0 && (
                                                    <span className='line-through'>
                                                        {' '}
                                                        {formatVND(cartItem.product.price)}đ
                                                    </span>
                                                )}
                                            </div>
                                            <div className='flex items-center justify-between'>
                                                <span className='text-xl font-[400] text-gray-500'>
                                                    {getSizeName(cartItem.size.size_id)}
                                                </span>
                                                <span className='text-2xl font-[500] text-red-500'>
                                                    {formatVND(
                                                        cartItem.product.price +
                                                            cartItem.size.price -
                                                            (cartItem.product.price *
                                                                cartItem.product.sale) /
                                                                100
                                                    )}
                                                    đ
                                                </span>
                                            </div>
                                        </div>
                                        <div className='flex items-start justify-between'>
                                            <span
                                                className='text-2xl cursor-pointer hover:text-gray-500'
                                                onClick={() =>
                                                    handleDelete(cartItem.id, cartItem.size.id)
                                                }
                                            >
                                                Xóa
                                            </span>
                                            <div className='flex select-none'>
                                                <div
                                                    className='cursor-pointer w-[40px] h-[40px] text-xl flex items-center justify-center border border-solid border-gray-200 hover:bg-neutral-100 transition-all ease-out'
                                                    onClick={() => onDecrease(cartItem)}
                                                >
                                                    <MinusOutlined />
                                                </div>
                                                <div className='w-[40px] h-[40px] text-2xl border-t border-b border-solid border-gray-200'>
                                                    <input
                                                        value={cartItem.quantity}
                                                        readOnly
                                                        className='w-full h-full text-center outline-none'
                                                    />
                                                </div>
                                                <div
                                                    className='cursor-pointer w-[40px] h-[40px] text-xl flex items-center justify-center border border-solid border-gray-200 hover:bg-neutral-100 transition-all ease-out'
                                                    onClick={() => onIncrease(cartItem)}
                                                >
                                                    <PlusOutlined />
                                                </div>
                                            </div>
                                        </div>
                                        <hr className='my-3' />
                                    </div>
                                );
                            })}
                    </WrapperCartScroll>

                    <div className='text-2xl font-[400] flex flex-col justify-end gap-4 px-5 '>
                        <div className='flex items-center justify-between'>
                            <span>Tổng</span>
                            <span>{formatVND(cartTotal)}đ</span>
                        </div>
                        <div className='flex items-center justify-between'>
                            <span>Giảm khuyến mãi</span>
                            <span>{formatVND(cartSale)}đ</span>
                        </div>
                        <div className='flex items-center justify-between'>
                            <span>Thành tiền</span>
                            <span>{formatVND(cartTotal - cartSale)}đ</span>
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
