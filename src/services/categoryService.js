import axios from '~/axios';

export const changeCategoryStatus = async (accessToken, id, { status }) => {
    return await axios.patch(
        `category/change-status/${id}`,
        { status },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    );
};

export const getAllCategories = async (accessToken, { page, limit }) => {
    return await axios.get(`category/get-all?page=${page}&limit=${limit}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
};

export const allCategoriesPublic = async () => {
    return await axios.get('category/get');
};

export const createCategory = async (accessToken, { category_name, description }) => {
    return await axios.post(
        'category/create',
        { category_name, description },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    );
};

export const updateCategory = async (accessToken, id, { category_name, description }) => {
    return await axios.put(
        `category/update/${id}`,
        { category_name, description },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    );
};

export const deleteCategory = async (accessToken, id) => {
    return await axios.delete(`category/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
};
