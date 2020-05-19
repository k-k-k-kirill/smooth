import actions from '../../actions/actions'
import { takeEvery } from 'redux-saga/effects'

//Workers
import loginWorker from '../workers/loginWorker'

export default function* watchLogin() {
    yield takeEvery(actions.auth.LOGIN_REQUEST, loginWorker)
}