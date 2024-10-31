import { Badge } from 'antd';
import { formatVND } from '~/utils/formatVND';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { WrapperCartScroll } from '../Product/style';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    cartDiscountTotalSelector,
    cartsCountSelector,
    cartTotalSelector
} from '~/redux/selector/cartSelector';
import { useEffect, useState } from 'react';
import { getSizeById } from '~/services/sizeService';
import { toast } from 'react-toastify';
import { cartActions } from '~/redux/slice/cartSlice';

const Cart = () => {
    const cart = useSelector((state) => state.cart.carts);
    const cartsCount = useSelector(cartsCountSelector);
    const cartTotal = useSelector(cartTotalSelector);
    const cartSale = useSelector(cartDiscountTotalSelector);

    const dispatch = useDispatch();

    let urlImage = import.meta.env.VITE_URL_IMAGE || 'http://localhost:3001/images/';

    const [sizeByIdData, setSizeByIdData] = useState([]);

    useEffect(() => {
        const fetchSizeById = async () => {
            if (!cart) {
                return;
            }

            const cartSize = [];
            for (const item of cart) {
                try {
                    const sizeRes = await getSizeById(item.size.size_id);
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
        fetchSizeById();
    }, [cart]);

    const getSizeName = (sizeId) => {
        const size = sizeByIdData.find((size) => size.id === sizeId);
        return size ? size.size_name : 'Không có tên';
    };

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

    const navigate = useNavigate();
    const gotoPayment = () => {
        navigate('/payment');
    };

    const gotoMenu = () => {
        navigate('/product');
    };

    return (
        <div className='flex justify-center py-10'>
            {cartsCount && cartsCount > 0 ? (
                <div className='w-[50%]'>
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
                                        <div className='flex items-center justify-between'>
                                            <div className='flex items-center gap-10'>
                                                <div className='flex items-center justify-center'>
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
                                                        <div className=''>
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
                                                <div className='flex flex-col gap-5 '>
                                                    <span className='text-2xl font-bold text-red-700'>
                                                        {cartItem.product.name}
                                                    </span>
                                                    <span className='text-xl font-[400] text-gray-500'>
                                                        {getSizeName(cartItem.size.size_id)}
                                                    </span>
                                                    <span
                                                        className='text-2xl cursor-pointer hover:text-gray-500'
                                                        onClick={() =>
                                                            handleDelete(
                                                                cartItem.id,
                                                                cartItem.size.id
                                                            )
                                                        }
                                                    >
                                                        Xóa
                                                    </span>
                                                </div>
                                            </div>
                                            <div className='flex flex-col gap-8 mt-2'>
                                                <div className='flex flex-col gap-2'>
                                                    {cartItem && cartItem.product.sale > 0 && (
                                                        <span className='line-through text-2xl font-[500]'>
                                                            {' '}
                                                            {formatVND(cartItem.product.price)}đ
                                                        </span>
                                                    )}
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
                                        </div>
                                        <hr className='my-3' />
                                    </div>
                                );
                            })}
                    </WrapperCartScroll>
                    <div className='text-2xl font-[400] flex flex-col justify-end gap-4 px-5 py-16 '>
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
                            onClick={gotoPayment}
                        >
                            Thanh toán
                        </div>
                    </div>
                </div>
            ) : (
                <div className='h-[400px]'>
                    <div className='flex flex-col items-center justify-center w-full h-full gap-10'>
                        <span className='text-2xl text-red-600 uppercase'>
                            Không có sản phẩm trong giỏ hàng
                        </span>
                        <div
                            className='py-3 text-center w-[150px] text-white bg-black rounded-lg cursor-pointer hover:bg-red-700'
                            onClick={gotoMenu}
                        >
                            Tiếp tục chọn sản phẩm
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
