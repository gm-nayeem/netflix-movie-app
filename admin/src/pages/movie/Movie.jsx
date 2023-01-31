import { Link, useLocation } from "react-router-dom";
import "./movie.css";
import Chart from "../../components/Chart/Chart"
import { productData } from "../../dummyData"
import { Publish } from "@mui/icons-material";

const Movie = () => {
    const location = useLocation();
    const {movie} = location.state;
    console.log(movie);

    const {
        _id,
        title,
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
                        <input type="text" placeholder={title} />
                        <label>Year</label>
                        <input type="text" placeholder={year} />                       
                        <label>Genre</label>
                        <input type="text" placeholder={genre} />                       
                        <label>Limit</label>
                        <input type="number" placeholder={limit} />                       
                        <label>Trailer</label>
                        <input type="file" placeholder={trailer} />                       
                        <label>Video</label>
                        <input type="file" placeholder={video} />                                             
                    </div>
                    <div className="movieFormRight">
                        <div className="movieUpload">
                            <img src={img} alt="" className="movieUploadImg" />
                            <label for="file">
                                <Publish />
                            </label>
                            <input type="file" id="file" style={{ display: "none" }} />
                        </div>
                        <button className="movieButton">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Movie