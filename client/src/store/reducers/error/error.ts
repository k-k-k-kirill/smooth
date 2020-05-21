import errorState from './types'
import actions from '../../actions/actions'

const errorReducer = (state: errorState = {
    message: '',
    status: 200
}, action: any) => {
    switch(action.type) {
        case actions.error.WRONG_CREDENTIALS:
            state = {
                ...state,
                message: 'Wrong e-mail or password.',
                status: 404
            }
            return state
        case actions.error.SERVER_PROBLEMS:
            state = {
                ...state,
                message: 'Our server is experiencing technical difficulties. Please, try again later.',
                status: 500
            }
            return state
        default:
            return state
    }
}

export default errorReducer 