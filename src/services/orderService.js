import axios from '~/axios';

export const getAllOrders = async (accessToken, { page, limit }) => {
    return await axios.get(`order/get-all?page=${page}&limit=${limit}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
};

// Private
export const allOrders = async (accessToken, { page, limit }) => {
    return await axios.get(`order/all?page=${page}&limit=${limit}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
};

export const createOrder = async (accessToken, data) => {
    return await axios.post('order/create', data, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
};

export const changeOrderStatus = async (accessToken, orderId, orderStatus) => {
    return await axios.patch(
        `order/${orderId}/change-status?status=${orderStatus}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    );
};
