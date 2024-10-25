import { Badge } from 'antd';
import { formatVND } from '~/utils/formatVND';
import producttest from '~/assets/images/Pizza_HaiSan.jpg';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { WrapperCartScroll } from '../Product/style';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const navigate = useNavigate();
    const gotoPayment = () => {
        navigate('/payment');
    };
    return (
        <div className='flex justify-center py-10'>
            <div className='w-[50%]'>
                <div className='flex items-center justify-between px-5 py-10 mb-6 text-3xl'>
                    <span className='font-bold'>Giỏ hàng của bạn</span>
                    <div className='flex items-center gap-2'>
                        <span>1</span>
                        <span>món</span>
                    </div>
                </div>
                <WrapperCartScroll className='flex flex-col gap-10 px-5'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-10'>
                            <div className='flex items-center justify-center'>
                                <Badge.Ribbon text='Discount 10%' color='red'>
                                    <img src={producttest} alt='' className='rounded-2xl size-52' />
                                </Badge.Ribbon>
                            </div>
                            <div className='flex flex-col gap-5 '>
                                <span className='text-2xl font-bold text-red-700'>
                                    {' '}
                                    Pizza Hải Sản
                                </span>
                                <span className='text-xl font-[400] text-gray-500'>
                                    Cỡ lớn (34cm)
                                </span>
                                <span className='text-2xl cursor-pointer hover:text-gray-500'>
                                    Xóa
                                </span>
                            </div>
                        </div>
                        <div className='flex flex-col gap-8 mt-2'>
                            <div className='flex flex-col gap-2'>
                                <span className='line-through text-2xl font-[500]'>
                                    {' '}
                                    {formatVND(275000)}đ
                                </span>
                                <span className='text-2xl font-[500] text-red-500'>
                                    {formatVND(247500)}đ
                                </span>
                            </div>
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
                    </div>
                    <hr className='my-3' />
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-10'>
                            <div className='flex items-center justify-center'>
                                <Badge.Ribbon text='Discount 10%' color='red'>
                                    <img src={producttest} alt='' className='rounded-2xl size-52' />
                                </Badge.Ribbon>
                            </div>
                            <div className='flex flex-col gap-5 '>
                                <span className='text-2xl font-bold text-red-700'>
                                    {' '}
                                    Pizza Hải Sản
                                </span>
                                <span className='text-xl font-[400] text-gray-500'>
                                    Cỡ lớn (34cm)
                                </span>
                                <span className='text-2xl cursor-pointer hover:text-gray-500'>
                                    Xóa
                                </span>
                            </div>
                        </div>
                        <div className='flex flex-col gap-8 mt-2'>
                            <div className='flex flex-col gap-2'>
                                <span className='line-through text-2xl font-[500]'>
                                    {' '}
                                    {formatVND(275000)}đ
                                </span>
                                <span className='text-2xl font-[500] text-red-500'>
                                    {formatVND(247500)}đ
                                </span>
                            </div>
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
                    </div>
                </WrapperCartScroll>
                <div className='text-2xl font-[400] flex flex-col justify-end gap-4 px-5 py-16 '>
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
                        onClick={gotoPayment}
                    >
                        Thanh toán
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
