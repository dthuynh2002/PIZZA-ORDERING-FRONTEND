import commonStyles from '~/style/common.module.scss';

import contentRightBackgroundImage from '~/assets/images/content_right_background.png';
import SaladImage from '~/assets/images/salad.png';
import seasonSaladImage from '~/assets/images/season-salad.png';
import placeholderImage from '~/assets/images/placeholder.jpg';

const SectionIntro = () => {
    return (
        <div className={`${commonStyles.container}`}>
            <div className='relative mb-5 section-intro-container'>
                <div className='flex gap-4 intro-left'>
                    <div className='flex flex-col gap-4'>
                        <img
                            className='object-cover shadow-md intro-image-1 rounded-xl'
                            src={placeholderImage}
                            alt=''
                        />

                        <img
                            className='object-fill shadow-md intro-image-2 rounded-xl'
                            src={seasonSaladImage}
                            alt=''
                        />
                    </div>

                    <img
                        className='object-cover shadow-md intro-image-3 rounded-xl'
                        src={SaladImage}
                        alt=''
                    />
                </div>

                <div
                    className='absolute px-16 text-center bg-center bg-no-repeat bg-cover py-44 intro-right md:top-24 md:right-0 drop-shadow-2xl'
                    style={{ backgroundImage: `url(${contentRightBackgroundImage})` }}
                >
                    <div className='text-[#ff6347] text-4xl font-bold'>
                        Hơn cả Pizza. Đó là Line97
                    </div>

                    <div className='py-10 text-2xl font-bold intro-content text-slate-500'>
                        Pizza thật đặc biệt. Bởi vì nó không chỉ là thức ăn. Đó là điều gắn kết bạn
                        bè và gia đình lại với nhau. Và đó là lý do tại sao ngay từ ngày đầu tiên,
                        chúng tôi đã muốn cung cấp một loại bánh pizza không chỉ đơn thuần là pizza.
                    </div>

                    <button className='text-xl font-bold text-gray-900 border border-solid border-black rounded-lg bg-white cursor-pointer mt-5 px-5 py-2.5'>
                        Xem thêm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SectionIntro;
