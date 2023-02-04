import axios from 'axios'
import {
    getListsFailure,
    getListsStart,
    getListsSuccessful,
    updateListFailure,
    updateListStart,
    updateListSuccessful,
    deleteListFailure,
    deleteListStart,
    deleteListSuccessful,
    createListFailure,
    createListStart,
    createListSuccessful
} from './ListAction'


// fetch all lists
export const getLists = async (dispatch) => {
    dispatch(getListsStart());
    try{
        const accessToken = JSON.parse(localStorage.getItem("admin")).accessToken;
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

// create new list
export const createList = async (list, dispatch) => {
    dispatch(createListStart());
    try{
        const accessToken = JSON.parse(localStorage.getItem("admin")).accessToken;
        const res = await axios.post("http://localhost:8000/api/lists", list, {
            headers: {
                token: `Bearer ${accessToken}`
            }
        });
        dispatch(createListSuccessful(res.data));
    } catch(err) {
        dispatch(createListFailure())
    }
}

// update list
export const updateList= async (list, dispatch) => {
    dispatch(updateListStart());
    try{
        const accessToken = JSON.parse(localStorage.getItem("admin")).accessToken;
        const res = await axios.put("http://localhost:8000/api/lists/"+list._id, list, {
            headers: {
                token: `Bearer ${accessToken}`
            }
        });
        dispatch(updateListSuccessful(res.data));
    } catch(err) {
        dispatch(updateListFailure())
    }
}

// delete list
export const deleteList = async (id, dispatch) => {
    dispatch(deleteListStart());
    try{
        const accessToken = JSON.parse(localStorage.getItem("admin")).accessToken;
        await axios.delete("http://localhost:8000/api/lists/"+id, {
            headers: {
                token: `Bearer ${accessToken}`
            }
        });
        dispatch(deleteListSuccessful(id));
    } catch(err) {
        dispatch(deleteListFailure())
    }
}