// fetch all Lists
export const getListsStart = () => (
    {
        type: "GET_LISTS_START",
    }
);
export const getListsSuccessful = (movies) => (
    {
        type: "GET_LISTS_SUCCESS",
        payload: movies
    }
);
export const getListsFailure = () => (
    {
        type: "GET_LISTS_FAILURE",
    }
);