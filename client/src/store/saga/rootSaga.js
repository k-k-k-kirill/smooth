import { all } from 'redux-saga/effects'

//Watchers
import watchLogin from './watchers/watchLogin'
import watchTokenRefresh from './watchers/watchTokenRefresh'

export default function* rootSaga() {
    yield all([
        watchLogin(),
        watchTokenRefresh()
    ])
}