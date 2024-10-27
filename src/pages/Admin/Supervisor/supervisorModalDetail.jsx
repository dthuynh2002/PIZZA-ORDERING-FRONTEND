/* eslint-disable react/prop-types */
import { Input, Modal } from 'antd';

const SupervisorModalDetail = ({ isVisible, onCancel, supervisor }) => {
    return (
        <Modal visible={isVisible} onCancel={onCancel} footer={null} maskClosable={true}>
            <div className='mb-10 text-4xl font-semibold'>Chi tiết quản trị viên</div>
            {supervisor && (
                <div className='flex flex-col items-start justify-center gap-5'>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Tên nhân viên:</label>
                        <Input size='large' value={supervisor.user_name} />
                    </div>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Email:</label>
                        <Input size='large' value={supervisor.email} />
                    </div>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Số điện thoại:</label>
                        <Input size='large' value={supervisor.phone_number} />
                    </div>
                    <div className='flex flex-col w-full gap-4 text-gray-800'>
                        <label className='text-2xl font-bold'>Địa chỉ:</label>
                        <Input size='large' value={supervisor.address} />
                    </div>
                </div>
            )}
        </Modal>
    );
};

export default SupervisorModalDetail;
