import axios from '../../../axios/instance'
import { select, put } from 'redux-saga/effects'
import { ApplicationState } from '../../../index'
import actions from '../../actions/actions'

const auth = (state: ApplicationState) => ({
    email: state.auth.email,
    password: state.auth.password
})

export default function* loginWorker() {
    try {
        const values = yield select(auth)
        const res = yield axios.post('/user/login', {...values})
        const token = yield res.data
        yield put({ type: actions.auth.LOGIN_SUCCESS, token })
    } catch(err) {
        yield put({ type: actions.auth.LOGIN_FAILED })
    }

}