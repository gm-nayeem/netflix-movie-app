import { useState } from "react";
import "./newMovie.css";
import {createMovie} from '../../context/movieContext/movieApiCalls';
import { MovieContext } from "../../context/movieContext/MovieContext";
import {useNavigate} from 'react-router-dom';

// firebase
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";
import app from "../../firebase";
import { useContext } from "react";

const NewMovie = () => {
  const [movie, setMovie] = useState(null);
  const [img, setImg] = useState(null);
  const [imgTitle, setImgTitle] = useState(null);
  const [imgSm, setImgSm] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const navigate = useNavigate();

  const {dispatch} = useContext(MovieContext);

  const handleChange = (e) => {
    const value = e.target.value;
    setMovie({ ...movie, [e.target.name]: value });
  };

  // file upload using firebase
  const upload = (items) => {
    items.forEach(item => {
      // firebase setup
      const fileName = new Date().getTime() + item.label + item.file.name;
      const storage = getStorage(app);

      const storageRef = ref(storage, `/items/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, item.file);

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
            setMovie(prev => {
              return {
                ...prev,
                [item.label]: downloadURL 
              }
            });
            
            setUploaded(prev => prev + 1);
          });
        }
      );
    })
  }

  const handleUpload = (e) => {
    e.preventDefault();
    upload([
      { file: img, label: "img" },
      { file: imgTitle, label: "imgTitle" },
      { file: imgSm, label: "imgSm" },
      { file: trailer, label: "trailer" },
      { file: video, label: "video" }
    ])
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    createMovie(movie, dispatch);
    navigate("/movies")
  };


  return (
    <div className="newMovie">
      <h1 className="addMovieTitle">New Movie</h1>
      <form className="addMovieForm">
        <div className="addMovieItem">
          <label>Image</label>
          <input type="file" id="img" name="img"
            onChange={(e) => setImg(e.target.files[0])} />
        </div>
        <div className="addMovieItem">
          <label>Title Image</label>
          <input type="file" id="imgTitle" name="imgTitle"
            onChange={(e) => setImgTitle(e.target.files[0])} />
        </div>
        <div className="addMovieItem">
          <label>Thumbnail Image</label>
          <input type="file" id="imgSm" name="imgSm"
            onChange={(e) => setImgSm(e.target.files[0])} />
        </div>
        <div className="addMovieItem">
          <label>Title</label>
          <input type="text" placeholder="John Wick" name="title" onChange={handleChange} />
        </div>
        <div className="addMovieItem">
          <label>Description</label>
          <input type="text" placeholder="description" name="desc" onChange={handleChange} />
        </div>
        <div className="addMovieItem">
          <label>Year</label>
          <input type="text" placeholder="year" name="year" onChange={handleChange} />
        </div>
        <div className="addMovieItem">
          <label>Limit</label>
          <input type="number" placeholder="limit" name="limit" onChange={handleChange} />
        </div>
        <div className="addMovieItem">
          <label>Genre</label>
          <input type="text" placeholder="genre" name="genre" onChange={handleChange} />
        </div>
        <div className="addMovieItem">
          <label>Is Series ?</label>
          <select name="isSeries" id="isSeries" onChange={handleChange}>
            <option >Choose one...</option>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        <div className="addMovieItem">
          <label>Trailer</label>
          <input type="file" name="trailer"
            onChange={(e) => setTrailer(e.target.files[0])} />
        </div>
        <div className="addMovieItem">
          <label>Video</label>
          <input type="file" name="video"
            onChange={(e) => setVideo(e.target.files[0])} />
        </div>
        {
          uploaded === 5 ? (
            <button className="addMovieButton" onClick={handleSubmit}>Create</button>
          ) : (
            <button className="addMovieButton" onClick={handleUpload}>Upload</button>
          )
        }
      </form>
    </div>
  );
}

export default NewMovie;