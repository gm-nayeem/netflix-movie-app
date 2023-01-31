import axios from 'axios'
import {
    getMoviesFailure, 
    getMoviesStart, 
    getMoviesSuccessful,
    deleteMovieFailure,
    deleteMovieStart,
    deleteMovieSuccessful
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