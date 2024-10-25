import axios from '~/axios';

export const getProductById = async (accessToken, productId) => {
    return await axios.get(`/product/get/${productId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
};
