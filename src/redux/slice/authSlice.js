import { createSlice } from '@reduxjs/toolkit';
import { setToken, removeToken } from '~/utils/token';
import { toast } from 'react-toastify';

const initialState = {
    auth: {
        name: '',
        email: '',
        access_token: ''
    },
    isAuthenticated: false
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        handleError: (state, action) => {
            const error = action.payload;
            toast.error(error);
        },
        loginUser: (state) => {
            state.isAuthenticated = false;
        },
        loginUserSuccess: (state, action) => {
            const { data, message } = action.payload;
            state.auth.name = data?.name;
            state.auth.email = data?.email;
            state.auth.access_token = data?.access_token;
            state.isAuthenticated = true;
            setToken('auth', {
                auth: state.auth,
                isAuthenticated: state.isAuthenticated
            });
            toast.success(message);
        },
        loginUserFailed: (state, action) => {
            state.isAuthenticated = false;
            toast.error(action?.payload);
        },
        logoutUser: (state) => {
            state.isAuthenticated = false;
            removeToken('auth');
            state.auth = initialState.auth;
        },
        restoreAuthState: (state, action) => {
            const storeAuth = action.payload;
            if (storeAuth) {
                state.auth = storeAuth.auth;
                state.isAuthenticated = storeAuth.isAuthenticated;
            }
        }
    }
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
