import actions from '../../actions/actions'
import uiState from './types'

const uiReducer = (state: uiState = {
    loading: false
}, action: any) => {
    switch(action.type) {
        case actions.ui.SET_LOADING:
            return {
                ...state,
                loading: true
            }
        case actions.ui.UNSET_LOADING:
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}

export default uiReducer