import './featured.scss'
import { InfoOutlined, PlayArrow } from '@mui/icons-material';

const Featured = ({ type }) => {
    return (
        <div className='featured'>
            {
                type && (
                    <div className="category">
                        <span>
                            {type === "movie" ? "Movies" : "Series"}
                        </span>
                        <select name="genre" id="genre">
                            <option>Genre</option>
                            <option value="adventure">Adventure</option>
                            <option value="comedy">Comedy</option>
                            <option value="crime">Crime</option>
                            <option value="fantasy">Fantasy</option>
                            <option value="historical">Historical</option>
                            <option value="horror">Horror</option>
                            <option value="romance">Romance</option>
                            <option value="sci-fi">Sci-fi</option>
                            <option value="thriller">Thriller</option>
                            <option value="western">Western</option>
                            <option value="animation">Animation</option>
                            <option value="drama">Drama</option>
                            <option value="documentary">Documentary</option>
                        </select>
                    </div>
                )
            }
            <img
                src="../../images/profile-photo.webp"
                alt=""
            />
            <div className="info">
                <img
                    src="../../images/martix.png"
                    alt=""
                />
                <span className="desc">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi deserunt excepturi, modi, earum tenetur neque quis minima libero veritatis dolores placeat quidem ullam sint cum perspiciatis architecto eius quas assumenda illum, sunt quibusdam asperiores qui iste nesciunt?
                </span>
                <div className="buttons">
                    <button className="play">
                        <PlayArrow />
                        <span>Play</span>
                    </button>
                    <button className="more">
                        <InfoOutlined />
                        <span>Info</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Featured