import axios from 'axios';
import {
    loginFailure,
    loginStart,
    loginSuccessful
} from './AuthActions';


export const login = async (admin, dispatch) => {
    dispatch(loginStart());
    try {
        const res = await axios.post(
            "http://localhost:8000/api/auth/login", admin
        );
        console.log("res" + res.data);
        dispatch(loginSuccessful(res.data));
    } catch (err) {
        dispatch(loginFailure())
    }
}