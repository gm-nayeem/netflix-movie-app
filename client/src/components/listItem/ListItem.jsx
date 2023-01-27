import './listItem.scss'
import { PlayArrow, Add, ThumbUpOutlined, ThumbDownOutlined } from '@mui/icons-material';
import { useState } from 'react';

const videoUrl = "https://www.youtube.com/embed/kVrqfYjkTdQ"

const ListItem = ({ index }) => {
    const [isHovered, setIsHovered] = useState(false);
    console.log(typeof (index), index)
    return (
        <div
            className='listItem'
            style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img src="../../images/titanicImg4.jpeg" alt="" />
            {
                isHovered && (
                    <>
                        <video 
                            src="../../images/test.mp4"       
                            autoPlay={true}
                            type="video/mp4"
                            loop
                        >
                        </video>
                        <div className="itemInfo">
                            <div className="icons">
                                <PlayArrow className='icon'/>
                                <Add className='icon'/>
                                <ThumbUpOutlined className='icon'/>
                                <ThumbDownOutlined className='icon'/>
                            </div>
                            <div className="itemInfoTop">
                                <span>1 hour 15 min</span>
                                <span className='limit'>+16</span>
                                <span>1997</span>
                            </div>
                            <div className="desc">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. At laborum quae eius aperiam animi, provident ratione.
                            </div>
                            <div className="genre">Action</div>
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default ListItem