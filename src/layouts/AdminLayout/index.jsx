import { Fragment } from 'react';
import SectionMenu from './SectionMenu/sectionMenu';
import { Outlet } from 'react-router-dom';
import AdminHeader from '~/components/AdminHeader/adminHeader';

const AdminLayout = () => {
    return (
        <Fragment>
            <div className='flex flex-col w-full min-h-screen bg-[#f4f6f8]'>
                <AdminHeader />
                <div className='flex justify-center px-10 '>
                    <div className='w-[18%] border-r-2 border-r-gray-200'>
                        <SectionMenu />
                    </div>
                    <div className='w-[82%] flex justify-center pl-10 pt-10'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default AdminLayout;
