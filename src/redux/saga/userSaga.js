import { call, put, takeLatest } from 'redux-saga/effects';
import { userActions } from '~/redux/slice/userSlice';
import { updateUser, getUser, changePassword } from '~/services/userService';

function* updateUserSaga(action) {
    try {
        const reponse = yield call(updateUser, action.payload.token, action.payload.formData);
        yield put(userActions.updateUserSuccess({ data: reponse.data, message: reponse.message }));
    } catch (error) {
        yield put(userActions.handleError(error.message));
    }
}

function* getUserSaga(action) {
    try {
        const reponse = yield call(getUser, action.payload);
        yield put(userActions.getUserSuccess(reponse.data));
    } catch (error) {
        yield put(userActions.handleError(error.message));
    }
}

function* changePasswordSaga(action) {
    try {
        const reponse = yield call(changePassword, action.payload.token, action.payload.data);
        yield put(userActions.changePasswordSuccess(reponse));
        yield put(userActions.getUser(action.payload.token));
    } catch (error) {
        yield put(userActions.handleError(error.message));
        yield put(userActions.getUser(action.payload.token));
    }
}

export default function* userSaga() {
    yield takeLatest(userActions.updateUser, updateUserSaga);
    yield takeLatest(userActions.getUser, getUserSaga);
    yield takeLatest(userActions.changePassword, changePasswordSaga);
}
