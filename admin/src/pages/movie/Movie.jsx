import { Link, useLocation } from "react-router-dom";
import "./movie.css";
import { Publish } from "@mui/icons-material";
import {createMovie} from '../../context/movieContext/movieApiCalls';
import {MovieContext} from '../../context/movieContext/MovieContext';
import { useContext, useState } from "react";

const Movie = () => {
    const [updatedMovie, setUpdatedMovie] = useState(null);
    const [updatedTrailer, setUpdatedTrailer] = useState(null);
    const [updatedVideo, setUpdatedVideo] = useState(null);
    const location = useLocation();
    const {movie} = location.state;
    const {dispatch} = useContext(MovieContext);

    const handleChange = (e) => {
        const value = e.target.value;
        setUpdatedMovie({ ...updatedMovie, [e.target.name]: value });
    };


    const handleUpdate = (e) => {
        e.preventDefault();
        console.log(updatedMovie)
        //createMovie(updatedMovie, dispatch);
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
                            <span className="movieInfoKey" style={{marginRight: "20px"}}>id:</span>
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
                            name="title" onChange={handleChange}/>
                        <label>Movie Description</label>
                        <input type="text" placeholder={desc} 
                            name="desc" onChange={handleChange}/>
                        <label>Year</label>
                        <input type="text" placeholder={year} 
                            name="year" onChange={handleChange}/>                       
                        <label>Genre</label>
                        <input type="text" placeholder={genre} 
                            name="genre" onChange={handleChange}/>                       
                        <label>Limit</label>
                        <input type="number" placeholder={limit} 
                            name="limit" onChange={handleChange}/>                       
                        <label>Trailer</label>
                        <input type="file" placeholder={trailer} 
                            name="trailer" onChange={(e) => setUpdatedTrailer(e.target.files[0])}/>                       
                        <label>Video</label>
                        <input type="file" placeholder={video} 
                            name="video" onChange={(e) => setUpdatedVideo(e.target.files[0])}/>                                             
                    </div>
                    <div className="movieFormRight">
                        <div className="movieUpload">
                            <img src={img} alt="" className="movieUploadImg" />
                            <label for="file">
                                <Publish />
                            </label>
                            <input type="file" id="file" style={{ display: "none" }} />
                        </div>
                        <button className="movieButton" onClick={handleUpdate}>
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Movie