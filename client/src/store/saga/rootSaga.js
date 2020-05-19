import { all } from 'redux-saga/effects'
import watchLogin from './watchers/watchLogin'

export default function* rootSaga() {
    yield all([
        watchLogin()
    ])
}