import axios from '~/axios';

export const getAllOrders = async (accessToken, { page, limit }) => {
    return await axios.get(`order/get-all?page=${page}&limit=${limit}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
};
