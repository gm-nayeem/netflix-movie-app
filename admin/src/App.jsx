import React, { useContext } from 'react'
import './app.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'

// pages
import Home from './pages/home/Home'
import UserList from './pages/userList/UserList'
import User from './pages/user/User'
import NewUser from './pages/newUser/NewUser'
import MovieList from './pages/movieList/MovieList'
import Movie from './pages/movie/Movie'
import NewMovie from './pages/newMovie/NewMovie'
import ListList from './pages/listList/ListList'
import Topbar from './components/topbar/Topbar'
import Sidebar from './components/sidebar/Sidebar'
import Login from './pages/login/Login'
import { AuthContext } from './context/authContext/AuthContext'


const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Topbar />

      <div className="container">
        <Sidebar />
        <Routes>
          <Route
            path='/'
            element={
              user ? <Home /> :
                <Navigate to="/login" replace />
            }
          />
          {
            user && (
              <>
                <Route path='/users' element={<UserList />} />
                <Route path='/user/:userId' element={<User />} />
                <Route path='/newuser' element={<NewUser />} />
                <Route path='/movies' element={<MovieList />} />
                <Route path='/movies/:movieId' element={<Movie />} />
                <Route path='/newmovie' element={<NewMovie />} />
                <Route path='/lists' element={<ListList />} />
              </>
            )
          }
          <Route
            path='/login'
            element={
              !user ? <Login /> :
                <Navigate to="/" replace />
            }
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App