const ListReducer = (state, action) => {
    switch (action.type) {
        case "GET_LISTS_START":
            return {
                lists: [],
                isFetching: true,
                error: false,
            };
        case "GET_LISTS_SUCCESS":
            return {
                lists: action.payload,
                isFetching: false,
                error: false,
            };
        case "GET_LISTS_FAILURE":
            return {
                lists: [],
                isFetching: false,
                error: true,
            };
        // case "CREATE_MOVIE_START":
        //     return {
        //         ...state,
        //         isFetching: true,
        //         error: false,
        //     };
        // case "CREATE_MOVIE_SUCCESS":
        //     return {
        //         LISTS: [...state.LISTS, action.payload],
        //         isFetching: false,
        //         error: false,
        //     };
        // case "CREATE_MOVIE_FAILURE":
        //     return {
        //         ...state,
        //         isFetching: false,
        //         error: true,
        //     };
        // case "UPDATE_MOVIE_START":
        //     return {
        //         ...state,
        //         isFetching: true,
        //         error: false,
        //     };
        // case "UPDATE_MOVIE_SUCCESS":
        //     return {
        //         LISTS: state.LISTS.map(
        //             (movie) => movie._id === action.payload._id && action.payload
        //         ),
        //         isFetching: false,
        //         error: false,
        //     };
        // case "UPDATE_MOVIE_FAILURE":
        //     return {
        //         ...state,
        //         isFetching: false,
        //         error: true,
        //     };
        // case "DELETE_MOVIE_START":
        //     return {
        //         ...state,
        //         isFetching: true,
        //         error: false,
        //     };
        // case "DELETE_MOVIE_SUCCESS":
        //     return {
        //         LISTS: state.LISTS.filter((movie) => movie._id !== action.payload),
        //         isFetching: false,
        //         error: false,
        //     };
        // case "DELETE_MOVIE_FAILURE":
        //     return {
        //         ...state,
        //         isFetching: false,
        //         error: true,
        //     };
        default:
            return { ...state };
    }
};

export default ListReducer;