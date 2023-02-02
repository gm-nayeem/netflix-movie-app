import { useState, useRef } from 'react';
import './register.scss';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const emailRef = useRef();
    const usernameRef = useRef();
    const passwordRef = useRef();

    const handleStart = () => {
        setEmail(emailRef.current.value)
    }

    const handleFinish = async (e) => {
        e.preventDefault();

        setPassword(passwordRef.current.value);
        setUsername(usernameRef.current.value);

        await axios.post("http://localhost:8000/api/auth/register", {
            username, email, password
        });

        navigate("/login");
    }

    return (
        <div className='register'>
            <div className="top">
                <div className="wrapper">
                    <img
                        className='logo'
                        src="../../images/netflix-logo.png"
                        alt=""
                    />
                    <Link to="/login">
                        <button className="loginButton">
                            Sign In
                        </button>
                    </Link>
                </div>
            </div>
            <div className="container">
                <h1>Unlimited movies, TV shows, and more.</h1>
                <h2>Watch anywhere. Cancel anytime.</h2>
                <p>
                    Ready to watch? Enter your email to create or restart your membership.
                </p>
                {
                    !email ? (
                        <div className="input">
                            <input
                                type="email"
                                placeholder='email address'
                                ref={emailRef}
                                required
                            />
                            <button
                                className='registerButton'
                                onClick={handleStart}
                            >
                                Get Started
                            </button>
                        </div>
                    ) : (
                        <form className='input'>
                            <input
                                type="username"
                                placeholder='username'
                                ref={usernameRef}
                                required
                            />
                            <input
                                type="password"
                                placeholder='password'
                                ref={passwordRef}
                                required
                            />
                            <button
                                className='registerButton'
                                onClick={handleFinish}
                            >
                                Start
                            </button>
                        </form>
                    )
                }
            </div>
        </div>
    )
}

export default Register