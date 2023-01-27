import React from 'react';
import "./app.scss"
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

// pages
import Home from './pages/home/Home';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Watch from './pages/watch/Watch';
import Error from './pages/error/Error';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/watch' element={<Watch />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
