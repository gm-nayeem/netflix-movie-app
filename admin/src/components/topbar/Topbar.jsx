import React, { useContext } from "react";
import "./topbar.css";
import {
  NotificationsNone,
  Language,
  Settings,
  ArrowDropDown
} from "@mui/icons-material";
import { AuthContext } from '../../context/authContext/AuthContext';
import { logout } from '../../context/authContext/AuthActions';
import { Link } from "react-router-dom";


const Navbar = () => {
  const { admin, dispatch } = useContext(AuthContext);

  return (
    <div className='topbar'>
      <div className="topbarWrapper">
        <Link to="/" className="link">
          <div className="topLeft">
            <span className="logo">mernadmin</span>
          </div>
        </Link>

        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <Link to={`/users/${admin?._id}`} state={{ user: admin }}>
            <div className="topbarIconContainer">
              <img src={admin?.profilePic ? admin?.profilePic : "https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"}
                alt="" className="topAvatar" />
            </div>
          </Link>
          <div className=" profile">
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