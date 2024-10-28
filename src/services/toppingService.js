import axios from '~/axios';

export const getToppingById = async (accessToken, toppingId) => {
    return await axios.get(`/topping/get/${toppingId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
};

export const changeToppingStatus = async (accessToken, id, { status }) => {
    return await axios.patch(
        `topping/change-status/${id}`,
        { status },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    );
};

export const getAllToppings = async (accessToken, { page, limit }) => {
    return await axios.get(`topping/get-all?page=${page}&limit=${limit}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
};

export const allToppingsPublic = async () => {
    return await axios.get('topping/get');
};

export const createTopping = async (accessToken, { topping_name, description }) => {
    return await axios.post(
        'topping/create',
        { topping_name, description },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    );
};

export const updateTopping = async (accessToken, id, { topping_name, description }) => {
    return await axios.put(
        `topping/update/${id}`,
        { topping_name, description },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    );
};

export const deleteTopping = async (accessToken, id) => {
    return await axios.delete(`topping/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
};
