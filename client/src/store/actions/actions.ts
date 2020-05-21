const actions = {
    auth: { 
        SAVE_TOKEN: 'SAVE_TOKEN',
        LOGIN_REQUEST: 'LOGIN_REQUEST',
        LOGIN_SUCCESS: 'LOGIN_SUCCESS',
        LOGIN_FAILED: 'LOGIN_FAILED'
    },
    ui: {
        SET_LOADING: 'SET_LOADING',
        UNSET_LOADING: 'UNSET_LOADING'
    },
    error: {
        WRONG_CREDENTIALS: 'WRONG_CREDENTIALS',
        SERVER_PROBLEMS: 'SERVER_PROBLEMS'
    }
}

export default actions