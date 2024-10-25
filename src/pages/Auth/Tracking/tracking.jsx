import { Input } from 'antd';
import { Fragment, useState } from 'react';

const TrackingPage = () => {
    const [keyWords, setKeywords] = useState('');

    const handleSearch = () => {
        console.log('Search:', keyWords);
    };

    return (
        <Fragment>
            <div className=''>
                <h1>Tracking Order</h1>
                <Input
                    size='large'
                    className='w-[300px] px-4 py-5 text-2xl border rounded-2xl'
                    type='text'
                    placeholder='Từ khóa tìm kiếm...'
                    value={keyWords}
                    onChange={(e) => setKeywords(e.target.value)}
                />
                <button
                    className='px-6 py-1 mr-2 text-xl text-white bg-black rounded-2xl'
                    onClick={handleSearch}
                >
                    Tìm kiếm
                </button>
            </div>
            <div className=''></div>
        </Fragment>
    );
};

export default TrackingPage;
