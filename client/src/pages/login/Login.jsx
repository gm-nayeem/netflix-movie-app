import { useContext, useState } from 'react'
import './login.scss'
import { Link } from 'react-router-dom';
import { login } from '../../context/authContext/authApiCalls';
import { AuthContext } from '../../context/authContext/AuthContext';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {dispatch} = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    login({email, password}, dispatch);
  }

  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="../../images/netflix-logo.png"
            alt=""
          />
        </div>
      </div>
      <div className="container">
        <form>
          <h1>Sign In</h1>
          <input
            type="email"
            placeholder="Email or phone number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="loginButton" onClick={handleLogin}>
            Sign In
          </button>
          <span>
            New to Netflix? <Link to="/register" className='link'><b>Sign up now.</b></Link>
          </span>
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. <b>Learn more</b>.
          </small>
        </form>
      </div>
    </div>
  )
}

export default Login