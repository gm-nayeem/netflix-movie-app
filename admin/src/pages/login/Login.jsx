import { useState } from 'react';
import './login.css'
import {login} from '../../context/authContext/authApiCalls';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext/AuthContext';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { isFetching, dispatch } = useContext(AuthContext);

    const handleLogin = (e) => {
        e.preventDefault();
        login({email, password}, dispatch);
    }

    return (
        <div className="login">
            <div className="loginWrapper">
                <form className="loginForm">
                    <input
                        type="text"
                        placeholder="enter email"
                        className="loginInput"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="enter password"
                        className="loginInput"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        className="loginButton"
                        onClick={handleLogin}
                        disabled={isFetching}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login