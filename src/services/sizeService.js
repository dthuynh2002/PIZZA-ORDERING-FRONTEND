import axios from '~/axios';

export const getSizeById = async (accessToken, sizeId) => {
    return await axios.get(`/size/get/${sizeId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
};

export const changeSizeStatus = async (accessToken, id, { status }) => {
    return await axios.patch(
        `size/change-status/${id}`,
        { status },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    );
};

export const getAllSizes = async (accessToken, { page, limit }) => {
    return await axios.get(`size/get-all?page=${page}&limit=${limit}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
};

export const allSizesPublic = async () => {
    return await axios.get('size/get');
};

export const createSize = async (accessToken, { size_name, description }) => {
    return await axios.post(
        'size/create',
        { size_name, description },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    );
};

export const updateSize = async (accessToken, id, { size_name, description }) => {
    return await axios.put(
        `size/update/${id}`,
        { size_name, description },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    );
};

export const deleteSize = async (accessToken, id) => {
    return await axios.delete(`size/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
};
