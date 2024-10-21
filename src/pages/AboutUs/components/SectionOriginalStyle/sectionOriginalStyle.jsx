import commonStyles from '~/style/common.module.scss';

import halfHalfPizzaImage from '~/assets/images/half-half-pizza.png';
import chickenSaladImage from '~/assets/images/chicken-salad-bg-1.png';

const SectionOriginalStyle = () => {
    return (
        <div className={`${commonStyles.container}`}>
            <div className='flex flex-col section-originalStyle-container'>
                <div className='mx-auto my-4 overflow-hidden md:max-w-full'>
                    <div className='md:flex section-originalStyle-top'>
                        <div className='text-justify md:w-1/2'>
                            <div className='uppercase tracking-wide text-2xl text-[#ff6347] font-semibold'>
                                Khám phá nghệ thuật Pizza kiểu NewYork
                            </div>

                            <p className='my-6 text-2xl font-[400] text-slate-500'>
                                Bước vào Line97 Pizza và chuẩn bị để ngạc nhiên trước sự đa dạng của
                                các loại pizza được chế biến từ nhiều nguyên liệu chất lượng cao. Từ
                                Pizza tôm sú tẩm bột chiên giòn đến Pizza phô mai thơm ngon, Pizza
                                sườn chua ngọt đậm đà, Pizza xúc xích Salami đậm vị, Pizza tôm mềm
                                mại, đến Pizza mực đen đầy hương vị – menu của chúng tôi là một bản
                                hòa nhạc của hương vị.
                            </p>
                        </div>

                        <div className='md:shrink-0 md:w-1/2 md:flex md:items-center md:justify-end'>
                            <img
                                className='object-cover w-full h-48 md:h-96 md:w-10/12 rounded-xl'
                                src={halfHalfPizzaImage}
                                alt=''
                            />
                        </div>
                    </div>
                </div>
                <div className='mx-auto my-4 overflow-hidden md:max-w-full'>
                    <div className='md:flex section-originalStyle-bottom'>
                        <div className='md:shrink-0 md:w-1/2 md:flex md:items-center md:justify-start'>
                            <img
                                className='object-cover w-full h-48 md:h-96 md:w-10/12 rounded-xl'
                                src={chickenSaladImage}
                                alt=''
                            />
                        </div>

                        <div className='text-justify md:w-1/2'>
                            <div className='md:text-right uppercase tracking-wide text-2xl text-[#ff6347] font-semibold'>
                                Không chỉ có Pizza: Bất ngờ ăn là đây
                            </div>

                            <p className='my-6 text-2xl font-[400] text-slate-500'>
                                Trong khi pizza là điểm nhấn, Line97 Pizza còn cung cấp một menu đa
                                dạng bao gồm các món ngon như Bò bít tết, Mì ý sốt bò băm, Mực tẩm
                                bột chiên giòn và Sườn nướng BBQ. Mỗi món đều được tẩm ướp và chế
                                biến một cách cầu kỳ, đúng theo phong cách Âu Mỹ, sử dụng nguyên
                                liệu chất lượng và nhiều loại gia vị cao cấp.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SectionOriginalStyle;
