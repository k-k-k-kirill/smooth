import actions from '../../actions/actions'
import authState from './types'

const authReducer = (state: authState = {
    email: '',
    password: '',
    token: '',
    authenticated: false,
}, action: any) => {

    switch(action.type) {
        case actions.auth.LOGIN_REQUEST:
            state = {
                ...state,
                email: action.values.email,
                password: action.values.password
            }
            return state
        case actions.auth.LOGIN_SUCCESS:
            state = {
                ...state,
                token: action.token,
                authenticated: true
            }
            return state
        case actions.auth.LOGIN_FAILED:
            return state
        default:
            return state
    }

}

export default authReducer