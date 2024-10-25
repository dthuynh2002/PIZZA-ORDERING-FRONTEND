/* eslint-disable react/prop-types */
import { Input, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getProductById } from '~/services/productService';
import { getSizeById } from '~/services/sizeService';
import { formatVND } from '~/utils/formatVND';

const OrderHistoryModal = ({ isVisible, onCancel, order }) => {
    const token = useSelector((state) => state.auth.auth.access_token);

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
            if (!token || !orderData.detail) return;

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
                    const sizeRes = await getSizeById(token, item.size_id);
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

    return (
        <Modal
            visible={isVisible}
            onCancel={onCancel}
            footer={null}
            width={1100}
            maskClosable={true}
        >
            <div className='mb-10 text-4xl font-semibold'>Chi tiết hóa đơn</div>

            {order && (
                <div className='flex gap-10 px-10'>
                    <div className='w-[60%] flex flex-col items-start justify-center gap-5'>
                        <div className='flex flex-col w-full gap-4 text-gray-800'>
                            <label className='text-2xl font-bold'>Code:</label>
                            <Input size='large' value={orderCode} />
                        </div>
                        <div className='flex flex-col w-full gap-4 text-gray-800'>
                            <label className='text-2xl font-bold'>Tổng tiền hóa đơn:</label>
                            <Input size='large' value={totalPrice} />
                        </div>
                        <div className='flex flex-col w-full gap-4 text-gray-800'>
                            <label className='text-2xl font-bold'>Tổng số lượng:</label>
                            <Input size='large' value={totalQuantity} />
                        </div>
                        <div className='flex flex-col w-full gap-4 text-gray-800'>
                            <label className='text-2xl font-bold'>Trạng thái đơn hàng:</label>
                            <Input size='large' value={orderStatus} />
                        </div>
                        <div className='flex flex-col w-full gap-4 text-gray-800'>
                            <label className='text-2xl font-bold'>Trạng thái thanh toán:</label>
                            <Input size='large' value={paymentStatus} />
                        </div>
                        <div className='flex flex-col w-full gap-4 text-gray-800'>
                            <label className='text-2xl font-bold'>Phương thức thanh toán:</label>
                            <Input size='large' value={paymentMethod} />
                        </div>
                        <div className='flex flex-col w-full gap-4 text-gray-800'>
                            <label className='text-2xl font-bold'>Phương thức vận chuyển:</label>
                            <Input size='large' value={deliveryMethod} />
                        </div>
                        <div className='flex flex-col w-full gap-4 text-gray-800'>
                            <label className='text-2xl font-bold'>Ngày đặt hàng:</label>
                            <Input size='large' value={orderDate} />
                        </div>
                        <div className='flex flex-col w-full gap-4 text-gray-800'>
                            <label className='text-2xl font-bold'>Tên người đặt:</label>
                            <Input size='large' value={name} />
                        </div>
                        <div className='flex flex-col w-full gap-4 text-gray-800'>
                            <label className='text-2xl font-bold'>Email:</label>
                            <Input size='large' value={email} />
                        </div>
                        <div className='flex flex-col w-full gap-4 text-gray-800'>
                            <label className='text-2xl font-bold'>Số điện thoại:</label>
                            <Input size='large' value={phone} />
                        </div>
                        <div className='flex flex-col w-full gap-4 text-gray-800'>
                            <label className='text-2xl font-bold'>Ghi chú:</label>
                            <TextArea
                                rows={4}
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='w-[40%]'>
                        {orderData.detail &&
                            orderData.detail.map((item, index) => (
                                <div key={index}>
                                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                                        <label className='text-2xl font-bold'>Số lượng:</label>
                                        <Input size='large' value={item.quantity} />
                                    </div>
                                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                                        <label className='text-2xl font-bold'>Giá:</label>
                                        <Input
                                            size='large'
                                            value={item.price ? formatVND(item.price) : '0 VND'}
                                        />
                                    </div>
                                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                                        <label className='text-2xl font-bold'>Tổng tiền:</label>
                                        <Input size='large' value={item.total_price} />
                                    </div>
                                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                                        <label className='text-2xl font-bold'>Tên sản phẩm:</label>
                                        <Input
                                            size='large'
                                            value={productData[index]?.name_product || ''}
                                        />
                                    </div>
                                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                                        <label className='text-2xl font-bold'>Kích cỡ:</label>
                                        <Input
                                            size='large'
                                            value={sizeData[index]?.description || ''}
                                        />
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            )}
        </Modal>
    );
};

export default OrderHistoryModal;
