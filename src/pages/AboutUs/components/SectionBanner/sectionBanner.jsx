import commonStyles from '~/style/common.module.scss';

import friedChickenImage from '~/assets/images/fried-chicken-bg-1.png';

const SectionBanner = () => {
    return (
        <div className={`${commonStyles.container}`}>
            <div className='flex items-center justify-center'>
                <img className='object-fill w-full h-[400px]' src={friedChickenImage} alt='' />
            </div>
        </div>
    );
};

export default SectionBanner;
