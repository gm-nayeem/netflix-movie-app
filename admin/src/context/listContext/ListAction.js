// fetch all Lists
export const getListsStart = () => (
    {
        type: "GET_LISTS_START",
    }
);
export const getListsSuccessful = (lists) => (
    {
        type: "GET_LISTS_SUCCESS",
        payload: lists
    }
);
export const getListsFailure = () => (
    {
        type: "GET_LISTS_FAILURE",
    }
);

// create List
export const createListStart = () => (
    {
        type: "CREATE_LIST_START",
    }
);
export const createListSuccessful = (list) => (
    {
        type: "CREATE_LIST_SUCCESS",
        payload: list
    }
);
export const createListFailure = () => (
    {
        type: "CREATE_LIST_FAILURE",
    }
);

// update List
export const updateListStart = () => (
    {
        type: "UPDATE_LIST_START",
    }
);
export const updateListSuccessful = (list) => (
    {
        type: "UPDATE_List_SUCCESS",
        payload: list
    }
);
export const updateListFailure = () => (
    {
        type: "UPDATE_LIST_FAILURE",
    }
);

// delete List
export const deleteListStart = () => (
    {
        type: "DELETE_LIST_START",
    }
);
export const deleteListSuccessful = (list_id) => (
    {
        type: "DELETE_LIST_SUCCESS",
        payload: list_id
    }
);
export const deleteListFailure = () => (
    {
        type: "DELETE_List_FAILURE",
    }
);