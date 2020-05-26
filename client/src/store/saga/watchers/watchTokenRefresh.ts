import actions from '../../actions/actions'
import { takeEvery } from 'redux-saga/effects'

//Workers
import tokenRefreshWorker from '../workers/tokenRefreshWorker'

export default function* watchTokenRefresh() {
    yield takeEvery(actions.auth.TOKEN_REFRESH_REQUEST, tokenRefreshWorker)
}