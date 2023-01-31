// fetch all movies
export const getMoviesStart = () => (
    {
        type: "GET_MOVIES_START",
    }
);
export const getMoviesSuccessful = (movies) => (
    {
        type: "GET_MOVIES_SUCCESS",
        payload: movies
    }
);
export const getMoviesFailure = () => (
    {
        type: "GET_MOVIES_FAILURE",
    }
);

// create movie
export const createMovieStart = () => (
    {
        type: "CREATE_MOVIE_START",
    }
);
export const createMovieSuccessful = (movie) => (
    {
        type: "CREATE_MOVIE_SUCCESS",
        payload: movie
    }
);
export const createMovieFailure = () => (
    {
        type: "CREATE_MOVIE_FAILURE",
    }
);

// delete movie
export const deleteMovieStart = () => (
    {
        type: "DELETE_MOVIE_START",
    }
);
export const deleteMovieSuccessful = (movie_id) => (
    {
        type: "DELETE_MOVIE_SUCCESS",
        payload: movie_id
    }
);
export const deleteMovieFailure = () => (
    {
        type: "DELETE_MOVIE_FAILURE",
    }
);