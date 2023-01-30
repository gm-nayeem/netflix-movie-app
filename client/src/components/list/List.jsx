import ListItem from '../listItem/ListItem'
import './list.scss'
import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from '@mui/icons-material';
import { useRef, useState } from 'react';


const List = ({list}) => {
    const [isMoved, setIsMoved] = useState(false);
    const [slideNumber, setSlideNumber] = useState(0);
    const listRef = useRef();

    const handleClilck = (direction) => {
        setIsMoved(true);
        let distance = listRef.current.getBoundingClientRect().x - 50;

        if(direction === "left" && slideNumber > 0) {
            setSlideNumber(slideNumber - 1);
            listRef.current.style.transform = `translateX(${230 + distance}px)`;
        }
        if(direction === "right" && slideNumber < 5) {
            setSlideNumber(slideNumber + 1);
            listRef.current.style.transform = `translateX(${-230 + distance}px)`;
        } 
    }

    return (
        <div className='list'>
            <span className="listTitle">
                {list.title}
            </span>
            <div className="wrapper">
                <ArrowBackIosOutlined
                    className='sliderArrow left'
                    onClick={() => handleClilck("left")}
                    style={{display: !isMoved && "none"}}
                />
                <div className="container" ref={listRef}>
                    {
                        list.content.map((item, i) => (
                            <ListItem item={item} index={i}/>
                        ))
                    }
                </div>
                <ArrowForwardIosOutlined
                    className='sliderArrow right'
                    onClick={() => handleClilck("right")}
                />
            </div>
        </div>
    )
}

export default List