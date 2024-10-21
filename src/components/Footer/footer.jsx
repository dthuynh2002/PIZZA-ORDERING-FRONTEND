import { QRCode } from 'antd';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import defaultAvatar from '~/assets/images/avt.jpg';

const Footer = () => {
    const navigate = useNavigate();
    const gotoAboutUs = () => {
        navigate('/about-us');
    };
    return (
        <Fragment>
            <footer className='p-4 text-center text-white bg-[#232222] '>
                <div className='flex justify-around gap-10 text-xl '>
                    <div>
                        <div className='mb-3 font-bold text-yellow-300 '>MENU</div>
                        <div className='flex flex-col gap-3 text-left cursor-pointer'>
                            <div className=''>PIZZA RAU CỦ</div>
                            <div className=''>PIZZA HẢI SẢN</div>
                            <div className=''>PIZZA GÀ BBQ</div>
                            <div className=''>PIZZA XÚC XÍCH</div>
                            <div className=''>PIZZA PHÔ MAI</div>
                            <div className=''>THỨC UỐNG</div>
                        </div>
                    </div>
                    <div>
                        <div className='mb-3 text-yellow-300'>VỀ CHÚNG TÔI</div>
                        <div className='flex flex-col gap-3 text-left cursor-pointer'>
                            <div onClick={gotoAboutUs}>Giới thiệu</div>
                            <div className=''>Tầm Nhìn Chúng Tôi</div>
                            <div className=''>Vệ Sinh An Toàn Thực Phẩm</div>
                        </div>
                    </div>
                    <div>
                        <div className='mb-3 text-yellow-300'>CẦN SỰ HỖ TRỢ ?</div>
                        <div className='flex flex-col gap-3 mb-3 text-green-600'>1900 1822</div>
                        <div className='mb-3 text-yellow-300'>LIÊN HỆ PIZZA LINE-97</div>
                        <QRCode
                            errorLevel='H'
                            value='https://ant.design/'
                            color='white'
                            icon={defaultAvatar}
                        />
                    </div>
                </div>

                <hr className='my-5 mx-60 ' />
                <div className='text-xl'>
                    <p>Công ty TNHH Pizza Việt Nam | Số ĐKKD: 035040582544</p>
                    <br />
                    <span>
                        Tầng 10, Tòa Office, Trần Hoàng Na, Phường Hưng Lợi, quận Ninh Kiều,TP.Cần
                        Thơ, Việt Nam
                    </span>
                </div>
            </footer>
        </Fragment>
    );
};

export default Footer;
