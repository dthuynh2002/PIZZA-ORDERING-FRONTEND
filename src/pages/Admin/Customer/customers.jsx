/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from 'react';
import { useTable, useGlobalFilter } from 'react-table';
import { toast } from 'react-toastify';
import {
    RightOutlined,
    LeftOutlined,
    DoubleLeftOutlined,
    DoubleRightOutlined
} from '@ant-design/icons';
import { Input } from 'antd';
import { getAllCustomers, changeUserStatus } from '~/services/userService';
import { getToken } from '~/utils/token';
import Switch from '~/components/shared/Switch/switch';
import CustomerModalDetail from '~/pages/Admin/Customer/customerModalDetail';

const Customers = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [filterInput, setFilterInput] = useState('');
    const limit = 5;

    const showModal = (user) => {
        setSelectedUser(user);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const columns = useMemo(
        () => [
            {
                Header: 'Tên người dùng',
                accessor: 'user_name',
                Cell: ({ value, row }) => (
                    <span
                        className='text-gray-500 cursor-pointer hover:underline'
                        onClick={() => showModal(row.original)}
                    >
                        {value}
                    </span>
                )
            },
            {
                Header: 'Email',
                accessor: 'email'
            },
            {
                Header: 'Số điện thoại',
                accessor: 'phone_number'
            },
            {
                Header: 'Trạng thái',
                accessor: 'active',
                Cell: ({ row }) => (
                    <Switch
                        checked={row.original.active}
                        onChange={async (checked) => {
                            const token = getToken('auth')?.auth?.access_token;
                            if (!token) {
                                toast.error('Token không tồn tại');
                                return;
                            }
                            try {
                                const res = await changeUserStatus(token, row.original.id, {
                                    active: checked
                                });
                                const updatedData = data.map((user) =>
                                    user.id === row.original.id
                                        ? { ...user, active: checked }
                                        : user
                                );
                                toast.success(res.message);
                                setData(updatedData);
                            } catch (error) {
                                toast.error(error.response?.data?.message);
                            }
                        }}
                    />
                )
            }
        ],
        [data]
    );

    useEffect(() => {
        const fetchData = async () => {
            const token = getToken('auth')?.auth?.access_token;
            if (!token) {
                toast.error('Token không tồn tại');
                return;
            }
            try {
                const response = await getAllCustomers(token, { page, limit });
                setData(response.data);
                setTotalPages(Math.ceil(response.total / limit));
            } catch (error) {
                toast.error(error.response?.data?.message);
            }
        };
        fetchData();
    }, [page]);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, setGlobalFilter } =
        useTable(
            {
                columns,
                data
            },
            useGlobalFilter
        );

    const handleFilterChange = (e) => {
        setFilterInput(e.target.value);
    };

    const handleApplyFilter = () => {
        setGlobalFilter(filterInput);
    };

    const handleClearFilter = () => {
        setFilterInput('');
        setGlobalFilter(undefined);
    };

    const handleGoToFirstPage = () => {
        setPage(1);
    };

    const handleGoToLastPage = () => {
        setPage(totalPages);
    };

    const isFirstPage = page === 1;
    const isLastPage = page === totalPages;

    return (
        <div className='flex flex-col w-full'>
            <h1 className='text-4xl font-bold my-14'>Khách hàng</h1>
            <div className='py-5 bg-white shadow-sm rounded-xl h-fit'>
                {/* Filter */}
                <div className='flex gap-4 px-10 mb-4'>
                    <Input
                        size='large'
                        className='w-1/4 px-4 py-5 text-2xl border rounded-2xl'
                        type='text'
                        placeholder='Từ khóa tìm kiếm...'
                        value={filterInput}
                        onChange={handleFilterChange}
                    />
                    <button
                        className='px-6 py-1 mr-2 text-xl text-white bg-black rounded-2xl'
                        onClick={handleApplyFilter}
                    >
                        Tìm kiếm
                    </button>
                    {filterInput && (
                        <button
                            className='px-6 py-1 mr-2 text-xl text-white bg-red-600 rounded-2xl'
                            onClick={handleClearFilter}
                        >
                            Xóa
                        </button>
                    )}
                </div>
                {/* Table */}
                <table {...getTableProps()} className='w-full'>
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((column) => (
                                    <th
                                        key={column.id}
                                        className='h-24 text-left bg-[#f4f6f8] py-5 px-10 text-2xl'
                                    >
                                        {column.render('Header')}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map((row) => {
                            prepareRow(row);
                            return (
                                <tr
                                    key={row.id}
                                    className='border-gray-200 border-y-2 hover:bg-[#f4f6f8] text-2xl text-gray-500'
                                >
                                    {row.cells.map((cell) => (
                                        <td key={cell.column.id} className='h-24 px-10 py-5'>
                                            {cell.render('Cell')}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {/* Page */}
                <div className='flex items-center justify-between px-10 mt-5 text-2xl'>
                    <span className='text-black'>
                        Trang {page} / {totalPages}
                    </span>
                    <div className='flex gap-4 text-gray-500'>
                        <DoubleLeftOutlined
                            onClick={handleGoToFirstPage}
                            className={`p-3 rounded-xl ${
                                isFirstPage
                                    ? 'text-gray-300 cursor-not-allowed'
                                    : 'border-2 border-gray-200 shadow-sm hover:bg-gray-100'
                            }`}
                        />
                        <LeftOutlined
                            onClick={() => !isFirstPage && setPage((prev) => prev - 1)}
                            className={`p-3 rounded-xl ${
                                isFirstPage
                                    ? 'text-gray-300 cursor-not-allowed'
                                    : 'border-2 border-gray-200 shadow-sm hover:bg-gray-100'
                            }`}
                        />
                        <RightOutlined
                            onClick={() => !isLastPage && setPage((prev) => prev + 1)}
                            className={`p-3 rounded-xl ${
                                isLastPage
                                    ? 'text-gray-300 cursor-not-allowed'
                                    : 'border-2 border-gray-200 shadow-sm hover:bg-gray-100'
                            }`}
                        />
                        <DoubleRightOutlined
                            onClick={handleGoToLastPage}
                            className={`p-3 rounded-xl ${
                                isLastPage
                                    ? 'text-gray-300 cursor-not-allowed'
                                    : 'border-2 border-gray-200 shadow-sm hover:bg-gray-100'
                            }`}
                        />
                    </div>
                </div>
                {/* Modal */}
                <CustomerModalDetail
                    isVisible={isModalVisible}
                    onCancel={handleCancel}
                    user={selectedUser}
                />
            </div>
        </div>
    );
};

export default Customers;
