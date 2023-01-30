import './listItem.scss'
import { PlayArrow, Add, ThumbUpOutlined, ThumbDownOutlined } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const tokenUrl = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZDU3OGFiNDNiMGQxZWQ0OTY2YmRlNSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3NTA3ODU1MSwiZXhwIjoxNjc1NTEwNTUxfQ.bsZ4nLzWrBUybk6SYN-7WDQwxCwhMG3nIdrmry_ni5s";

const ListItem = ({ item, index }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [movie, setMovie] = useState({});

    useEffect(() => {
        const getMovie = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:8000/api/movies/find/${item}`, {
                    headers: {
                        token: tokenUrl
                    }
                }
                );
                setMovie(res.data);
            } catch (err) {
                console.log(err.message);
            }
        }
        getMovie();
    }, [item]);

    return (
        <Link to="/watch" state={{ movie: movie }}>
            <div
                className='listItem'
                style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <img src={movie.img} alt="" />
                {
                    isHovered && (
                        <>
                            <video
                                src={movie.trailer}
                                autoPlay={true}
                                type="video/mp4"
                                loop
                            >
                            </video>
                            <div className="itemInfo">
                                <div className="icons">
                                    <PlayArrow className='icon' />
                                    <Add className='icon' />
                                    <ThumbUpOutlined className='icon' />
                                    <ThumbDownOutlined className='icon' />
                                </div>
                                <div className="itemInfoTop">
                                    <span>{movie.duration}</span>
                                    <span className='limit'>+{movie.limit}</span>
                                    <span>{movie.year}</span>
                                </div>
                                <div className="desc">
                                    {movie.desc}
                                </div>
                                <div className="genre">{movie.genre}</div>
                            </div>
                        </>
                    )
                }
            </div>
        </Link>
    )
}

export default ListItem