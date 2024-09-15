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
