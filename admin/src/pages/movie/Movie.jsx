import { Link, useLocation, useNavigate } from "react-router-dom";
import "./movie.css";
import { Publish } from "@mui/icons-material";
import { updateMovie } from '../../context/movieContext/movieApiCalls';
import { MovieContext } from '../../context/movieContext/MovieContext';
import { useContext, useState } from "react";

// firebase
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL
} from "firebase/storage";
import app from "../../firebase";

const Movie = () => {
    const [updatedMovie, setUpdatedMovie] = useState(null);
    const [updatedImg, setUpdatedImg] = useState(null);
    const [updatedTrailer, setUpdatedTrailer] = useState(null);
    const [updatedVideo, setUpdatedVideo] = useState(null);
    const [uploaded, setUploaded] = useState(0);
    const location = useLocation();
    const { movie } = location.state;
    const { dispatch } = useContext(MovieContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const value = e.target.value;
        setUpdatedMovie({ ...updatedMovie, [e.target.name]: value });
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
                        setUpdatedMovie(prev => {
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
            {file: updatedImg, label: "img"},
            { file: updatedTrailer, label: "trailer" },
            { file: updatedVideo, label: "video" }
        ])
    };


    const handleUpdate = (e) => {
        e.preventDefault();
        Object.keys(updatedMovie).forEach((key) => {
            Object.keys(movie).forEach((key2) => {
                if(key === key2) {
                    movie[key2] = updatedMovie[key]
                }
            })
        });

        updateMovie(movie, dispatch);
        navigate("/movies")
    }

    const {
        _id,
        title,
        desc,
        img,
        genre,
        year,
        limit,
        trailer,
        video,
        isSeries
    } = movie;

    return (
        <div className="movie">
            <div className="movieTitleContainer">
                <h1 className="movieTitle">
                    {
                        isSeries ? "Series" : "Movie"
                    }
                </h1>
                <Link to="/newmovie">
                    <button className="movieAddButton">Create</button>
                </Link>
            </div>
            <div className="movieTop">
                {/* <div className="movieTopLeft">
                    <Chart
                        data={productData}
                        title="Sales Performance"
                        dataKey="Sales"                     
                    />
                </div> */}
                <div className="movieTopRight">
                    <div className="movieInfoTop">
                        <img src={img} alt="" className="movieInfoImg" />
                        <span className="movieName">{title}</span>
                    </div>
                    <div className="movieInfoBottom">
                        <div className="movieInfoItem">
                            <span className="movieInfoKey" style={{ marginRight: "20px" }}>id:</span>
                            <span className="movieInfoValue">{_id}</span>
                        </div>
                        <div className="movieInfoItem">
                            <span className="movieInfoKey">genre:</span>
                            <span className="movieInfoValue">{genre}</span>
                        </div>
                        <div className="movieInfoItem">
                            <span className="movieInfoKey">year:</span>
                            <span className="movieInfoValue">{year}</span>
                        </div>
                        <div className="movieInfoItem">
                            <span className="movieInfoKey">limit:</span>
                            <span className="movieInfoValue">{limit}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="movieBottom">
                <form className="movieForm">
                    <div className="movieFormLeft">
                        <label>Movie Title</label>
                        <input type="text" placeholder={title}
                            name="title" onChange={handleChange} />
                        <label>Movie Description</label>
                        <input type="text" placeholder={desc}
                            name="desc" onChange={handleChange} />
                        <label>Year</label>
                        <input type="text" placeholder={year}
                            name="year" onChange={handleChange} />
                        <label>Genre</label>
                        <input type="text" placeholder={genre}
                            name="genre" onChange={handleChange} />
                        <label>Limit</label>
                        <input type="number" placeholder={limit}
                            name="limit" onChange={handleChange} />
                        <label>Trailer</label>
                        <input type="file" placeholder={trailer}
                            name="trailer" onChange={(e) => setUpdatedTrailer(e.target.files[0])} />
                        <label>Video</label>
                        <input type="file" placeholder={video}
                            name="video" onChange={(e) => setUpdatedVideo(e.target.files[0])} />
                    </div>
                    <div className="movieFormRight">
                        <div className="movieUpload">
                            <img src={img} alt="" className="movieUploadImg" />
                            <label for="file">
                                <Publish />
                            </label>
                            <input type="file" name="img" id="file" style={{ display: "none" }} 
                                onChange={(e) => setUpdatedImg(e.target.files[0])}/>
                        </div>
                        {
                            uploaded === 3 ? (
                                <button className="movieButton" onClick={handleUpdate}>Update</button>
                              ) : (
                                <button className="movieButton" onClick={handleUpload}>Upload</button>
                            )
                        }
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Movie