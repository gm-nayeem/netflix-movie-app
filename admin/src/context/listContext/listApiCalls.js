import axios from 'axios'
import {
    getListsFailure, 
    getListsStart, 
    getListsSuccessful,
    // deleteMovieFailure,
    // deleteListstart,
    // deleteListsuccessful,
    // createMovieFailure,
    // createListstart,
    // createListsuccessful,
    // updateMovieFailure,
    // updateListstart,
    // updateListsuccessful
} from './ListAction'


// fetch all Lists
export const getLists = async (dispatch) => {
    dispatch(getListsStart());
    try{
        const accessToken = JSON.parse(localStorage.getItem("user")).accessToken;
        const res = await axios.get("http://localhost:8000/api/lists", {
            headers: {
                token: `Bearer ${accessToken}`
            }
        });
        dispatch(getListsSuccessful(res.data));
    } catch(err) {
        dispatch(getListsFailure())
    }
}