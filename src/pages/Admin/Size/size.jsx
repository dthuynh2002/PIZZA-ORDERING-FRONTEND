/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from 'react';
import { useTable, useGlobalFilter } from 'react-table';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
    RightOutlined,
    LeftOutlined,
    DoubleLeftOutlined,
    DoubleRightOutlined,
    PlusOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import { Input } from 'antd';
import Switch from '~/components/shared/Switch/switch';
import { changeSizeStatus, getAllSizes, deleteSize } from '~/services/sizeService';
import SizeModalDetail from './sizeModalDetail';
import SizeModalCreate from './sizeModalCreate';

const Size = () => {
    const token = useSelector((state) => state.auth.auth.access_token);

    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalCreate, setIsModalCreate] = useState(false);
    const [selectedSize, setSelectedSize] = useState(null);
    const [filterInput, setFilterInput] = useState('');
    const limit = 5;

    const showModal = (size) => {
        setSelectedSize(size);
        setIsModalVisible(true);
    };

    const showModalCreate = () => {
        setIsModalCreate(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setIsModalCreate(false);
    };

    const handleDeleteSize = async (sizeId) => {
        try {
            const res = await deleteSize(token, sizeId);
            if (res.status) {
                toast.success(res.message);
                setData(data.filter((size) => size.id !== sizeId));
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error('Xóa danh mục thất bại');
        }
    };

    const columns = useMemo(
        () => [
            {
                Header: 'Tên danh mục',
                accessor: 'size_name',
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
                Header: 'Mô tả',
                accessor: 'description'
            },
            {
                Header: 'Trạng thái',
                accessor: 'status',
                Cell: ({ row }) => (
                    <Switch
                        checked={row.original.status}
                        onChange={async (checked) => {
                            if (!token) {
                                return;
                            }
                            try {
                                const res = await changeSizeStatus(token, row.original.id, {
                                    status: checked
                                });
                                const updatedData = data.map((size) =>
                                    size.id === row.original.id
                                        ? { ...size, status: checked }
                                        : size
                                );
                                toast.success(res.message);
                                setData(updatedData);
                            } catch (error) {
                                toast.error(error.response?.data?.message);
                            }
                        }}
                    />
                )
            },
            {
                Header: 'Hành động',
                Cell: ({ row }) => (
                    <div className='flex items-center w-full'>
                        <DeleteOutlined
                            className='text-3xl'
                            onClick={() => handleDeleteSize(row.original.id)}
                            style={{ cursor: 'pointer', color: 'red' }}
                        />
                    </div>
                )
            }
        ],
        [token, data]
    );

    useEffect(() => {
        const fetchData = async () => {
            if (!token) {
                return;
            }
            try {
                const response = await getAllSizes(token, { page, limit });
                setData(response.data);
                setTotalPages(Math.ceil(response.total / limit));
            } catch (error) {
                toast.error(error.response?.data?.message);
            }
        };
        fetchData();
    }, [token, page]);

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
            <div className='flex items-center justify-between my-10'>
                <h1 className='text-4xl font-bold '>Danh sách size</h1>
                <button
                    className='px-6 py-5 mr-2 text-xl text-white bg-green-600 rounded-2xl'
                    onClick={showModalCreate}
                >
                    <PlusOutlined /> {'  '}
                    Thêm
                </button>
            </div>
            <div className='py-5 bg-white shadow-sm rounded-xl h-fit'>
                {/* Filter */}
                <div className='flex gap-4 px-10 mb-4'>
                    <Input
                        size='large'
                        className='w-[300px] px-4 py-5 text-2xl border rounded-2xl'
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
                <SizeModalDetail
                    isVisible={isModalVisible}
                    onCancel={handleCancel}
                    size={selectedSize}
                />

                <SizeModalCreate isVisible={isModalCreate} onCancel={handleCancel} />
            </div>
        </div>
    );
};

export default Size;
