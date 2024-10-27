import axios from '~/axios';

export const getProductById = async (accessToken, productId) => {
    return await axios.get(`/product/get/${productId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
};

export const getAllProducts = async ({ page, limit }) => {
    return await axios.get(`/product/gets?page=${page}&limit=${limit}`);
};

export const getAllProductsPrivate = async (accessToken, { page, limit }) => {
    return await axios.get(`/product/get-all?page=${page}&limit=${limit}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
};

// Product Size
export const getAllProductSizesByProduct = async (productId) => {
    return await axios.get(`/product-size/getAll?product_id=${productId}`);
};

export const deleteProducts = async (accessToken, id) => {
    return await axios.delete(`product/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
};

export const changeProductStatus = async (accessToken, id, { status }) => {
    return await axios.patch(
        `product/change-status/${id}`,
        { status },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    );
};

export const createProduct = async (accessToken, formData) => {
    return await axios.post('product/create', formData, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data'
        }
    });
};
