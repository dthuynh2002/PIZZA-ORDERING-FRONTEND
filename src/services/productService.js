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

export const updateProduct = async (accessToken, productId, formData) => {
    return await axios.put(`product/update/${productId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`
        }
    });
};

// Product Size
export const getAllProductSizesByProduct = async (productId) => {
    return await axios.get(`/product-size/getAll?product_id=${productId}`);
};

export const createProductSize = async (accessToken, data) => {
    return await axios.post('/product-size/create', data, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
};

export const deleteProductSize = async (accessToken, productSizeId) => {
    return await axios.delete(`/product-size/delete/${productSizeId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
};

// Product topping
export const createProductTopping = async (accessToken, data) => {
    return await axios.post('/product-topping/create', data, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
};

export const getAllProductToppingsByProduct = async (productId) => {
    return await axios.get(`/product-topping/get-all?product_id=${productId}`);
};

export const deleteProductTopping = async (accessToken, productToppingId) => {
    return await axios.delete(`/product-topping/delete/${productToppingId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
};
