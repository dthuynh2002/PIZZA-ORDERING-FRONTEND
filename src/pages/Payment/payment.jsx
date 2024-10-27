import { useState } from 'react';
import { Badge, Form, Input, Radio, Space } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { formatVND } from '~/utils/formatVND';
import producttest from '~/assets/images/Pizza/Pizza_HaiSan.jpg';

const Payment = () => {
    const [form] = Form.useForm();
    const [value, setValue] = useState(1);
    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
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
                                <Input placeholder='Hãy nhập tên của bạn' />
                            </Form.Item>
                            <Form.Item className='font-[400]' label='Email'>
                                <Input placeholder='Hãy nhập vào email của bạn' />
                            </Form.Item>
                            <Form.Item className='font-[400]' label='Số điện thoại'>
                                <Input placeholder='Hãy nhập vào số điện thoại của bạn' />
                            </Form.Item>
                        </Form>
                    </div>
                    <div className='flex flex-col gap-10 p-5 rounded-lg shadow-xl'>
                        <span className='text-3xl'>Thông tin giao hàng</span>
                        <Form form={form} layout='vertical'>
                            <Form.Item className='font-[400]' label='Địa chỉ'>
                                <Input placeholder='Vui lòng nhập địa chỉ nhận hàng' />
                            </Form.Item>
                            <Form.Item className='font-[400]' label='Ghi chú'>
                                <TextArea
                                    rows={4}
                                    placeholder='Vui lòng nhập ghi chú nhận hàng nếu có'
                                />
                            </Form.Item>
                        </Form>
                    </div>
                    <div className='flex flex-col gap-10 px-5 py-10 rounded-lg shadow-xl'>
                        <span className='text-3xl'>Danh sách các món đã chọn</span>
                        <div className='flex items-center justify-between px-5'>
                            <div className='flex items-center gap-10'>
                                <div className='flex items-center justify-center'>
                                    <Badge.Ribbon text='Discount 10%' color='red'>
                                        <img
                                            src={producttest}
                                            alt=''
                                            className='rounded-2xl size-52'
                                        />
                                    </Badge.Ribbon>
                                </div>
                                <div className='flex flex-col gap-5 '>
                                    <div className='flex items-center gap-2'>
                                        <span className='text-2xl font-bold text-red-700'>
                                            {' '}
                                            Pizza Hải Sản
                                        </span>
                                        <span className='text-2xl font-[500]'>x 1</span>
                                    </div>
                                    <span className='text-xl font-[400] text-gray-500'>
                                        Cỡ lớn (34cm)
                                    </span>
                                </div>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <span className='line-through text-2xl font-[500]'>
                                    {' '}
                                    {formatVND(275000)}đ
                                </span>
                                <span className='text-2xl font-[500] text-red-500'>
                                    {formatVND(247500)}đ
                                </span>
                            </div>
                        </div>
                        <hr />
                        <div className='flex items-center justify-between px-5'>
                            <div className='flex items-center gap-10'>
                                <div className='flex items-center justify-center'>
                                    <Badge.Ribbon text='Discount 10%' color='red'>
                                        <img
                                            src={producttest}
                                            alt=''
                                            className='rounded-2xl size-52'
                                        />
                                    </Badge.Ribbon>
                                </div>
                                <div className='flex flex-col gap-5 '>
                                    <div className='flex items-center gap-2'>
                                        <span className='text-2xl font-bold text-red-700'>
                                            {' '}
                                            Pizza Hải Sản
                                        </span>
                                        <span className='text-2xl font-[500]'>x 1</span>
                                    </div>
                                    <span className='text-xl font-[400] text-gray-500'>
                                        Cỡ lớn (34cm)
                                    </span>
                                </div>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <span className='line-through text-2xl font-[500]'>
                                    {' '}
                                    {formatVND(275000)}đ
                                </span>
                                <span className='text-2xl font-[500] text-red-500'>
                                    {formatVND(247500)}đ
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-[35%] flex flex-col gap-10'>
                    <div className='flex flex-col gap-10 p-5 rounded-lg shadow-xl'>
                        <span className='text-3xl'>Phương thức thanh toán</span>
                        <Radio.Group className='font-[400]' onChange={onChange} value={value}>
                            <Space direction='vertical'>
                                <Radio value={1}>Thanh toán khi nhận hàng</Radio>
                                <Radio value={2}>Stripe</Radio>
                            </Space>
                        </Radio.Group>
                    </div>
                    <div className='flex flex-col gap-10 p-5 rounded-lg shadow-xl'>
                        <div className='text-2xl font-[400] flex flex-col justify-end gap-4'>
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
                            <div className='py-3 text-center text-white bg-black rounded-lg cursor-pointer hover:bg-red-700'>
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
