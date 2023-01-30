import './watch.scss'
import { ArrowBackOutlined } from '@mui/icons-material';
import { useLocation, Link } from 'react-router-dom';

const Watch = () => {
  const location = useLocation();
  const {movie} = location.state;

  return (
    <div className='watch'>
      <Link to="/">
        <div className="back">
          <ArrowBackOutlined />
          Home
        </div>
      </Link>
      <video
        className='video'
        src={movie.video}
        autoPlay
        progress
        controls
        type="video/mp4"
      >
      </video>
    </div>
  )
}

export default Watch