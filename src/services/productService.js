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

// Product Size
export const getAllProductSizesByProduct = async (productId) => {
    return await axios.get(`/product-size/getAll?product_id=${productId}`);
};
