import './navbar.scss';
import { Search, Notifications, ArrowDropDown } from '@mui/icons-material';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../context/authContext/AuthActions';
import { AuthContext } from '../../context/authContext/AuthContext';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const {dispatch} = useContext(AuthContext);

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true)
        return () => window.onscroll = null;
    }

    return (
        <div className={isScrolled ? "navbar scrolled" : "navbar"} >
            <div className="container">
                <div className="left">
                    <Link to="/" className='link'>
                        <img
                            src="../../images/netflix-logo.png"
                            alt=""
                        />
                    </Link>
                    <Link to="/" className='link'>
                        <span>Homepage</span>
                    </Link>
                    <Link to="/series" className='link'>
                        <span className='navbarmainLinks'>Series</span>
                    </Link>
                    <Link to="/movies" className='link'>
                        <span className='navbarmainLinks'>Movies</span>
                    </Link>
                    <span>New and Popular</span>
                    <span>My List</span>
                </div>
                <div className="right">
                    <Search className='icon' />
                    <span>KID</span>
                    <Notifications className='icon' />
                    <img
                        src="../../images/profile-photo.webp"
                        alt=""
                    />
                    <div className="profile">
                        <ArrowDropDown className='icon' />
                        <div className="options">
                            <span>Setting</span>
                            <span onClick={() => dispatch(logout())}>Logout</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar