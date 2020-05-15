import authActions from '../../actions/auth'
import authState from './types'

const authReducer = (state: authState = {
    accessToken: ''
}, action: any) => {

    switch(action.type) {
        case authActions.SAVE_TOKEN:
            state = {
                ...state,
                accessToken: action.accessToken
            }
            return state
        default:
            return state
    }

}

export default authReducer