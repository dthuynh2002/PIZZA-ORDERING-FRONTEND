import { useEffect } from 'react';
import { SectionIntro, SectionOriginalStyle, SectionBanner } from './components';
import './aboutUsResponsive.scss';

const AboutUs = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);
    return (
        <div className='pt-8 space-y-8 md:space-y-12'>
            <div className='pt-1 pb-4 text-5xl font-bold text-center'>About Line97 Pizza</div>
            <SectionIntro />
            <SectionOriginalStyle />
            <SectionBanner />
        </div>
    );
};

export default AboutUs;
