import axios from '~/axios';

export const getSizeById = async (accessToken, sizeId) => {
    return await axios.get(`/size/get/${sizeId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
};
