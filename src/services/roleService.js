import axios from '~/axios';

export const getAllRoles = async () => {
    return await axios.get('/role/all');
};

export const createRole = async (accessToken, { name }) => {
    return await axios.post(
        '/role/create',
        { name },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    );
};
