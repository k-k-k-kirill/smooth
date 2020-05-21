import axios from '../../../axios/instance'
import { select, put } from 'redux-saga/effects'
import { ApplicationState } from '../../../index'
import actions from '../../actions/actions'

const auth = (state: ApplicationState) => ({
    email: state.auth.email,
    password: state.auth.password
})

export default function* loginWorker() {
    yield put({ type: actions.ui.SET_LOADING })

    try {
        const values = yield select(auth)
        const res = yield axios.post('/user/login', {...values})
        const token = yield res.data
        yield put({ type: actions.auth.LOGIN_SUCCESS, token })
    } catch(err) {
        if(err.response.status === 401) {
           yield put({ type: actions.error.WRONG_CREDENTIALS })
        } else {
           yield put({ type: actions.error.SERVER_PROBLEMS })
        }
    }

    yield put({ type: actions.ui.UNSET_LOADING })

}