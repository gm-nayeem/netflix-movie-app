import { useState } from "react";
import "./newList.css";
import { createList } from '../../context/listContext/listApiCalls';
import { getMovies } from '../../context/movieContext/movieApiCalls'
import { ListContext } from "../../context/listContext/ListContext";
import { MovieContext } from '../../context/movieContext/MovieContext';
import { useContext } from "react";
import { useEffect } from "react";
import {useNavigate} from 'react-router-dom'

const NewList = () => {
  const [list, setlist] = useState(null);
  const { dispatch } = useContext(ListContext);
  const { movies, dispatch: dispatchMovie } = useContext(MovieContext);
  const navigate = useNavigate();

  useEffect(() => {
    getMovies(dispatchMovie);
  }, [dispatchMovie])

  const handleChange = (e) => {
    const value = e.target.value;
    setlist({ ...list, [e.target.name]: value });
  };

  const handleContent = (e) => {
    const value = Array.from(e.target.selectedOptions, (option) => option.value)
    setlist({ ...list, [e.target.name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    createList(list, dispatch);
    navigate("/lists");
  };


  return (
    <div className="newList">
      <h1 className="addListTitle">New List</h1>
      <form className="addListForm">
        <div className="formLeft">
          <div className="addListItem">
            <label>Title</label>
            <input type="text" placeholder="John Wick" name="title" onChange={handleChange} />
          </div>
          <div className="addListItem">
            <label>Genre</label>
            <input type="text" placeholder="genre" name="genre" onChange={handleChange} />
          </div>
          <div className="addListItem">
            <label>Type</label>
            <select name="type" id="type" onChange={handleChange}>
              <option >Type</option>
              <option value="movie">Movie</option>
              <option value="series">Series</option>
            </select>
          </div>
        </div>
        <div className="formRight">
          <div className="addListItem">
            <label>Content</label>
            <select multiple name="content" onChange={handleContent}
              style={{ height: "280px" }}>
              {
                movies.map(movie => (
                  <option key={movie._id} value={movie._id}>{movie.title}</option>
                ))
              }
            </select>
          </div>
        </div>
        <button className="addListButton" onClick={handleSubmit}>Create</button>
      </form>
    </div>
  );
}

export default NewList;