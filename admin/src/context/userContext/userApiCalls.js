import axios from 'axios'
import {
    getUserFailure,
    getUserStart,
    getUserSuccessful,
    deleteUserFailure,
    deleteUserSuccessful,
    deleteUsertart,
    updateUserFailure,
    updateUserSuccessful,
    updateUsertart,
    createUserFailure,
    createUserSuccessful,
    createUsertart
} from './UserAction'


// fetch all users
export const getUsers = async (dispatch) => {
    dispatch(getUserStart());
    try{
        const accessToken = JSON.parse(localStorage.getItem("admin")).accessToken;
        const res = await axios.get("http://localhost:8000/api/users", {
            headers: {
                token: `Bearer ${accessToken}`
            }
        });
        dispatch(getUserSuccessful(res.data));
    } catch(err) {
        dispatch(getUserFailure())
    }
}

// create new user
export const createUser = async (user, dispatch) => {
    dispatch(createUsertart());
    try{
        const accessToken = JSON.parse(localStorage.getItem("admin")).accessToken;
        const res = await axios.post("http://localhost:8000/api/users", user, {
            headers: {
                token: `Bearer ${accessToken}`
            }
        });
        dispatch(createUserSuccessful(res.data));
    } catch(err) {
        dispatch(createUserFailure())
    }
}

// update user
export const updateUser = async (user, dispatch) => {
    dispatch(updateUsertart());
    try{
        const accessToken = JSON.parse(localStorage.getItem("admin")).accessToken;
        const res = await axios.put("http://localhost:8000/api/users/"+user._id, user, {
            headers: {
                token: `Bearer ${accessToken}`
            }
        });
        dispatch(updateUserSuccessful(res.data));
    } catch(err) {
        dispatch(updateUserFailure())
    }
}

// delete user
export const deleteUser = async (id, dispatch) => {
    dispatch(deleteUsertart());
    try{
        const accessToken = JSON.parse(localStorage.getItem("admin")).accessToken;
        await axios.delete("http://localhost:8000/api/users/"+id, {
            headers: {
                token: `Bearer ${accessToken}`
            }
        });
        dispatch(deleteUserSuccessful(id));
    } catch(err) {
        dispatch(deleteUserFailure())
    }
}