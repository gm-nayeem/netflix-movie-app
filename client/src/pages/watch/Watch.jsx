import './watch.scss'
import { ArrowBackOutlined } from '@mui/icons-material';

const Watch = () => {
  return (
    <div className='watch'>
      <div className="back">
        <ArrowBackOutlined />
        Home
      </div>
      <video
        className='video'
        src="../../images/titanic.mp4"
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