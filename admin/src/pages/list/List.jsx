import { Link, useLocation, useNavigate } from "react-router-dom";
import "./list.css";
import { updateList } from '../../context/listContext/listApiCalls';
import { ListContext } from '../../context/listContext/ListContext';
import { useContext, useState } from "react";


const List = () => {
    const [updatedList, setUpdatedlist] = useState(null);
    const location = useLocation();
    const { list } = location.state;
    const { dispatch } = useContext(ListContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const value = e.target.value;
        setUpdatedlist({ ...updatedList, [e.target.name]: value });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        Object.keys(updatedList).forEach((key) => {
            Object.keys(list).forEach((key2) => {
                if (key === key2) {
                    list[key2] = updatedList[key]
                }
            })
        });

        updateList(list, dispatch);
        navigate("/lists")
    }

    const {
        _id,
        title,
        type,
        genre,
    } = list;

    return (
        <div className="list">
            <div className="listTitleContainer">
                <h1 className="listTitle">
                    List
                </h1>
                <Link to="/newlist">
                    <button className="listAddButton">Create</button>
                </Link>
            </div>
            <div className="listTop">
                <div className="listTopRight">
                    <div className="listInfoTop">
                        <span className="listName">{title}</span>
                    </div>
                    <div className="listInfoBottom">
                        <div className="listInfoItem">
                            <span className="listInfoKey" style={{ marginRight: "20px" }}>id:</span>
                            <span className="listInfoValue">{_id}</span>
                        </div>
                        <div className="listInfoItem">
                            <span className="listInfoKey">type:</span>
                            <span className="listInfoValue">{type}</span>
                        </div>
                        <div className="listInfoItem">
                            <span className="listInfoKey">genre:</span>
                            <span className="listInfoValue">{genre}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="listBottom">
                <form className="listForm">
                    <div className="listFormLeft">
                        <label>List Title</label>
                        <input type="text" placeholder={title}
                            name="title" onChange={handleChange} />
                        <label>Type</label>
                        <input type="text" placeholder={type}
                            name="type" onChange={handleChange} />
                        <label>Genre</label>
                        <input type="text" placeholder={genre}
                            name="genre" onChange={handleChange} />
                    </div>
                    <div className="listFormRight">
                        <button className="listButton" onClick={handleUpdate}>Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default List