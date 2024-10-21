import { Badge, Tabs } from 'antd';
import { Fragment, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import producttest from '~/assets/images/Pizza_HaiSan.jpg';
import { WrapperCartScroll, WrapperMenuScroll } from './style';
import { formatVND } from '~/utils/formatVND';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

const ProductPage = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);
    const navigate = useNavigate();
    const gotoCart = () => {
        navigate('/cart');
    };

    // const onChange = (key) => {
    //     // navigate(`/product/${key}`);
    // };

    const items = [
        {
            key: 'tab1',
            label: 'Tab 1'
        },
        {
            key: 'tab2',
            label: 'Tab 2'
        },
        {
            key: 'tab3',
            label: 'Tab 3'
        }
    ];

    return (
        <Fragment>
            <div className='flex items-start w-full min-h-screen px-10 py-14'>
                <div className='w-[75%] flex flex-col justify-start '>
                    <Tabs
                        defaultActiveKey='tab1'
                        items={items}
                        // onChange={onChange}
                    />
                    <WrapperMenuScroll className='pr-10'>
                        <div className='grid gap-10 mt-10 md:grid-cols-4 md:grid-rows-2 '>
                            <Badge.Ribbon text='Discount 10%' color='red'>
                                <div className='flex flex-col gap-4 shadow-xl'>
                                    <img src={producttest} alt='' className='rounded-2xl' />
                                    <div className='flex flex-col gap-6 p-10'>
                                        <span className='text-4xl'>Pizza Hải Sản</span>
                                        <p className='font-[400]'>
                                            Đây là pizza rất ngon mời bạn ăn nha
                                        </p>
                                        <div className='flex items-center justify-between'>
                                            <div className='flex flex-col'>
                                                <span className='font-[400]'>Giá</span>
                                                <span className='font-bold'>
                                                    {formatVND(175000)}đ
                                                </span>
                                            </div>
                                            <div className='px-4 py-2 border-2 cursor-pointer rounded-xl hover:text-red-600 hover:border-red-600'>
                                                Order now
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Badge.Ribbon>
                            <Badge.Ribbon text='Discount 10%' color='red'>
                                <div className='flex flex-col gap-4 shadow-xl'>
                                    <img src={producttest} alt='' className='rounded-2xl' />
                                    <div className='flex flex-col gap-6 p-10'>
                                        <span className='text-4xl'>Pizza Hải Sản</span>
                                        <p className='font-[400]'>
                                            Đây là pizza rất ngon mời bạn ăn nha
                                        </p>
                                        <div className='flex items-center justify-between'>
                                            <div className='flex flex-col'>
                                                <span className='font-[400]'>Giá</span>
                                                <span className='font-bold'>
                                                    {formatVND(175000)}đ
                                                </span>
                                            </div>
                                            <div className='px-4 py-2 border-2 cursor-pointer rounded-xl hover:text-red-600 hover:border-red-600'>
                                                Order now
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Badge.Ribbon>
                            <Badge.Ribbon text='Discount 10%' color='red'>
                                <div className='flex flex-col gap-4 shadow-xl'>
                                    <img src={producttest} alt='' className='rounded-2xl' />
                                    <div className='flex flex-col gap-6 p-10'>
                                        <span className='text-4xl'>Pizza Hải Sản</span>
                                        <p className='font-[400]'>
                                            Đây là pizza rất ngon mời bạn ăn nha
                                        </p>
                                        <div className='flex items-center justify-between'>
                                            <div className='flex flex-col'>
                                                <span className='font-[400]'>Giá</span>
                                                <span className='font-bold'>
                                                    {formatVND(175000)}đ
                                                </span>
                                            </div>
                                            <div className='px-4 py-2 border-2 cursor-pointer rounded-xl hover:text-red-600 hover:border-red-600'>
                                                Order now
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Badge.Ribbon>
                            <Badge.Ribbon text='Discount 10%' color='red'>
                                <div className='flex flex-col gap-4 shadow-xl'>
                                    <img src={producttest} alt='' className='rounded-2xl' />
                                    <div className='flex flex-col gap-6 p-10'>
                                        <span className='text-4xl'>Pizza Hải Sản</span>
                                        <p className='font-[400]'>
                                            Đây là pizza rất ngon mời bạn ăn nha
                                        </p>
                                        <div className='flex items-center justify-between'>
                                            <div className='flex flex-col'>
                                                <span className='font-[400]'>Giá</span>
                                                <span className='font-bold'>
                                                    {formatVND(175000)}đ
                                                </span>
                                            </div>
                                            <div className='px-4 py-2 border-2 cursor-pointer rounded-xl hover:text-red-600 hover:border-red-600'>
                                                Order now
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Badge.Ribbon>
                            <Badge.Ribbon text='Discount 10%' color='red'>
                                <div className='flex flex-col gap-4 shadow-xl'>
                                    <img src={producttest} alt='' className='rounded-2xl' />
                                    <div className='flex flex-col gap-6 p-10'>
                                        <span className='text-4xl'>Pizza Hải Sản</span>
                                        <p className='font-[400]'>
                                            Đây là pizza rất ngon mời bạn ăn nha
                                        </p>
                                        <div className='flex items-center justify-between'>
                                            <div className='flex flex-col'>
                                                <span className='font-[400]'>Giá</span>
                                                <span className='font-bold'>
                                                    {formatVND(175000)}đ
                                                </span>
                                            </div>
                                            <div className='px-4 py-2 border-2 cursor-pointer rounded-xl hover:text-red-600 hover:border-red-600'>
                                                Order now
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Badge.Ribbon>
                        </div>
                        <div className='flex items-center justify-center gap-4'>
                            <button className='px-10 py-4 text-xl text-white bg-[#d7282f] w-96 rounded-xl'>
                                Xem thêm
                            </button>
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
                </div>
            </div>
        </Fragment>
    );
};

export default ProductPage;
