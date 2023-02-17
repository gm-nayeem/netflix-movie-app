import { Publish } from "@mui/icons-material";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./user.css";
import { updateUser } from "../../context/userContext/userApiCalls";
import {UserContext} from "../../context/userContext/UserContext";

// firebase
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";
import app from "../../firebase";
import { useContext } from "react";

const User = () => {
  const [updatedUser, setUpdatedUser] = useState(null);
  const [updatedProfilePic, setUpdatedProfilePic] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  
  const location = useLocation();
  const { user } = location.state;
  const {dispatch} = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setUpdatedUser({ ...updatedUser, [e.target.name]: value });
  };

  // file upload using firebase
  const handleUpload = (e) => {
    e.preventDefault();

    // firebase setup
    const fileName = new Date().getTime() + updatedProfilePic.name;
    const storage = getStorage(app);

    const storageRef = ref(storage, `/users/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, updatedProfilePic);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (err) => {
        // Handle unsuccessful uploads
        console.log(err.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUpdatedUser(prev => {
            return {
              ...prev,
              "profilePic": downloadURL
            }
          });

          setUploaded(prev => prev + 1);
        });
      }
    );
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    Object.keys(updatedUser).forEach((key) => {
      Object.keys(user).forEach((key2) => {
        if (key === key2) {
          user[key2] = updatedUser[key]
        }
      })
    });

    updateUser(user, dispatch);
    navigate("/users")
  }

  const {
    _id,
    username,
    email,
    profilePic,
    isAdmin
  } = user;

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={profilePic}
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{username}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <div className="userShowInfo">
              <span className="userShowInfoKey">Id: </span>
              <span className="userShowInfoTitle">{_id}</span>
            </div>
            <div className="userShowInfo">
              <span className="userShowInfoKey">Email: </span>
              <span className="userShowInfoTitle">{email}</span>
            </div>
            <div className="userShowInfo">
              <span className="userShowInfoKey">IsAdmin: </span>
              <span className="userShowInfoTitle">{isAdmin ? "true" : "false"}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="Will Jacks"
                  className="userUpdateInput"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="willjack25@gmail.com"
                  className="userUpdateInput"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="+8880 1728 276823"
                  className="userUpdateInput"
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src={profilePic}
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" name="file" id="file"
                  style={{ display: "none" }}
                  onChange={(e) => setUpdatedProfilePic(e.target.files[0])} />
              </div>
              {
                uploaded === 1 ? (
                  <button className="userUpdateButton" onClick={handleUpdate}>Update</button>
                ) : (
                  <button className="userUpdateButton" onClick={handleUpload}>Upload</button>
                )
              }
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default User