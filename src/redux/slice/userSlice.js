import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { setToken } from '~/utils/token';
const initialState = {
    user: {
        user_name: '',
        email: '',
        phone_number: '',
        address: '',
        avatar: '',
        role_id: ''
    }
};
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        handleError: (state, action) => {
            const error = action.payload;
            toast.error(error);
        },
        getUser: (state) => {
            state.user = initialState.user;
        },
        getUserSuccess: (state, action) => {
            state.user = {
                ...action.payload
            };
            setToken('user', state.user);
        },
        updateUser: (state, action) => {
            state.user = {
                ...action.payload.data
            };
        },
        updateUserSuccess: (state, action) => {
            state.user = {
                ...action.payload.data
            };
            setToken('user', state.user);
            toast.success(action.payload.message);
        },
        updateUserFailed: (state, action) => {
            toast.error(action.payload);
        },
        changePassword: (state, action) => {
            state.user = {
                ...action.payload.data
            };
        },
        changePasswordSuccess: (state, action) => {
            state.user = {
                ...action.payload.data
            };
            toast.success(action.payload.message);
        },
        logoutUser: (state) => {
            state.user = initialState.user;
            removeToken('user');
        }
    }
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
