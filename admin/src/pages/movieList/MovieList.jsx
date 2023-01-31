import './movieList.css'
import { DataGrid } from '@mui/x-data-grid';
import {DeleteOutline} from '@mui/icons-material'
import {Link} from 'react-router-dom'
import { useContext, useEffect, useState } from 'react';
import { MovieContext } from '../../context/movieContext/MovieContext';
import { getMovies, deleteMovie } from '../../context/movieContext/movieApiCalls';

const ProductList = () => {
  const {movies, dispatch} = useContext(MovieContext);

  useEffect(() => {
    getMovies(dispatch);
  }, [dispatch]);

  const handleDelete = (id)=> {
    deleteMovie(id, dispatch);
  }

  const columns = [
    { field: '_id', headerName: 'ID', width: 200 },
    { 
      field: 'movie', 
      headerName: 'Movie', 
      width: 180 ,
      renderCell: (params)=> {
        return (
          <div className='movieListUser'>
            <img className='movieListImg' src={params.row.img} alt="" />
            {params.row.title}
          </div>
        )
      }
    },
    { field: 'genre', headerName: 'Genre', width: 100 },
    { field: 'year', headerName: 'Year', width: 100 },
    { field: 'limit', headerName: 'Limit', width: 100 },
    { field: 'isSeries', headerName: 'IsSeries', width: 100 },
    {
      field: "action",
      headerName: "Action",
      width: 140,
      renderCell: (params)=> {
        return (
          <>
            <Link to={"/movies/"+params.row._id} state={{movie: params.row}} >
              <button className="movieListEdit">Edit</button>
            </Link>
            <DeleteOutline className="movieListDelete" 
              onClick={() => handleDelete(params.row._id)} 
            />
          </>         
        )
      }
    }
  ];

  return (
    <div className='movieList'>
      <DataGrid
        rows={movies}
        columns={columns}
        disableSelectionOnClick
        pageSize={10}
        rowsPerPageOptions={[5]}
        checkboxSelection
        getRowId={r => r._id}
      />
    </div>
  )
}

export default ProductList