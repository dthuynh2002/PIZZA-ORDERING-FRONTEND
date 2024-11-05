import { useState, useEffect } from 'react';
import { Badge, Form, Input, Radio, Space } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { formatVND } from '~/utils/formatVND';
import { useDispatch, useSelector } from 'react-redux';
import {
    cartDiscountTotalSelector,
    cartsCountSelector,
    cartTotalSelector
} from '~/redux/selector/cartSelector';
import { getSizeById } from '~/services/sizeService';
import { toast } from 'react-toastify';
import { createOrder } from '~/services/orderService';
import { cartActions } from '~/redux/slice/cartSlice';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
    const token = useSelector((state) => state.auth.auth.access_token);
    const cart = useSelector((state) => state.cart.carts);
    const cartsCount = useSelector(cartsCountSelector);
    const cartTotal = useSelector(cartTotalSelector);
    const cartSale = useSelector(cartDiscountTotalSelector);

    let urlImage = import.meta.env.VITE_URL_IMAGE || 'http://localhost:3001/images/';

    const [form] = Form.useForm();
    const [value, setValue] = useState('Thanh toán khi nhận hàng');
    const [nameUser, setNameUser] = useState('');
    const [emailUser, setEmailUser] = useState('');
    const [phoneUser, setPhoneUser] = useState('');
    const [addressUser, setAddressUser] = useState('');
    const [productNotes, setProductNotes] = useState('');

    const [sizeByIdData, setSizeByIdData] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSizeById = async () => {
            if (!cart) {
                return;
            }

            const cartSize = [];
            for (const item of cart) {
                try {
                    const sizeRes = await getSizeById(item.size.size_id);
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

    const onChange = (e) => {
        setValue(e.target.value);
    };

    const valuePaymentMethod = [
        {
            id: 1,
            label: 'Thanh toán khi nhận hàng',
            value: 'Thanh toán khi nhận hàng'
        },
        {
            id: 2,
            label: 'ZaloPay',
            value: 'ZALOPAY'
        }
    ];

    const handlePayment = async () => {
        const selectedPaymentMethod =
            value === 'Thanh toán khi nhận hàng' ? 'Thanh toán khi nhận hàng' : 'ZALOPAY';
        const orderData = {
            name: nameUser,
            email: emailUser,
            phone: phoneUser,
            address: addressUser,
            total_quantity: cartsCount,
            total_price: cartTotal - cartSale,
            payment_method: selectedPaymentMethod,
            detail: cart.map((item) => ({
                quantity: item.quantity,
                price:
                    item.product.price +
                    item.size.price -
                    ((item.product.price + item.size.price) * item.product.sale) / 100,
                total_price:
                    (item.product.price +
                        item.size.price -
                        ((item.product.price + item.size.price) * item.product.sale) / 100) *
                    item.quantity,
                product_id: item.product.id,
                size_id: item.size.size_id
            }))
        };

        try {
            if (!token) return;

            const newOrder = await createOrder(token, orderData);
            if (newOrder.status === true) {
                if (orderData?.payment_method === 'ZALOPAY') {
                    window.location.href = newOrder.orderUrl;
                    toast.success(newOrder.message);
                    dispatch(cartActions.clearCartItems());
                } else {
                    navigate('/product');
                    toast.success(newOrder.message);
                    dispatch(cartActions.clearCartItems());
                }
            } else {
                toast.error(newOrder.message);
            }
        } catch (e) {
            toast.error(e.message);
        }
    };
    return (
        <div className='flex flex-col gap-16 p-20'>
            <div className='text-5xl font-bold'>Thanh toán</div>
            <div className='flex items-start justify-between gap-10'>
                <div className='w-[65%] flex flex-col gap-10'>
                    <div className='flex flex-col gap-10 p-5 rounded-lg shadow-xl'>
                        <span className='text-3xl'>Thông tin liên hệ</span>
                        <Form form={form} layout='vertical'>
                            <Form.Item className='font-[400]' label='Tên người dùng'>
                                <Input
                                    placeholder='Hãy nhập tên của bạn'
                                    value={nameUser}
                                    onChange={(e) => setNameUser(e.target.value)}
                                />
                            </Form.Item>
                            <Form.Item className='font-[400]' label='Email'>
                                <Input
                                    placeholder='Hãy nhập vào email của bạn'
                                    value={emailUser}
                                    onChange={(e) => setEmailUser(e.target.value)}
                                />
                            </Form.Item>
                            <Form.Item className='font-[400]' label='Số điện thoại'>
                                <Input
                                    placeholder='Hãy nhập vào số điện thoại của bạn'
                                    value={phoneUser}
                                    onChange={(e) => setPhoneUser(e.target.value)}
                                />
                            </Form.Item>
                        </Form>
                    </div>
                    <div className='flex flex-col gap-10 p-5 rounded-lg shadow-xl'>
                        <span className='text-3xl'>Thông tin giao hàng</span>
                        <Form form={form} layout='vertical'>
                            <Form.Item className='font-[400]' label='Địa chỉ'>
                                <Input
                                    placeholder='Vui lòng nhập địa chỉ nhận hàng'
                                    value={addressUser}
                                    onChange={(e) => setAddressUser(e.target.value)}
                                />
                            </Form.Item>
                            <Form.Item className='font-[400]' label='Ghi chú'>
                                <TextArea
                                    rows={4}
                                    value={productNotes}
                                    onChange={(e) => setProductNotes(e.target.value)}
                                    placeholder='Vui lòng nhập vào ghi chú nếu có'
                                />
                            </Form.Item>
                        </Form>
                    </div>
                    <div className='flex flex-col gap-10 px-5 py-10 rounded-lg shadow-xl'>
                        <span className='text-3xl'>Danh sách các món đã chọn</span>

                        {cart &&
                            cart.map((cartItem) => {
                                return (
                                    <div key={cartItem.id}>
                                        <div className='flex items-center justify-between px-5'>
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
                                                    <div className='flex items-center gap-2'>
                                                        <span className='text-2xl font-bold text-red-700'>
                                                            {cartItem.product.name}
                                                        </span>
                                                        <span className='text-2xl font-[500]'>
                                                            x {cartItem.quantity}
                                                        </span>
                                                    </div>
                                                    <span className='text-xl font-[400] text-gray-500'>
                                                        {getSizeName(cartItem.size.size_id)}
                                                    </span>
                                                </div>
                                            </div>
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
                                        </div>
                                        <hr className='mt-5' />
                                    </div>
                                );
                            })}
                    </div>
                </div>
                <div className='w-[35%] flex flex-col gap-10'>
                    <div className='flex flex-col gap-10 p-5 rounded-lg shadow-xl'>
                        <span className='text-3xl'>Phương thức thanh toán</span>
                        <Radio.Group className='font-[400]' onChange={onChange} value={value}>
                            {valuePaymentMethod &&
                                valuePaymentMethod.map((value) => {
                                    return (
                                        <Space
                                            direction='vertical'
                                            key={value.id}
                                            className='flex flex-col'
                                        >
                                            <Radio value={value.value}>{value.label}</Radio>
                                        </Space>
                                    );
                                })}
                        </Radio.Group>
                    </div>
                    <div className='flex flex-col gap-10 p-5 rounded-lg shadow-xl'>
                        <div className='text-2xl font-[400] flex flex-col justify-end gap-4'>
                            <div className='flex items-center justify-between'>
                                <span>Tổng số lượng</span>
                                <span>{cartsCount}</span>
                            </div>
                            <div className='flex items-center justify-between'>
                                <span>Tổng tiền</span>
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
                                onClick={handlePayment}
                            >
                                Thanh toán
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
