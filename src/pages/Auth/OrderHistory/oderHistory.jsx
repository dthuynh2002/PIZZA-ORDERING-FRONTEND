/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
    RightOutlined,
    LeftOutlined,
    DoubleLeftOutlined,
    DoubleRightOutlined
} from '@ant-design/icons';
import { useTable } from 'react-table';
import { getAllOrders } from '~/services/orderService';
import { formatVND } from '~/utils/formatVND';
import OrderHistoryModal from './orderHistoryModal';

const OrderHistoryPage = () => {
    const token = useSelector((state) => state.auth.auth.access_token);

    const [dataOrder, setDataOrder] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 5;

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = (order) => {
        setSelectedOrder(order);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const columns = useMemo(
        () => [
            {
                Header: 'Code',
                accessor: 'order_code',
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
                Header: 'Thời gian đặt',
                accessor: 'order_date'
            },
            {
                Header: 'Tên khách hàng',
                accessor: 'name'
            },
            {
                Header: 'Tổng tiền',
                accessor: 'total_price',
                Cell: ({ value }) => formatVND(Number(value))
            },
            {
                Header: 'Trạng thái đơn hàng',
                accessor: 'order_status'
            },
            {
                Header: 'Trạng thái thanh toán',
                accessor: 'payment_status'
            },
            {
                Header: 'Phương thức thanh toán',
                accessor: 'payment_method'
            },
            {
                Header: 'Phương thức giao hàng',
                accessor: 'delivery_method'
            }
        ],
        []
    );

    useEffect(() => {
        const fetchData = async () => {
            if (!token) {
                return;
            }
            try {
                const response = await getAllOrders(token, { page, limit });
                const orders = response.data;

                setDataOrder(orders);
                setTotalPages(Math.ceil(response.total / limit));
            } catch (error) {
                toast.error(error.response?.data?.message);
            }
        };
        fetchData();
    }, [token, page]);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data: dataOrder
    });

    const handleGoToFirstPage = () => {
        setPage(1);
    };

    const handleGoToLastPage = () => {
        setPage(totalPages);
    };

    const isFirstPage = page === 1;
    const isLastPage = page === totalPages;

    return (
        <div className='border-2 border-[#eeefee] rounded-2xl bg-white shadow-xl my-5'>
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
                {/* Modal */}
                <OrderHistoryModal
                    isVisible={isModalVisible}
                    onCancel={handleCancel}
                    order={selectedOrder}
                />
            </div>
        </div>
    );
};

export default OrderHistoryPage;
