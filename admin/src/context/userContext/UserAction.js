// fetch all User
export const getUserStart = () => (
    {
        type: "GET_USER_START",
    }
);
export const getUserSuccessful = (User) => (
    {
        type: "GET_USER_SUCCESS",
        payload: User
    }
);
export const getUserFailure = () => (
    {
        type: "GET_USER_FAILURE",
    }
);

// create movie
export const createUsertart = () => (
    {
        type: "CREATE_USER_START",
    }
);
export const createUserSuccessful = (movie) => (
    {
        type: "CREATE_USER_SUCCESS",
        payload: movie
    }
);
export const createUserFailure = () => (
    {
        type: "CREATE_USER_FAILURE",
    }
);

// update movie
export const updateUsertart = () => (
    {
        type: "UPDATE_USER_START",
    }
);
export const updateUserSuccessful = (movie) => (
    {
        type: "UPDATE_USER_SUCCESS",
        payload: movie
    }
);
export const updateUserFailure = () => (
    {
        type: "UPDATE_USER_FAILURE",
    }
);

// delete movie
export const deleteUsertart = () => (
    {
        type: "DELETE_USER_START",
    }
);
export const deleteUserSuccessful = (movie_id) => (
    {
        type: "DELETE_USER_SUCCESS",
        payload: movie_id
    }
);
export const deleteUserFailure = () => (
    {
        type: "DELETE_USER_FAILURE",
    }
);