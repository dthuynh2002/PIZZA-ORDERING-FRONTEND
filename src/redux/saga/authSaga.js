import { call, put, takeLatest } from 'redux-saga/effects';
import { login } from '~/services/userService';
import { authActions } from '~/redux/slice/authSlice';

function* loginUserSaga(action) {
    try {
        const reponse = yield call(login, action.payload);
        if (reponse.status === true) {
            yield put(
                authActions.loginUserSuccess({
                    data: reponse.data,
                    message: reponse.message
                })
            );
        } else {
            yield put(authActions.loginUserFailed(reponse.message || 'Login failed'));
        }
    } catch (error) {
        const errorMessage =
            error.response?.data?.message || 'Something went wrong. Please try again.';
        yield put(authActions.loginUserFailed(errorMessage));
    }
}

export default function* authSaga() {
    yield takeLatest(authActions.loginUser, loginUserSaga);
}
