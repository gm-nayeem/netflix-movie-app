import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const  INITIAL_STATE = {
    admin: JSON.parse(localStorage.getItem("admin")) || null,
    isFetching: false,
    error: false
}


export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

    // store user state in local storage
    useEffect(() => {
        localStorage.setItem("admin", JSON.stringify(state.admin));
    }, [state.admin]);


    return (
        <AuthContext.Provider
            value={{
                admin: state.admin,
                isFetching: state.isFetching,
                error: state.error,
                dispatch
            }}
        >
            {children}
        </AuthContext.Provider>
    )

};
