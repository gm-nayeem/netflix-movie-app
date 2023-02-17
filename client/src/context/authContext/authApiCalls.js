import axios from 'axios'
import {
    loginFailure,
    loginStart,
    loginSuccessful
} from './AuthActions';


export const login = async (user, dispatch) => {
    dispatch(loginStart());
    try {
        // console.log(user);
        const res = await axios.post(
            "http://localhost:8000/api/auth/login", user
        );

        dispatch(loginSuccessful(res.data));
    } catch (err) {
        dispatch(loginFailure())
    }
}