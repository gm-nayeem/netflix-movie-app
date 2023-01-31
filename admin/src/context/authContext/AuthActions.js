// admin login
export const loginStart = () => (
    {
        type: "LOGIN_START",
    }
);
export const loginSuccessful = (user) => (
    {
        type: "LOGIN_SUCCESSFUL",
        payload: user
    }
);
export const loginFailure = () => (
    {
        type: "LOGIN_FAILURE",
    }
);

// admin logout
export const logout = () => (
    {
        type: "LOGOUT"
    }
);
