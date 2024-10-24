import { Badge, Button, Carousel } from 'antd';
import { Fragment, useEffect, useState } from 'react';
import slide1 from '~/assets/images/slide1.jpg';
import slide2 from '~/assets/images/slide2.jpg';
import slide3 from '~/assets/images/slide3.jpg';
import producttest from '~/assets/images/Pizza_HaiSan.jpg';
import { useNavigate } from 'react-router-dom';
import { formatVND } from '~/utils/formatVND';
import ProductModalDetail from '../Product/productModalDetail';

const HomePage = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handelCancel = () => {
        setIsModalVisible(false);
    };
    const navigate = useNavigate();
    const gotoProduct = () => {
        navigate('/product');
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);
    return (
        <Fragment>
            <div>
                <Carousel autoplay arrows>
                    <div>
                        <img
                            src={slide1}
                            alt=''
                            className='w-full bg-center bg-no-repeat bg-cover'
                        />
                    </div>
                    <div>
                        <img
                            src={slide2}
                            alt=''
                            className='w-full bg-center bg-no-repeat bg-cover'
                        />
                    </div>
                    <div>
                        <img
                            src={slide3}
                            alt=''
                            className='w-full bg-center bg-no-repeat bg-cover'
                        />
                    </div>
                </Carousel>
            </div>

            <div className='my-10 px-60'>
                <span className='text-4xl uppercase'>Hôm nay ăn gì ?</span>
                <hr className='my-5' />
                <div className='grid grid-cols-5 grid-rows-1 gap-10 mt-10'>
                    <Badge.Ribbon text='Discount 10%' color='red'>
                        <div className='flex flex-col gap-4 shadow-xl'>
                            <img src={producttest} alt='' className='rounded-2xl' />
                            <div className='flex flex-col gap-6 p-10'>
                                <span className='text-4xl'>Pizza Hải Sản</span>
                                <p className='font-[400]'>Đây là pizza rất ngon mời bạn ăn nha</p>
                                <div className='flex items-center justify-between'>
                                    <div className='flex flex-col'>
                                        <span className='font-[400]'>Giá</span>
                                        <span className='font-bold'>{formatVND(175000)}đ</span>
                                    </div>
                                    <div
                                        className='px-4 py-2 border-2 cursor-pointer rounded-xl hover:text-red-600 hover:border-red-600'
                                        onClick={() => showModal()}
                                    >
                                        Order now
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Badge.Ribbon>{' '}
                    <Badge.Ribbon text='Discount 10%' color='red'>
                        <div className='flex flex-col gap-4 shadow-xl'>
                            <img src={producttest} alt='' className='rounded-2xl' />
                            <div className='flex flex-col gap-6 p-10'>
                                <span className='text-4xl'>Pizza Hải Sản</span>
                                <p className='font-[400]'>Đây là pizza rất ngon mời bạn ăn nha</p>
                                <div className='flex items-center justify-between'>
                                    <div className='flex flex-col'>
                                        <span className='font-[400]'>Giá</span>
                                        <span className='font-bold'>{formatVND(175000)}đ</span>
                                    </div>
                                    <div
                                        className='px-4 py-2 border-2 cursor-pointer rounded-xl hover:text-red-600 hover:border-red-600'
                                        onClick={() => showModal()}
                                    >
                                        Order now
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Badge.Ribbon>{' '}
                    <Badge.Ribbon text='Discount 10%' color='red'>
                        <div className='flex flex-col gap-4 shadow-xl'>
                            <img src={producttest} alt='' className='rounded-2xl' />
                            <div className='flex flex-col gap-6 p-10'>
                                <span className='text-4xl'>Pizza Hải Sản</span>
                                <p className='font-[400]'>Đây là pizza rất ngon mời bạn ăn nha</p>
                                <div className='flex items-center justify-between'>
                                    <div className='flex flex-col'>
                                        <span className='font-[400]'>Giá</span>
                                        <span className='font-bold'>{formatVND(175000)}đ</span>
                                    </div>
                                    <div
                                        className='px-4 py-2 border-2 cursor-pointer rounded-xl hover:text-red-600 hover:border-red-600'
                                        onClick={() => showModal()}
                                    >
                                        Order now
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Badge.Ribbon>{' '}
                    <Badge.Ribbon text='Discount 10%' color='red'>
                        <div className='flex flex-col gap-4 shadow-xl'>
                            <img src={producttest} alt='' className='rounded-2xl' />
                            <div className='flex flex-col gap-6 p-10'>
                                <span className='text-4xl'>Pizza Hải Sản</span>
                                <p className='font-[400]'>Đây là pizza rất ngon mời bạn ăn nha</p>
                                <div className='flex items-center justify-between'>
                                    <div className='flex flex-col'>
                                        <span className='font-[400]'>Giá</span>
                                        <span className='font-bold'>{formatVND(175000)}đ</span>
                                    </div>
                                    <div
                                        className='px-4 py-2 border-2 cursor-pointer rounded-xl hover:text-red-600 hover:border-red-600'
                                        onClick={() => showModal()}
                                    >
                                        Order now
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Badge.Ribbon>
                </div>
                <div className='w-full my-20 text-center'>
                    <Button className='px-10 py-8' onClick={gotoProduct}>
                        Xem thêm
                    </Button>
                </div>
            </div>
            <ProductModalDetail isVisible={isModalVisible} onCancel={handelCancel} />
        </Fragment>
    );
};
export default HomePage;
