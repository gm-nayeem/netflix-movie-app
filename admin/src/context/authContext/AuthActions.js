// admin login
export const loginStart = () => (
    {
        type: "LOGIN_START",
    }
);
export const loginSuccessful = (admin) => (
    {
        type: "LOGIN_SUCCESSFUL",
        payload: admin
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
