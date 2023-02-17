const AuthReducer = (state, action) => {
    switch(action.type) {
        case "LOGIN_START":
            return {
                admin: null,
                isFetching: true,
                error: false
            }
        case "LOGIN_SUCCESSFUL":
            return {
                admin: action.payload,
                isFetching: false,
                error: false
            }
        case "LOGIN_FAILURE":
            return {
                admin: null,
                isFetching: false,
                error: true
            }
        case "LOGOUT":
            return {
                isFetching: false,
                admin: null,
                error: false
            }
        default: 
            return {...state}
    }
}

export default AuthReducer;