import { useState } from "react";
import "./newUser.css";
import {UserContext} from '../../context/userContext/UserContext';
import {createUser} from '../../context/userContext/userApiCalls';

// firebase
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";
import app from "../../firebase";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const NewUser = () => {
  const [newUser, setNewUser] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const {dispatch} = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setNewUser({...newUser, [e.target.name]: e.target.value});
  }

  // file upload using firebase
  const handleUpload = (e) => {
    e.preventDefault();

    // firebase setup
    const fileName = new Date().getTime() + profilePic.name;
    const storage = getStorage(app);

    const storageRef = ref(storage, `/users/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, profilePic);

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
          setNewUser(prev => {
            return {
              ...prev,
              ["profilePic"]: downloadURL
            }
          });

          setUploaded(prev => prev + 1);
        });
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser(newUser, dispatch);
    navigate("/users");
  }

  return (
    <div className="newUser">
      <h1 className="addUserTitle">New User</h1>
      <form className="addUserForm">
        <div className="addUserItem">
          <label>Profile Picture</label>
          <input type="file" id="img" name="img"
            onChange={(e) => setProfilePic(e.target.files[0])} />
        </div>
        <div className="addUserItem">
          <label>Username</label>
          <input type="text" placeholder="John Wick" name="username" 
            onChange={handleChange} />
        </div>
        <div className="addUserItem">
          <label>Email</label>
          <input type="email" placeholder="john@gmail.com" name="email" 
            onChange={handleChange} />
        </div>
        <div className="addUserItem">
          <label>Password</label>
          <input type="password" placeholder="password" name="password" 
            onChange={handleChange} />
        </div>
        <div className="addUserItem">
          <label>Is Admin ?</label>
          <select name="isAdmin" onChange={handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        {
          uploaded === 1 ? (
            <button className="addUserButton" onClick={handleSubmit}>Create</button>
          ) : (
            <button className="addUserButton" onClick={handleUpload}>Upload</button>
          )
        }
      </form>
    </div>
  );
}

export default NewUser