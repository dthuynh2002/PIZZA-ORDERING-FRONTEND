/* eslint-disable react/prop-types */
import { Badge, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getAllProductSizesByProduct } from '~/services/productService';
import { getSizeById } from '~/services/sizeService';
import { formatVND } from '~/utils/formatVND';

const ProductModalDetail = ({ isVisible, onCancel, product }) => {
    const token = useSelector((state) => state.auth.auth.access_token);

    let urlImage = import.meta.env.VITE_URL_IMAGE || 'http://localhost:3001/images/';

    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productSale, setProductSale] = useState('');
    const [productImage, setProductImage] = useState('');

    const [productSizeData, setProductSizeData] = useState([]);
    const [sizeDataById, setSizeDataById] = useState([]);

    const productData = useMemo(() => product, [product]);

    useEffect(() => {
        if (productData) {
            setProductName(productData.name_product);
            setProductPrice(productData.price);
            setProductDescription(productData.description);
            setProductSale(productData.sale);
            setProductImage(productData.image);
        }
    }, [productData]);

    useEffect(() => {
        const fetchProductSize = async () => {
            if (productData && productData.id) {
                const response = await getAllProductSizesByProduct(productData.id);
                if (response.status === true) {
                    // Sắp xếp mảng productSizeData theo giá tăng dần
                    const sortedSizes = response.data.sort((a, b) => a.price - b.price);
                    setProductSizeData(sortedSizes);

                    try {
                        const sizePromises = sortedSizes.map(async (item) => {
                            const dataSizeById = await getSizeById(token, item.size_id);
                            if (dataSizeById.status === true) {
                                return dataSizeById.data;
                            } else {
                                toast.error(dataSizeById.message);
                                return null;
                            }
                        });

                        const sizes = await Promise.all(sizePromises);
                        setSizeDataById(sizes.filter((size) => size));
                    } catch (error) {
                        toast.error('Đã xảy ra lỗi khi lấy thông tin kích thước.');
                    }
                } else {
                    toast.error(response.message);
                }
            }
        };
        fetchProductSize();
    }, [productData, token]);

    const handleOnClick = () => {
        toast.success('Thêm sản phẩm thành công!');
    };

    const [activeSize, setActiveSize] = useState(null);

    const handleClickSize = (size) => {
        setActiveSize(size);
    };

    return (
        <Modal
            visible={isVisible}
            onCancel={onCancel}
            footer={null}
            maskClosable={true}
            width={900}
            styles={{ body: { maxHeight: '85vh', overflowY: 'auto', overflowX: 'hidden' } }}
        >
            <div className='py-10'>
                <div className='w-full mb-10 text-4xl font-bold text-center text-red-600 uppercase'>
                    Thêm vào giỏ hàng
                </div>
                <div className='flex gap-5'>
                    <div className='flex 1'>
                        <img
                            src={
                                productImage
                                    ? `${urlImage}${product.image}`
                                    : 'https://placehold.co/380'
                            }
                            alt=''
                            style={{ width: '380px', height: '380px' }}
                        />
                    </div>
                    <div className='bg-[#f9fafb] flex-1 px-5 pt-7 flex flex-col gap-5'>
                        <div className='flex flex-col'>
                            <span className='text-4xl font-[600]'>{productName}</span>
                            <span>{productDescription}</span>
                        </div>
                        <div className='flex flex-col gap-5 py-5 text-4xl bg-white rounded-xl'>
                            <div className='flex items-center gap-10 px-5'>
                                <span className='font-[500]'>{formatVND(productPrice)}</span>
                                <span className='text-2xl text-gray-500 line-through'>
                                    {formatVND(10000)}
                                </span>
                                {productSale ? (
                                    <span className='text-xl text-gray-500 line-through'>
                                        {formatVND(productPrice * productSale)}
                                    </span>
                                ) : null}
                            </div>
                        </div>
                        <div>
                            <span className='text-red-600 font-[500] uppercase'>Kích thước</span>
                            <div className='flex items-center gap-10'>
                                {productSizeData &&
                                    productSizeData.map((size, index) => (
                                        <Badge.Ribbon text='Sale 10%' color='red' key={size.id}>
                                            <div className='py-8'>
                                                <div
                                                    className={`flex flex-col items-center justify-center h-24 border-2 rounded-lg cursor-pointer w-52 ${
                                                        activeSize?.id === size.id
                                                            ? 'bg-red-600 text-white'
                                                            : 'border-red-600'
                                                    }`}
                                                    onClick={() => handleClickSize(size)}
                                                >
                                                    {sizeDataById[index] && (
                                                        <span>{sizeDataById[index].size_name}</span>
                                                    )}
                                                    {size.price > 0 && (
                                                        <span
                                                            className={`${
                                                                activeSize?.id === size.id
                                                                    ? 'text-white'
                                                                    : 'text-red-600'
                                                            }`}
                                                        >
                                                            + {formatVND(size.price)}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </Badge.Ribbon>
                                    ))}
                            </div>
                        </div>
                        <div>
                            <span className='text-red-600 font-[500] uppercase'>Ghi chú</span>
                            <TextArea rows={4} />
                        </div>
                        <div
                            className='py-3 text-center text-white bg-black rounded-lg cursor-pointer hover:bg-red-700'
                            onClick={handleOnClick}
                        >
                            Thêm vào giỏ hàng
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ProductModalDetail;
