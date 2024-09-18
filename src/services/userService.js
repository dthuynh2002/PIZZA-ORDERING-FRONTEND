import axios from '~/axios';

export const register = async ({ user_name, email, password, phone_number }) => {
    return await axios.post(`user/create`, { user_name, email, password, phone_number });
};
export const login = async ({ email, password }) => {
    return await axios.post(`user/login`, { email, password });
};

export const getUser = async (access_token) => {
    return await axios.get(`user/profile`, {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    });
};

export const updateUser = async (access_token, formData) => {
    return await axios.put(`user/update`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${access_token}`
        }
    });
};

export const changePassword = async (access_token, data) => {
    return await axios.patch(`user/change-password`, data, {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    });
};
