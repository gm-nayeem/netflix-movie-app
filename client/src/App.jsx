import React, { useContext } from 'react';
import "./app.scss"
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// pages
import Home from './pages/home/Home';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Watch from './pages/watch/Watch';
import Error from './pages/error/Error';
import {AuthContext} from './context/authContext/AuthContext';

function App() {
  const {user} = useContext(AuthContext);

  return (
    <Router>
      <Routes>

        <Route
          path='/'
          exact
          element={
            user ? <Home /> :
              <Navigate to="/register" replace />
          }
        />
        <Route
          path='/register'
          element={
            !user ? <Register /> :
              <Navigate to="/" replace />
          }
        /><Route
          path='/login'
          element={
            !user ? <Login /> :
              <Navigate to="/" replace />
          }
        />
        {
          user && (
            <>
              <Route path='/movies' element={<Home type="movie" />} />
              <Route path='/series' element={<Home type="series" />} />
              <Route path='/watch' element={<Watch />} />
            </>
          )
        }
        <Route path='*' element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
