import { put } from 'redux-saga/effects'
import axios from '../../../axios/instance'
import actions from '../../actions/actions'

export default function* tokenRefreshWorker() {
    yield put({ type: actions.ui.SET_LOADING })

    try {
        const token = yield axios.post('/user/auth/refresh')
        yield put({ type: actions.auth.TOKEN_REFRESH_SUCCESS, token })
    } catch(err) {
        yield put({ type: actions.auth.TOKEN_REFRESH_FAILED })
    }

    yield put({ type: actions.ui.UNSET_LOADING })
}