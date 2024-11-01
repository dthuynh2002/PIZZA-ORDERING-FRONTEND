/* eslint-disable react/prop-types */
import { Badge, Input, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getProductById } from '~/services/productService';
import { getSizeById } from '~/services/sizeService';
import { formatVND } from '~/utils/formatVND';

const OrderModalDetail = ({ isVisible, onCancel, order }) => {
    const token = useSelector((state) => state.auth.auth.access_token);

    let urlImage = import.meta.env.VITE_URL_IMAGE || 'http://localhost:3001/images/';

    const [orderDate, setOrderDate] = useState('');
    const [orderCode, setOrderCode] = useState('');
    const [totalPrice, setTotalPrice] = useState('');
    const [totalQuantity, setTotalQuantity] = useState('');
    const [orderStatus, setOrderStatus] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [deliveryMethod, setDeliveryMethod] = useState('');
    const [notes, setNotes] = useState('');
    // const [userId, setUserId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const [productData, setProductData] = useState([]);
    const [sizeData, setSizeData] = useState([]);

    const orderData = useMemo(() => order, [order]);

    useEffect(() => {
        if (orderData) {
            setOrderDate(orderData.order_date);
            setOrderCode(orderData.order_code);
            setTotalPrice(orderData.total_price);
            setTotalQuantity(orderData.total_quantity);
            setOrderStatus(orderData.order_status);
            setPaymentStatus(orderData.payment_status);
            setPaymentMethod(orderData.payment_method);
            setDeliveryMethod(orderData.delivery_method);
            setNotes(orderData.notes);
            // setUserId(orderData.user_id);
            setName(orderData.name);
            setEmail(orderData.email);
            setPhone(orderData.phone);
        }
    }, [orderData]);

    useEffect(() => {
        const fetchProductAndSizeData = async () => {
            if (!token || !orderData) return;

            const productDataArray = [];
            const sizeDataArray = [];

            for (const item of orderData.detail) {
                try {
                    // Fetch product data
                    const productRes = await getProductById(token, item.product_id);

                    if (productRes.status === true) {
                        productDataArray.push(productRes.data);
                    } else {
                        toast.error(productRes.message);
                    }

                    // Fetch size data
                    const sizeRes = await getSizeById(item.size_id);
                    if (sizeRes.status === true) {
                        sizeDataArray.push(sizeRes.data);
                    } else {
                        toast.error(sizeRes.message);
                    }
                } catch (err) {
                    toast.error(err.message);
                }
            }

            setProductData(productDataArray);
            setSizeData(sizeDataArray);
        };

        fetchProductAndSizeData();
    }, [token, orderData]);

    console.log(productData);

    return (
        <Modal
            visible={isVisible}
            onCancel={onCancel}
            footer={null}
            width={900}
            maskClosable={true}
        >
            <div className='mb-10 text-4xl font-semibold text-center'>Chi tiết hóa đơn</div>

            {order && (
                <div className='flex flex-col gap-10'>
                    <div className='flex gap-10'>
                        <div className='w-[60%] flex flex-col items-start gap-5'>
                            <div className='flex flex-col items-start justify-center gap-5 p-10 bg-[#f4f6f8] shadow-lg rounded-xl w-full'>
                                <div className='flex flex-col w-full gap-4 text-gray-800'>
                                    <label className='text-2xl font-bold'>Code:</label>
                                    <Input size='large' disabled value={orderCode} />
                                </div>

                                <div className='flex flex-col w-full gap-4 text-gray-800'>
                                    <label className='text-2xl font-bold'>Ngày đặt hàng:</label>
                                    <Input size='large' disabled value={orderDate} />
                                </div>
                                <div className='flex flex-col w-full gap-4 text-gray-800'>
                                    <label className='text-2xl font-bold'>Tên người đặt:</label>
                                    <Input size='large' disabled value={name} />
                                </div>
                                <div className='flex flex-col w-full gap-4 text-gray-800'>
                                    <label className='text-2xl font-bold'>Email:</label>
                                    <Input size='large' disabled value={email} />
                                </div>
                                <div className='flex flex-col w-full gap-4 text-gray-800'>
                                    <label className='text-2xl font-bold'>Số điện thoại:</label>
                                    <Input size='large' disabled value={phone} />
                                </div>
                                <div className='flex flex-col w-full gap-4 text-gray-800'>
                                    <label className='text-2xl font-bold'>Ghi chú:</label>
                                    <TextArea
                                        rows={4}
                                        value={notes}
                                        disabled
                                        onChange={(e) => setNotes(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='w-[40%]'>
                            <div className='flex flex-col items-start justify-center gap-5 p-10 bg-[#f4f6f8] shadow-lg rounded-xl w-full'>
                                <div className='flex flex-col w-full gap-4 text-gray-800'>
                                    <label className='text-2xl font-bold'>Tổng số lượng:</label>
                                    <Input size='large' disabled value={totalQuantity} />
                                </div>
                                <div className='flex flex-col w-full gap-4 text-gray-800'>
                                    <label className='text-2xl font-bold'>Tổng tiền hóa đơn:</label>
                                    <Input
                                        size='large'
                                        disabled
                                        value={formatVND(Number(totalPrice))}
                                    />
                                </div>
                                <div className='flex flex-col w-full gap-4 text-gray-800'>
                                    <label className='text-2xl font-bold'>
                                        Trạng thái đơn hàng:
                                    </label>
                                    <Input size='large' disabled value={orderStatus} />
                                </div>
                                <div className='flex flex-col w-full gap-4 text-gray-800'>
                                    <label className='text-2xl font-bold'>
                                        Trạng thái thanh toán:
                                    </label>
                                    <Input size='large' disabled value={paymentStatus} />
                                </div>
                                <div className='flex flex-col w-full gap-4 text-gray-800'>
                                    <label className='text-2xl font-bold'>
                                        Phương thức thanh toán:
                                    </label>
                                    <Input size='large' disabled value={paymentMethod} />
                                </div>
                                <div className='flex flex-col w-full gap-4 text-gray-800'>
                                    <label className='text-2xl font-bold'>
                                        Phương thức vận chuyển:
                                    </label>
                                    <Input size='large' disabled value={deliveryMethod} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=''>
                        {orderData.detail &&
                            orderData.detail.map((item, index) => (
                                <div
                                    key={index}
                                    className='flex items-center justify-between gap-5 px-10 py-5 bg-[#f4f6f8] shadow-lg rounded-xl mb-10'
                                >
                                    <div className='flex items-center gap-10'>
                                        <div className='flex items-center justify-center'>
                                            {productData[index]?.sale > 0 ? (
                                                <Badge.Ribbon
                                                    text={`Sale ${productData[index]?.sale}%`}
                                                    color='red'
                                                >
                                                    <img
                                                        src={
                                                            productData[index]?.image
                                                                ? `${urlImage}${productData[index]?.image}`
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
                                                            productData[index]?.image
                                                                ? `${urlImage}${productData[index]?.image}`
                                                                : 'https://placehold.co/380'
                                                        }
                                                        alt=''
                                                        className='rounded-2xl size-52'
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        <div className='flex flex-col gap-5'>
                                            <div className='flex items-center gap-2'>
                                                <span className='text-2xl font-bold text-red-700'>
                                                    {productData[index]?.name_product}
                                                </span>
                                                <span className='text-2xl font-[500]'>
                                                    x {item.quantity}
                                                </span>
                                            </div>
                                            <span className='text-xl font-[400] text-gray-500'>
                                                {sizeData[index]?.size_name}
                                            </span>
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <span className='text-2xl font-[500] text-gray-800'>
                                            {formatVND(Number(item.price))}
                                        </span>
                                        <span className='text-2xl font-[500] text-red-500'>
                                            {formatVND(Number(item.total_price))}
                                        </span>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            )}
        </Modal>
    );
};

export default OrderModalDetail;
