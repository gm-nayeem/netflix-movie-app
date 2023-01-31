import axios from 'axios'
import {
    getMoviesFailure, 
    getMoviesStart, 
    getMoviesSuccessful,
    deleteMovieFailure,
    deleteMovieStart,
    deleteMovieSuccessful,
    createMovieFailure,
    createMovieStart,
    createMovieSuccessful,
    updateMovieFailure,
    updateMovieStart,
    updateMovieSuccessful
} from './MovieAction'


// fetch all movies
export const getMovies = async (dispatch) => {
    dispatch(getMoviesStart());
    try{
        const accessToken = JSON.parse(localStorage.getItem("user")).accessToken;
        const res = await axios.get("http://localhost:8000/api/movies", {
            headers: {
                token: `Bearer ${accessToken}`
            }
        });
        dispatch(getMoviesSuccessful(res.data));
    } catch(err) {
        dispatch(getMoviesFailure())
    }
}

// create new movie
export const createMovie = async (movie, dispatch) => {
    dispatch(createMovieStart());
    try{
        const accessToken = JSON.parse(localStorage.getItem("user")).accessToken;
        const res = await axios.post("http://localhost:8000/api/movies", movie, {
            headers: {
                token: `Bearer ${accessToken}`
            }
        });
        dispatch(createMovieSuccessful(res.data));
    } catch(err) {
        dispatch(createMovieFailure())
    }
}

// update movie
export const updateMovie = async (movie, dispatch) => {
    dispatch(updateMovieStart());
    try{
        const accessToken = JSON.parse(localStorage.getItem("user")).accessToken;
        const res = await axios.put("http://localhost:8000/api/movies/"+movie._id, movie, {
            headers: {
                token: `Bearer ${accessToken}`
            }
        });
        dispatch(updateMovieSuccessful(res.data));
    } catch(err) {
        dispatch(updateMovieFailure())
    }
}

// delete movie
export const deleteMovie = async (id, dispatch) => {
    dispatch(deleteMovieStart());
    try{
        const accessToken = JSON.parse(localStorage.getItem("user")).accessToken;
        await axios.delete("http://localhost:8000/api/movies/"+id, {
            headers: {
                token: `Bearer ${accessToken}`
            }
        });
        dispatch(deleteMovieSuccessful(id));
    } catch(err) {
        dispatch(deleteMovieFailure())
    }
}